import React, {Component} from "react";
import {WebView} from "react-native";
import {ToastAndroid} from "react-native";

export default class WebViewMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <WebView
                ref="webview"
                source={{uri: 'https://www.google.com.br/maps'}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                startInLoadingState={true}
            />
        );
    }

    _onNavigationStateChange(webViewState) {
        let url = webViewState.url;
        console.log(url);
        if (url !== undefined) {
            url = url.split('@')[1].split(',');
            let latitude = url[0];
            let longitude = url[1];
            ToastAndroid.showWithGravity(`Latitude: ${latitude}\n Longitude: ${longitude}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }

    }
}