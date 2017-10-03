import React, {Component} from "react";


const {findNodeHandle} = React;
import {UIManager, TouchableOpacity} from 'react-native'
import {View} from 'react-native';
import {Icon} from "native-base";
const ICON_SIZE = 24;

class PopupMenu extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  handleMenuPress = () => {
    const { actions, onPress } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.refs.menu),
      actions,
      this.handleShowPopupError,
      onPress,
    );
  };

  render() {
    return (
      <View>
        { this.props.children }
        <TouchableOpacity onPress={this.handleMenuPress}>
          <Icon
            name="android-more-vertical"
            size={ICON_SIZE}
            color={'grey'}
            ref="menu"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

PopupMenu.propTypes = {
  actions: React.PropTypes.array.isRequired,
  onPress: React.PropTypes.func.isRequired,
  children: React.PropTypes.object.isRequired,
};

export default PopupMenu;