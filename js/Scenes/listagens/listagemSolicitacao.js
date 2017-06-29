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
import CampoTexto from "../../Component/CampoTexto";
import SolicitacaoService from "../../Services/solicitacaoService";
import {Alert, AsyncStorage, Image, Modal} from "react-native";
import BotaoBase from "../../Component/BotaoBase";
import styles from "../../StyleSheet/mainStyle";
import MensagemService from "../../Services/mensagemService";

//Renomear para listagemSolicitacaoPendente
//Ou
//Criar segments ou o picker para usar da mesma tela
//porém trazendo os pendentes, confirmados e encerrados
export default class ListagemSolicitacao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {solicitacoes: []},
            motivoCancelamento: "",
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

    async cancelarAtendimento(solicitacao) {
        let cancelamento = {
            "situacao": "CANCELADO",
            "motivoCancelamento": this.state.motivoCancelamento
        };

        SolicitacaoService.cancelarSolicitacao(solicitacao._id, cancelamento);
        Alert.alert("teste", "Cancelamento efetuado com sucesso.");
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

    // async verificarExisteMensagem(idAtendimento) {
    //     //passa o idAtendimento por param
    //     MensagemService.getMensagensAtendimento('59500200c16f0b2260b2b682', idAtendimento)
    //         .then((response) => {
    //             Alert.alert("Resp", "teste " + !response.data);
    //             return !response.data;
    //         });
    // }

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
                                    <H2 style={{marginLeft: 10}}>Médico</H2>
                                    <Text>{solicitacao.nomeMedico}</Text>
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
                    ><Header rounded style={{paddingTop: 0, backgroundColor: 'white'}}>
                        <Left>
                            <Button transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible, this.state.selectedItem);
                            }}>
                                <Icon style={{color: 'black'}} name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title style={{color: 'black'}}>Solicitação</Title>
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
                                    <H2 style={{marginLeft: 10}}>Médico</H2>
                                    <Text>NOME DO MÉDICO</Text>
                                    <Text note>{this.state.selectedItem.descricaoNecessidade}</Text>
                                    <H2 style={{marginLeft: 10}}>Data Consulta</H2>
                                    <Text style={{marginLeft: 10}}>{this.state.selectedItem.dataConsulta}</Text>
                                    <H2 style={{marginLeft: 10}}>Situação</H2>
                                    {this.state.selectedItem.situacao === "CANCELADO" ||
                                    this.state.selectedItem.situacao === "CONFIRMADO" ? <View/> :
                                        <CampoTexto
                                            label="Motivo Canc.:"
                                            onChange={(motivoCancelamento) =>
                                                this.setState({motivoCancelamento})
                                            }
                                        />}
                                    <Text style={{marginLeft: 10}}>{this.state.selectedItem.situacao}</Text>
                                    {this.state.selectedItem.situacao === "CANCELADO" ||
                                    this.state.selectedItem.situacao === "CONFIRMADO" ? <View/> :
                                        <BotaoBase
                                            title="Cancelar"
                                            disabled={ListagemSolicitacao.disabled(this.state)}
                                            onPress={() => this.cancelarAtendimento(this.state.selectedItem)}
                                        />}
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

    static disabled(state) {
        return !state.motivoCancelamento;
    }
}