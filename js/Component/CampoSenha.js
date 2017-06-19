import React, {Component} from "react";
import CampoBase from "./CampoBase";

export default class CampoSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <CampoBase
                label={this.props.label}
                onChange={this.props.onChange}
                secureTextEntry={true}
            />
        );
    }
}