import React, {Component} from "react";
import {Button} from "react-native";

export default class BotaoBase extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Button
                text={this.props.text || ''}
                title={this.props.title || ''}
                disabled={this.props.disabled || false}
                onPress={this.props.onPress}
                style={this.props.style||{flex:1, flexDirection: 'row'}}
            />
        );
    }
}