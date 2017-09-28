import React, {Component} from "react";
import {Body, Card, Container, Content, Icon, List, ListItem, Right, Text} from "native-base";
import SceneEnum from '../Enums/SceneEnum';
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import Divider from "react-native-material-design/lib/Divider";
// import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";

export default class ModoPesquisaScene extends Component {
  static navigationOptions = {
    title: 'Modo de pesquisa'
  };

  constructor(props) {
    super(props);
    this.state = {
      localizacao: null
    };
  }

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

            <Text note style={{margin: 10, textAlign: 'center'}}>Todas as pesquisas consideram sua localização cadastrada.</Text>
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
      <Container>
        <Content>
          <Card>
            <List>
              {(this.hasLocalizacao()) ? this.modoPesquisa() : this.cadastrarLocalizacao()}
            </List>
          </Card>
        </Content>
      </Container>
    );
  }


}