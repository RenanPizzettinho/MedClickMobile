import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, List, ListItem, Spinner, Text, Thumbnail} from "native-base";
import SolicitacaoService from "../../Services/solicitacaoService";
import StaticStorageService from "../../Services/staticStorageService";
import SceneEnum from "../../Enums/SceneEnum";
import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";
import {ActivityIndicator} from "react-native";

export default class ListagemSolicitacao extends Component {

    static navigationOptions = {
        title: 'Minhas solicitações',
    };

    constructor(props) {
        super(props);
        this.navigate = this.props.navigation;
        this.state = {
            solicitacoes: [],
            motivoCancelamento: "",
            loading: true,
            selectedItem: undefined,
            modalVisible: false,
            primeiraMensagem: ""
        }
    }

    fetchData() {
        const idPerfil = StaticStorageService.usuarioSessao.idPaciente;
        SolicitacaoService.get(idPerfil)
            .then((response) => {
                console.log('Response', response);
                this.setState({
                    solicitacoes: response.data
                });
            });
    }

    componentWillMount() {
        this.fetchData();
        this.setState({loading: false});
    }

    render() {
        return (
            <Container>
                <Content>
                    {(this.state.solicitacoes.length === 0 || this.state.solicitacoes === null)?
                        <ActivityIndicator
                            animating={true}
                            style={{height: 80}}
                            size="large"
                        />
                        : null
                    }
                    {this.item()}
                </Content>
            </Container >
        )
    }

    item() {
        const {navigate} = this.props.navigation;
        return (
            this.state.solicitacoes.map((solicitacao, index) =>
                <TouchableItem
                    key={index}
                    onPress={() => {
                        StaticStorageService.solicitacao = solicitacao;
                        navigate(SceneEnum.SOLICITACAO);
                    }}
                >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail square source={require("./../../Images/UserLogo.png")}/>
                                <Body>
                                <Text>{`Médico: ${solicitacao.nomeMedico}`}</Text>
                                <Text note>{`Data: ${solicitacao.dataConsulta}`}</Text>
                                <Text note>{`Situação: ${solicitacao.situacao}`}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </TouchableItem>
            ));

    }
}