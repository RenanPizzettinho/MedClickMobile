import React, {Component} from "react";
import {Body, Card, Container, Content, List, ListItem, Spinner, Text, Thumbnail} from "native-base";
import StaticStorageService from "../Services/staticStorageService";

export default class SolicitacaoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.setState({solicitacao: StaticStorageService.solicitacao});
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Thumbnail square source={require("./../Images/UserLogo.png")}/>
                        <Body>
                        <Text>{`Médico: ${this.state.solicitacao.nomeMedico}`}</Text>
                        <Text note>{`Data: ${this.state.solicitacao.dataConsulta}`}</Text>
                        <Text note>{`Situação: ${this.state.solicitacao.situacao}`}</Text>
                        </Body>
                    </Card>
                </Content>
            </Container >
        );
    }
}