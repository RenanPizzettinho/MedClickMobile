import React, {Component} from "react";
import MenuComponent from "../Component/Telas/MenuComponent";
import SceneEnum from "../Enums/SceneEnum";
import DrawerComponent from "../Component/Telas/DrawerComponent";
import ButtonDrawer from "../Component/Campos/ButtonDrawer";

let self;
export default class integrarAppMenuScene extends Component {

  static navigationOptions = {
    title: 'Integrar com outros aplicativos',
    headerLeft: <ButtonDrawer onPress={() => self.drawer.toggleDrawer()}/>
  };

  constructor(props) {
    super(props);
    self = this;
    this.state = {}
  }


  render() {
    return (
      <DrawerComponent ref={(ref) => self.drawer = ref} {...this.props}>
        <MenuComponent
          navigation={this.props.navigation}
          aplicativos={true}
        />
      </DrawerComponent>
    );
  }
}