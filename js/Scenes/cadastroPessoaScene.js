import React, {Component} from "react";

import {Alert, AsyncStorage} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroPessoaComponent from "../Component/CadastroPessoaComponent";

export default class CadastroPessoaScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            dataNascimento: ''
        }
    }

    render() {
        return (<CadastroPessoaComponent
            salvar={this.salvar}
            states={this.state}
            disabled={CadastroPessoaScene.disabled}
        />);
    }

    async componentWillMount() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                let dados = response.data;
                this.setState({
                    nome: dados.nome,
                    cpf: dodos.cpf,
                    dataNascimento: dados.dataNascimento
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
            nome: state.nome,
            cpf: state.cpf,
            dataNascimento: state.dataNascimento
        };

        Alert.alert('Sucesso', 'OK');

        // UsuarioService.salvarInformacoesPessoais(userId, form)
        //     .then((responseJson) => {
        //         Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        //     })
        //     .catch((error) => {
        //         Alert.alert('Erro', 'Erro ao atualizar o perfil!');
        //     });
    }

    static disabled(state) {
        return !state.nome || !state.cpf || !state.dataNascimento;
    }
}