import React, {Component} from "react";
import MenuComponent from "../Component/Telas/MenuComponent";
import SceneEnum from "../Enums/SceneEnum";

export default class integrarAppMenuScene extends Component {

    static navigationOptions = {
        title: 'Integrar com outros aplicativos',
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    aplicativos(){
        return [{
            header: 'Azumio',
            nota: 'Traga dados de batimento cardiaco',
            irPara: SceneEnum.INTEGRAR_AZUMIO,
            icone: require('../Images/MedClickLogo.png'),
        }];
    }

    render() {
        return (
            <MenuComponent
                navigation={this.props.navigation}
                menus={this.aplicativos()}
            />
        );
    }
}