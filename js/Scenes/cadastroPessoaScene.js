import React, {Component} from "react";
import {ToastAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroPessoaComponent from "../Component/Telas/CadastroPessoaComponent";
import StaticStorageService from "../Services/staticStorageService";

export default class CadastroPessoaScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            dtNascimento: ''
        }
    }

    render() {
        return (
            <CadastroPessoaComponent
                salvar={this.salvar}
                states={this.state}
                disabled={this.disabled}
                fetchData={this.fetchData}
            />
        );
    }

    fetchData() {
        const userId = StaticStorageService.usuarioSessao._id;
        UsuarioService.get(userId)
            .then((response) => {
                console.log(response);
                this.setState({nome: response.data.nome});
                this.setState({cpf: response.data.cpf});
                this.setState({dtNascimento: response.data.dtNascimento});
            });
    }

    salvar(state) {
        const userId = StaticStorageService.usuarioSessao._id;
        let form = {
            nome: state.nome,
            cpf: state.cpf,
            dtNascimento: state.dtNascimento
        };

        UsuarioService.salvarInformacoesPessoais(userId, form)
            .then((responseJson) => {
                ToastAndroid.showWithGravity('Informações de usuário atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            });
    }

    disabled(state) {
        return !state.nome || !state.cpf || !state.dtNascimento;
    }

}