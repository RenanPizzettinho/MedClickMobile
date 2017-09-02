import React, {Component} from "react";
import {Body, Card, Container, Content, H3, Text} from "native-base";
import StaticStorageService from "../Services/staticStorageService";
import BotaoBase from "../Component/Campos/BotaoBase";
import Divider from "react-native-material-design/lib/Divider";
import {Image, ToastAndroid} from "react-native";
import StatusSolicitacaoEnum from "../Enums/StatusSolicitacaoEnum";
import SolicitacaoService from "../Services/solicitacaoService";
import SceneEnum from "../Enums/SceneEnum";

export default class SolicitacaoMedicoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solicitacao: {},
            medico: {},
        }
    }

    componentWillMount() {
        this.setState({solicitacao: StaticStorageService.solicitacao});
    }

    acoes() {
        return (
            <Content>
                {this.botaoAtender()}
                {this.botaoConfirmar()}
                {this.botaoCancelar()}
            </Content>
        );
    }

    botaoAtender() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao !== StatusSolicitacaoEnum.CANCELADO.KEY &&
            situacao !== StatusSolicitacaoEnum.CONFIRMADO.KEY &&
            StatusSolicitacaoEnum.ENCERRADO.KEY) {
            return (
                <BotaoBase
                    text={'Atender'}
                    title={'Atender'}
                    disabled={false}
                    onPress={() => this.atender()}
                />
            );
        }
    }

    botaoConfirmar() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao !== StatusSolicitacaoEnum.CANCELADO.KEY &&
            situacao !== StatusSolicitacaoEnum.CONFIRMADO.KEY) {
            return (
                <BotaoBase
                    text={'Confirmar'}
                    title={'Confirmar'}
                    disabled={false}
                    onPress={() => this.confirmar()}
                />
            );
        }
    }

    botaoCancelar() {
        const situacao = this.state.solicitacao.situacao;
        if (situacao !== StatusSolicitacaoEnum.CANCELADO.KEY) {
            return (
                <BotaoBase
                    text={'Cancelar'}
                    title={'Cancelar'}
                    disabled={false}
                    onPress={() => this.cancelar()}
                />
            );
        }
    }

    atender() {
        this.movimentarSolicitacao(StatusSolicitacaoEnum.ENCERRADO.KEY, 'Solicitação atendida');
    }

    confirmar() {
        this.movimentarSolicitacao(StatusSolicitacaoEnum.CONFIRMADO.KEY, 'Solicitação confirmada');
    }

    cancelar() {
        this.movimentarSolicitacao(StatusSolicitacaoEnum.CANCELADO.KEY, 'Solicitação cancelada');
    }

    movimentarSolicitacao(status, mensagem) {
        const {navigate} = this.props.navigation;
        SolicitacaoService.movimentar(this.state.solicitacao._id, {situacao: status})
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
                    <Text>{this.state.solicitacao.motivoCancelamento}</Text>
                    </Body>
                </Card>
            );
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <H3 style={{textAlign: "center"}}>Informações do médico</H3>
                        <Divider/>
                        <Image style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}
                               source={require("./../Images/UserLogo.png")}/>
                        <Body>
                        <Text>{`Médico: ${this.state.solicitacao.nomeMedico}`}</Text>
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
            </Container >
        );
    }
}