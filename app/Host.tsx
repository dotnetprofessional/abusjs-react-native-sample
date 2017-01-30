import { AppRegistry, BackAndroid } from "react-native";
import * as React from 'react';
import {
    View,
    Text,
    Navigator, Keyboard
} from "react-native";
import { handler, MessageHandlerContext, Bus } from "abus";

import { SplashScreen, SignIn, MainScreen, Signout } from "./Screens";

import { NavigationCommand, NavigationRequest, OpenDialogCommand } from './Infrastructure/Navigation'
import { WorkflowResultCommand, Workflow } from "./Config";
import { Store } from './Config/Store';
import { AreYouSureDialog } from './Components/AreYouSureDialog';
import {TrackMessagesTask, Tracking} from './TrackMessagesTask';

export class WorkflowContext {
    constructor(public context: MessageHandlerContext, private process: string) {

    }
    workflowResult(action: string, data?: any) {
        this.context.sendAsync(new WorkflowResultCommand(this.process, action, data));
    }

    async workflowDialogAsync(dialogName: string, data?: any) {
        return this.context.sendAsync(new OpenDialogCommand(dialogName, data));
    }
}

export class DialogContext {
    constructor(public context: MessageHandlerContext, private navigator: Navigator) {

    }
    reply(data?: any) {
        this.navigator.pop();
        this.context.reply(data);
    }

    async workflowDialogAsync(dialogName: string, data?: any) {
        return this.context.sendAsync(new OpenDialogCommand(dialogName, data));
    }
}

export class ScreenProps {
    messageContext: WorkflowContext;
    store: Store;
}


export class DialogProps {
    context: DialogContext;
    data?: any;
    store: Store;
}

export class Host extends React.Component<void, any> {

    private _navigationInstance: any = null;
    // Just need to initialize the workflow and keep it alive!
    private _workflow: Workflow;

    private _store: Store;
    private _activeDialog: JSX.Element;
    private _activeScene: JSX.Element;

    constructor() {
        super();
        this._store = new Store();
        this.state = { showDialog: false };

        this._workflow = new Workflow(this._store, Bus.instance);
        this.navigationHandler = this.navigationHandler.bind(this);
        this.dialogHandler = this.dialogHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.render = this.render.bind(this);
        this._activeDialog = null;

        Bus.instance.inBoundMessageTasks.add(new TrackMessagesTask());
        Bus.instance.subscribe({ messageFilter: NavigationCommand.TYPE, handler: this.navigationHandler });
        Bus.instance.subscribe({ messageFilter: OpenDialogCommand.TYPE, handler: this.dialogHandler });
    }
    public static Actions = {
        back: "back",
    }

    renderScene(route: any, navigator: any) {
        (Keyboard as any).dismiss();
        return this.getRenderScene(route);
    }

    display() {
        Tracking.display();
    }
    getRenderScene(route: any) {
        switch (route.name) {
            case SplashScreen.processName:
                route.type = "transient";
                return <SplashScreen messageContext={new WorkflowContext(route.context, SplashScreen.processName)} store={this._store} />
            case SignIn.processName:
                route.type = "transient";
                return <SignIn messageContext={new WorkflowContext(route.context, SignIn.processName)} store={this._store} />
            case MainScreen.processName:
                return <MainScreen messageContext={new WorkflowContext(route.context, MainScreen.processName)} store={this._store} />
            case AreYouSureDialog.processName:
                return <AreYouSureDialog context={route.context} store={this._store} data={route.data} />
            case Signout.processName:
                return <Signout messageContext={new WorkflowContext(route.context, Signout.processName)} store={this._store} />
            default:
                throw TypeError("Unknown screen " + route.name);
        }
    }

    render(): JSX.Element {
        return (
            <Navigator
                ref={(ref: any) => { this._navigationInstance = ref; } }
                initialRoute={{ name: SplashScreen.processName, context: new MessageHandlerContext(Bus.instance) }}
                renderScene={this.renderScene}
                configureScene={(route: any) => {
                    if (route.type === "dialog") {
                        return Navigator.SceneConfigs.FloatFromBottom;
                    } else {
                        return Navigator.SceneConfigs.PushFromRight;
                    }
                } }
                />
        );
    }
    //@handler(NavigationCommand.TYPE)
    navigationHandler(message: NavigationRequest, context: MessageHandlerContext) {
        if (message.name === Host.Actions.back) {
            this._navigationInstance.pop();
        } else {
            let nextScreen = {
                type: "screen",
                name: message.name,
                context: context,
                data: message.data
            };

            let type = this._navigationInstance.navigationContext.currentRoute.type;
            if (type) {
                switch (type) {
                    case "dialog":
                    case "transient":
                        this._navigationInstance.replace(nextScreen);
                        break;
                }
            } else {
                this._navigationInstance.push(nextScreen);
            }
        }
    }


    //@handler(NavigationCommand.TYPE)
    dialogHandler(message: NavigationRequest, context: MessageHandlerContext) {
        this._navigationInstance.push({
            type: "dialog",
            name: message.name,
            context: context,
            data: message.data
        });
    }

    componentDidMount() {
        // Kick off the workflow
        this._workflow.start(new MessageHandlerContext(Bus.instance));
        //the '.bind(this)' makes sure 'this' refers to 'ViewComponent'
        BackAndroid.addEventListener('hardwareBackPress', function () {
            this._navigationInstance.pop();
            return true;
        }.bind(this));
    }


    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
}


AppRegistry.registerComponent("NavigationSample", () => Host);