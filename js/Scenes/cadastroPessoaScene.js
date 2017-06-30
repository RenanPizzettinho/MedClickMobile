import React, {Component} from "react";

import {Alert, AsyncStorage, ToastAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroPessoaComponent from "../Component/CadastroPessoaComponent";

export default class CadastroPessoaScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            dtNascimento: new Date().toDateString()
        }
    }

    render() {
        return (
            <CadastroPessoaComponent
                salvar={this.salvar}
                states={this.state}
                disabled={CadastroPessoaScene.disabled}
                fetchData={this.fetchData}
            />
        );
    }

    async fetchData() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                let dados = response.data;
                let nome = response.data.nome;
                Alert.alert("resp", JSON.stringify(dados));

                let data = new Date(dados.dtNascimento);
                this.setState({nome: nome});
                this.setState({cpf: dados.cpf});
                this.setState({dtNascimento: data});

                // Alert.alert(JSON.stringify(this.state));
            })
            .catch(
                (error) => {
                    // Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async salvar(state) {
        const userId = await AsyncStorage.getItem('userId');
        let form = {
            nome: state.nome,
            cpf: state.cpf,
            dtNascimento: state.dtNascimento
        };

        UsuarioService.salvarInformacoesPessoais(userId, form)
            .then((responseJson) => {
                ToastAndroid.showWithGravity('Informações de usuário atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                // Alert.alert('Sucesso', JSON.stringify(responseJson));

            })
            .catch((error) => {
                Alert.alert('Erro', 'Erro ao atualizar o perfil!');
            });
    }

    static disabled(state) {
        return !state.nome || !state.cpf || !state.dtNascimento;
    }

}