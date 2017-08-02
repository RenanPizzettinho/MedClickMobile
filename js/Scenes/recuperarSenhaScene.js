import React, {Component} from "react";
import UsuarioService from "../Services/usuarioService";
import RecuperarSenhaComponent from "../Component/RecuperarSenhaComponent";
import {Alert} from "react-native";
import SceneEnum from '../Enums/SceneEnum';

export default class RecuperarSenhaScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    render() {
        return (
            <RecuperarSenhaComponent
                states={this.state}
                enviar={this.enviarLink}
                navigation={this.props.navigation}
            />
        );
    }

    enviarLink(state) {
        const formatoEmail = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

        if (!formatoEmail.test(state.email)) {
            Alert.alert("Aviso", "O formato do email esta incorreto. \n Tente algo parecido com exemplo@email.com");
            return;
        }

        const {navigate} = this.props.navigation;

        UsuarioService.recuperarSenha({email: state.email})
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    navigate(SceneEnum.LOGIN);
                } else {
                    console.log(responseJson.data);
                }
            })
            .catch((error) => {
                Alert.alert('Erro', JSON.stringify(error));
            });
    }

}