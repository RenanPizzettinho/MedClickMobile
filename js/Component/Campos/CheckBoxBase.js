import React, {Component} from "react";
import {CheckBox, ListItem, Text} from "native-base";
// import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";
import TouchableItem from "react-navigation/src/views/TouchableItem";

export default class CheckBoxBase extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ListItem>
                <CheckBox
                    checked={this.props.checked || false}
                    onPress={this.props.onPress}
                />
                <TouchableItem onPress={this.props.onPress}>
                    <Text>  {this.props.label}</Text>
                </TouchableItem>
            </ListItem>
        );
    }
}