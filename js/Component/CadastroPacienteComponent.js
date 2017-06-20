import React, {Component} from "react";
import {Button, Card, CheckBox, Container, Content, Form, ListItem, Text} from "native-base";
import CheckBoxBase from "./CheckBoxBase";
import BotaoBase from "./BotaoBase";

export default class CadastroPacienteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.states;
        this.salvar = this.props.salvar;
        this.fetchData = this.props.fetchData;
    }

    componentWillMount() {
        this.fetchData().done();
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CheckBoxBase
                                label="Possui diabetes?"
                                checked={this.state.possuiDiabete}
                                onPress={() => {
                                    this.setState({possuiDiabete: !this.state.possuiDiabete});
                                }}
                            />
                            <CheckBoxBase
                                label="Possui pressão alta?"
                                checked={this.state.possuiPressaoAlta}
                                onPress={() => {
                                    this.setState({possuiPressaoAlta: !this.state.possuiPressaoAlta});
                                }}
                            />
                        </Form>
                    </Card>
                    <BotaoBase
                        title="Salvar"
                        onPress={() => {
                            this.salvar(this.state);
                        }}
                    />
                </Content>
            </Container>
        );
    }
}