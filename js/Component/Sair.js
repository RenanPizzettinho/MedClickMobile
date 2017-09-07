import React, {Component} from "react";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {Icon} from "native-base";
import SceneEnum from "../Enums/SceneEnum";

export default class Sair extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <TouchableItem onPress={() => navigate(SceneEnum.LOGIN)}>
                <Icon name='ios-exit-outline'/>
            </TouchableItem>
        );
    }

}