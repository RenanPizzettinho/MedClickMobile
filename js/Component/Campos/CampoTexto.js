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
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}