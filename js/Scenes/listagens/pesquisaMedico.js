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
  Left, ListItem,
  Text,
  Thumbnail,
  Title,
  View
} from "native-base";
import MedicoService from "../../Services/medicoService";
import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";
import Card from "react-native-material-design/lib/Card/index";
import {Image, Modal, ToastAndroid} from "react-native";
import BotaoBase from "../../Component/Campos/BotaoBase";
import styles from "../../StyleSheet/mainStyle";
import SceneEnum from "../../Enums/SceneEnum";
import StaticStorageService from "../../Services/staticStorageService";
import Loader from "../../Component/Loader";
import DiasSemana from "../../Enums/DiasSemanaEnum";
import LocalizacaoService from "../../Services/localizacaoService";

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
      medicos: null,
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
    let parametro = `${params.filtro}${this.state.search}&longitude=${params.localizacao.longitude}&latitude=${params.localizacao.latitude}`;
    let header = {'idMedico': StaticStorageService.usuarioSessao.idMedico};

    MedicoService.pesquisar(parametro, header)
      .then((responseJson) => {
        console.log('RESPONSE: ', responseJson);
        this.setState({
          medicos: responseJson.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false
        });
        console.error(error);
      })
      .finally(() => {
        ToastAndroid.showWithGravity(
          ((this.state.medicos.length === 0) ? `Não encontramos nenhum médico na sua localidade` : `Concluído`),
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
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
          <Card>
            <CardItem button onPress={() => {
              this.setModalVisible(!this.state.modalVisible, item);
            }}>
              <View>
                <Text>Nome: {item.nome}</Text>
                <Text note>Especialidade: {item.especialidade}</Text>
                <Text note>Atende em {item.atendeEm}</Text>
                <Text note>Está a {Math.round(item.distancia)} metros</Text>
              </View>
            </CardItem>
          </Card>
        </Content>
      ));
  }

  setModalVisible(visible, item) {
    this.setState({
      modalVisible: visible,
      selectedItem: item
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
          <Title>Dados do médico</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <View>
                <Text>Nome: {item.nome}</Text>
                <Text note>Especialidade: {item.especialidade}</Text>
                {(item.endereco) ?
                  <Text note>Endereço: {LocalizacaoService.formatarEndereco(item.endereco)}</Text> : null}
                <Text note>Atende em: {item.atendeEm}</Text>
                <Text note>Está a {Math.round(item.distancia)} metros de você</Text>
                <Text note>Dias em que
                  atende: {(item.diasAtendimentoDomicilio) ? this.diasSemana(item.diasAtendimentoDomicilio) : null}</Text>
              </View>
            </CardItem>
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

  diasSemana(dias) {
    let retorno = [];
    dias.forEach((item) => {
      retorno.push(DiasSemana.toDesc(item));
    });
    return retorno.join(' - ');
  }

  guardarMedico(item) {
    StaticStorageService.medicoConsulta = item;
  }

}