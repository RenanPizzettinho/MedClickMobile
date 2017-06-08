import React, {Component} from "react";
import {
    Body,
    Button,
    Container,
    Content,
    H2,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Spinner,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";

//Renomear para listagemSolicitacaoPendente
//Ou
//Criar segments ou o picker para usar da mesma tela
//porém trazendo os pendentes, confirmados e encerrados
export default class listagemSolicitacao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {solicitacoes: []},
            solicitacaoSelecionada: undefined,
            modalVisible: false,
            loading: true
        }
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    componentWillMount() {
        this.setState({
            results: {
                solicitacoes: [
                    {
                        nome: "Rafael Waterkemper",
                        tipoUsuario: "Médico",
                        descricaoSolicitacao: "Tive reumatismo",
                        dataConsulta: "01/01/1999",
                        img: require("../../Images/moto.jpg")
                    },
                    {
                        nome: "Gustavo Marangoni Waterkemper",
                        tipoUsuario: "Paciente",
                        descricaoSolicitacao: "Não tive reumatismo",
                        dataConsulta: "01/01/2999",
                        img: require("./../../Images/chapolim.jpg")
                    }
                ]
            },
            loading: false
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body style={{alignSelf: 'center'}}>
                        <Title>Solicitações</Title>
                        </Body>
                    </Header>
                    <Content>
                        {this.state.loading ? <Spinner /> :
                            <List primaryText="" dataArray={this.state.results.solicitacoes} renderRow={(solicitacao) =>
                                <ListItem key={solicitacao.nome} button
                                          onPress={() => this.setModalVisible(true, solicitacao)}>
                                    <Thumbnail square size={80} source={solicitacao.img}/>
                                    <Body>
                                    <H2 style={{marginLeft: 10}}>{solicitacao.tipoUsuario}</H2>
                                    <Text>{solicitacao.nome}</Text>
                                    <Text note>{solicitacao.descricaoSolicitacao}</Text>
                                    {solicitacao.tipoUsuario !== "Médico" ? <View/> :
                                        <Item floatingLabel last>
                                            <Label>Motivo</Label>
                                            <Input />
                                        </Item>}
                                    {getTypeUser(solicitacao)}
                                    </Body>
                                </ListItem>
                            }/>}
                    </Content>
                </Content>
            </Container >
        )
    }
}

function getTypeUser(solicitacao) {
    return (
        solicitacao.tipoUsuario === 'Médico' ?
            <Button small rounded danger style={{marginLeft: 10, marginTop: 20}}>
                <Text>Cancelar</Text>
            </Button> :
            <Button small rounded success style={{marginLeft: 10}}>
                <Text>Confirmar</Text>
            </Button>
    )
}