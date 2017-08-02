import React, {Component} from "react";
import SelecaoContextoComponent from "../Component/SelecaoContextoComponent";
import StaticStorageService from '../Services/staticStorageService';
import ContextoEnum from '../Enums/ContextoEnum';
import {Alert} from "react-native";
import SceneEnum from '../Enums/SceneEnum';

export default class SelecaoContextoScene extends Component {
    constructor(props) {
        super(props);
        usuario = StaticStorageService.usuarioSessao;
    }

    componentWillMount() {
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

    entrarPaciente() {
        const {navigate} = this.props.navigation;

        StaticStorageService.contexto = ContextoEnum.PACIENTE;

        if (usuario.idPaciente === undefined) {
            Alert.alert('Aviso', 'Olá,\n Este provavelmente é seu primeiro acesso como paciente, para melhorar sua experiencia neste app vamos lhe redirecionar para o cadastro de paciente, onde voce respondera um questionario medico simples.');
            navigate(SceneEnum.CADASTRO_PACIENTE);
        } else {
            navigate(SceneEnum.MENU);
        }
    }

    entrarMedico() {
        const {navigate} = this.props.navigation;

        StaticStorageService.contexto = ContextoEnum.MEDICO;

        if (usuario.idMedico === undefined) {
            Alert.alert('Aviso', 'Olá,\n Este provavelmente é seu primeiro acesso como médico. Para poder usar a nossa app com perfil medico, primeiro voce precisa preencher suas informacoes no formulario de cadastro medico. Entao lhe redirecionaremos para este formulario.');
            navigate(SceneEnum.CADASTRO_MEDICO);
        } else {
            navigate(SceneEnum.MENU);
        }
    }
}