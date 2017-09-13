import React, {Component} from "react";
import styles from "../StyleSheet/mainStyle";
import {Card, Container, Content, Form, H3, ListItem, Text} from "native-base";
import {Image, ScrollView, ToastAndroid} from "react-native";
import SolicitacaoService from "../Services/solicitacaoService";
import CampoTexto from "../Component/Campos/CampoTexto";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import StaticStorageService from "../Services/staticStorageService";
import PacienteService from "../Services/pacienteService";

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
            nomeMedico: "Médico",
            enderecoCadastro: true,
            endereco: {},
            localConsulta: " "
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
                    endereco: response.data.paciente.endereco,
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
            dataConsulta: this.state.dataConsulta,
            complemento: this.state.complemento,
            endereco: this.state.endereco,
            localConsulta: "asdasda ",
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
                                    <H3>{this.state.nomeMedico}</H3>
                                    <Image
                                        source={require('../Images/UserLogo.png')}
                                        object={styles.img}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            alignSelf: "center",
                                            marginTop: 10,
                                            marginBottom: 10
                                        }}
                                    />
                                    <CampoTexto
                                        label="Necessidade"
                                        multiline={true}
                                        onChange={(descricaoNecessidade) =>
                                            this.setState({descricaoNecessidade})
                                        }
                                    />
                                    <ListItem>
                                        <Text>Endereço descritivo aqui</Text>
                                    </ListItem>
                                    <CampoTexto
                                        label="Complemento"
                                        onChange={(complemento) =>
                                            this.setState({complemento})
                                        }
                                    />
                                    {/*<CampoData*/}
                                    {/*label="Data "*/}
                                    {/*data={this.state.dataConsulta}*/}
                                    {/*setData={(data) => this.setState({dataConsulta: data})}*/}
                                    {/*style={{marginLeft: 10}}*/}
                                    {/*/>*/}
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


