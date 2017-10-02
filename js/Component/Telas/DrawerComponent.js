import React, {Component} from "react";
import {Container, Text, View} from "native-base";
import {DrawerLayoutAndroid} from "react-native";
import MenuComponent from "./MenuComponent";


export default class DrawerComponent extends Component {
  constructor(props){
    super(props);

    // this.toggleDrawer = function(){
    //   this.refs['DRAWER'].isOpen ? DrawerComponent.closeDrawer() : DrawerComponent.openDrawer();
    // }
  }

  static props = {
    isOpen : false
  };

  static toggleDrawer = function(){
    this.props.isOpen ? DrawerComponent.closeDrawer() : DrawerComponent.openDrawer();
  };


  static closeDrawer() {
    DrawerComponent.drawer.closeDrawer();
    DrawerComponent.props.isOpen = false;
    // this.refs['DRAWER'].closeDrawer();
    // this.refs['DRAWER'].isOpen = false;
  }

  static openDrawer() {
    // this.refs['DRAWER'].openDrawer();
    // this.refs['DRAWER'].isOpen = true;
    DrawerComponent.drawer.openDrawer();
    DrawerComponent.props.isOpen = true;
  }

  render(){
    const {navigate} = this.props.navigation;
    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <MenuComponent {...this.props}/>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={(ref) => DrawerComponent.drawer = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        // onDrawerClose={() => {this.refs['DRAWER'].isOpen = false}}
        onDrawerClose={() => {DrawerComponent.props.isOpen = false}}
        // onDrawerOpen={() => this.refs['DRAWER'].isOpen = true}
        onDrawerOpen={() => DrawerComponent.props.isOpen = true}
        renderNavigationView={() => navigationView}>
        {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}