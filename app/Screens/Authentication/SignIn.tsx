import * as React from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { ScreenProps } from "../../Host";

export class SignIn extends React.Component<ScreenProps, any> {

    constructor(props: ScreenProps) {
        super();
        this.signIn = this.signIn.bind(this);
        this.props = props;
        this.state = { name: "" };
    }

    public static Actions = {
        signIn: "SignIn",
        signOut: "signOut",
        error: "error",
    }

    signIn() {
        this.props.messageContext.workflowResult(SignIn.Actions.signIn, this.state.name);
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
                    onPress={this.signIn}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>
        );
    }

    componentWillUnmount() {
   }
}