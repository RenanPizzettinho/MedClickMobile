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
import {Alert, Modal, ScrollView} from "react-native";
import MensagemService from "../../Services/mensagemService";
import CampoTexto from "../../Component/CampoTexto";

export default class listagemMensagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {
                mensagens: []
            },
            resultsMensagens: {
                mensagens: []
            },
            loading: true,
            selectedItem: undefined,
            modalVisible: false,
            resposta: "",
            remetente: "Mensagem"
        }
    }

    setModalVisible(visible, x) {
        //passar id usuario no primeiro parametro
        this.fetchDataAtendimento('5950010437b76e26c0fd5af3', x.idAtendimento);
        this.setState({
            modalVisible: visible,
            selectedItem: x,
            remetente: x.de
        });
    }

    async fetchData() {
        //const userId = await AsyncStorage.getItem('userId');
        //Pegando as mensagens PARA o médico
        MensagemService.getMensagens('59500200c16f0b2260b2b682')
            .then((response) => {
                this.setState({
                    results: {
                        mensagens: response.data
                    }
                });
                Alert.alert("resp", JSON.stringify(response.data));
            })
            .catch(
                (error) => {
                    Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async fetchDataAtendimento(user, idAtendimento) {
        //const userId = await AsyncStorage.getItem('userId');
        //Pegando as mensagens PARA o médico
        MensagemService.getMensagensAtendimento(user, idAtendimento)
            .then((response) => {
                // this.setState({
                //     results: {
                //         mensagensAtendimento: response.data
                //     }
                // });
                this.setState({
                    resultsMensagens: {
                        mensagens: response.data
                    }
                });

                Alert.alert("Alerta", JSON.stringify(response.data));
            })
            .catch(
                (error) => {
                    Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async respostaMensagem() {
        let chat = this.state.selectedItem;
        let messagge = {
            "de": chat.para,
            "para": chat.de,
            "idAtendimento": chat.idAtendimento,
            "mensagem": this.state.resposta
        };
        MensagemService.respostaMessagge(messagge);
        this.setState({"resposta": ""});
    }

    //Após avaliação do protótipo adicionar o atributo mensagem nos objetos de retorno.
    componentWillMount() {
        this.fetchData().done();
        this.setState({loading: false});
    }

    render() {
        return (
            <Container>
                <Content>
                    <Content>
                        {this.state.loading ? <Spinner /> :
                            <List primaryText="teste" dataArray={this.state.results.mensagens} renderRow={(message) =>
                                <ListItem key={message.dataEnvio} button
                                          onPress={() => this.setModalVisible(true, message)}>
                                    <Thumbnail square size={80} source={require("./../../Images/UserLogo.png")}/>
                                    <Body>
                                    <Text>NOME REMETENTE</Text>
                                    <Text note>{message.mensagem.substr(0, 30) + "..."}</Text>
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
                        ><Header rounded style={{paddingTop: 0, backgroundColor: 'white'}}>
                            <Left>
                                <Button transparent onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible, this.state.selectedItem);
                                }}>
                                    <Icon style={{color: 'black'}} name='arrow-back'/>
                                </Button>
                            </Left>
                            <Body>
                            <Title style={{color: 'black'}}>{this.state.remetente}</Title>
                            </Body>
                        </Header>
                            <Card>
                                {!this.state.selectedItem ? <View />
                                    : <Container>
                                        <List primaryText="teste" dataArray={this.state.resultsMensagens.mensagens}
                                              renderRow={(message) =>
                                                  <ScrollView>
                                                      <CardItem>
                                                          <Body>
                                                          <Text>
                                                              {message.de}
                                                          </Text>
                                                          <Text>
                                                              {message.mensagem}
                                                          </Text>
                                                          <Text note>
                                                              Data de envio: {message.dataEnvio}
                                                          </Text>
                                                          </Body>
                                                      </CardItem>
                                                  </ScrollView>
                                              }/>
                                    </Container>}
                                <CardItem>
                                    <Item>
                                        <CampoTexto
                                            label="Awnser"
                                            // value={this.state.resposta}
                                            onChange={(resposta) => {
                                                this.setState({resposta});
                                            }}
                                        />
                                        <Button title={"Enviar"}
                                                onPress={() => this.respostaMensagem()}>
                                        </Button>
                                    </Item>
                                </CardItem>
                            </Card>
                        </Modal>
                    </Content>
                </Content>
            </Container>
        );
    }
}