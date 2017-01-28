import { AppRegistry } from "react-native";
import * as React from 'react';
import {
    View,
    Text,
    Navigator
} from "react-native";
import { handler, MessageHandlerContext, Bus } from "abus";

import { SplashScreen, SignIn, MainScreen } from "./Screens";

import { NavigationCommand, NavigationRequest, OpenDialogCommand } from './Infrastructure/Navigation'
import { WorkflowResultCommand, Workflow } from "./Config";
import { Store } from './Config/Store';
import { AreYouSureDialog } from './Components/AreYouSureDialog';

export class WorkflowContext {
    constructor(public context: MessageHandlerContext, private process: string) {

    }
    workflowResult(action: string, data?: any) {
        this.context.sendAsync(new WorkflowResultCommand(this.process, action, data));
    }

    async workflowDialogAsync(dialogName: string, data?: any) {
        //return this.context.sendAsync(new NavigationCommand(dialogName, data));
    }
}

export class ScreenProps {
    messageContext: WorkflowContext;
    store: Store;
}


export class DialogProps {
    messageContext: MessageHandlerContext;
    store: Store;
}

export class Host extends React.Component<void, any> {

    private _navigationInstance: any = null;
    // Just need to initialize the workflow and keep it alive!
    private _workflow: Workflow;

    private _store: Store;
    private _activeDialog: JSX.Element;

    constructor() {
        super();
        this._store = new Store();
        this.state = { showDialog: false };

        this._workflow = new Workflow(this._store, Bus.instance);
        this.navigationHandler = this.navigationHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.render = this.render.bind(this);
        Bus.instance.subscribe({ messageFilter: NavigationCommand.TYPE, handler: this.navigationHandler });
        Bus.instance.subscribe({ messageFilter: OpenDialogCommand.TYPE, handler: this.dialogHandler });
    }

    renderScene(route: any, navigator: any) {
        switch (route.name) {
            case SplashScreen.processName:
                return <SplashScreen messageContext={new WorkflowContext(route.context, SplashScreen.processName)} store={this._store} />
            case SignIn.processName:
                return <SignIn messageContext={new WorkflowContext(route.context, SignIn.processName)} store={this._store} />
            case MainScreen.processName:
                return <MainScreen messageContext={new WorkflowContext(route.context, MainScreen.processName)} store={this._store} />
            default:
                throw TypeError("Unknown screen " + route.name);
        }
    }

    render(): JSX.Element {
        return (
                <Navigator
                    ref={(ref: any) => { this._navigationInstance = ref; } }
                    initialRoute={{ name: SplashScreen.processName, context: new MessageHandlerContext(Bus.instance) }}
                    renderScene={this.renderScene} />
        );
    }
    //@handler(NavigationCommand.TYPE)
    navigationHandler(message: NavigationRequest, context: MessageHandlerContext) {
        this._navigationInstance.push({
            name: message.name,
            context
        });
    }

    //@handler(NavigationCommand.TYPE)
    dialogHandler(message: NavigationRequest, context: MessageHandlerContext) {
        try {
            debugger;
            this._activeDialog = <AreYouSureDialog messageContext={context} store={this._store} />
            this.setState({ showDialog: true });
        } catch (error) {
            //this.setState({ showDialog: false });
        }
    }

    componentDidMount() {
        // Kick off the workflow
        this._workflow.start(new MessageHandlerContext(Bus.instance));
    }

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

}


AppRegistry.registerComponent("NavigationSample", () => Host);