import React, {Component} from "react";
import {Card, Container, Content, H3, Text} from "native-base";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";

export default class CadastroLocalizacaoScene extends Component {

    static navigationOptions = {
        title: 'Informações de localização',
    };

    constructor(props) {
        super(props);
        this.state = {
            localizacao: {
                latitude: null,
                longitude: null,
                endereco: null,
            },
            error: null,
        };
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData() {
        PacienteService.get(StaticStorageService.usuarioSessao._id)
            .then((response) => {
                let dados = response.data[0];
                if (dados === undefined) return;
                this.setState({localizacao: dados.localizacao});
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Content>
                    <Card>
                        <H3 style={{textAlign: 'center'}}>Localização</H3>
                        <Text>Latitude: {this.state.latitude}</Text>
                        <Text>Longitude: {this.state.longitude}</Text>
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