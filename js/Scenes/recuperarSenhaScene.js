import React, {Component} from "react";
import {Button, Card, CardItem, Container, Content, Form, Input, Item, Label, Text} from "native-base";
import UsuarioService from "../Services/usuarioService";

export default class RecuperarSenhaScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    enviarLink() {
        const {navigate} = this.props.navigation;
        UsuarioService.recuperarSenha(this.state.email)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    navigate('Main');
                } else {
                    console.log(responseJson.data);
                }
            });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <Item floatingLabel label="Email">
                                <Label>
                                    Email
                                </Label>
                                <Input />
                            </Item>
                        </Form>
                        <CardItem>
                            <Item label="Enviar">
                                <Button block onPress={() => this.enviarLink()} text="Enviar link para nova senha"
                                        title="teste">
                                    <Text>Enviar link para nova senha</Text>
                                </Button>
                            </Item>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}