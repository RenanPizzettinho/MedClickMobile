import React, {Component} from "react";
import {Card, Container, Content, Form, Text} from "native-base";
import CheckBoxBase from "../Campos/CheckBoxBase";
import BotaoBase from "../Campos/BotaoBase";
import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";

export default class CadastroPacienteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.states;
        this.salvar = this.props.salvar;
        this.fetchData = this.props.fetchData;
    }

    componentWillMount() {
        this.fetchData();
    }

    getLocation(){

    }

    render() {
        const {navigate} = this.props.navigation;
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
                            <TouchableItem onPress={this.getLocation}>
                                <Text>
                                    Localização
                                    Latitude:{this.state.latitude}
                                    Longitude:{this.state.longitude}
                                </Text>
                            </TouchableItem>
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