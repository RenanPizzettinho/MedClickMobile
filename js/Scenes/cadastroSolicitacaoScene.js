import React, {Component} from "react";
import styles from "../StyleSheet/mainStyle";
import {Card, Container, Content, Form, H1} from "native-base";
import {Alert, AsyncStorage, Image, ScrollView} from "react-native";
import SolicitacaoService from "../Services/solicitacaoService";
import CampoTexto from "../Component/CampoTexto";
import CampoData from "../Component/CampoData";
import BotaoBase from "../Component/BotaoBase";

export default class CadastroSolicitacaoScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sintomas: "",
            dataConsulta: new Date(),
            localConsulta: "",
            nomeMedico: "Médico"
        };
    }

    componentWillMount() {
        this.setState({nomeMedico: CadastroSolicitacaoScene.getNomeMedico()});
    }

    static async getNomeMedico() {
        return await AsyncStorage.getItem('nomeMedico');
    }

    async cadastrar() {
        const {navigate} = this.props.navigation;
        let idPerfil = await AsyncStorage.getItem('idPerfil');
        let idMedicoConsulta = await AsyncStorage.getItem('idMedicoConsulta');

        const form = {
            idMedico: idMedicoConsulta,
            idPaciente: idPerfil,
            descricaoNecessidade: this.state.sintomas,
            dataConsulta: this.state.dataConsulta,
            localConsulta: this.state.localConsulta
        };

        SolicitacaoService.cadastrarSolicitacao(form)
            .then((responseJson) => {
                Alert.alert("Mensagem", "Solicitação registrada com sucesso.");
                if (responseJson.data._id) {
                    navigate('ListaSolicitacoes');
                }
            }).catch((error) => {
            Alert.alert('Erro', 'Erro ao registrar solicitação de atendimento!');
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <ScrollView>
                            <Card>
                                <Form>
                                    <H1>{this.state.nomeMedico}</H1>
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
                                        label="Sintomas"
                                        onChange={(sintomas) =>
                                            this.setState({sintomas})
                                        }
                                    />
                                    <CampoTexto
                                        label="Endereço"
                                        onChange={(localConsulta) =>
                                            this.setState({localConsulta})
                                        }
                                    />
                                    <CampoData
                                        label="Data "
                                        data={this.state.dataConsulta}
                                        setData={(data) => this.setState({dataConsulta: data})}
                                        style={{marginLeft: 10}}
                                    />
                                </Form>
                            </Card>
                            <BotaoBase
                                title="Registrar"
                                disabled={CadastroSolicitacaoScene.disabled(this.state)}
                                onPress={() => this.cadastrar()}
                            />
                        </ScrollView>
                    </Form>
                </Content>
            </Container>
        )
    }

    static disabled(state) {
        return !state.sintomas || !state.localConsulta;
    }
}


