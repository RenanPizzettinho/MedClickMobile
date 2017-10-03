import React, {Component} from "react";
import {
  Body, Button, Card, Container, Content,  Item, List, ListItem, Picker, Right, Text,
  View,Icon
} from "native-base";

import {UIManager} from 'react-native';
import SceneEnum from '../Enums/SceneEnum';
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import Divider from "react-native-material-design/lib/Divider";
import DrawerComponent from "../Component/Telas/DrawerComponent";
import ButtonDrawer from "../Component/Campos/ButtonDrawer";
import {NavigationActions} from 'react-navigation'


let self;
export default class ModoPesquisaScene extends Component {

  constructor(props) {
    super(props);
    self = this;
    this.state = {
      localizacao: null,
      language: null
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Modo de pesquisa',
    headerLeft: <ButtonDrawer onPress={() => self.drawer.toggleDrawer()}/>,
    // headerRight: <Button transparent ><Picker><Item label="Alterar contexto"></Item></Picker>><Icon name='more' style={{color : '#fff'}}/></Button>


  });

  componentWillMount() {
    this.fetchData();

  }

  fetchData() {
    let id = StaticStorageService.usuarioSessao._id;
    PacienteService.get(id)
      .then((response) => {
        console.log(response);
        this.setState({localizacao: response.data.localizacao});
      })
      .catch((erro) => console.log('ERRO: ', erro));
  }

  hasLocalizacao() {
    return (this.state.localizacao !== null);
  }

  modoPesquisa() {
    const {navigate} = this.props.navigation;
    const modos = [
      {text: 'Pesquisar por nome', filtro: '?nome='},
      {text: 'Pesquisar por especialidade', filtro: '?especialidade='},
    ];
    return (

      <Container>
        <Content>
          <ListItem itemDivider>

            <Text note style={{margin: 10, textAlign: 'center'}}>Todas as pesquisas consideram sua localização
              cadastrada.</Text>
          </ListItem>

          <List dataArray={modos} renderRow={(item) =>

            <ListItem icon button onPress={() => navigate(SceneEnum.PESQUISA_MEDICO, {
              filtro: item.filtro,
              localizacao: this.state.localizacao
            })}>
              <Body>

              <Text>{item.text}</Text>
              </Body>
              <Right>
                <Icon name='arrow-forward'/>
              </Right>
            </ListItem>

          }>
          </List>
        </Content>
      </Container>
    );
  }

  cadastrarLocalizacao() {
    const {navigate} = this.props.navigation;
    return (
      <ListItem>
        <TouchableItem
          onPress={() => navigate(SceneEnum.CADASTRO_LOCALIZACAO)}>
          <Content>
            <Text>Você ainda não possui localizacao cadastrada</Text>
            <Text note>Clique aqui para cadastrar</Text>
          </Content>
        </TouchableItem>
      </ListItem>
    );
  }

  render() {

    return (

      <DrawerComponent ref={(ref) => self.drawer = ref} {...this.props}>
        <Container>
          <Content>

            <Card>
              <List>
                {(this.hasLocalizacao()) ? this.modoPesquisa() : this.cadastrarLocalizacao()}
              </List>
            </Card>
          </Content>
        </Container>
      </DrawerComponent>
    );
  }


}