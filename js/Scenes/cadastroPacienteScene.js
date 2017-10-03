import React, {Component} from "react";
import {ToastAndroid, Alert} from "react-native";
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import SceneEnum from "../Enums/SceneEnum";
import {Body, Button, Card, Container, Content, Form, H3, List, ListItem, Text, Title, View} from "native-base";
import CheckBoxBase from "../Component/Campos/CheckBoxBase";
import BotaoBase from "../Component/Campos/BotaoBase";
import Moment from "moment";
import DrawerComponent from "../Component/Telas/DrawerComponent";
import ButtonDrawer from "../Component/Campos/ButtonDrawer";

let self;
export default class CadastroPacienteScene extends Component {

  static navigationOptions = {
    // header: (<View><Text>Perfil deo paciente</Text></View>),
    // headerTitle : <View style={{flexDirection:'column', }}><Text style={{color: '#fff'}}>Paciente</Text><Title>Perfil de paciente</Title></View>,
    title: 'Perfil de paciente',
    headerLeft: <ButtonDrawer onPress={() => self.drawer.toggleDrawer()}/>
  };

  constructor(props) {
    super(props);

    this.state = {
      idPaciente: null,
      possuiDiabete: false,
      possuiPressaoAlta: false,
    };
    self = this;
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    PacienteService.get(StaticStorageService.usuarioSessao._id)
      .then((response) => {
        let dados = response.data;
        console.log('RESPONSE: ', dados);
        if (dados === undefined) return;
        this.setState({
          idPaciente: dados._id,
          possuiDiabete: dados.possuiDiabete || false,
          possuiPressaoAlta: dados.possuiPressaoAlta || false,
          integracoes: dados.integracoes || null
        });
      });
  }

  salvarPaciente(state) {
    const userId = StaticStorageService.usuarioSessao._id;
    const {navigate} = this.props.navigation;

    let form = {
      possuiDiabete: state.possuiDiabete,
      possuiPressaoAlta: state.possuiPressaoAlta
    };

    if (!this.state.idPaciente) {
      PacienteService.salvar(userId, form)
        .then((response) => {
          ToastAndroid.showWithGravity('Informações de paciente cadastradas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          console.log('RESPONSE: ', response);
          StaticStorageService.usuarioSessao.idPaciente = response.data._id;
          console.log('USUARIO: ', StaticStorageService.usuarioSessao);
          navigate(SceneEnum.MENU);
        });
    } else {
      PacienteService.atualizar(userId, form)
        .then((response) => {
          ToastAndroid.showWithGravity('Informações de paciente atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          console.log('RESPONSE: ', response);
          StaticStorageService.usuarioSessao.idPaciente = response.data._id;
          console.log('USUARIO: ', StaticStorageService.usuarioSessao);
          navigate(SceneEnum.MENU);
        });
    }
  }

  atualizarDadosAzumio() {
    ToastAndroid.showWithGravity('Atualizando...', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    PacienteService.atualizarAzumio(this.state.idPaciente)
      .then((resp) => {
        console.log(resp);
        this.setState({
          integracoes: {
            azumio: resp.integracoes.azumio
          }
        });
        console.log('RESP', resp)
        ToastAndroid.showWithGravity('Informações do aplicativo Instant Heart Rates atualizadas.', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity('Erro ao atualizar dados..', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      });
  }

  integracoesAzumio(dados) {
    console.log(dados);
    return (
      <View>
        <Card style={{paddingTop: 10, paddingBottom: 10}}>
          <H3 style={{textAlign: "center", marginBottom: 15}}>Instant Heart Rate</H3>
          <Body>
          <List dataArray={dados}
                itemDivider={true}
                renderRow={(item) =>
                  <ListItem>
                    <Text
                      // note>{`Batimentos: ${item.batimentos} - Data marcação: ${Moment(item.dataLeitura).format('DD/MM/YYYY')}`}</Text>
                      note>{`Em ${Moment(item.dataLeitura).format('DD/MM/YYYY')} - Batimentos: ${item.batimentos} BPM`}</Text>
                  </ListItem>
                }>
          </List>
          <Text>Atualizado em: {this.state.integracoes.azumio.atualizadoEm === undefined ? 'sem informações' : Moment(this.state.integracoes.azumio.atualizadoEm).format("DD/MM/YYYY [ às ] HH:MM")}</Text>
          </Body>
        </Card>
        <BotaoBase
          text={'Atualizar dados'}
          title={'Atualizar dados'}
          disabled={false}
          onPress={() => this.atualizarDadosAzumio()}
        />
      </View>
    );
  }

  render() {
    let integracoes = this.state.integracoes;
    let azumio = (integracoes) ? (integracoes.azumio) ? (integracoes.azumio.token) : false : false;
    return (
      <DrawerComponent ref={(ref) => self.drawer = ref} {...this.props}>
        <Container>
          <Content>
            <Card>
              <Form>
                <CheckBoxBase
                  label="Possui diabetes?"
                  checked={this.state.possuiDiabete}
                  onPress={() => {
                    this.setState({possuiDiabete: !this.state.possuiDiabete});
                  }}
                />
                <CheckBoxBase
                  label="Possui pressão alta?"
                  checked={this.state.possuiPressaoAlta}
                  onPress={() => {
                    this.setState({possuiPressaoAlta: !this.state.possuiPressaoAlta});
                  }}
                />

              </Form>
            </Card>
            <BotaoBase
              title="Salvar"
              onPress={() => {
                this.salvarPaciente(this.state);
              }}
            />
            {(azumio) ? this.integracoesAzumio(integracoes.azumio.dados) : null}
          </Content>
        </Container>
      </DrawerComponent>
    );
  }
}