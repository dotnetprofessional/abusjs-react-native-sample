import * as React from 'react';
import {observer} from "mobx-react/native";

import { View, Text, TextInput, Button } from "react-native";
import { ScreenProps } from "../../Host";

@observer
export class SignIn extends React.Component<ScreenProps, any> {

    constructor(props: ScreenProps) {
        super();
        this.props = props;
        this.state = { name: "" };
    }

    public static Actions = {
        signIn: "SignIn",
        signOut: "signOut",
        error: "error",
    }


    public static processName = "SignIn";

    render(): JSX.Element {
        return (
            <View>
                <Text>Enter username to SignIn:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                    />
                <Button
                    onPress={()=>this.props.messageContext.workflowResult(SignIn.Actions.signIn, this.state.name)}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />
                 <Text style={{color: 'red'}}>{this.props.store.authentication.displayMessage}</Text>
           </View>
        );
    }
}