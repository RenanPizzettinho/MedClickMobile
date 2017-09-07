import React, {Component} from "react";
import {Item, Label, Picker, Text} from "native-base";
import {View} from "react-native";

export default class SelectBase extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.states;
    }

    render() {
        return (
            <View>
                <Label>{this.props.title}</Label>
                <Picker
                    supportedOrientations={this.props.supportedOrientations || ['portrait', 'landscape']}
                    headerComponent={this.header}
                    prompt={this.props.title}
                    selectedValue={this.props.selectedValue || {}}
                    onValueChange={this.props.onValueChange}
                >
                    {this.itens()}
                </Picker>
            </View>
        );
    }

    itens() {
        return (this.props.itens.map(
                (item, index) =>
                    <Item
                        key={index}
                        label={item.value}
                        value={item.value}
                    />
            )
        )
    }

    header() {
        return (
            <Text>  {this.props.label}</Text>
        )
    }
}