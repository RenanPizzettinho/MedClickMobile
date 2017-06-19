import React, {Component} from "react";
import {Card} from "react-native-material-design";
import CampoTexto from "./CampoTexto";
import CampoSenha from "./CampoSenha";
import BotaoBase from "./BotaoBase";
import {Container, Content, Form, Item} from "native-base";


export default class CadastroUsuarioComponent extends Component {
    constructor(props) {
        super(props);
        this.state = props.states;
        this.salvar = props.salvar;
        this.disabled = props.disabled;
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <Item inlineLabel>
                                <CampoTexto
                                    label="Email"
                                    onChange={(email) => {
                                        this.setState({email});
                                    }}
                                />
                            </Item>
                            <Item inlineLabel>
                                <CampoTexto
                                    label="Nome"
                                    onChange={(nome) => {
                                        this.setState({nome});
                                    }}
                                />
                            </Item>
                            <Item inlineLabel>
                                <CampoSenha
                                    label="Senha"
                                    onChange={(senha) => {
                                        this.setState({senha});
                                    }}
                                />
                            </Item>
                            <Item inlineLabel>
                                <CampoSenha
                                    label="Verificar senha"
                                    onChange={(verificarSenha) => {
                                        this.setState({verificarSenha});
                                    }}
                                />
                            </Item>
                        </Form>
                    </Card>
                    <BotaoBase
                        title="Cadastrar"
                        disabled={this.disabled(this.state)}
                        onPress={() => this.salvar(this.state)}
                    />
                </Content>
            </Container>
        );
    }
}