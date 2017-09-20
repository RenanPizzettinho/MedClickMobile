import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, H2, H3, ListItem, Text, View} from "native-base";
import StaticStorageService from "../Services/staticStorageService";
import BotaoBase from "../Component/Campos/BotaoBase";
import Divider from "react-native-material-design/lib/Divider";
import {Image, ToastAndroid} from "react-native";
import StatusSolicitacaoEnum from "../Enums/StatusSolicitacaoEnum";
import SceneEnum from "../Enums/SceneEnum";
import SolicitacaoService from "../Services/solicitacaoService";
import MedicoService from "../Services/medicoService";
import CampoTexto from "../Component/Campos/CampoTexto";
import LocalizacaoService from "../Services/localizacaoService";
import Moment from "moment";

export default class SolicitacaoScene extends Component {

    static navigationOptions = {
        title: 'Solicitação',
    };

    constructor(props) {
        super(props);
        this.state = {
            solicitacao: {},
            medico: {},
            cancelar: false,
            motivo: ''
        }
    }

    componentWillMount() {
        this.setState({solicitacao: StaticStorageService.solicitacao});
        this.fetchData();
    }

    fetchData() {
        MedicoService.byId(StaticStorageService.solicitacao.idMedico)
            .then((response) => {
                console.log('RESPONSE: ', response);
                this.setState({medico: response.data})
            })
            .catch((error) => console.log('ERROR: ', error));
    }

    acoes() {
        return (
            <View>
                {(!this.state.cancelar) ? this.botaoCancelar() : null}
                {(this.state.cancelar) ? this.motivoCancelamento() : null}
            </View>)
    }

    botaoCancelar() {
        let situacao = this.state.solicitacao.situacao;
        if (situacao !== StatusSolicitacaoEnum.CANCELADO.KEY &&
            situacao !== StatusSolicitacaoEnum.CONFIRMADO.KEY &&
            situacao !== StatusSolicitacaoEnum.ATENDIDO.KEY
        ) {
            return (
                <BotaoBase
                    text={'Cancelar'}
                    title={'Cancelar'}
                    disabled={false}
                    onPress={() => this.setState({cancelar: true})}
                />
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
                    onPress={() => this.cancelar()}
                />
            </Card>
        );
    }

    cancelar() {
        const {navigate} = this.props.navigation;
        SolicitacaoService.movimentar(this.state.solicitacao._id, {situacao: StatusSolicitacaoEnum.CANCELADO.KEY})
            .then((resp) => {
                console.log(resp);
                navigate(SceneEnum.LISTAGEM_SOLICITACAO);
                ToastAndroid.showWithGravity(`Solicitação cancelada`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
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
                        <ListItem>
                            <H2 style={{textAlign: "center"}}>Informações do médico</H2>
                        </ListItem>
                        <CardItem>
                            <Divider/>
                            <Body>
                            <Text note>{`Nome: ${this.state.solicitacao.nomeMedico}`}</Text>
                            <Text note>{`CRM: ${this.state.medico.crm} - ${this.state.medico.estado}`}</Text>
                            <Text note>{`Especialidade: ${this.state.medico.especialidade}`}</Text>
                            </Body>
                        </CardItem>
                        <ListItem>
                            <H2 style={{textAlign: "center"}}>Informações da solicitação</H2>
                        </ListItem>
                        <CardItem>
                            <Divider/>
                            <Body>
                            <Text
                                note>{`Data: ${Moment(this.state.solicitacao.dataConsulta).format('DD/MM/YYYY')}`}</Text>
                            <Text note>{`Necessicade: ${this.state.solicitacao.descricaoNecessidade}`}</Text>
                            <Text
                                note>{`Local: ${LocalizacaoService.formatarEndereco(this.state.solicitacao.endereco)}`}</Text>
                            <Text
                                note>{`Situação: ${StatusSolicitacaoEnum.toDesc(this.state.solicitacao.situacao)}`}</Text>
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