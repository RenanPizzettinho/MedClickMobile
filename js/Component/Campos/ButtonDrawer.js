import React, {Component} from "react";
import {Button, Icon} from "native-base";


export default class ButtonDrawer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Button
        {...this.props}
        transparent
        delayLongPress={3800}>
        <Icon name="menu" style={{color: '#ffffff'}}/>
      </Button>
    );
  }
}