import {AppRegistry} from "react-native";
import {StackNavigator} from "react-navigation";
import CadastroUsuarioScene from "./js/Scenes/cadastroUsuarioScene";
import LoginScene from "./js/Scenes/loginScene";
import CadastroSolicitacaoScene from "./js/Scenes/cadastroSolicitacaoScene";
import RecuperarSenhaScene from "./js/Scenes/recuperarSenhaScene";
import MenuScene from "./js/Scenes/menuScene";
import CadastroPacienteScene from "./js/Scenes/cadastroPacienteScene";
import CadastroMedicoScene from "./js/Scenes/cadastroMedicoScene";
import CadastroPessoaScene from "./js/Scenes/cadastroPessoaScene";
import listagemMedico from "./js/Scenes/listagens/listagemMedico";
import SelecaoContextoScene from "./js/Scenes/selecaoContextoScene";
import ListagemSolicitacao from "./js/Scenes/listagens/listagemSolicitacao";
import ListagemSolicitacaoMedico from "./js/Scenes/listagens/listagemSolicitacaoMedico";
import ListagemMensagem from "./js/Scenes/listagens/listagemMensagem";
import CadastroLocalizacaoScene from "./js/Scenes/cadastroLocalizacaoScene";
import IntegrarApp from "./js/Scenes/integrarAppMenuScene";
import IntegrarAzumio from "./js/Scenes/integrarAzumio";
import WebViewMaps from "./js/Scenes/webViewMaps";

const App = StackNavigator({
    Main: {screen: LoginScene},
    MenuScene: {screen: MenuScene},
    CadastroUsuario: {screen: CadastroUsuarioScene},
    CadastroSolicitacaoScene: {screen: CadastroSolicitacaoScene},
    RecuperarSenhaScene: {screen: RecuperarSenhaScene},
    CadastroPacienteScene: {screen: CadastroPacienteScene},
    CadastroMedicoScene: {screen: CadastroMedicoScene},
    CadastroPessoaScene: {screen: CadastroPessoaScene},
    ListagemMedico: {screen: listagemMedico},
    SelecaoContexto: {screen: SelecaoContextoScene},
    ListagemSolicitacao: {screen: ListagemSolicitacao},
    ListagemSolicitacaoMedico: {screen: ListagemSolicitacaoMedico},
    ListagemMensagem: {screen: ListagemMensagem},
    CadastroLocalizacaoScene: {screen: CadastroLocalizacaoScene},
    integrarAppMenuScene: {screen: IntegrarApp},
    IntegrarAzumio: {screen: IntegrarAzumio},
    WebViewMaps: {screen: WebViewMaps},
});

AppRegistry.registerComponent('MedClickMobile', () => App);