import React, {Component} from "react";

import {Card, Container, Content, Form} from "native-base";
import CampoTexto from "./CampoTexto";
import BotaoBase from "./BotaoBase";
import CampoData from "./CampoData";

export default class CadastroPessoaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = props.states;
        this.salvar = props.salvar;
        this.disabled = props.disabled;
        this.state.isDateTimePickerVisible = false;
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CampoTexto
                                label="Nome completo"
                                onChange={(nome) => {
                                    this.setState({nome});
                                }}
                            />
                            <CampoTexto
                                label="CPF"
                                onChange={(cpf) => {
                                    this.setState({cpf});
                                }}
                            />
                            <CampoData
                                label="Data de nascimento"
                                data={this.state.dtNascimento}
                                setData={(data) => this.setState({dtNascimento: data})}
                            />
                        </Form>
                    </Card>
                    <BotaoBase
                        title="Salvar"
                        disabled={this.disabled(this.state)}
                        onPress={() => this.salvar(this.state)}
                    />
                </Content>
            </Container>
        );
    }

}