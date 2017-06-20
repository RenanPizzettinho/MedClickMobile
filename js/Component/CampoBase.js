import React, {Component} from "react";
import {Input, Item, Label} from "native-base";

export default class CampoBase extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Item>
                <Label>{this.props.label}</Label>
                <Input
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    secureTextEntry={this.props.secureTextEntry || false}
                />
            </Item>
        );
    }
}