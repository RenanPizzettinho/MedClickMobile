import React, {Component} from "react";
import {Alert, AsyncStorage, ToastAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroPacienteComponent from "../Component/CadastroPacienteComponent";

export default class CadastroPacienteScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            possuiDiabete: false,
            possuiPressaoAlta: false
        };
    }

    render() {
        return (
            <CadastroPacienteComponent
                salvar={this.salvarPaciente}
                states={this.state}
                fetchData={this.fetchData}
            />
        );
    }

    async fetchData() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                // Alert.alert("paciente", JSON.stringify(response));
                let dados = response.data.paciente;
                this.setState({
                    possuiDiabete: dados.possuiDiabete,
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
            possuiDiabete: state.possuiDiabete,
            possuiPressaoAlta: state.possuiPressaoAlta
        };

        UsuarioService.salvarPaciente(userId, form)
            .then((response) => {
                ToastAndroid.showWithGravity('Informações de paciente atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            })
            .catch((error) => {
                Alert.alert('Erro', JSON.stringify(error));
            });
    }


}