import React, {Component} from "react";
import MenuComponent from "../Component/Telas/MenuComponent";
import ContextoEnum from "../Enums/ContextoEnum";
import StaticStorageService from '../Services/staticStorageService';
import SceneEnum from '../Enums/SceneEnum';
import {Body, Button, Container, Content, Header, Icon, Left, Title} from "native-base";


export default class MenuScene extends Component {
  static navigationOptions = ({navigation}) =>({

    title: 'Menu',
    // header: null
})


  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content>
          <MenuComponent {...this.props} />
        </Content>
      </Container>
    );
  }

}