import React, {Component} from "react";
import {WebView} from "react-native";
import {azumio} from "../Services/webPathService";
import StaticStorageService from "../Services/staticStorageService";
import Container from "../../native-base-theme/components/Container";
import {Content} from "native-base";
import DrawerComponent from "../Component/Telas/DrawerComponent";
import ButtonDrawer from "../Component/Campos/ButtonDrawer";

let self;
export default class IntegrarAzumio extends Component {

  static navigationOptions = {
    title: 'Integrar com Azumio',
    headerLeft: <ButtonDrawer onPress={() => self.drawer.toggleDrawer()}/>
  };

  constructor(props) {
    super(props);
    self = this;
    this.state = {}
  }

  render() {
    const uri = `${azumio}/${StaticStorageService.usuarioSessao.idPaciente}`;
    console.log(uri);
    return (
      <DrawerComponent ref={(ref) => self.drawer = ref} {...this.props}>
          <WebView
            ref="webview"
            source={{uri: uri}}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            startInLoadingState={true}
            style={{height: 900}}
          />
      </DrawerComponent>
    );
  }

  _onNavigationStateChange(webViewState) {
    console.log(webViewState.url);

  }
}