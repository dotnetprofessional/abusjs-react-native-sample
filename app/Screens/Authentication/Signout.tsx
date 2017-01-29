import * as React from 'react';
import { Bus, MessageHandlerContext } from "abus";
import { View, Text, TouchableHighlight } from "react-native";
import {observer} from "mobx-react/native";

import { ScreenProps } from "../../Host";
import { WorkflowResultCommand, Workflow, WorkflowResult } from "../../Config";
import { AuthenticationProcess } from '../';

@observer
export class Signout extends React.Component<ScreenProps, any> {

    public static processName = "Signout";
    private subscriptionKey: string;

    render(): JSX.Element {
        return (
            <View style={{
                backgroundColor: 'cyan',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>Come back again soon.</Text>
            </View>
        );
    }
}