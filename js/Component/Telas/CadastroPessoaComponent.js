import React, {Component} from "react";

import {Card, Container, Content, Form} from "native-base";
import CampoTexto from "../Campos/CampoTexto";
import BotaoBase from "../Campos/BotaoBase";
import CampoData from "../Campos/CampoData";

export default class CadastroPessoaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = props.states;
        this.salvar = props.salvar;
        this.disabled = props.disabled;
        this.state.isDateTimePickerVisible = false;
        this.fetchData= this.props.fetchData;
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CampoTexto
                                label="Nome completo"
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