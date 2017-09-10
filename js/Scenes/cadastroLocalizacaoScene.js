import React, {Component} from "react";
import {View} from "native-base";
import {StyleSheet} from "react-native";
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import MedicoSevice from "../Services/medicoService";
import ContextoEnum from "../Enums/ContextoEnum";
import MapView from "react-native-maps";
import LocalizacaoService from "../Services/localizacaoService";
import BotaoBase from "../Component/Campos/BotaoBase";

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
            },
            coordinate: {
                longitude: dados.localizacao.longitude,
                latitude: dados.localizacao.latitude
            }
        });
    }

    save() {
        LocalizacaoService.getEndereco(this.state.coordinate.latitude, this.state.coordinate.longitude)
            .then((response) => {
                console.log('ENDERECO: ', response.results[0].address_components[0].short_name);
                let endereco = this.getEndereco(response);
                this.setState({endereco});
            })
            .catch((error) => console.log('ERRO: ', error));

        let body = {
            localizacao: {
                latitude: this.state.coordinate.latitude,
                longitude: this.state.coordinate.longitude
            },
            endereco: this.state.endereco
        };
        console.log('BODY: ', body);

        if (StaticStorageService.contexto === ContextoEnum.PACIENTE) {
            PacienteService.atualizar(StaticStorageService.usuarioSessao._id, body)
                .then((response) => console.log('RESPONSE: ', response))
                .catch((error => console.log('ERRO', error)));
        } else {
            MedicoSevice.atualizar(StaticStorageService.usuarioSessao._id, body)
                .then((response) => console.log('RESPONSE: ', response))
                .catch((error => console.log('ERRO', error)));
        }
    }

    getEndereco(response) {
        let addressComponents = response.results[0].address_components;
        let endereco = {};
        addressComponents.forEach((componente) => {
            componente.types.some((type) => {
                switch (type) {
                    case 'route':
                        endereco.rua = componente.short_name;
                        break;
                    case 'sublocality':
                        endereco.bairro = componente.short_name;
                        break;
                    case 'administrative_area_level_2':
                        endereco.cidade = componente.short_name;
                        break;
                    case 'administrative_area_level_1':
                        endereco.estado = componente.short_name;
                        break;
                    case 'country':
                        endereco.pais = componente.short_name;
                        break;
                    case 'postal_code':
                        endereco.cep = (componente.short_name.length === 5) ? componente.short_name + '-000' : componente.short_name;
                        break;
                }
                return true;
            })
        });
        console.log('ENDERECO: ', endereco);
        return endereco;
    }

    render() {
        return (
            <View style={{
                flex: 1,
                //     ...StyleSheet.absoluteFillObject,
                //     justifyContent: 'flex-end',
                //     alignItems: 'center',

            }}>
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
                        title={(StaticStorageService.contexto === ContextoEnum.PACIENTE) ? 'Onde quero ser atendido' : 'A partir de onde atendo'}
                    />

                </MapView>
                <View>
                    <BotaoBase
                        style={{flexDirection: 'row'}}
                        title={'Salvar'}
                        text={'Salvar'}
                        onPress={() => this.save()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // marginBottom: 0,
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
        flexDirection: 'row'
    },
});