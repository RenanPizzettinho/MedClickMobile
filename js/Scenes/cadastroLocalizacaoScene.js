import React, {Component} from "react";
import {Card, Container, Content, H3, Text} from "native-base";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import MedicoSevice from "../Services/medicoService";
import ContextoEnum from "../Enums/ContextoEnum";

export default class CadastroLocalizacaoScene extends Component {

    static navigationOptions = {
        title: 'Informações de localização',
    };

    constructor(props) {
        super(props);
        this.state = {
            localizacao: {},
            error: null,
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        (StaticStorageService.contexto === ContextoEnum.PACIENTE) ? this.paciente() : this.medico();
    }


    paciente() {
        PacienteService.get(StaticStorageService.usuarioSessao._id)
            .then(this.setLocalizacao.bind(this))
            .catch((erro) => console.log('ERRO:', erro));
    }

    medico() {
        MedicoSevice.get(StaticStorageService.usuarioSessao._id)
            .then(this.setLocalizacao.bind(this))
            .catch((erro) => console.log('ERRO:', erro));
    }

    setLocalizacao(response) {
        console.log('RESPONSE: ', response.localizacao);
        let dados = response.data[0];
        if (dados.localizacao === undefined) {
            return;
        }
        this.setState({
            localizacao: {
                longitude: dados.localizacao[0],
                latitude: dados.localizacao[1]
            }
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Content>
                    <Card>
                        <H3 style={{textAlign: 'center'}}>Localização</H3>
                        <Text>Latitude: {this.state.localizacao.latitude}</Text>
                        <Text>Longitude: {this.state.localizacao.longitude}</Text>
                        <Text>Endereço: {this.state.endereco}</Text>
                    </Card>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                    <BotaoBase
                        text="Atualizar localização"
                        title="Atualizar localização"
                        onPress={() => navigate(SceneEnum.WEBVIEW_MAPS)}
                    />
                </Content>
            </Container>
        );
    }

    /*getLocalizacao() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
        );
    }*/


}