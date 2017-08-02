import React, {Component} from "react";
import {ToastAndroid} from "react-native";
import PacienteService from "../Services/pacienteService";
import CadastroPacienteComponent from "../Component/Telas/CadastroPacienteComponent";
import StaticStorageService from "../Services/staticStorageService";
import SceneEnum from '../Enums/SceneEnum';


export default class CadastroPacienteScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            possuiDiabete: false,
            possuiPressaoAlta: false
        };
    }

    render() {
        return (
            <CadastroPacienteComponent
                salvar={this.salvarPaciente}
                states={this.state}
                fetchData={this.fetchData}
                navigation={this.props.navigation}
            />
        );
    }

    async fetchData() {
        PacienteService.get(StaticStorageService.usuarioSessao._id)
            .then((response) => {
                let dados = response.data[0];
                if (dados === undefined) return;
                this.setState({
                    idPaciente: dados._id,
                    possuiDiabete: dados.possuiDiabete,
                    possuiPressaoAlta: dados.possuiPressaoAlta
                });
            });
    }

    async salvarPaciente(state) {
        const userId = StaticStorageService.usuarioSessao._id;
        const {navigate} = this.props.navigation;

        let form = {
            _id: userId,
            possuiDiabete: state.possuiDiabete,
            possuiPressaoAlta: state.possuiPressaoAlta
        };

        if (!this.state.idPaciente) {
            PacienteService.salvar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de paciente cadastradas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    navigate(SceneEnum.MENU);
                });
        } else {
            PacienteService.atualizar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de paciente atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    navigate(SceneEnum.MENU);
                });
        }


    }


}