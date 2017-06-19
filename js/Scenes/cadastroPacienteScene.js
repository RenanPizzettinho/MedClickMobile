import React, {Component} from "react";
import {Alert, AsyncStorage} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroPacienteComponent from "../Component/CadastroPacienteComponent";

export default class CadastroPacienteScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            possuiDiabetes: false,
            possuiPressaoAlta: false
        };
    }

    render() {
        return (
            <CadastroPacienteComponent
                salvar={this.salvarPaciente}
                states={this.state}
            />
        );
    }

    async componentWillMount() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                let dados = response.data.paciente;
                this.setState({
                    possuiDiabetes: dados.possuiDiabetes,
                    possuiPressaoAlta: dados.possuiPressaoAlta
                });
            })
            .catch(
                (error) => {
                    Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async salvarPaciente(state) {
        const userId = await AsyncStorage.getItem('userId');

        let form = {
            _id: userId,
            possuiDiabetes: state.possuiDiabetes,
            possuiPressaoAlta: state.possuiPressaoAlta
        };

        UsuarioService.salvarPaciente(userId, form)
            .then((response) => {
                Alert.alert('Cadastro', JSON.stringify(response))
            })
            .catch((error) => {
                Alert.alert('Erro', JSON.stringify(error));
            });
    }
}