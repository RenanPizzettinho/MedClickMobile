import React, {Component} from "react";
import SelecaoContextoComponent from "../Component/SelecaoContextoComponent";
import {Alert, AsyncStorage} from "react-native";
import UsuarioService from "../Services/usuarioService";

export default class SelecaoContextoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SelecaoContextoComponent
                entrarPaciente={this.entrarPaciente}
                entrarMedico={this.entrarMedico}
                acessar={this.acessar}
                navigation={this.props.navigation}
                getUsuario={this.getUsuario}
            />
        );
    }

    async getUsuario() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                //Alert.alert("Usuario", JSON.stringify(response));
                let dados = response.data;
                this.setState({idMedico: dados.idMedico, idPaciente: dados.idPaciente});
            })
            .catch(
                (error) => {
                    Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async entrarPaciente() {
        this.acessar('PACIENTE', this.state.idPaciente);
    }

    async entrarMedico() {
        this.acessar('MEDICO', this.state.idMedico);
    }

    async acessar(perfil, idPerfil) {
        const {navigate} = this.props.navigation;
        try {
            AsyncStorage.setItem('perfil', perfil);
            AsyncStorage.setItem('idPerfil', idPerfil);
        } catch (error) {
            Alert.alert('Erro', error);
        }
        navigate('MenuScene');
    }
}