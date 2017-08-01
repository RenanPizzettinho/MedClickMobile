import React, {Component} from "react";
import LoginService from "../Services/loginService";
import LoginComponent from "../Component/LoginComponent";
import {Alert, AsyncStorage, ToastAndroid} from "react-native";
import StaticStorageService from '../Services/staticStorageService';

export default class LoginScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "renan@teste.com",
            senha: "123456"
        };
    }

    render() {
        return(
            <LoginComponent
                login={this.login}
                disabled={this.disabled}
                states={this.state}
                navigation={this.props.navigation}
            />
        );
    }

    login() {
        const {navigate} = this.props.navigation;
        const form = {
            email: this.state.email,
            senha: this.state.senha
        };
        LoginService.login(form)
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 403){
                    ToastAndroid.showWithGravity('Sem acesso', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                }
                if (responseJson.data._id) {
                    StaticStorageService.usuarioSessao = responseJson.data;
                    navigate('SelecaoContexto');
                } else {
                    Alert.alert('Erro', responseJson.data);
                }

            });
    }

    disabled() {
        return !this.state.email || !this.state.senha;
    }
}
