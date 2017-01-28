import * as React from 'react';
import {
    View,
    Text
} from "react-native";
import { ScreenProps } from "../../Host";

export class MainScreen extends React.Component<ScreenProps, any> {
    public static Actions = {
        complete: "complete",
        error: "error"
    }
    public static processName = "MainScreen";

    constructor(props: ScreenProps) {
        super();
        this.props = props;
    }
    render(): JSX.Element {
        return (
            <View>
                <Text>Welcome, <Text style={{ fontWeight: "bold" }}>{this.props.store.authentication.username}</Text> you're now signed in!!!</Text>
            </View>
        );
    }

    
}