'use strict';
// import View from './js/Scenes/loginScene';
import View from './js/Scenes/cadastroUsuarioScene';
// import View from './js/Scenes/cadastroMedicoScene';
// import View from './js/Scenes/cadastroPessoaScene';

// import React, { Component} from 'react';
import {
    AppRegistry,
    Text,
    Navigator
} from 'react-native';
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

AppRegistry.registerComponent('MedClickMobile', () => View);