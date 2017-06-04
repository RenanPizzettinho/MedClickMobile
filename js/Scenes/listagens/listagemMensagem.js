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
    Spinner,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";

import {Button as ButtonReact} from "react-native";

export default class listagemMensagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {mensagens: []},
            loading: true
        }
    }

    componentWillMount() {
        this.setState({
            results: {
                mensagens: [
                    {
                        nome: "Rafael Marangoni Waterkemper",
                        descricao: "Olá estou testando o limite dos campos para ver se estoura todo o layout do native basepashfpoasfhpadofhadopfhadsofhpo",
                        img: require("./../../Images/chapolim.jpg")
                    },
                    {nome: "Renan Pizzeti", descricao: "Vamos codar", img: require("../../Images/cachorro.jpg")},
                    {nome: "Uiliam Vogel", descricao: "Bora lá rapazes!", img: require("../../Images/moto.jpg")}
                ]
            },
            loading: false
        });

    }

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
                        <Title>Mensagens</Title>
                        </Body>
                    </Header>
                    <Content>
                        {this.state.loading ? <Spinner /> : <List primaryText="teste">
                            {this.state.results.mensagens.map(function (messagges) {
                                return (
                                    <ListItem key={messagges.nome}>
                                        <Thumbnail square size={80} source={messagges.img}/>
                                        <Body>
                                        <Text>{messagges.nome}</Text>
                                        <Text note>{messagges.descricao.substr(0, 30) + "..."}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignSelf: 'flex-end'
                                        }}>
                                            <View style={{
                                                marginRight: 10
                                            }}>
                                                <ButtonReact
                                                    text=""
                                                    title="Ler"
                                                    disabled={false}
                                                    onPress={() => {

                                                    }}
                                                />
                                            </View>
                                            <View style={{
                                                justifyContent: 'space-around'
                                            }}>
                                                <ButtonReact
                                                    text=""
                                                    title="Deletar"
                                                    color="crimson"
                                                    disabled={false}
                                                    onPress={() => {

                                                    }}
                                                />
                                            </View>
                                        </View>
                                        </Body>
                                    </ListItem>);
                            })}
                        </List>}
                    </Content>
                </Content>
            </Container>
        );
    }
}