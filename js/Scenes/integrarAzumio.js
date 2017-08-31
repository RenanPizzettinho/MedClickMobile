import React, {Component} from "react";
import {WebView} from "react-native";
import {azumio} from "../Services/webPathService";
import StaticStorageService from "../Services/staticStorageService";

export default class IntegrarAzumio extends Component {

    static navigationOptions = {
        title: 'Integrar com Azumio',
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const uri = `${azumio}/${StaticStorageService.usuarioSessao.idPaciente}`;
        console.log(uri);
        return (
            <WebView
                ref="webview"
                source={{uri: uri}}
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