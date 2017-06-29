import React, {Component} from "react";
import {
    Body,
    Button,
    Card,
    Container,
    Content,
    H2,
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
import {Alert, AsyncStorage, Image, Modal} from "react-native";
import BotaoBase from "../../Component/BotaoBase";
import SolicitacaoService from "../../Services/solicitacaoService";
import styles from "../../StyleSheet/mainStyle";
import MensagemService from "../../Services/mensagemService";

export default class listagemSolicitacaoMedico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {solicitacoes: []},
            loading: true,
            selectedItem: undefined,
            modalVisible: false,
            primeiraMensagem: ""
        }
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    async fetchData() {
        const idPerfil = await AsyncStorage.getItem('idPerfil');
        SolicitacaoService.getAtendimentos(idPerfil)
            .then((response) => {
                this.setState({
                    results: {
                        solicitacoes: response.data
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

    static async confirmarAtendimento(solicitacao) {
        let confirmacao = {
            "situacao": "CONFIRMADO"
        };

        SolicitacaoService.confirmarSolicitacao(solicitacao._id, confirmacao)
            .then(() => {
                Alert.alert('Mensagem', "Atendimento confirmado com sucesso.");
            }).catch(() => {
                Alert.alert('Erro', "Incapaz de cancelar a solicitação.");
            }
        );
        Alert.alert("teste", "Confirmação realizada.");
    }

    async enviarMensagem(solicitacao) {
        const idPerfil = await AsyncStorage.getItem('idPerfil');
        let para = '';
        if (solicitacao.idMedico === idPerfil) {
            para = solicitacao.idPaciente;
        } else {
            para = solicitacao.idMedico;
        }

        let messagge = {
            "de": idPerfil,
            "para": para,
            "idAtendimento": solicitacao._id,
            "mensagem": this.state.primeiraMensagem
        };
        MensagemService.respostaMessagge(messagge);
        this.setState({"resposta": ""});
    }

    componentDidMount() {
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
                                    <H2 style={{marginLeft: 10}}>Paciente</H2>
                                    <Text>{solicitacao.nomePaciente}</Text>
                                    <Text note>{solicitacao.dataConsulta}</Text>
                                    <Text note>{solicitacao.descricaoNecessidade}</Text>
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
                    ><Header rounded style={{paddingTop: 0}}>
                        <Left>
                            <Button transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                            }}>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Solicitação</Title>
                        </Body>
                    </Header>
                        <Card>
                            {!this.state.selectedItem ? <View /> :
                                <Container>
                                    <Image
                                        source={require('../../Images/UserLogo.png')}
                                        style={styles.img}
                                    />
                                    <Body>
                                    <H2 style={{marginLeft: 10}}>Paciente</H2>
                                    <Text>{this.state.selectedItem.nomePaciente}</Text>
                                    <H2 style={{marginLeft: 10}}>Data Consulta</H2>
                                    <H2 style={{marginLeft: 10}}>{this.state.selectedItem.dataConsulta}</H2>
                                    <H2 style={{marginLeft: 10}}>Sintomas</H2>
                                    <Text note>{this.state.selectedItem.descricaoNecessidade}</Text>
                                    <H2 style={{marginLeft: 10}}>Situação</H2>
                                    <H2 style={{marginLeft: 10}}>{this.state.selectedItem.situacao}</H2>
                                    {this.state.selectedItem.situacao === "CANCELADO" ||
                                    this.state.selectedItem.situacao === "CONFIRMADO" ? <View/> :
                                        <BotaoBase
                                            title="Confirmar"
                                            disabled={false}
                                            onPress={() => listagemSolicitacaoMedico.confirmarAtendimento(this.state.selectedItem).done()}
                                        />}
                                    {this.state.selectedItem.situacao === "CONFIRMADO" ?
                                        <BotaoBase
                                            title="Mensagem"
                                            //onPress={navigate()}
                                        /> :
                                        <View/>}
                                    {this.state.selectedItem.situacao === "CONFIRMADO" ?
                                        <CampoTexto
                                            label="Mensagem.:"
                                            onChange={(primeiraMensagem) =>
                                                this.setState({primeiraMensagem})
                                            }
                                        /> :
                                        <View/>}
                                    {this.state.selectedItem.situacao === "CONFIRMADO" ?
                                        <BotaoBase
                                            title="Enviar"
                                            onPress={() => this.enviarMensagem(this.state.selectedItem)}
                                        /> :
                                        <View/>}
                                    </Body>
                                </Container>}
                        </Card>
                    </Modal>
                </Content>
            </Container >
        )
    }
}