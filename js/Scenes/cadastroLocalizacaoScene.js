import React, {Component} from "react";
import {Container, Content, Text} from "native-base";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";

export default class CadastroLocalizacaoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Content>
                    <Text>
                        Localização
                        Latitude:{this.state.latitude}
                        Longitude:{this.state.longitude}
                    </Text>
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