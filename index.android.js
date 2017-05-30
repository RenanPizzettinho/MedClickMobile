'use strict';
// import View from './js/Scenes/loginScene';
// import View from './js/Scenes/cadastroUsuarioScene';
// import View from './js/Scenes/cadastroMedicoScene';
// import View from './js/Scenes/cadastroPessoaScene';

// import React, { Component} from 'react';
import {
    AppRegistry,
    Text,
    Navigator
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import CadastroUsuarioScene from "./js/Scenes/cadastroUsuarioScene";
import LoginScene from "./js/Scenes/loginScene";
import LayoutExample from "./js/Scenes/Layout";
import CadastroMedicoScene from "./js/Scenes/cadastroMedicoScene";
//
// class MedClickMobile extends Component {
//     render(){
//         return (
//             <Navigator
//                 initialRoute={{id:'LOGIN'}}
//                 renderScene={(route,navigator)=>{
//
//                 }}
//             />
//         );
//     }
// }

const App = StackNavigator({
    Main: {screen: LoginScene},
    CadastroUsuario: {screen: CadastroUsuarioScene}
});

AppRegistry.registerComponent('MedClickMobile', () => App);