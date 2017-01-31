import * as React from 'react';
import { Bus, MessageHandlerContext } from "abus";
import { View, Text, TouchableHighlight } from "react-native";
import {observer} from "mobx-react/native";

import { ScreenProps } from "../../Infrastructure/Navigation";
import { WorkflowResultCommand, WorkflowResult } from "../../Infrastructure/Workflow";
import { AuthenticationProcess } from '../';
import {Store, Workflow} from "../../Config";

@observer
export class Signout extends React.Component<ScreenProps<Store>, any> {

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