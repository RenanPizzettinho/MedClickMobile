import React, {Component} from "react";
import CampoBase from "./CampoBase";

export default class CampoTexto extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <CampoBase
                label={this.props.label}
                multiline={this.props.multiline || false}
                value={this.props.value}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
            />
        );
    }
}