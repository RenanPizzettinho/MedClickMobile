import React, {Component} from "react";
import StaticStorageService from '../Services/staticStorageService';
import ContextoEnum from '../Enums/ContextoEnum';
import {Alert, Image, TouchableOpacity} from "react-native";
import SceneEnum from '../Enums/SceneEnum';
import {Body, Button, Card, Icon, CardItem, Container, Content, Left, Text, Thumbnail, Header, Title} from "native-base";
import DataComponent from "./../Component/Campos/DataComponent"

export default class SelecaoContextoScene extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Seleção de contexto',
    headerLeft :  <Button transparent onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" style={{color: '#ffffff'}}/>
    </Button>,
    headerRight : null
  });

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <Container>
       {/*<Header>*/}
          {/*<Left>*/}
            {/*<Button transparent onPress={() => navigate(SceneEnum.LOGIN)}>*/}
            {/*<Button transparent onPress={() => DrawerComponent.toggleDrawer()}>*/}
              {/*<Icon name='arrow-back' />*/}
            {/*</Button>*/}
          {/*</Left>*/}
          {/*<Body>*/}
            {/*<Title>Seleção de contexto</Title>*/}
          {/*</Body>*/}
        {/*</Header>*/}

        <Content>
          <TouchableOpacity onPress={() => this.entrarPaciente()}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require('../Images/UserLogo.png')}/>
                  <Body>
                  <Text>Paciente</Text>
                  <Text note>Acessar com perfil de paciente</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={require('../Images/SelecaoContextoPaciente.jpg')}
                       style={{height: 135, width: null, flex: 1}}/>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.entrarMedico()}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require('../Images/MedicoLogo.png')}/>
                  <Body>
                  <Text>Médico</Text>
                  <Text note>Acessar com perfil médico</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={require('../Images/contexto_medico.jpg')}
                       style={{height: 135, width: null, flex: 1}}/>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }

  entrarPaciente() {
    const {navigate} = this.props.navigation;
    const usuario = StaticStorageService.usuarioSessao;
    StaticStorageService.contexto = ContextoEnum.PACIENTE;

    if (usuario.idPaciente === undefined) {
      Alert.alert('Aviso', 'Olá,\n Este provavelmente é seu primeiro acesso como paciente, para melhorar sua experiencia neste app vamos lhe redirecionar para o cadastro de paciente, onde voce respondera um questionario medico simples.');
      navigate(SceneEnum.CADASTRO_PACIENTE);
    } else {
      navigate(SceneEnum.MENU);
    }
  }

  entrarMedico() {
    const {navigate} = this.props.navigation;
    const usuario = StaticStorageService.usuarioSessao;
    StaticStorageService.contexto = ContextoEnum.MEDICO;

    if (usuario.idMedico === undefined) {
      Alert.alert('Aviso', 'Olá,\n Este provavelmente é seu primeiro acesso como médico. Para poder usar a nossa app com perfil medico, primeiro voce precisa preencher suas informacoes no formulario de cadastro medico. Entao lhe redirecionaremos para este formulario.');
      navigate(SceneEnum.CADASTRO_MEDICO);
    } else {
      navigate(SceneEnum.MENU);
    }
  }
}