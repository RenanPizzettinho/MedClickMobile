import React, {Component} from "react";
import {WebView} from "react-native";
import {ToastAndroid} from "react-native";

export default class WebViewMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //source={{uri: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCS-WWPdgWA4HMXh2rfUoEuWJbZoONbgUY&q='}}
    render() {
        return (
            <WebView
                ref="webview"
                scalesPageToFit={true}
                source={{html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><iframe width="100%" height="450" frameborder="0" style="border:0"                   src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCS-WWPdgWA4HMXh2rfUoEuWJbZoONbgUY&q=Space+Needle,Seattle+WA" allowfullscreen>                        </iframe>                        </body>                        </html>'}}                startInLoadingState={true}
            />
        );
    }

    _onNavigationStateChange(webViewState) {
        let url = webViewState.url;
        if (url.indexOf('@') > 0) {
            url = url.split('@')[1];
            if (url.indexOf(',') > 0) {
                url.split(',');
                let latitude = url[0];

                let longitude = url[1];
                console.log(longitude);
                ToastAndroid.showWithGravity(`Latitude: ${latitude}\n Longitude: ${longitude}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }
        }

    }
}