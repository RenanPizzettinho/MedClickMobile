import React, {Component} from "react";
import {WebView} from "react-native";

export default class IntegrarAzumio extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <WebView
                ref="webview"
                source={{uri: 'https://api.azumio.com/api2/authorize?redirect_uri=http://www.example.com&client_id=org.organization.example'}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                startInLoadingState={true}
            />
        );
    }

    _onNavigationStateChange(webViewState){
        console.log(webViewState.url);
    }
}