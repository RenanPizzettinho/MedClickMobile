import React, {Component} from "react";

import {Card, Container, Content, Form, Input, Item, Label} from "native-base";
import {Button} from "react-native";
import UsuarioService from "../Services/usuarioService";
import {Alert} from "react-native";

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
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <Item inlineLabel>
                                <Label>Nome completo:</Label>
                                <Input
                                    onChangeText={(nome) => {
                                        this.setState({dataNascimento});
                                    }}
                                />
                            </Item>
                            <Item inlineLabel>
                                <Label>CPF:</Label>
                                <Input
                                    onChangeText={(cpf) => {
                                        this.setState({dataNascimento});
                                    }}
                                />
                            </Item>
                            <Item inlineLabel>
                                <Label>Data de nascimento:</Label>
                                <Input
                                    onChangeText={(dataNascimento) => {
                                        this.setState({dataNascimento});
                                    }}
                                />
                            </Item>
                        </Form>
                    </Card>
                    <Button
                        text="Salvar"
                        title="Salvar"
                        onPress={() => {
                            this.salvar()
                        }}/>
                </Content>
            </Container>

        );
    }

    salvar() {
        const {navigate} = this.props.navigation;

        let form = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            dataNascimento: this.state.dataNascimento
        };

        UsuarioService.salvarInformacoesPessoais(form)
            .then((responseJson)=>{
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');

            })
            .catch((error)=>{
                Alert.alert('Erro', 'Erro ao atualizar o perfil!');
            });
    }
}