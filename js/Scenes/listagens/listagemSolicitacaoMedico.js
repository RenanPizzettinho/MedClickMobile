import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail} from "native-base";
import {Alert} from "react-native";
import SolicitacaoService from "../../Services/solicitacaoService";
import MensagemService from "../../Services/mensagemService";
import StaticStorageService from "../../Services/staticStorageService";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import SceneEnum from "../../Enums/SceneEnum";

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
        const idPerfil = StaticStorageService.usuarioSessao._id;
        SolicitacaoService.get(idPerfil)
            .then((response) => {
                this.setState({
                    results: {
                        solicitacoes: response.data
                    }
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
                                <Text note>{`Situação: ${solicitacao.situacao}`}</Text>
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
                    {(this.state.solicitacoes.length === 0 || this.state.solicitacoes === null)?
                        <Text>Sem dados para exibir</Text>
                        : null
                    }
                </Content>
            </Container >
        )
    }
}