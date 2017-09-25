import React, {Component} from "react";
import {Input, Item, Label, View} from "native-base";
import {TextInput} from "react-native";

export default class CampoBase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{marginTop: 10, flex: 1}}>
        <Label style={{fontSize: 15}}>{this.props.label}</Label>
        <Item regular >
          <Input
            {...this.props}
            style={{height: 40, flex: 1}}
            value={this.props.value}
            multiline={this.props.multiline || false}
            onChangeText={this.props.onChange}
            secureTextEntry={this.props.secureTextEntry || false}
            disabled={this.props.disabled}
          />
        </Item>
      </View>
    );
  }
}