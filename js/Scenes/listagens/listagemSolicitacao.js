import React, {Component} from "react";
import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Thumbnail,
    View
} from "native-base";
import SolicitacaoService from "../../Services/solicitacaoService";
import StaticStorageService from "../../Services/staticStorageService";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import SceneEnum from "../../Enums/SceneEnum";
import StatusSolicitacaoEnum from "../../Enums/StatusSolicitacaoEnum";
import Moment from "moment";
import ContextoEnum from "../../Enums/ContextoEnum";

export default class listagemSolicitacaoMedico extends Component {

    static navigationOptions = {
        title: 'Listagem de solicitações',
    };

    constructor(props) {
        super(props);
        this.state = {
            solicitacoes: [],
            loading: true,
            selectedItem: undefined,
            modalVisible: false,
            primeiraMensagem: "",
            emAberto: false,
            confirmados: false,
            atendidos: false,
            cancelados: false,
        }
    }

    fetchData() {
        let idPerfil = null;
        if (StaticStorageService.contexto === ContextoEnum.PACIENTE) {
            idPerfil = StaticStorageService.usuarioSessao.idPaciente;
        } else {
            idPerfil = StaticStorageService.usuarioSessao.idMedico;
        }
        SolicitacaoService.get(idPerfil)
            .then((response) => {
                console.log('RESPONSE: ', response);
                this.setState({
                    solicitacoes: response.data
                });
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.fetchData();
    }

    item(solicitacoes) {
        const {navigate} = this.props.navigation;
        return (
            solicitacoes.map((solicitacao, index) =>
                <TouchableItem
                    key={index}
                    onPress={() => {
                        StaticStorageService.solicitacao = solicitacao;
                        (StaticStorageService.contexto === ContextoEnum.PACIENTE) ? navigate(SceneEnum.SOLICITACAO)
                            : navigate(SceneEnum.SOLICITACAO_MEDICO);
                    }}
                >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail square source={require("./../../Images/UserLogo.png")}/>
                                <Body>

                                {(StaticStorageService.contexto === ContextoEnum.PACIENTE) ?
                                    <Text>{`Médico: ${solicitacao.nomeMedico}`}</Text>
                                    : <Text>{`Paciente: ${solicitacao.nomePaciente}`}</Text>}

                                <Text note>{`Necessidade: ${solicitacao.descricaoNecessidade}`}</Text>
                                <Text note>{`Data: ${Moment(solicitacao.dataConsulta).format('DD/MM/YYYY')}`}</Text>
                                <Text note>{`Situação: ${StatusSolicitacaoEnum.toDesc(solicitacao.situacao)}`}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </TouchableItem>
            ));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <List>
                            {this.listaAgrupada(
                                this.separarPorSituacao(StatusSolicitacaoEnum.EM_ABERTO.KEY),
                                'ios-list',
                                'Em aberto',
                                () => this.setState({emAberto: !this.state.emAberto}),
                                this.state.emAberto)}

                            {this.listaAgrupada(
                                this.separarPorSituacao(StatusSolicitacaoEnum.CONFIRMADO.KEY),
                                'ios-heart-outline',
                                'Confirmados',
                                () => this.setState({confirmados: !this.state.confirmados}),
                                this.state.confirmados)}

                            {this.listaAgrupada(
                                this.separarPorSituacao(StatusSolicitacaoEnum.ENCERRADO.KEY),
                                'ios-checkmark-circle-outline',
                                'Atendidos',
                                () => this.setState({atendidos: !this.state.atendidos}),
                                this.state.atendidos)}

                            {this.listaAgrupada(
                                this.separarPorSituacao(StatusSolicitacaoEnum.CANCELADO.KEY),
                                'ios-close-circle-outline',
                                'Cancelados',
                                () => this.setState({cancelados: !this.state.cancelados}),
                                this.state.cancelados)}
                        </List>
                    </Card>
                </Content>
            </Container>
        )
    }

    separarPorSituacao(situacao) {
        let retorno = [];
        this.state.solicitacoes.forEach((item) => {
            if (item.situacao === situacao) {
                console.log('ITEM: ', item);
                retorno.push(item);
            }
        });
        return retorno;
    }

    listaAgrupada(itens, icon, label, press, indicador) {
        return (
            <View>
                <ListItem icon>
                    <Left><Icon name={icon}/></Left>
                    <Body>
                    <TouchableItem onPress={press}>
                        <Text>{label} ({itens.length})</Text>
                    </TouchableItem>
                    </Body>
                    <Right>
                        {(indicador) ? <Icon name='ios-arrow-dropleft'/> : <Icon name='ios-arrow-dropdown'/>}
                    </Right>
                </ListItem>
                {(indicador) ? this.item(itens) : null}
            </View>
        );
    }
}