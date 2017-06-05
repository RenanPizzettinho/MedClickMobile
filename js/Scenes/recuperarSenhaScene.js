import React, {Component} from "react";
import {Card, Container, Content, Form, Input, Item, Label} from "native-base";
import UsuarioService from "../Services/usuarioService";
import {Button} from "react-native";

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
                            <Item fixedLabel>
                                <Label>Email</Label>
                                <Input />
                            </Item>
                        </Form>
                    </Card>
                    <Button onPress={() => this.enviarLink()} text="Enviar link para nova senha"
                            title="Enviar link para nova senha">
                    </Button>
                </Content>
            </Container>
        );
    }
}