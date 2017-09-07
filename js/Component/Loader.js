import React, {Component} from "react";
import {ActivityIndicator} from "react-native";

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ActivityIndicator
                animating={true}
                style={{height: 80}}
                size="large"
            />
        );
    }
}