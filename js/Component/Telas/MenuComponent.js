import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail, View} from "native-base";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {TouchableOpacity} from 'react-native';
import * as SceneEnum from "../../Enums/SceneEnum";
import * as ContextoEnum from "../../Enums/ContextoEnum";
import StaticStorageService from "../../Services/staticStorageService";

export default class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.menus = [
      {
        header: 'Solicitar atendimento',
        nota: 'Solicite aqui a sua proxima consulta',
        irPara: SceneEnum.MODO_PESQUISA,
        icone: require('../../Images/AtendimentoLogo2.png'),
        perfil: ContextoEnum.PACIENTE
      },
      {
        header: 'Atendimentos',
        nota: 'Atendimentos em aberto',
        irPara: SceneEnum.LISTAGEM_SOLICITACAO,
        icone: require('../../Images/AtendimentoLogo3.png'),
        perfil: ContextoEnum.PACIENTE
      },
      {
        header: 'Atendimentos',
        nota: 'Atendimentos em aberto',
        irPara: SceneEnum.LISTAGEM_SOLICITACAO,
        icone: require('../../Images/AtendimentoLogo3.png'),
        perfil: ContextoEnum.MEDICO
      },
      {
        header: 'Informações de usuário',
        nota: 'Informações de usuário',
        irPara: SceneEnum.CADASTRO_PESSOA,
        icone: require('../../Images/UserLogo.png'),
        perfil: null
      },
      {
        header: 'Perfil de paciente',
        nota: 'Atualize aqui suas informações de saúde',
        irPara: SceneEnum.CADASTRO_PACIENTE,
        icone: require('../../Images/paciente.png'),
        perfil: ContextoEnum.PACIENTE
      },
      {
        header: 'Perfil de médico',
        nota: 'Atualize as informações que vão aparecer no seu perfil médico',
        irPara: SceneEnum.CADASTRO_MEDICO,
        icone: require('../../Images/MedicoLogo.png'),
        perfil: ContextoEnum.MEDICO
      },
      {
        header: 'Informações de localização',
        nota: 'Atualize as suas informações de localização',
        irPara: SceneEnum.CADASTRO_LOCALIZACAO,
        icone: require('../../Images/compass.png'),
        perfil: null
      },
      {
        header: 'Integrar com outras App`s',
        nota: 'Traga dados dos seus aplicativos de treino favoritos',
        irPara: SceneEnum.INTEGRAR_APP_MENU,
        icone: require('../../Images/integracao.png'),
        perfil: ContextoEnum.PACIENTE
      },
    ];

    this.aplicativos = [{
        header: 'Instant Heart Rate',
        nota: 'Traga dados de batimento cardiaco',
        irPara: SceneEnum.INTEGRAR_AZUMIO,
        icone: require('../../Images/ihrLogo.png'),
        perfil : ContextoEnum.PACIENTE
      }];


    console.log(',emi', this.props)

    this.menus = (this.props.aplicativos ? this.aplicativos : this.menus).filter((item) => {

      return item.perfil === StaticStorageService.contexto || item.perfil === null;
    });
  }

  render() {
    return (
      <Content>
        {this.itemMenu()}
      </Content>
    )
  }

  itemMenu() {
    const {navigate} = this.props.navigation;
    return (
      this.menus.map((item, index) =>
        <TouchableOpacity

          key={index}
          onPress={() => {
            navigate(item.irPara);
          }}
        >
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={item.icone}/>
                <Body>
                <Text>{item.header}</Text>
                <Text note>{item.nota}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      ));
  }
}