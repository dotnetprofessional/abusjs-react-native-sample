import * as React from 'react';
import { View, Animated, Dimensions, Text, StyleSheet, Button } from "react-native";
import { DialogProps } from "../../Host";

export class AreYouSureDialog extends React.Component<DialogProps, any>{
    public static processName = "AreYouSureDialog";

    render(): JSX.Element {
        return (
            <View style={{
                backgroundColor: 'orange',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>{this.props.data.text}</Text>
                <Text></Text>

                <Button 
                    onPress={()=>this.props.context.reply({ response: 'Yes' })}
                    title="Yes"
                    color ="#53ff19" // Green
                    />
                <Button
                    onPress={() => this.props.context.reply({ response: 'No' })}
                    title="No"
                    color="#ff1911"  //     Red
                    />
            </View>
        );
    }
}