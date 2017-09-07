import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail} from "native-base";
import SolicitacaoService from "../../Services/solicitacaoService";
import StaticStorageService from "../../Services/staticStorageService";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import SceneEnum from "../../Enums/SceneEnum";
import StatusSolicitacaoEnum from "../../Enums/StatusSolicitacaoEnum";
import Loader from "../../Component/Loader";

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
            primeiraMensagem: ""
        }
    }

    fetchData() {
        const idPerfil = StaticStorageService.usuarioSessao.idMedico;
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

    item() {
        const {navigate} = this.props.navigation;
        return (
            this.state.solicitacoes.map((solicitacao, index) =>
                <TouchableItem
                    key={index}
                    onPress={() => {
                        StaticStorageService.solicitacao = solicitacao;
                        navigate(SceneEnum.SOLICITACAO_MEDICO);
                    }}
                >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail square source={require("./../../Images/UserLogo.png")}/>
                                <Body>
                                <Text>{`Paciente: ${solicitacao.nomePaciente}`}</Text>
                                <Text note>{`Data: ${solicitacao.dataConsulta}`}</Text>
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
                    {(this.state.solicitacoes.length === 0 || this.state.solicitacoes === null) ? <Loader/> : null}
                    {this.item()}
                </Content>
            </Container>
        )
    }
}