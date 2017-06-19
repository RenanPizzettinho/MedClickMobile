import React, {Component} from "react";

import {Alert, AsyncStorage} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroMedicoComponent from "../Component/CadastroMedicoComponent";

export default class CadastroMedicoScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crm: '',
            especialidade: '',
            atendeEm: '',
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        }
    }

//TODO:ver picker
    render() {
        return (
            <CadastroMedicoComponent
                states={this.state}
                salvar={this.salvarMedico}
            />
        );
    }

    async componentWillMount() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                let dados = response.data.medico;
                this.setState({
                    crm: dados.crm,
                    especialidade: dados.especialidade,
                    atendeEm: dados.atendeEm
                });
                //TODO: VER LEITURA DO ENUM
            })
            .catch(
                (error) => {
                    Alert.alert('Erro', JSON.stringify(error));
                }
            );
    }

    async salvarMedico() {
        let form = {
            crm: this.state.crm,
            especialidade: this.state.especialidade,
            atendeEm: this.state.atendeEm,
            dias_atendimento_domicilio: []
        };

        //['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']

        if (this.state.segunda)
            form.dias_atendimento_domicilio.push('seg');

        if (this.state.terca)
            form.dias_atendimento_domicilio.push('ter');

        if (this.state.quarta)
            form.dias_atendimento_domicilio.push('qua');

        if (this.state.quinta)
            form.dias_atendimento_domicilio.push('qui');

        if (this.state.sexta)
            form.dias_atendimento_domicilio.push('sex');

        if (this.state.sabado)
            form.dias_atendimento_domicilio.push('sab');

        if (this.state.domingo)
            form.dias_atendimento_domicilio.push('dom');


        const userId = await AsyncStorage.getItem('userId');

        form._id = userId;

        // Alert.alert('Cadastro', JSON.stringify(form))

        UsuarioService.salvarMedico(userId, form)
            .then((response) => {
                Alert.alert('Cadastro', JSON.stringify(response))
            })
            .catch((error) => {
                Alert.alert('Erro', JSON.stringify(error));
            });
    }
}