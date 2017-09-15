import React, {Component} from "react";
import {ToastAndroid} from "react-native";
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";
import SceneEnum from "../Enums/SceneEnum";
import {Body, Card, Container, Content, Form, H3, ListItem, Text, View} from "native-base";
import CheckBoxBase from "../Component/Campos/CheckBoxBase";
import BotaoBase from "../Component/Campos/BotaoBase";
import Divider from "react-native-material-design/lib/Divider";
import Moment from "moment";

export default class CadastroPacienteScene extends Component {

    static navigationOptions = {
        title: 'Perfil de paciente',
    };

    constructor(props) {
        super(props);

        this.state = {
            idPaciente: null,
            possuiDiabete: false,
            possuiPressaoAlta: false,
            integracoes: {
                azumio: {
                    token: null,
                    atualizadoEm: null,
                    dados: [
                        {
                            batimentos: null,
                            dataLeitura: null,
                        },
                    ]
                }
            }
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        PacienteService.get(StaticStorageService.usuarioSessao._id)
            .then((response) => {
                let dados = response.data;
                if (dados === undefined) return;
                this.setState({
                    idPaciente: dados._id,
                    possuiDiabete: dados.possuiDiabete,
                    possuiPressaoAlta: dados.possuiPressaoAlta,
                    integracoes: dados.integracoes
                });
            });
    }

    salvarPaciente(state) {
        const userId = StaticStorageService.usuarioSessao._id;
        const {navigate} = this.props.navigation;

        let form = {
            possuiDiabete: state.possuiDiabete,
            possuiPressaoAlta: state.possuiPressaoAlta
        };

        if (!this.state.idPaciente) {
            PacienteService.salvar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de paciente cadastradas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    console.log('RESPONSE: ', response);
                    StaticStorageService.usuarioSessao.idPaciente = response.data._id;
                    console.log('USUARIO: ', StaticStorageService.usuarioSessao);
                    navigate(SceneEnum.MENU);
                });
        } else {
            PacienteService.atualizar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de paciente atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    console.log('RESPONSE: ', response);
                    StaticStorageService.usuarioSessao.idPaciente = response.data._id;
                    console.log('USUARIO: ', StaticStorageService.usuarioSessao);
                    navigate(SceneEnum.MENU);
                });
        }
    }

    atualizarDadosAzumio() {
        ToastAndroid.showWithGravity('Atualizando', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        PacienteService.atualizarAzumio(this.state.idPaciente)
            .then((resp) => {
                console.log(resp);
                this.setState({
                    integracoes: {
                        azumio: resp.integracoes.azumio
                    }
                });
                ToastAndroid.showWithGravity('Informações da Azumio atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            })
            .catch((err) => console.log(err));
    }

    integracoesAzumio() {
        console.log(this.state.integracoes.azumio.dados);
        return (
            <View>
                <Card>
                    <H3 style={{textAlign: "center"}}>Azumio</H3>
                    <Body>
                    {this.state.integracoes.azumio.dados.map((item, index) =>
                        <View key={index}>
                            <ListItem>
                                <Text note>{`Batimentos: ${item.batimentos} - Data marcação: ${Moment(item.dataLeitura).format('DD/MM/YYYY')}`}</Text>
                            </ListItem>
                        </View>
                    )}
                    <Text>Atualizados
                        em: {Moment(this.state.integracoes.azumio.atualizadoEm).format('DD/MM/YYYY')}</Text>
                    </Body>
                </Card>
                <BotaoBase
                    text={'Atualizar dados'}
                    title={'Atualizar dados'}
                    disabled={false}
                    onPress={() => this.atualizarDadosAzumio()}
                />
            </View>
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <H3 style={{textAlign: "center"}}>Dados do paciente</H3>
                        <Divider/>
                        <Form>
                            <CheckBoxBase
                                label="Possui diabetes?"
                                checked={this.state.possuiDiabete}
                                onPress={() => {
                                    this.setState({possuiDiabete: !this.state.possuiDiabete});
                                }}
                            />
                            <CheckBoxBase
                                label="Possui pressão alta?"
                                checked={this.state.possuiPressaoAlta}
                                onPress={() => {
                                    this.setState({possuiPressaoAlta: !this.state.possuiPressaoAlta});
                                }}
                            />

                        </Form>
                    </Card>
                    <BotaoBase
                        title="Salvar"
                        onPress={() => {
                            this.salvarPaciente(this.state);
                        }}
                    />
                    {(this.state.integracoes.azumio.token) ? this.integracoesAzumio() : null}
                </Content>
            </Container>
        );
    }
}