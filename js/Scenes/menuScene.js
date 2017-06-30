//oi
import React, {Component} from "react";
import MenuComponent from "../Component/MenuComponent";
import {Alert, AsyncStorage} from "react-native";

export default class MenuScene extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.menus = [
            {
                header: 'Solicitar atendimento',
                nota: 'Solicite aqui a sua proxima consulta',
                irPara: 'ListagemMedico',
                icone: require('../Images/AtendimentoLogo2.png'),
                perfil: 'PACIENTE'
            },
            {
                header: 'Atendimentos Paciente',
                nota: 'Atendimentos em aberto',
                irPara: 'ListagemSolicitacao',
                icone: require('../Images/AtendimentoLogo3.png'),
                perfil: null
            },
            {
                header: 'Atendimentos Medico',
                nota: 'Atendimentos em aberto',
                irPara: 'ListagemSolicitacaoMedico',
                icone: require('../Images/AtendimentoLogo3.png'),
                perfil: null
            },
            {
                header: 'Recados',
                nota: 'Recados das consultas realizadas',
                irPara: 'ListagemMensagem',
                icone: require('../Images/RecadosLogo.png'),
                perfil: null
            },
            {
                header: 'Informações pessoais',
                nota: 'Informações pessoais',
                irPara: 'CadastroPessoaScene',
                icone: require('../Images/UserLogo.png'),
                perfil: null
            },
            {
                header: 'Perfil de paciente',
                nota: 'Atualize aqui suas informações de saúde',
                irPara: 'CadastroPacienteScene',
                icone: require('../Images/paciente.png'),
                perfil: 'PACIENTE'
            },
            {
                header: 'Perfil de médico',
                nota: 'Atualize as informações que vao aparecer no seu perfil médico',
                irPara: 'CadastroMedicoScene',
                icone: require('../Images/MedicoLogo.png'),
                perfil: 'MEDICO'
            }
        ];
    }

    componentWillMount() {
        this.getPerfil().done();
    }

    render() {
        return (
            <MenuComponent
                navigation={this.props.navigation}
                menus={this.menus}
                getPerfil={this.getPerfil}
            />
        );
    }

    async getPerfil() {
        this.perfil = await AsyncStorage.getItem('perfil');
        let menuAtendimento = {
            header: 'Atendimentos',
            nota: 'Atendimentos em aberto',
            irPara: (this.perfil === 'PACIENTE' ? 'ListagemSolicitacao' : 'ListagemSolicitacaoMedico'),
            icone: require('../Images/AtendimentoLogo3.png'),
            perfil: null
        };

        this.menus.push(menuAtendimento);
        Alert.alert("Teste", JSON.stringify(this.menus));

        Alert.alert("perfil", this.perfil);
    }

}