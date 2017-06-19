import React, {Component} from "react";
import {Item, Picker, Text} from "native-base";

export default class SelectBase extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.states;
    }
    //TODO: Verificar label piker
    render() {
        return (
            <Picker
                supportedOrientations={this.props.supportedOrientations || ['portrait', 'landscape']}
                headerComponent={this.header}
                mode={this.props.mode || "dropdown"}
                selectedValue={this.props.selectedValue || {}}
                onValueChange={this.props.onValueChange}
            >
                {this.itens()}
            </Picker>
        );
    }

    itens() {
        return (this.props.itens.map(
                (item, index) =>
                    <Item
                        key={index}
                        label={item.label}
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