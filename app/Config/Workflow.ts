import { Bus, MessageHandlerContext } from "abus";
import { WorkflowResultCommand, WorkflowResult } from "../Config";
import { NavigationCommand } from "../Infrastructure/Navigation";
import { SplashScreen, BootstrapProcess, MainScreen, AuthenticationProcess, SignIn } from "../Screens";
import { Store } from "../Config/Store";
import { NavigationContext } from "../Host";

/**
 * Defines how components talk to each other
 * and is responsible for determining navigation
 * 
 * @export
 * @class Workflow
 */
export class Workflow {
    constructor(private store: Store, private bus?: Bus) {
        this.workflowCommandHandler = this.workflowCommandHandler.bind(this);
        if (!bus) {
            this.bus = Bus.instance;
        }
        this.bus.subscribe({ messageFilter: WorkflowResultCommand.TYPE, handler: this.workflowCommandHandler });
    }

    private currentScreen: string;
    private context: MessageHandlerContext;

    /**
     * Starts the workflow with the default action
     * 
     * 
     * @memberOf Workflow
     */
    public start() {
        this.workflowCommandHandler(new WorkflowResult(), new MessageHandlerContext(this.bus));
    }

    navigate(screen: string) {
        // find out what the subscribers are!
        let count = Bus.instance.subscriberCount(NavigationCommand.TYPE);
        this.context.sendAsync(new NavigationCommand(screen));
    }

    executeProcess<T>(processCommand: T): T {
        (processCommand as any).context = new NavigationContext(this.bus, processCommand.constructor.name);
        return processCommand;
    }

    displayMessage(processCommand: any) {
        // send message that will display a dialog or a toast message
    }


    //@handler(NavigationCommand.TYPE)
    workflowCommandHandler(message: WorkflowResult, context: MessageHandlerContext) {
        this.context = context;
        switch (message.process) {
            case BootstrapProcess.processName:
                switch (message.action) {
                    case BootstrapProcess.Actions.complete:
                        this.navigate(SignIn.processName);
                        break;
                    case BootstrapProcess.Actions.error:
                        this.displayMessage(message.data);
                        break;
                }
                break;
            case SignIn.processName:
                switch (message.action) {
                    case SignIn.Actions.signIn:
                        // Note that the process updates the store which updates the UI
                        this.executeProcess(new AuthenticationProcess()).execute(this.store.authentication, message.data);
                        break;
                }
                break;
            case AuthenticationProcess.processName:
                switch (message.action) {
                    case AuthenticationProcess.Actions.signedIn:
                        this.navigate(MainScreen.processName);
                        break;
                    case AuthenticationProcess.Actions.error:
                        if (this.currentScreen === SignIn.processName) {
                            // No need to do anything the UI will handle the error state
                        } else {
                            this.displayMessage(message.data);
                        }
                        break;

                }
                break;
            default:
                // Naviate to splash screen
                this.navigate(SplashScreen.processName);
                this.executeProcess(new BootstrapProcess()).executeAsync(this.store.bootStrap);
        }
    }
}