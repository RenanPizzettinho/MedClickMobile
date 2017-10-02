import React, {Component,} from "react";
import {Card, Container, Content, Form} from "native-base";
import CampoTexto from "../Campos/CampoTexto";
import BotaoBase from "../Campos/BotaoBase";


export default class RecuperarSenhaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.states;
        this.enviar = this.props.enviar;
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CampoTexto
                                label="Email"
                                onChange={(email) => {
                                    this.setState({email});
                                }}
                            />
                        </Form>
                    </Card>
                    <BotaoBase
                        title="Enviar link para nova senha"
                        onPress={() => this.enviar(this.state)}
                    />
                </Content>
            </Container>
        );
    }
}