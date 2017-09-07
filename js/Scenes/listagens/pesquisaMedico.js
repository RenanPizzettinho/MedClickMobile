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
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";
import MedicoService from "../../Services/medicoService";
import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";
import Card from "react-native-material-design/lib/Card/index";
import {Image, Modal} from "react-native";
import BotaoBase from "../../Component/Campos/BotaoBase";
import styles from "../../StyleSheet/mainStyle";
import SceneEnum from "../../Enums/SceneEnum";
import StaticStorageService from "../../Services/staticStorageService";
import Loader from "../../Component/Loader";

export default class PesquisaMedico extends Component {

    static navigationOptions = {
        title: 'Pesquisar médico',
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            search: null,
            selectedItem: undefined,
            medicos: null
        }

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
        const {params} = this.props.navigation.state;
        let parametro = `${params.filtro}${this.state.search}&longitude=${params.localizacao[0]}&latitude=${params.localizacao[1]}`;
        let header = {'idMedico': StaticStorageService.usuarioSessao.idMedico};

        MedicoService.pesquisar(parametro, header)
            .then((responseJson) => {
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
        const {params} = this.props.navigation.state;
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
                    <Text>{`${params.filtro}${this.state.search}&longitude=${params.localizacao[0]}&latitude=${params.localizacao[1]}`}</Text>
                    {(this.state.medicos) ? this.medicos() : (this.state.loading) ? <Loader/> : null}
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
                        <Card>
                            <CardItem>
                                <Thumbnail source={require('../../Images/UserLogo.png')}/>
                                <View>
                                    <Text>Nome: {item.nome}</Text>
                                    <Text note>Especialidade: {item.especialidade}</Text>
                                    <Text note>Atende em: {item.atendeEm}</Text>
                                    <Text note>Esta a: 10 km</Text>
                                </View>
                            </CardItem>
                        </Card>
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
                    <Card>
                        <Image
                            source={require('../../Images/UserLogo.png')}
                            object={styles.img}
                            style={{
                                width: 100,
                                height: 100,
                                alignSelf: "center",
                                marginTop: 10,
                                marginBottom: 10
                            }}
                        />
                        <View>
                            <Text>Nome: {item.nome}</Text>
                            <Text>Especialidade: {item.especialidade}</Text>
                            <Text>Atende em: {item.atendeEm}</Text>
                            <Text>Dias em que atende: {item.diasAtendimentoDomicilio}</Text>
                        </View>
                    </Card>
                    <BotaoBase
                        text={"Solicitar consulta"}
                        title={"Solicitar consulta"}
                        onPress={() => {
                            this.guardarMedico(item);
                            this.setModalVisible(!this.state.modalVisible, item);
                            navigate(SceneEnum.CADASTRO_SOLICITACAO);
                        }}
                    />
                </Content>
            </Modal>
        );
    }

    guardarMedico(item) {
        StaticStorageService.medicoConsulta = item;
    }

}