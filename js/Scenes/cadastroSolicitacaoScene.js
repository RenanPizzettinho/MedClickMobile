import React, {Component} from "react";
import styles from "../StyleSheet/mainStyle";
import {Card, Container, Content, Form, H1} from "native-base";
import {Image, ScrollView, ToastAndroid} from "react-native";
import SolicitacaoService from "../Services/solicitacaoService";
import CampoTexto from "../Component/Campos/CampoTexto";
import CampoData from "../Component/Campos/CampoData";
import BotaoBase from "../Component/Campos/BotaoBase";
import SceneEnum from "../Enums/SceneEnum";
import StaticStorageService from "../Services/staticStorageService";

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
        this.getNomeMedico();
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
            descricaoNecessidade: this.state.sintomas,
            dataConsulta: this.state.dataConsulta,
            localConsulta: this.state.localConsulta
        };

        SolicitacaoService.cadastrar(form)
            .then((responseJson) => {
                ToastAndroid.showWithGravity('"Solicitação registrada', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                if (responseJson.data._id) {
                    navigate(SceneEnum.LISTAGEM_SOLICITACAO);
                }
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
                                disabled={this.disabled(this.state)}
                                onPress={() => this.cadastrar()}
                            />
                        </ScrollView>
                    </Form>
                </Content>
            </Container>
        )
    }

    disabled(state) {
        return !state.sintomas || !state.localConsulta;
    }
}


