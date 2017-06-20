import React, {Component} from "react";

import {Alert, AsyncStorage, ToastAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroMedicoComponent from "../Component/CadastroMedicoComponent";

export default class CadastroMedicoScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crm: '123',
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


    render() {
        return (
            <CadastroMedicoComponent
                states={this.state}
                salvar={this.salvarMedico}
                fetchData={this.fetchData}
            />
        );
    }

    async fetchData() {
        const userId = await AsyncStorage.getItem('userId');
        UsuarioService.getUsuario(userId)
            .then((response) => {
                let dados = response.data.medico;
                // Alert.alert("medico", JSON.stringify(dados));
                this.setState({
                    crm: dados.crm,
                    atendeEm: dados.atendeEm,
                    especialidade: dados.especialidade
                });
                // Alert.alert("crm", JSON.stringify(this.state.crm));

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
            diasAtendimentoDomicilio: []
        };

        //['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']

        if (this.state.segunda)
            form.diasAtendimentoDomicilio.push('seg');

        if (this.state.terca)
            form.diasAtendimentoDomicilio.push('ter');

        if (this.state.quarta)
            form.diasAtendimentoDomicilio.push('qua');

        if (this.state.quinta)
            form.diasAtendimentoDomicilio.push('qui');

        if (this.state.sexta)
            form.diasAtendimentoDomicilio.push('sex');

        if (this.state.sabado)
            form.diasAtendimentoDomicilio.push('sab');

        if (this.state.domingo)
            form.diasAtendimentoDomicilio.push('dom');


        const userId = await AsyncStorage.getItem('userId');

        form._id = userId;

        // Alert.alert('Cadastro', JSON.stringify(form))

        UsuarioService.salvarMedico(userId, form)
            .then((response) => {
                ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                // Alert.alert('Cadastro', JSON.stringify(response))
            })
            .catch((error) => {
                Alert.alert('Erro', JSON.stringify(error));
            });
    }
}