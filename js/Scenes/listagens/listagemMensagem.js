import React, {Component} from "react";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Spinner,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";
import {Modal, ScrollView} from "react-native";
import styles from "../../StyleSheet/mainStyle";

export default class listagemMensagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {mensagens: []},
            loading: true,
            selectedItem: undefined,
            modalVisible: false
        }
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    //Após avaliação do protótipo adicionar o atributo mensagem nos objetos de retorno.
    componentWillMount() {
        this.setState({
            results: {
                mensagens: [
                    {
                        nome: "Dr. Rafael",
                        descricao: "Olá estou testando o limite dos campos para ver se estoura todo o layout do native basepashfpoasfhpadofhadopfhadsofhpo",
                        img: require("./../../Images/chapolim.jpg")
                    },
                    {nome: "Paciente Amilton", descricao: "Vamos codar", img: require("../../Images/cachorro.jpg")},
                    {nome: "Dr. Uiliam", descricao: "Bora lá rapazes!", img: require("../../Images/moto.jpg")}
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
                            <Button transparent={}>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body style={{alignSelf: 'center'}}>
                        <Title>Mensagens</Title>
                        </Body>
                    </Header>
                    <Content>
                        {this.state.loading ? <Spinner /> :
                            <List primaryText="teste" dataArray={this.state.results.mensagens} renderRow={(messagges) =>
                                <ListItem key={messagges.nome} button
                                          onPress={() => this.setModalVisible(true, messagges)}>
                                    <Thumbnail square size={80} source={messagges.img}/>
                                    <Body>
                                    <Text>{messagges.nome}</Text>
                                    <Text note>{messagges.descricao.substr(0, 30) + "..."}</Text>
                                    </Body>
                                </ListItem>
                            }/>}
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                alert("Modal has been closed.")
                            }}
                        ><Header>
                            <Left>
                                <Button transparent onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                }}>
                                    <Icon name='arrow-back'/>
                                </Button>
                            </Left>
                            <Body style={{alignSelf: "center"}}>
                            <Title>{!this.state.selectedItem ? <View/> :
                                this.state.selectedItem.nome}</Title>
                            </Body>
                        </Header>
                            <Card>
                                {!this.state.selectedItem ? <View />
                                    : <Container>
                                        <ScrollView>
                                            <CardItem>
                                                <Body>
                                                <Text>
                                                    Conforme agendado você deve retornar na data 01/08/2017.
                                                    Obs.:
                                                </Text>
                                                <Text note>
                                                    Continuar tomando seu remédio.
                                                </Text>
                                                </Body>
                                            </CardItem>

                                            <CardItem>
                                                <Body>
                                                <Text>
                                                    Fico muito feliz em ver que a recuperação do senhor está ocorrendo
                                                    da melhor forma possível.
                                                </Text>
                                                <Text note>
                                                    Lembre-se, o uso correto de seus medicamentos implica diretamente na
                                                    sua melhora.
                                                </Text>
                                                </Body>
                                            </CardItem>

                                            <CardItem>
                                                <Item>
                                                    <Icon name="ios-search"/>
                                                    <Input placeholder="Awnser"
                                                           object={styles.imput}
                                                        /* onChangeText={(text) => this.setState({awnser: text})}*//>
                                                    <Button transparent>
                                                        <Text>Send</Text>
                                                    </Button>
                                                </Item>
                                            </CardItem>
                                        </ScrollView>
                                    </Container>}
                            </Card>
                        </Modal>
                    </Content>
                </Content>
            </Container>
        );
    }
}