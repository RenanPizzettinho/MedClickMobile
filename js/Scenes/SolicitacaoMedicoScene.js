import React, {Component} from "react";
import {Body, Card, Container, Content, H3, Text, View} from "native-base";
import StaticStorageService from "../Services/staticStorageService";
import BotaoBase from "../Component/Campos/BotaoBase";
import Divider from "react-native-material-design/lib/Divider";
import {Image, Linking, ToastAndroid} from "react-native";
import StatusSolicitacaoEnum from "../Enums/StatusSolicitacaoEnum";
import SolicitacaoService from "../Services/solicitacaoService";
import SceneEnum from "../Enums/SceneEnum";
import CampoTexto from "../Component/Campos/CampoTexto";
import PacienteService from "../Services/pacienteService";

export default class SolicitacaoMedicoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solicitacao: {},
            paciente: {},
            medico: {},
            cancelar: false,
            motivo: '',
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
                        onPress={() => this.startNavigation(`geo:${this.state.paciente.localizacao.latitude},${this.state.paciente.localizacao.longitude}?q=${this.state.paciente.localizacao.latitude},${this.state.paciente.localizacao.longitude}`)}
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
                        onPress={() => this.movimentarSolicitacao(StatusSolicitacaoEnum.ENCERRADO.KEY, null, 'Solicitação atendida')}
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
            situacao !== StatusSolicitacaoEnum.ENCERRADO.KEY) {
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
                        motivo: '',
                    })}
                />
                <CampoTexto
                    label="Motivo"
                    onChange={(motivo) => {
                        this.setState({motivo});
                    }}
                />
                <BotaoBase
                    text={'Cancelar solicitação'}
                    title={'Cancelar solicitação'}
                    disabled={(this.state.motivo.length === 0)}
                    onPress={() => this.movimentarSolicitacao(StatusSolicitacaoEnum.CANCELADO.KEY, this.state.motivo, 'Solicitação cancelada')}
                />
            </Card>
        );
    }

    movimentarSolicitacao(status, motivo, mensagem) {
        const {navigate} = this.props.navigation;
        SolicitacaoService.movimentar(this.state.solicitacao._id, {situacao: status, motivo: motivo})
            .then((resp) => {
                console.log(resp);
                navigate(SceneEnum.LISTAGEM_SOLICITACAO_MEDICO);
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
                    <Text note>{this.state.solicitacao.motivo}</Text>
                    </Body>
                </Card>
            );
        }
    }

    render() {
        //TODO: colocar informacoes sobre medicoes de batimento
        return (
            <Container>
                <Content>
                    <Card>
                        <H3 style={{textAlign: "center"}}>Informações do paciente</H3>
                        <Divider/>
                        <Image style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}
                               source={require("./../Images/UserLogo.png")}/>
                        <Body>
                        <Text>{`Paciente: ${this.state.solicitacao.nomePaciente}`}</Text>
                        {(this.state.paciente.possuiDiabete) ? <Text note> Possui diabetes</Text> : null}
                        {(this.state.paciente.possuiPressaoAlta) ? <Text note> Possui pressao alta</Text> : null}
                        </Body>
                    </Card>
                    <Card>
                        <H3 style={{textAlign: "center"}}>Informações da solicitação</H3>
                        <Divider/>
                        <Body>
                        <Text note>{`Data: ${this.state.solicitacao.dataConsulta}`}</Text>
                        <Text note>{`Necessicade: ${this.state.solicitacao.descricaoNecessidade}`}</Text>
                        <Text note>{`Local: ${this.state.solicitacao.localConsulta}`}</Text>
                        <Text note>{`Situação: ${StatusSolicitacaoEnum.toDesc(this.state.solicitacao.situacao)}`}</Text>
                        </Body>
                    </Card>
                    {this.acoes()}
                    {this.isCancelada()}
                </Content>
            </Container>
        );
    }
}