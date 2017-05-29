import React, {Component} from 'react';
import {Container, Content, List, ListItem, Thumbnail, Text, Body} from 'native-base';

export default class listagemMedico extends Component {

    constructor(props) {
        super(props);
        this.state = {medicos: []};
    }

    componentWillMount() {
        this.setState({
            medicos: [
                {nome: "Rafael Marangoni Waterkemper", descricao: "Olá", img: require("../Images/chapolim.jpg")},
                {nome: "Renan Pizzeti", descricao: "Vamos codar", img: require("../Images/cachorro.jpg")},
                {nome: "Uiliam Vogel", descricao: "Bora lá!", img: require("../Images/moto.jpg")}
            ]
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {
                            this.state.medicos.map(function (med) {
                                return (
                                    <ListItem key={med.nome}>
                                        <Thumbnail square size={80} source={med.img}/>
                                        <Body>
                                        <Text>{med.nome}</Text>
                                        <Text note>{med.descricao}</Text>
                                        </Body>
                                    </ListItem>);
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}