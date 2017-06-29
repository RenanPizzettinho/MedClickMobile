import React, {Component} from "react";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    H2,
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
import {Alert, Modal, ScrollView} from "react-native";
import MensagemService from "../../Services/mensagemService";
import SolicitacaoService from "../../Services/solicitacaoService";

export default class listagemMensagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {solicitacoes: []},
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
        this.fetchDataAtendimento('5950010437b76e26c0fd5af3', x._id).done();
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    async fetchData() {
        // const idPerfil = await AsyncStorage.getItem('idPerfil');
        SolicitacaoService.getAtendimentos('59500200c16f0b2260b2b682')
            .then((response) => {
                this.setState({
                    results: {
                        solicitacoes: response.data
                    }
                });
                // Alert.alert("Mensagem", JSON.stringify(response.data));
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

    async respostaMensagem(solicitacao) {
        // const idPerfil = await AsyncStorage.getItem('idPerfil');
        let para = '';
        if (solicitacao.idMedico === "5950010437b76e26c0fd5af3") {
            para = solicitacao.idPaciente;
        } else {
            para = solicitacao.idMedico;
        }

        let messagge = {
            "de": "5950010437b76e26c0fd5af3",
            "para": para,
            "idAtendimento": solicitacao._id,
            "mensagem": this.state.resposta
        };
        MensagemService.respostaMessagge(messagge)
            .then(() => {
                Alert.alert("Mensagem", "Sua mensagem foi enviada.")
            });
        this.setState({"resposta": ""});
    }

    // async getRemetente(selecionado) {
    //     // const idPerfil = await AsyncStorage.getItem('idPerfil');
    //     let remetente = '';
    //
    //     if (selecionado.idMedico === '59500200c16f0b2260b2b682') {
    //         remetente = selecionado.nomePaciente;
    //     }else {
    //         remetente = selecionado.nomeMedico;
    //     }
    //     return remetente;
    // }

//Após avaliação do protótipo adicionar o atributo mensagem nos objetos de retorno.
    componentWillMount() {
        this.fetchData().done();
        this.setState({loading: false});
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.loading ? <Spinner /> :
                        <List primaryText="" dataArray={this.state.results.solicitacoes} renderRow={(solicitacao) =>
                            <Card>
                                <ListItem key={solicitacao._id} button
                                          onPress={() => this.setModalVisible(true, solicitacao)}>

                                    <Thumbnail square size={80} source={require("./../../Images/UserLogo.png")}/>
                                    <Body>
                                    <H2>{solicitacao.nomeMedico}</H2>
                                    <Text note>{solicitacao.dataConsulta}</Text>
                                    </Body>
                                </ListItem>
                            </Card>
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
                                                      {message.idMedico === '59500200c16f0b2260b2b682' ?
                                                          <Text>{this.state.selectedItem.nomeMedico}</Text> :
                                                          <Text>{this.state.selectedItem.nomePaciente}</Text>}
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
                                    <Icon name="ios-search"/>
                                    <Input placeholder="Search"
                                           onChangeText={(resposta) => this.setState({resposta})}/>
                                    <Button transparent onPress={() => this.respostaMensagem(this.state.selectedItem)}>
                                        <Text>Enviar</Text>
                                    </Button>
                                </Item>
                            </CardItem>
                        </Card>
                    </Modal>
                </Content>
            </Container>
        );
    }
}