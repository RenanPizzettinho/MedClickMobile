import React, {Component} from "react";
import {Body, Card, Container, Content, H3, Text, View} from "native-base";
import StaticStorageService from "../Services/staticStorageService";
import BotaoBase from "../Component/Campos/BotaoBase";
import Divider from "react-native-material-design/lib/Divider";
import {Image, ToastAndroid} from "react-native";
import StatusSolicitacaoEnum from "../Enums/StatusSolicitacaoEnum";
import SceneEnum from "../Enums/SceneEnum";
import SolicitacaoService from "../Services/solicitacaoService";
import MedicoService from "../Services/medicoService";
import CampoTexto from "../Component/Campos/CampoTexto";

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
        //TODO: resource  para pegar paciente e medico por id
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
            situacao !== StatusSolicitacaoEnum.ENCERRADO.KEY
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
                        <H3 style={{textAlign: "center"}}>Informações do médico</H3>
                        <Divider/>
                        <Image style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}
                               source={require("./../Images/UserLogo.png")}/>
                        <Body>
                        <Text>{`Nome: ${this.state.solicitacao.nomeMedico}`}</Text>
                        <Text note>{`CRM: ${this.state.medico.crm} - ${this.state.medico.estado}`}</Text>
                        <Text note>{`Especialidade: ${this.state.medico.especialidade}`}</Text>
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