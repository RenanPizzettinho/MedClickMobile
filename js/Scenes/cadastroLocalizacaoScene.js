import React, {Component} from "react";
import {Text, View} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import MedicoSevice from "../Services/medicoService";
import ContextoEnum from "../Enums/ContextoEnum";
import MapView from "react-native-maps";
import LocalizacaoService from "../Services/localizacaoService";

export default class CadastroLocalizacaoScene extends Component {

    static navigationOptions = {
        title: 'Informações de localização',
    };

    constructor(props) {
        super(props);
        this.state = {
            localizacao: {},
            error: null,
            coordinate: {
                latitude: -28.6811714,
                longitude: -49.3760146,

            }
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
        console.log('RESPONSE: ', response.data.localizacao);
        let dados = response.data;
        if (dados.localizacao === undefined) {
            return;
        }
        this.setState({
            localizacao: {
                longitude: dados.localizacao.longitude,
                latitude: dados.localizacao.latitude
            }
        });
    }

    save() {
        LocalizacaoService.getEndereco(this.state.coordinate.latitude, this.state.coordinate.longitude)
            .then((response) => {
                console.log('ENDERECO: ', response.results[0].address_components[0].short_name);
                let endereco = {
                    rua: response.results[0].address_components[1].short_name,
                    bairro: response.results[0].address_components[2].short_name,
                    // cidade: response.results[0].address_components[3].short_name,
                    // estado: response.results[0].address_components[5].short_name,
                    // pais: response.results[0].address_components[6].short_name,
                    // cep: response.results[0].address_components[7].short_name,
                };
                this.setState({endereco});
            })
            .catch((error) => console.log('ERRO: ', error));


        if (StaticStorageService.contexto === ContextoEnum.PACIENTE) {
            PacienteService.atualizar(StaticStorageService.usuarioSessao._id, {
                localizacao: this.state.coordinate,
                endereco: this.state.getEndereco
            })
                .then((response) => console.log('RESPONSE: ', response))
                .catch((error => console.log('ERRO', error)));
        } else {
            MedicoSevice.atualizar(StaticStorageService.usuarioSessao._id, {localizacao: this.state.coordinate})
                .then((response) => console.log('RESPONSE: ', response))
                .catch((error => console.log('ERRO', error)));
        }
    }

    render() {
        return (
            <View style={
                {
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }
            }>
                <MapView
                    style={styles.map}
                    provider='google'
                    followsUserLocation={true}
                    showsCompass={true}
                    toolbarEnabled={true}
                    zoomEnabled={true}
                    loadingEnabled={true}
                    showsScale={true}
                    onPress={(e) => {
                        this.setState({coordinate: e.nativeEvent.coordinate});
                        console.log('COORDINATE: ', `${this.state.coordinate.latitude} - ${this.state.coordinate.longitude}`);
                    }}
                    showsUserLocation={true}
                >
                    <MapView.Marker
                        coordinate={this.state.coordinate}
                        title={'Minha localizacao'}
                    />

                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.save()}
                        style={styles.bubble}
                    >
                        <Text>Tap to create a marker of random color</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    buttonContainer: {

        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
});