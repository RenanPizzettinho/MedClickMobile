import React, {Component} from "react";
import {
    Body,
    Button,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    Left,
    ListItem,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";
import UsuarioService from "../../Services/usuarioService";
import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";
import Card from "react-native-material-design/lib/Card/index";
import {AsyncStorage, Modal} from "react-native";
import BotaoBase from "../../Component/BotaoBase";

export default class listagemMedico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            search: 'Native',
            selectedItem: undefined,
            medicos: []
        }
        // medicos: [{nome: "Abacate", atendeEm: "CRICIUMA", especialidade: "CARDIOLOGISTA"}]

    }

    componentDidMount() {
        this.setState({
            search: ''
        });
    }

    search() {
        this.setState({
            loading: true
        });
        UsuarioService.pesquisarMedicos(this.state.search)
            .then((responseJson) => {
                //Alert.alert("reps", JSON.stringify(responseJson));
                this.setState({
                    medicos: responseJson.data,
                    loading: false
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false
                });
                console.error(error);
            });
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Pesquisar por..." value={this.state.search}
                               onChangeText={(text) => this.setState({search: text})}
                               onSubmitEditing={() => this.search()}/>
                        <Button transparent onPress={() => this.search()}>
                            <Text>Pesquisar</Text>
                        </Button>
                    </Item>
                </Header>
                <Content>
                    {this.medicos()}
                    {this.modal()}
                </Content>
            </Container>
        );
    }

    medicos() {
        return (
            this.state.medicos.map((item, index) =>
                <Content key={index}>
                    <TouchableItem
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible, item);
                        }}
                    >
                        <ListItem>
                            <Card>
                                <CardItem>
                                    <Thumbnail source={require('../../Images/UserLogo.png')}/>
                                    <View>
                                        <Text>Nome: {item.nome}</Text>
                                        <Text note>Especialidade: {item.especialidade}</Text>
                                        <Text note>Atende em: {item.atendeEm}</Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </ListItem>
                    </TouchableItem>
                </Content>
            ));
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    modal() {
        let item = this.state.selectedItem || {nome: ""};
        const {navigate} = this.props.navigation;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => null}
            >
                <Header rounded style={{paddingTop: 0}}>
                    <Left>
                        <Button transparent onPress={() => {
                            this.setModalVisible(!this.state.modalVisible, item)
                        }}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{item.nome}</Title>
                    </Body>
                </Header>
                <Content>
                    <BotaoBase
                        text={"Solicitar consulta"}
                        title={"Solicitar consulta"}
                        onPress={() => {
                            this.guardarMedico().done();
                            this.setModalVisible(!this.state.modalVisible, item);
                            navigate("CadastroSolicitacaoScene");
                        }}
                    />
                </Content>
            </Modal>
        );
    }
    async guardarMedico(){
        await AsyncStorage.setItem('nomeMedico', this.state.selectedItem.nome);
        await AsyncStorage.setItem('idMedicoConsulta', this.state.selectedItem._id);
    }

}