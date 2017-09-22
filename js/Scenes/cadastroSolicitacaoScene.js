import React, {Component} from "react";
import {Card, Container, Content, Form, H3, ListItem, Text, View, Input, Item, Label} from "native-base";
import {ScrollView, ToastAndroid, TextInput} from "react-native";
import SolicitacaoService from "../Services/solicitacaoService";
import CampoTexto from "../Component/Campos/CampoTexto";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import StaticStorageService from "../Services/staticStorageService";
import PacienteService from "../Services/pacienteService";
import LocalizacaoService from "../Services/localizacaoService";
import DatePicker from "react-native-datepicker";
import moment from 'moment'
// import 'moment/locale/pt-br'
// moment.locale('pt-BR')


export default class CadastroSolicitacaoScene extends Component {

  static navigationOptions = {
    title: 'Solicitar atendimento',
  };

  constructor(props) {
    super(props);
    this.state = {
      paciente: {},
      descricaoNecessidade: "",
      complemento: "",
      nomeMedico: "",
      enderecoCadastro: true,
      endereco: {},
      localizacao: {},
      dataConsulta: new Date(),
    };
  }

  componentWillMount() {
    this.getNomeMedico();
    this.getPaciente();
  }

  getPaciente() {
    PacienteService.byId(StaticStorageService.usuarioSessao.idPaciente)
      .then((response) => {
        console.log('PACIENTE: ', response);
        this.setState({
          paciente: response.data,
          localizacao: response.data.localizacao,
          endereco: response.data.endereco
        });
      })
  }

  getNomeMedico() {
    this.setState({nomeMedico: StaticStorageService.medicoConsulta.nome});
  }

  cadastrar() {
    const {navigate} = this.props.navigation;
    let perfil = StaticStorageService.usuarioSessao;
    let medicoConsulta = StaticStorageService.medicoConsulta;

    const form = {
      idMedico: medicoConsulta._id,
      idPaciente: perfil.idPaciente,
      descricaoNecessidade: this.state.descricaoNecessidade,
      localizacao: this.state.localizacao,
      dataConsulta: this.state.dataConsulta,
      complemento: this.state.complemento,
      endereco: this.state.endereco,
    };

    SolicitacaoService.cadastrar(form)
      .then((responseJson) => {
        ToastAndroid.showWithGravity('Solicitação registrada', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        console.log('RESPONSE: ', responseJson);
        if (responseJson.data._id) {
          navigate(SceneEnum.LISTAGEM_SOLICITACAO);
        }
      })
      .catch((error) => console.log('ERROR: ', error));
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <ScrollView>
              <Card>
                <Form>
                  <H3 style={{textAlign: 'center'}}>Médico: {this.state.nomeMedico}</H3>
                  <ListItem>
                    <Item floatingLabel>
                      <Label>Descrição necessidade</Label>
                      <Input
                        style={{height: Math.max(this.state.height), minHeight: 60}}
                        multiline={true}
                        onChange={(e) => {
                          this.setState({
                            descricaoNecessidade: e.nativeEvent.text,
                            height: e.nativeEvent.contentSize.height,
                          })
                        }}
                      />
                    </Item>
                  </ListItem>
                  <ListItem>

                    <Text disabled
                      note>{`Endereço: ${LocalizacaoService.formatarEndereco(this.state.endereco)}`}</Text>
                  </ListItem>
                  <CampoTexto
                    label="Complemento"
                    onChange={(complemento) =>
                      this.setState({complemento})
                    }
                  />
                  <ListItem style={{flexDirection : "column"}}>
                      <View style={{flexDirection: 'row'}}>
                        <Label >Data: </Label>
                      <DatePicker
                        style={{flex:1}}
                        date={this.state.dataConsulta}
                        mode='date'
                        format="LL"
                         // format='DD/MM/YYYY'
                        minDate={new Date()}
                        androidMode='calendar'
                        showIcon={true}

                        customStyles={{
                          dateInput: {
                            alignItems: 'center',
                            padding: 0,
                            borderWidth: 0,
                            borderBottomWidth: 1
                          },
                        }}
                        onDateChange={(dataConsulta) => {
                          // this.setState({dataConsulta : moment(dataConsulta, 'LL').format('DD/MM/YYYY')});
                          this.setState({dataConsulta});
                          console.log(this.state)
                        }}/>
                      </View>
                      <Text note>{moment(this.state.dataConsulta, "DD/MM/YYYY").format('dddd')}</Text>
                  </ListItem>

                </Form>
              </Card>
              <BotaoBase
                title="Registrar"
                disabled={this.disabled(this.state)}
                onPress={() => this.cadastrar()}
              />
            </ScrollView>
          </Form>
        </Content>
      </Container>
    )
  }

  disabled(state) {
    return !state.descricaoNecessidade;
  }
}


