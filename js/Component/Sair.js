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
        return (
            <TouchableItem onPress={this.sair}>
                <Icon name='ios-exit-outline'/>
            </TouchableItem>
        );
    }

    sair(){
        const {navigate} = this.props.navigation;
        navigate(SceneEnum.LOGIN);
    }
}