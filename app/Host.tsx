import { AppRegistry } from "react-native";
import * as React from 'react';
import {
    View,
    Text,
    Navigator
} from "react-native";
import { handler, MessageHandlerContext, Bus } from "abus";

import { SplashScreen, SignIn, MainScreen } from "./Screens";

import { NavigationCommand, NavigationRequest } from './Infrastructure/Navigation'
import { WorkflowResultCommand, Workflow } from "./Config";
import { Store } from './Config/Store';

export class NavigationContext {
    constructor(public bus: Bus, private process: string) {

    }
    workflowResult(action: string, data?: any) {
        this.bus.sendAsync(new WorkflowResultCommand(this.process, action, data));
    }
}

export class NavProps {
    context: NavigationContext;
    store: Store;
}

export class Host extends React.Component<void, void> {

    private _navigationInstance: any = null;
    // Just need to initialize the workflow and keep it alive!
    private _workflow: Workflow;

    private _store: Store;

    constructor() {
        super();
        this._store = new Store();
        this._workflow = new Workflow(this._store, Bus.instance);
        this.navigationHandler = this.navigationHandler.bind(this);
        this.renderScene = this.renderScene.bind(this);
        Bus.instance.subscribe({ messageFilter: NavigationCommand.TYPE, handler: this.navigationHandler });

        // Kick off the workflow
        this._workflow.start();
    }

    renderScene(route: any, navigator: any) {
        switch (route.name) {
            case SplashScreen.processName:
                return <SplashScreen context={new NavigationContext(Bus.instance, SplashScreen.processName)} store= {this._store}  />
            case SignIn.processName:
                return <SignIn context={new NavigationContext(Bus.instance, SignIn.processName)} store= {this._store}/>
            case MainScreen.processName:
                return <MainScreen context={new NavigationContext(Bus.instance, MainScreen.processName)} store= {this._store}/>
            //default:
            //    return <Screen1 navigator={navigator} />
        }
    }

    render(): JSX.Element {
        return (
            <Navigator
                ref={(ref: any) => { this._navigationInstance = ref; } }
                initialRoute={{ name: SplashScreen.processName, index: 0 }}
                renderScene={this.renderScene} />
        );
    }
    //@handler(NavigationCommand.TYPE)
    navigationHandler(message: NavigationRequest, context: MessageHandlerContext) {
        this._navigationInstance.push({
            name: message.screen,
        });
    }

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

}


AppRegistry.registerComponent("NavigationSample", () => Host);