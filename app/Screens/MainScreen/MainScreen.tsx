import * as React from 'react';
import {
    View,
    Text
} from "react-native";
import { NavProps } from "../../Host";

export class MainScreen extends React.Component<NavProps, any> {
    public static Actions = {
        complete: "complete",
        error: "error"
    }
    public static processName = "MainScreen";

    constructor(props: NavProps) {
        super();
        this.props = props;
        debugger;
    }
    render(): JSX.Element {
        return (
            <View>
                <Text>Welcome, <Text style={{ fontWeight: "bold" }}>{this.props.store.authentication.username}</Text> you're now signed in!!!</Text>
            </View>
        );
    }
}