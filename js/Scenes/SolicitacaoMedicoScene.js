import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, H3, ListItem, Text, View} from "native-base";
import StaticStorageService from "../Services/staticStorageService";
import BotaoBase from "../Component/Campos/BotaoBase";
import Divider from "react-native-material-design/lib/Divider";
import {Linking, ToastAndroid} from "react-native";
import StatusSolicitacaoEnum from "../Enums/StatusSolicitacaoEnum";
import SolicitacaoService from "../Services/solicitacaoService";
import SceneEnum from "../Enums/SceneEnum";
import CampoTexto from "../Component/Campos/CampoTexto";
import PacienteService from "../Services/pacienteService";
import LocalizacaoService from "../Services/localizacaoService";
import Moment from "moment";

export default class SolicitacaoMedicoScene extends Component {

    static navigationOptions = {
        title: 'Solicitação',
    };

    constructor(props) {
        super(props);
        this.state = {
            solicitacao: {},
            paciente: {},
            medico: {},
            cancelar: false,
            motivoCancelamento: '',
        }
    }

    componentWillMount() {
        this.setState({solicitacao: StaticStorageService.solicitacao});
        this.fetchData();
    }

    fetchData() {
        const {params} = this.props.navigation.state;
        PacienteService.byId(params.idPaciente)
            .then((response) => {
                console.log('RESPONSE: ', response);
                this.setState({paciente: response.data});
                console.log('PACIENTE: ', this.state.paciente);
            })
            .catch((error) => console.log('ERRO: ', error));
    }

    acoes() {
        return (
            <View>
                {(!this.state.cancelar) ? this.botaoLocalizar() : null}
                {(!this.state.cancelar) ? this.botaoAtender() : null}
                {(!this.state.cancelar) ? this.botaoConfirmar() : null}
                {(!this.state.cancelar) ? this.botaoCancelar() : null}
                {(this.state.cancelar) ? this.motivoCancelamento() : null}
            </View>
        );
    }

