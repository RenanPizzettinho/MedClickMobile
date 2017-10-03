import React, {Component} from "react";
import LoginService from "../Services/loginService";
import LoginComponent from "../Component/Telas/LoginComponent";
import {Alert, ToastAndroid, Navigator, DrawerLayoutAndroid, StatusBar} from "react-native";
import StaticStorageService from "../Services/staticStorageService";
import SceneEnum from '../Enums/SceneEnum';
import {Container, Content, Header, Body, Title, Left, Button, Icon, Right, Drawer, View, Text} from 'native-base';


export default class LoginScene extends React.Component {

  static navigationOptions = {
    title: 'Login',
    // header : null
    headerRight : null
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "paciente",
      senha: "123"
    };
  }

  render() {
    return (
        <LoginComponent
          login={this.login}
          disabled={this.disabled}
          states={this.state}
          navigation={this.props.navigation}
        />
    )
  }

  login() {
    const {navigate} = this.props.navigation;
    const form = {
      email: this.state.email,
      senha: this.state.senha
    };
    LoginService.login(form)
      .then((responseJson) => {
        if (responseJson.status === 403) {
          ToastAndroid.showWithGravity('Sem acesso', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        if (responseJson.errors) {
          ToastAndroid.showWithGravity(responseJson.errors[0].mensagem, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          return;
        }

        if (responseJson.data._id) {
          console.log('RESPONSE: ', responseJson);
          StaticStorageService.usuarioSessao = responseJson.data;
          navigate(SceneEnum.SELECAO_CONTEXTO);
        } else {
          Alert.alert('Erro', responseJson.data);
        }

      })
      .catch(function (err) {
        console.log(err)
        ToastAndroid.showWithGravity('Problema ao tentar realizar login', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      });
  }

  disabled() {
    return !this.state.email || !this.state.senha;
  }
}

