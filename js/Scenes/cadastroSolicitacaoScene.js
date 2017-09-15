import React, {Component} from "react";
import styles from "../StyleSheet/mainStyle";
import {Card, Container, Content, Form, H3, ListItem, Text, View} from "native-base";
import {Image, ScrollView, ToastAndroid, StyleSheet} from "react-native";
import SolicitacaoService from "../Services/solicitacaoService";
import CampoTexto from "../Component/Campos/CampoTexto";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import StaticStorageService from "../Services/staticStorageService";
import PacienteService from "../Services/pacienteService";
import LocalizacaoService from "../Services/localizacaoService";
import DatePicker from "react-native-datepicker";
import Moment from "moment";


export default class CadastroSolicitacaoScene extends Component {

    static navigationOptions = {
        title: 'Solicitar atendimento',
    };

    constructor(props) {
        super(props);

        this.state = {
            paciente: {},
            descricaoNecessidade: "",
            dataConsulta: new Date(),
            complemento: "",
            nomeMedico: "",
            enderecoCadastro: true,
            endereco: {},
            localizacao: {},
            dataConsulta: new Date(),
        };
    }

    componentWillMount() {
        this.getNomeMedico();
        this.getPaciente();
    }

    getPaciente() {
        PacienteService.byId(StaticStorageService.usuarioSessao.idPaciente)
            .then((response) => {
                console.log('PACIENTE: ', response);
                this.setState({
                    paciente: response.data,
                    localizacao: response.data.localizacao,
                    endereco: response.data.endereco,
                });
            })
    }

    getNomeMedico() {
        this.setState({nomeMedico: StaticStorageService.medicoConsulta.nome});
    }

    cadastrar() {
        const {navigate} = this.props.navigation;
        let perfil = StaticStorageService.usuarioSessao;
        let medicoConsulta = StaticStorageService.medicoConsulta;

        const form = {
            idMedico: medicoConsulta._id,
            idPaciente: perfil.idPaciente,
            descricaoNecessidade: this.state.descricaoNecessidade,
            localizacao: this.state.localizacao,
            dataConsulta: this.state.dataConsulta,
            complemento: this.state.complemento,
            endereco: this.state.endereco,
        };

        SolicitacaoService.cadastrar(form)
            .then((responseJson) => {
                ToastAndroid.showWithGravity('"Solicitação registrada', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                console.log('RESPONSE: ', responseJson);
                if (responseJson.data._id) {
                    navigate(SceneEnum.LISTAGEM_SOLICITACAO);
                }
            })
            .catch((error) => console.log('ERROR: ', error));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <ScrollView>
                            <Card>
                                <Form>
                                    <H3 style={{textAlign: 'center'}}>{this.state.nomeMedico}</H3>
                                    <ListItem>
                                        <CampoTexto
                                            label="Necessidade"
                                            multiline={true}
                                            onChange={(descricaoNecessidade) =>
                                                this.setState({descricaoNecessidade})
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <Text note>{`Endereço: ${LocalizacaoService.formatarEndereco(this.state.endereco)}`}</Text>
                                    </ListItem>
                                        <CampoTexto
                                            label="Complemento"
                                            onChange={(complemento) =>
                                                this.setState({complemento})
                                            }
                                        />
                                    <ListItem>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Text style={{justifyContent: 'center'}}>Data:</Text>
                                            <DatePicker
                                                style={{paddingRight: 0, paddingLeft: 0}}
                                                date={this.state.dataConsulta}
                                                mode="datetime"
                                                format="DD/MM/YYYY"
                                                minDate={new Date()}
                                                androidMode="calendar"
                                                showIcon={true}

                                                customStyles={{
                                                    dateInput: {
                                                        alignItems: 'flex-start',
                                                        padding: 0,
                                                    },
                                                }}
                                                onDateChange={(dataConsulta) => {
                                                    this.setState({dataConsulta});
                                                }}/>
                                        </View>
                                    </ListItem>
                                </Form>
                            </Card>
                            <BotaoBase
                                title="Registrar"
                                disabled={this.disabled(this.state)}
                                onPress={() => this.cadastrar()}
                            />
                        </ScrollView>
                    </Form>
                </Content>
            </Container>
        )
        //TODO: Fixar botoes no bottom
        //TODO: Verificar pq endereco nao esta vindo.
        //TODO: Ajustas atributos.
    }

    disabled(state) {
        return !state.descricaoNecessidade;
    }
}


