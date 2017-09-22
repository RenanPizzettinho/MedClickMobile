import React, {Component} from "react";
import {Input, Item, Label} from "native-base";

export default class CampoBase extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Item floatingLabel>
                <Label>{this.props.label}</Label>
                <Input
                    value={this.props.value}
                    multiline={this.props.multiline || false}
                    onChangeText={this.props.onChange}
                    secureTextEntry={this.props.secureTextEntry || false}
                    disabled={this.props.disabled}
                />
            </Item>
        );
    }
}