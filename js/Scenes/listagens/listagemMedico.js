import React, {Component} from "react";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Text,
    Thumbnail,
    Title
} from "native-base";

export default class listagemMedico extends Component {

    constructor(props) {
        super(props);
        this.state = {medicos: []};
    }

    componentWillMount() {
        this.setState({
            medicos: [
                {nome: "Rafael Marangoni Waterkemper", descricao: "Olá", img: require("./../../Images/chapolim.jpg")},
                {nome: "Renan Pizzeti", descricao: "Vamos codar", img: require("../../Images/cachorro.jpg")},
                {nome: "Uiliam Vogel", descricao: "Bora lá rapazes!", img: require("../../Images/moto.jpg")}
            ]
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Médicos</Title>
                        </Body>
                    </Header>
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