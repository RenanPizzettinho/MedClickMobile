'use strict';
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

const App = StackNavigator({
    Main: {screen: LoginScene},
    MenuScene: {screen: MenuScene},
    CadastroUsuario: {screen: CadastroUsuarioScene},
    CadastroSolicitacaoScene: {screen: CadastroSolicitacaoScene},
    RecuperarSenhaScene: {screen: RecuperarSenhaScene},
    CadastroPacienteScene: {screen: CadastroPacienteScene},
    CadastroMedicoScene: {screen: CadastroMedicoScene},
    CadastroPessoaScene: {screen: CadastroPessoaScene},
    ListagemMedico: {screen: listagemMedico}
});

AppRegistry.registerComponent('MedClickMobile', () => App);