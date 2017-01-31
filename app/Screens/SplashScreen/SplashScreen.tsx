import * as React from 'react';
import { Bus, MessageHandlerContext } from "abus";
import { View, Text, TouchableHighlight } from "react-native";
import {observer} from "mobx-react/native";

import { ScreenProps } from "../../Infrastructure/Navigation";
import { WorkflowResultCommand, WorkflowResult } from "../../Infrastructure/Workflow";
import { AuthenticationProcess } from '../';
import {Store, Workflow} from "../../Config";

@observer
export class SplashScreen extends React.Component<ScreenProps<Store>, any> {

    public static processName = "SplashScreen";
    private subscriptionKey: string;

    render(): JSX.Element {
        return (
            <View style={{
                backgroundColor: 'lime',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>SPLASH SCREEN!!!</Text>
                <Text></Text>
                <Text>{this.props.store.bootStrap.percerntComplete}% Complete</Text>
            </View>
        );
    }
}