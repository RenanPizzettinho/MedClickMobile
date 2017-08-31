import React, {Component} from "react";
import LoginService from "../Services/loginService";
import LoginComponent from "../Component/Telas/LoginComponent";
import {Alert, ToastAndroid} from "react-native";
import StaticStorageService from "../Services/staticStorageService";
import SceneEnum from '../Enums/SceneEnum';
import {Button, Icon} from "native-base";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";
import Sair from "../Component/Sair";

export default class LoginScene extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);

        this.state = {
            email: "dogra@teste.com",
            senha: "123456"
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
                if (responseJson.status === 403) {
                    ToastAndroid.showWithGravity('Sem acesso', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                }
                if (responseJson.data._id) {
                    console.log('RESPONSE: ', responseJson);
                    StaticStorageService.usuarioSessao = responseJson.data;
                    navigate(SceneEnum.SELECAO_CONTEXTO);
                } else {
                    Alert.alert('Erro', responseJson.data);
                }

            });
    }

    disabled() {
        return !this.state.email || !this.state.senha;
    }
}
