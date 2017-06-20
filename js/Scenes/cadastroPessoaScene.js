import React, {Component} from "react";

import {Alert, AsyncStorage, DatePickerAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroPessoaComponent from "../Component/CadastroPessoaComponent";

export default class CadastroPessoaScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            dtNascimento: new Date()
        }
    }

    render() {
        return (
            <CadastroPessoaComponent
                salvar={this.salvar}
                states={this.state}
                disabled={CadastroPessoaScene.disabled}
            />
        );
    }

    async componentWillMount() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                let dados = response.data;
                // Alert.alert("resp", JSON.stringify(response));
                this.setState({
                    nome: dados.nome,
                    cpf: dodos.cpf,
                    dtNascimento: dados.dtNascimento
                });
            })
            .catch(
                (error) => {
                    Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async salvar(state) {
        const userId = await AsyncStorage.getItem('userId');
        let form = {
            id: userId,
            nome: state.nome,
            cpf: state.cpf,
            dtNascimento: state.dtNascimento
        };

        // Alert.alert('Sucesso', 'OK');

        UsuarioService.salvarInformacoesPessoais(userId, form)
            .then((responseJson) => {
                Alert.alert('Sucesso', JSON.stringify(responseJson));
            })
            .catch((error) => {
                Alert.alert('Erro', 'Erro ao atualizar o perfil!');
            });
    }

    static disabled(state) {
        return !state.nome || !state.cpf || !state.dtNascimento;
    }

}