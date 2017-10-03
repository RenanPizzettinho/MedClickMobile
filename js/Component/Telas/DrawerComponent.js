import React, {Component} from "react";
import {Button, Container, Icon, Text, View} from "native-base";
import {DrawerLayoutAndroid} from "react-native";
import MenuComponent from "./MenuComponent";


export default class DrawerComponent extends Component {
  constructor(props){
    super(props);

    this.toggleDrawer = function(){
      this.refs['DRAWER'].isOpen ? this.closeDrawer() : this.openDrawer();
    }
  }

  // static toggleDrawer = function(){
  //   this.props.isOpen ? DrawerComponent.closeDrawer() : DrawerComponent.openDrawer();
  // };


  closeDrawer() {
    // DrawerComponent.drawer.closeDrawer();
    // DrawerComponent.props.isOpen = false;
    this.refs['DRAWER'].closeDrawer();
    this.refs['DRAWER'].isOpen = false;
  }


  openDrawer() {
    this.refs['DRAWER'].openDrawer();
    this.refs['DRAWER'].isOpen = true;
    // DrawerComponent.drawer.openDrawer();
    // DrawerComponent.props.isOpen = true;
  }

  render(){
    const {navigate} = this.props.navigation;
    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <MenuComponent {...this.props}/>
        <Button danger full small style={{}} onPress={() => navigate('Main')}><Icon name="exit" style={{marginRight: 15}}></Icon><Text>Fazer logoff</Text></Button>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        // ref={(ref) => DrawerComponent.drawer = ref}
        ref={'DRAWER'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        onDrawerOpen={() => this.refs['DRAWER'].isOpen = true}
        onDrawerClose={() => {this.refs['DRAWER'].isOpen = false}}
        // onDrawerOpen={() => DrawerComponent.props.isOpen = true}
        // onDrawerClose={() => {DrawerComponent.props.isOpen = false}}
        renderNavigationView={() => navigationView}>
        {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}