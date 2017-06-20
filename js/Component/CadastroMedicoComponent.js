import React, {Component} from "react";
import {Card, Container, Content, Form, Item, Text} from "native-base";
import CampoTexto from "./CampoTexto";
import CheckBoxBase from "./CheckBoxBase";
import SelectBase from "./SelectBase";
import BotaoBase from "./BotaoBase";

export default class CadastroMedicoComponent extends Component {
    constructor(props) {
        super(props);
        this.salvar = this.props.salvar;
        this.state = this.props.states;
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
                            <Item>
                                <Text >Perfil de médico</Text>
                            </Item>
                            <CampoTexto
                                label="CRM"
                                value={this.state.crm}
                                onChange={(crm) => {
                                    this.setState({crm});
                                }}
                            />
                            <SelectBase
                                label="Especialidade"
                                selectedValue={this.state.especialidade}
                                onValueChange={(especialidade) => this.setState({especialidade})}
                                itens={[{label:"Cardiologista",value:"CARDIOLOGISTA"},{label:"Teste",value:"TESTE"}]}
                            />
                            <SelectBase
                                selectedValue={this.state.atendeEm}
                                onValueChange={(atendeEm) => this.setState({atendeEm})}
                                itens={[{label:"Criciuma",value:"CRICIUMA"},{label:"Içara",value:"ICARA"},{label:"Nova Veneza",value:"NOVA_VENEZA"}]}
                            />
                            <CheckBoxBase
                                label="Atende na segunda-feira?"
                                checked={this.state.segunda}
                                onPress={() => {
                                    this.setState({segunda: !this.state.segunda});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na terça-feira?"
                                checked={this.state.terca}
                                onPress={() => {
                                    this.setState({terca: !this.state.terca});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na quarta-feira?"
                                checked={this.state.quarta}
                                onPress={() => {
                                    this.setState({quarta: !this.state.quarta});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na quinta-feira?"
                                checked={this.state.quinta}
                                onPress={() => {
                                    this.setState({quinta: !this.state.quinta});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na sexta-feira?"
                                checked={this.state.sexta}
                                onPress={() => {
                                    this.setState({sexta: !this.state.sexta});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende no sabado?"
                                checked={this.state.sabado}
                                onPress={() => {
                                    this.setState({sabado: !this.state.sabado});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende no domingo?"
                                checked={this.state.domingo}
                                onPress={() => {
                                    this.setState({domingo: !this.state.domingo});
                                }}
                            />

                        </Form>
                    </Card>
                    <BotaoBase
                        title="Salvar"
                        onPress={() => {
                            this.salvar(this.state);
                        }}/>
                </Content>
            </Container>
        );
    }
}