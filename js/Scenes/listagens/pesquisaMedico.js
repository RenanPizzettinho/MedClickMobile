import React, {Component} from "react";
import {
  Body,
  Button,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Input, InputGroup,
  Item,
  Left, ListItem, Right,
  Text,
  Thumbnail,
  Title,
  View
} from "native-base";
import MedicoService from "../../Services/medicoService";
import Card from "react-native-material-design/lib/Card/index";
import {FlatList, Image, Modal, TextInput, ToastAndroid, TouchableOpacity} from "react-native";
import BotaoBase from "../../Component/Campos/BotaoBase";
import styles from "../../StyleSheet/mainStyle";
import SceneEnum from "../../Enums/SceneEnum";
import StaticStorageService from "../../Services/staticStorageService";
import Loader from "../../Component/Loader";
import DiasSemana from "../../Enums/DiasSemanaEnum";
import LocalizacaoService from "../../Services/localizacaoService";
import {Divider} from "react-native-material-design";
import {StyleSheet} from "react-native";
import DrawerComponent from "../../Component/Telas/DrawerComponent";

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
      <DrawerComponent {...this.props}>
        <Container>
          <Content>
            <View
              style={{paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8, backgroundColor: '#0064A3'}}>
              <Item style={{backgroundColor: 'white', borderRadius: 5, height: 40, paddingRight: 5}}>
                <Input placeholder={`Pesquisar por ${params.filtro.replace(/[\?=]/g, '')}...`} value={this.state.search}
                       onChangeText={(text) => this.setState({search: text})}
                       onSubmitEditing={() => this.search()}/>

                <TouchableOpacity onPress={() => this.search()}>
                  <Icon button transparent name="ios-search"/>
                </TouchableOpacity>
              </Item>
            </View>


            {(this.state.medicos) ? this.medicos() : (this.state.loading) ? <Loader/> : null}
            {this.modal()}
          </Content>
        </Container>
      </DrawerComponent>
    );
  }

  // this.state.medicos.map((item) =>
  medicos() {
    return (
      <FlatList data={this.state.medicos} renderItem={({item}) =>
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
        </Card>}
                keyExtractor={(item, index) => index}

      />
    )
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
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => null}
      >
        <Container style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1, justifyContent: 'center', padding: 20,}}>

          <View style={{borderRadius: 10, backgroundColor: '#f5fcff'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#d3d3d3'}}>
              <Title style={{color: 'black', paddingTop: 5, paddingBottom: 10, alignItems: 'stretch'}}>Confirme seu
                atendimento</Title>
            </View>
            <View style={{padding: 20}}>

              <Text>Nome: {item.nome}</Text>
              <Text note>Especialidade: {item.especialidade}</Text>
              {(item.endereco) ?
                <Text note>Endereço: {LocalizacaoService.formatarEndereco(item.endereco)}</Text> : null}
              <Text note>Atende em: {item.atendeEm}</Text>
              <Text note>Está a {Math.round(item.distancia)} metros de você</Text>
              <Text note>Dias em que
                atende: {(item.diasAtendimentoDomicilio) ? this.diasSemana(item.diasAtendimentoDomicilio) : null}</Text>
            </View>
            <View
              style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#d3d3d3', justifyContent: 'center'}}>
              <Button small danger
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }}
                      style={{margin: 10}}>
                <Text>Cancelar</Text>
              </Button>

              <Button small success
                      onPress={() => {
                        this.guardarMedico(item);
                        this.setModalVisible(!this.state.modalVisible, item);
                        navigate(SceneEnum.CADASTRO_SOLICITACAO);
                      }}
                      style={{margin: 10}}>
                <Text>Confirmar</Text>
              </Button>

            </View>
          </View>
        </Container>
        {/*
        <Container style={{backgroundColor: true === true ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff'}}>
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
          <View style={{paddingLeft: 7, paddingRight: 7}}>
            <BotaoBase
              style={{paddingLeft: 10}}
              text={"Solicitar consulta"}
              title={"Solicitar consulta"}
              onPress={() => {
                this.guardarMedico(item);
                this.setModalVisible(!this.state.modalVisible, item);
                navigate(SceneEnum.CADASTRO_SOLICITACAO);
              }}
            />
          </View>
        </Content>
        </Container>*/}
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