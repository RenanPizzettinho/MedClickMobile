import React, {Component} from "react";
import {ToastAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import StaticStorageService from "../Services/staticStorageService";
import {Card, Container, Content, Form} from "native-base";
import CampoTexto from "../Component/Campos/CampoTexto";
import BotaoBase from "../Component/Campos/BotaoBase";
import CheckBoxBase from "../Component/Campos/CheckBoxBase";
import {DatePicker} from "react-native-datepicker";

export default class CadastroPessoaScene extends Component {

    static navigationOptions = {
        title: 'Informações pessoais',
    };

    constructor(props) {
        super(props);
        this.state = {
            nome: null,
            cpf: null,
            dtNascimento: new Date(),
            email: null,
            senha: '',
            confirmarSenha: '',
            alterarSenha: false,
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const userId = StaticStorageService.usuarioSessao._id;
        UsuarioService.get(userId)
            .then((response) => {
                console.log('RESPONSE: ', response);
                this.setState({
                    idMedico: response.data.idMedico,
                    nome: response.data.nome,
                    cpf: response.data.cpf,
                    dtNascimento: response.data.dtNascimento,
                    email: response.data.email
                });
            });
    }

    salvar() {
        let verificarSenha = true;
        if (this.state.alterarSenha) {
            verificarSenha = this.verificarSenha();
        }

        if (verificarSenha) {
            const userId = StaticStorageService.usuarioSessao._id;
            let form = {
                nome: this.state.nome,
                cpf: this.state.cpf,
                dtNascimento: this.state.dtNascimento,
                email: this.state.email
            };

            UsuarioService.salvarInformacoesPessoais(userId, form)
                .then(() => {
                    ToastAndroid.showWithGravity('Informações de usuário atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                });
        }
    }

    verificarSenha() {
        if (this.state.senha !== this.state.verificarSenha) {
            ToastAndroid.showWithGravity('Informações de usuário atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            return false;
        }

        if (this.state.senha.length < 6) {
            ToastAndroid.showWithGravity('Informações de usuário atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            return false;
        }
        return true;
    }

    disabled() {
        return !this.state.nome;
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CampoTexto
                                label="Nome completo"
                                disabled={this.state.idMedico}
                                value={this.state.nome}
                                onChange={(nome) => {
                                    this.setState({nome});
                                }}
                            />
                            <CampoTexto
                                label="CPF"
                                value={this.state.cpf}
                                onChange={(cpf) => {
                                    this.setState({cpf});
                                }}
                            />
                            <CampoTexto
                                label="Email"
                                value={this.state.email}
                                onChange={(email) => {
                                    this.setState({email});
                                }}
                            />
                            <CheckBoxBase
                                label="Alterar senha?"
                                checked={this.state.alterarSenha}
                                onPress={() => {
                                    this.setState({alterarSenha: !this.state.alterarSenha});
                                }}
                            />
                            {(this.state.alterarSenha) ? this.alterarSenha() : null}
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </Form>
                    </Card>
                    <BotaoBase
                        title="Salvar"
                        disabled={this.disabled()}
                        onPress={() => this.salvar()}
                    />
                </Content>
            </Container>
        );
    }

    alterarSenha() {
        return (
            <Form>
                <CampoTexto
                    label="Senha"
                    value={this.state.senha}
                    onChange={(senha) => {
                        this.setState({senha});
                    }}
                />
                <CampoTexto
                    label="Confirmar senha"
                    value={this.state.confirmarSenha}
                    onChange={(confirmarSenha) => {
                        this.setState({confirmarSenha});
                    }}
                />
            </Form>
        );
    }
}