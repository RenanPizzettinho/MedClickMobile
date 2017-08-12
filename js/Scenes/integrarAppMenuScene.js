import React, {Component} from "react";
import MenuComponent from "../Component/Telas/MenuComponent";
import SceneEnum from "../Enums/SceneEnum";

export default class integrarAppMenuScene extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    aplicativos(){
        return [{
            header: 'AplicacaoExemplo',
            nota: 'Traga dados de AplicativoExemplo',
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