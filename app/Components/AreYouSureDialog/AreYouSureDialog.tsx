import * as React from 'react';
import {View, Animated, Dimensions, Text, StyleSheet, Button} from "react-native";
import { DialogProps } from "../../Host";

export class AreYouSureDialog extends React.Component<DialogProps,any>{
    public static processName = "AreYouSureDialog";

    render(): JSX.Element {
        return (
            <View style={{
                backgroundColor: 'blue',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
            }}>
                <Text>Are you sure?</Text>
                <Button
                    onPress={()=>this.props.messageContext.reply({response: 'Yes'})}
                    title="Yes"
                    color="Green"
                    accessibilityLabel="Learn more about this purple button"
                    />
                <Button
                    onPress={()=>this.props.messageContext.reply({response: 'No'})}
                    title="No"
                    color="Red"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>
        );
    }
}