import React, {Component} from "react";
import SelecaoContextoComponent from "../Component/SelecaoContextoComponent";
import {Alert, AsyncStorage} from "react-native";

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
            />
        );
    }

    async entrarPaciente(){
        this.acessar('PACIENTE');
    }

    async entrarMedico(){
        this.acessar('MEDICO');
    }

    async acessar(perfil) {
        const {navigate} = this.props.navigation;
        try {
            AsyncStorage.setItem('perfil', perfil);
        } catch (error) {
            Alert.alert('Erro', error);
        }
        navigate('MenuScene');
    }
}