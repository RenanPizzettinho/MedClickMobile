import React from "react";
import {AppRegistry, TouchableOpacity, Alert, StatusBar} from "react-native";
import {DrawerNavigator, StackNavigator} from "react-navigation";
import CadastroUsuarioScene from "./js/Scenes/cadastroUsuarioScene";
import LoginScene from "./js/Scenes/loginScene";
import CadastroSolicitacaoScene from "./js/Scenes/cadastroSolicitacaoScene";
import RecuperarSenhaScene from "./js/Scenes/recuperarSenhaScene";
import MenuScene from "./js/Scenes/menuScene";
import CadastroPacienteScene from "./js/Scenes/cadastroPacienteScene";
import CadastroMedicoScene from "./js/Scenes/cadastroMedicoScene";
import CadastroPessoaScene from "./js/Scenes/cadastroPessoaScene";
import PesquisaMedico from "./js/Scenes/listagens/pesquisaMedico";
import SelecaoContextoScene from "./js/Scenes/selecaoContextoScene";
import ListagemSolicitacao from "./js/Scenes/listagens/listagemSolicitacao";
import ListagemMensagem from "./js/Scenes/listagens/listagemMensagem";
import CadastroLocalizacaoScene from "./js/Scenes/cadastroLocalizacaoScene";
import integrarAppMenuScene from "./js/Scenes/integrarAppMenuScene";
import IntegrarAzumio from "./js/Scenes/integrarAzumio";
import WebViewMaps from "./js/Scenes/webViewMaps";
import SolicitacaoScene from "./js/Scenes/SolicitacaoScene";
import ModoPesquisaScene from "./js/Scenes/ModoPesquisaScene";
import SolicitacaoMedicoScene from "./js/Scenes/SolicitacaoMedicoScene";
import {Button, Icon, Text, View} from "native-base";
import DrawerComponent from "./js/Component/Telas/DrawerComponent";


const App = StackNavigator({
  Main: {screen: LoginScene},
  MenuScene: {screen: MenuScene},
  CadastroUsuario: {screen: CadastroUsuarioScene},
  CadastroSolicitacaoScene: {screen: CadastroSolicitacaoScene},
  RecuperarSenhaScene: {screen: RecuperarSenhaScene},
  CadastroPacienteScene: {screen: CadastroPacienteScene},
  CadastroMedicoScene: {screen: CadastroMedicoScene},
  CadastroPessoaScene: {screen: CadastroPessoaScene},
  PesquisaMedico: {screen: PesquisaMedico},
  SelecaoContexto: {screen: SelecaoContextoScene},
  ListagemSolicitacao: {screen: ListagemSolicitacao},
  ListagemMensagem: {screen: ListagemMensagem},
  CadastroLocalizacaoScene: {screen: CadastroLocalizacaoScene},
  integrarAppMenuScene: {screen: integrarAppMenuScene},
  IntegrarAzumio: {screen: IntegrarAzumio},
  WebViewMaps: {screen: WebViewMaps},
  SolicitacaoScene: {screen: SolicitacaoScene},
  ModoPesquisaScene: {screen: ModoPesquisaScene},
  SolicitacaoMedicoScene: {screen: SolicitacaoMedicoScene}
}, {
  initialRouteName: 'Main',
  headerMode: 'screen',
  navigationOptions: ({navigation}) => ({
    headerTintColor: '#ffffff',
    tintColor: '#ffffff',
    titleStyle: {
      color: '#ffffff',
    },
    headerStyle: {
      backgroundColor: '#0064A3'
    },
    headerRight: <Button transparent onPress={() => navigation.navigate("SelecaoContexto")}>
      <Icon name='ios-people' style={{color: '#fff'}}/>
    </Button>

  })
});

const AppContent = () =>
  <View style={{flex: 1}}>
    <StatusBar backgroundColor="#005387" barStyle="light-content"/>
    <App/>
  </View>


// const MainDrawerNavigator = DrawerNavigator({
//   App: {screen: App},
//   Menu: {screen: MenuScene},
// }, {
//   initialRouteName: 'App',
//   headerMode: 'screen'
// })

AppRegistry.registerComponent('MedClickMobile', () => AppContent);