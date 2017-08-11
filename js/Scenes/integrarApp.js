import React, {Component} from "react";
import MenuComponent from "../Component/Telas/MenuComponent";

export default class IntegrarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    aplicativos(){
        return [{
            header: 'AplicacaoExemplo',
            nota: 'Traga dados de AplicativoExemplo',
            irPara: null,
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