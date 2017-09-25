import React, {Component} from "react";
import MenuComponent from "../Component/Telas/MenuComponent";
import ContextoEnum from "../Enums/ContextoEnum";
import StaticStorageService from '../Services/staticStorageService';
import SceneEnum from '../Enums/SceneEnum';


export default class MenuScene extends Component {
    static navigationOptions = {
        title: 'Menu',
    };
    constructor(props) {
        super(props);
        this.state = {};
        this.menus = [
            {
                header: 'Solicitar atendimento',
                nota: 'Solicite aqui a sua proxima consulta',
                irPara: SceneEnum.MODO_PESQUISA,
                icone: require('../Images/AtendimentoLogo2.png'),
                perfil: ContextoEnum.PACIENTE
            },
            {
                header: 'Atendimentos',
                nota: 'Atendimentos em aberto',
                irPara: SceneEnum.LISTAGEM_SOLICITACAO,
                icone: require('../Images/AtendimentoLogo3.png'),
                perfil: ContextoEnum.PACIENTE
            },
            {
                header: 'Atendimentos',
                nota: 'Atendimentos em aberto',
                irPara: SceneEnum.LISTAGEM_SOLICITACAO,
                icone: require('../Images/AtendimentoLogo3.png'),
                perfil: ContextoEnum.MEDICO
            },
            {
                header: 'Informações de usuário',
                nota: 'Informações de usuário',
                irPara: SceneEnum.CADASTRO_PESSOA,
                icone: require('../Images/UserLogo.png'),
                perfil: null
            },
            {
                header: 'Perfil de paciente',
                nota: 'Atualize aqui suas informações de saúde',
                irPara: SceneEnum.CADASTRO_PACIENTE,
                icone: require('../Images/paciente.png'),
                perfil: ContextoEnum.PACIENTE
            },
            {
                header: 'Perfil de médico',
                nota: 'Atualize as informações que vão aparecer no seu perfil médico',
                irPara: SceneEnum.CADASTRO_MEDICO,
                icone: require('../Images/MedicoLogo.png'),
                perfil: ContextoEnum.MEDICO
            },
            {
                header: 'Informações de localização',
                nota: 'Atualize as suas informações de localização',
                irPara: SceneEnum.CADASTRO_LOCALIZACAO,
                icone: require('../Images/compass.png'),
                perfil: null
            },
            {
                header: 'Integrar com outras App`s',
                nota: 'Traga dados dos seus aplicativos de treino favoritos',
                irPara: SceneEnum.INTEGRAR_APP_MENU,
                icone: require('../Images/integracao.png'),
                perfil: ContextoEnum.PACIENTE
            },
        ];

        this.menus = this.menus.filter((item)=>{
            return item.perfil === StaticStorageService.contexto || item.perfil === null;
        });
    }

    render() {
        return (
            <MenuComponent
                navigation={this.props.navigation}
                menus={this.menus}
            />
        );
    }

}