    botaoLocalizar() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao === StatusSolicitacaoEnum.CONFIRMADO.KEY) {
            return (
                <Card>
                    <BotaoBase
                        text={'Localizar'}
                        title={'Localizar'}
                        disabled={false}
                        onPress={() => this.startNavigation(`geo:${this.state.solicitacao.localizacao.latitude},${this.state.solicitacao.localizacao.longitude}?q=${this.state.solicitacao.localizacao.latitude},${this.state.solicitacao.localizacao.longitude}&`)}
                    />
                </Card>
            );
        }
    }

    startNavigation(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }

    botaoAtender() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao === StatusSolicitacaoEnum.CONFIRMADO.KEY) {
            return (
                <Card>
                    <BotaoBase
                        text={'Atender'}
                        title={'Atender'}
                        disabled={false}
                        onPress={() => this.movimentarSolicitacao(StatusSolicitacaoEnum.ATENDIDO.KEY, null, 'Solicitação atendida')}
                    />
                </Card>
            );
        }
    }

    botaoConfirmar() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao === StatusSolicitacaoEnum.EM_ABERTO.KEY) {
            return (
                <Card>
                    <BotaoBase
                        text={'Confirmar'}
                        title={'Confirmar'}
                        disabled={false}
                        onPress={() => this.movimentarSolicitacao(StatusSolicitacaoEnum.CONFIRMADO.KEY, null, 'Solicitação confirmada')}
                    />
                </Card>
            );
        }
    }

    botaoCancelar() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao !== StatusSolicitacaoEnum.CANCELADO.KEY &&
            situacao !== StatusSolicitacaoEnum.ATENDIDO.KEY) {
            return (
                <View>
                    <Card>
                        <BotaoBase
                            text={'Cancelar'}
                            title={'Cancelar'}
                            disabled={false}
                            onPress={() => this.setState({cancelar: true})}
                        />
                    </Card>
                </View>
            );
        }
    }

    motivoCancelamento() {
        return (
            <Card>
                <BotaoBase
                    text={'Desfazer'}
                    title={'Desfazer'}
                    onPress={() => this.setState({
                        cancelar: false,
                        motivoCancelamento: '',
                    })}
                />
                <CampoTexto
                    label="Motivo"
                    onChange={(motivoCancelamento) => {
                        this.setState({motivoCancelamento});
                    }}
                />
                <BotaoBase
                    text={'Cancelar solicitação'}
                    title={'Cancelar solicitação'}
                    disabled={(this.state.motivoCancelamento.length === 0)}
                    onPress={() => this.movimentarSolicitacao(StatusSolicitacaoEnum.CANCELADO.KEY, this.state.motivoCancelamento, 'Solicitação cancelada')}
                />
            </Card>
        );
    }

    movimentarSolicitacao(status, motivoCancelamento, mensagem) {
        const {navigate} = this.props.navigation;
        SolicitacaoService.movimentar(this.state.solicitacao._id, {
            situacao: status,
            motivoCancelamento: motivoCancelamento
        })
            .then((resp) => {
                console.log(resp);
                navigate(SceneEnum.LISTAGEM_SOLICITACAO);
                ToastAndroid.showWithGravity(mensagem, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            })
            .catch((err) => console.log(err));
    }

    isCancelada() {
        if (this.state.solicitacao.situacao === StatusSolicitacaoEnum.CANCELADO.KEY) {
            return (
                <Card>
                    <H3 style={{textAlign: "center"}}>Motivo cancelamento</H3>
                    <Divider/>
                    <Body>
                    <Text note>{this.state.solicitacao.motivoCancelamento}</Text>
                    </Body>
                </Card>
            );
        }
    }

    dadosAzumio(dados) {
        console.log('DADOS: ', dados);
        return (
            <View>
                <ListItem>
                    <H3 style={{textAlign: "center"}}>Azumio</H3>
                </ListItem>
                <CardItem>
                    <View>
                        {dados.map((item, index) =>
                            (index < 5)?
                            <ListItem key={index}>
                                <Text
                                    note>{`Batimentos: ${item.batimentos} - Data marcação: ${Moment(item.dataLeitura).format('DD/MM/YYYY')}`}</Text>
                            </ListItem>:null
                        )}
                    </View>
                </CardItem>
            </View>
        );
    }

    render() {
        let paciente = this.state.paciente;
        let solicitacao = this.state.solicitacao;
        let azumio = (paciente.integracoes) ? (paciente.integracoes.azumio) ? (paciente.integracoes.azumio.dados.length > 0 ) : false : false;
        return (
            <Container>
                <Content>
                    <Card>
                        <ListItem>
                            <H3 style={{textAlign: "center"}}>Informações do paciente</H3>
                        </ListItem>
                        <CardItem>
                            <Divider/>
                            <Body>
                            <Text note>{`Nome: ${solicitacao.nomePaciente}`}</Text>
                            {(paciente.possuiDiabete) ? <Text note>Possui diabetes</Text> : null}
                            {(paciente.possuiPressaoAlta) ? <Text note>Possui pressao alta</Text> : null}

                            </Body>
                        </CardItem>
                        {(azumio) ? this.dadosAzumio(paciente.integracoes.azumio.dados) : null}
                        <ListItem>
                            <H3 style={{textAlign: "center"}}>Informações da solicitação</H3>
                        </ListItem>
                        <CardItem>
                            <Divider/>
                            <Body>
                            <Text note>{`Data: ${Moment(solicitacao.dataConsulta).format("DD/MM/YYYY")}`}</Text>
                            <Text note>{`Necessicade: ${solicitacao.descricaoNecessidade}`}</Text>
                            <Text
                                note>{`Local: ${LocalizacaoService.formatarEndereco(solicitacao.endereco)}`}</Text>
                            <Text
                                note>{`Situação: ${StatusSolicitacaoEnum.toDesc(solicitacao.situacao)}`}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    {this.acoes()}
                    {this.isCancelada()}
                </Content>
            </Container>
        );
    }


}