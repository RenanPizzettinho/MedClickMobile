import React, {Component} from "react";
import {
  Card,
  CardItem,
  Body,
  Container,
  Content,
  Form,
  H3,
  ListItem,
  Text,
  View,
  Input,
  Item,
  Label
} from "native-base";
import {ScrollView, ToastAndroid, TextInput, TouchableOpacity} from "react-native";
import SolicitacaoService from "../Services/solicitacaoService";
import CampoTexto from "../Component/Campos/CampoTexto";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import StaticStorageService from "../Services/staticStorageService";
import PacienteService from "../Services/pacienteService";
import LocalizacaoService from "../Services/localizacaoService";
import DatePicker from "react-native-datepicker";
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

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
      medicoConsulta: {
        nome: "",
        especialidade: ""
      },
    };
  }

  componentWillMount() {
    this.getMedico();
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

  getMedico() {
    this.setState({medicoConsulta: StaticStorageService.medicoConsulta});
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
          <ScrollView>
            <Card>
              <CardItem header style={{
                backgroundColor: "#F2F2F2",
                paddingTop: 0,
                flexDirection: 'column',
                alignItems: 'stretch'
              }}>

                <Label style={{lineHeight: 25, marginBottom: 5}}>Médico escolhido: </Label>

                <View style={{flexDirection: 'column', flex: 1}}>
                  <H3 style={{flex: 1, lineHeight: 20, textAlign: 'center'}}>{this.state.medicoConsulta.nome}</H3>
                  <Text note style={{textAlign: 'center'}}>{this.state.medicoConsulta.especialidade}</Text>
                </View>

              </CardItem>
              <Form>
                <CardItem>
                  <Body style={{flex: 1, alignItems: 'stretch'}}>

                  <View>
                    <Label>Descrição da necessidade: * </Label>
                    <Item regular>
                      <Input
                        onBlur={()=>console.log(this.refs)}
                        autoFocus={true}
                        ref={(ref) => {
                          this._inputRef = ref
                        }}
                        style={{height: (this._inputRef && this._inputRef.height) ? Math.max(this._inputRef.height) : 40}}
                        multiline={true}
                        onChange={(e) => {
                          this._inputRef.height = e.nativeEvent.contentSize.height;
                          this.setState({
                            descricaoNecessidade: e.nativeEvent.text
                          })
                        }}

                      />
                    </Item>
                  </View>

                  <View style={{marginTop: 10}}>
                    <Label>Local da consulta:</Label>
                    <Item regular disabled style={{backgroundColor: '#F2F2F2'}}>
                      <Input
                        disabled
                        style={{height: 60, color: '#6E6E6E'}}
                        multiline={true}
                        value={LocalizacaoService.formatarEndereco(this.state.endereco)}
                      />
                    </Item>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Label>Complemento: </Label>
                    <Item regular>
                      <Input
                        onBlur={()=>console.log(this.refs)}
                        ref={(ref) => {
                          this.refs = ref
                        }}
                        style={{height: (this.refs && this.refs.height) ? Math.max(this.refs.height) : 40}}
                        label="Complemento"
                        multiline={true}
                        onChange={(e) => {
                          this.refs.height = e.nativeEvent.contentSize.height;
                          this.setState({complemento: e.nativeEvent.text})
                        }}
                      />
                    </Item>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Label>Data: </Label>
                    <DatePicker
                      style={{flex: 1}}
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
                  <Text note style={{textAlign: 'center'}}>{moment(this.state.dataConsulta, "LL").format('dddd')}</Text>
                  </Body>
                </CardItem>


                {/*<ListItem style={{flexDirection: "column"}}>
                  <View style={{flexDirection: 'row'}}>
                    <Label>Data: </Label>
                    <DatePicker
                      style={{flex: 1}}
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
                  <Text note>{moment(this.state.dataConsulta, "LL").format('dddd')}</Text>

                </ListItem>*/}

              </Form>


            </Card>
            <BotaoBase
              title="Registrar"
              disabled={this.disabled(this.state)}
              onPress={() => this.cadastrar()}
            />
          </ScrollView>
        </Content>
      </Container>
    )
  }

  disabled(state) {
    return !state.descricaoNecessidade;
  }
}


