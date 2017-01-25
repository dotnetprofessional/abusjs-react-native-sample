import * as React from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from "react-native";

import { NavProps} from "../../Host";

export class SplashScreen extends React.Component<NavProps, any> {

    public static processName = "SplashScreen";
     
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
            </View>
        );
    }
}