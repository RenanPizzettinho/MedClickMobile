import React, {Component} from "react";
import {Container, Content, Text} from "native-base";
import StaticStorageService from "../Services/staticStorageService";
import ContextoEnum from "../Enums/ContextoEnum";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";

export default class CadastroLocalizacaoScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    componentDidMount() {
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
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>
                        Localização
                        Latitude:{this.state.latitude}
                        Longitude:{this.state.longitude}
                    </Text>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                </Content>
            </Container>
        );
    }
}