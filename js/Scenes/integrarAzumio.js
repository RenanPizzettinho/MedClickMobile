import React, {Component} from "react";
import {WebView} from "react-native";
import {Content, View} from "native-base";
import BotaoBase from "../Component/Campos/BotaoBase";

export default class IntegrarAzumio extends Component {

    static navigationOptions = {
        title: 'Integrar com Azumio',
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <WebView
                ref="webview"
                source={{uri: 'https://api.azumio.com/api2/authorize?redirect_uri=http://www.example.com&client_id=org.organization.example'}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                startInLoadingState={true}
                style={{height: 900}}
            />
        );
    }

    _onNavigationStateChange(webViewState) {
        console.log(webViewState.url);
    }
}