import React, {Component} from "react";

import {ToastAndroid} from "react-native";
import StaticStorageService from "../Services/staticStorageService";
import MedicoService from "../Services/medicoService";
import SceneEnum from "../Enums/SceneEnum";
import {Card, Container, Content, Form} from "native-base";
import CampoTexto from "../Component/Campos/CampoTexto";
import SelectBase from "../Component/Campos/SelectBase";
import CheckBoxBase from "../Component/Campos/CheckBoxBase";
import BotaoBase from "../Component/Campos/BotaoBase";
import {parseString} from "react-native-xml2js";

export default class CadastroMedicoScene extends Component {

    static navigationOptions = {
        title: 'Perfil de médico',
    };

    constructor(props) {
        super(props);

        this.state = {
            crm: '',
            especialidade: '',
            atendeEm: '',
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        };

        this.validarCrm = this.validarCrm.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const userId = StaticStorageService.usuarioSessao._id;
        MedicoService.get(userId)
            .then((response) => {
                let dados = response.data[0];

                if (dados === undefined) return;

                this.setState({
                    idMedico: dados._id,
                    crm: dados.crm,
                    atendeEm: dados.atendeEm,
                    especialidade: dados.especialidade
                });

                dados.diasAtendimentoDomicilio.forEach((item) => {
                    switch (item) {
                        case 'seg':
                            this.setState({segunda: true});
                            break;
                        case 'ter':
                            this.setState({terca: true});
                            break;
                        case 'qua':
                            this.setState({quarta: true});
                            break;
                        case 'qui':
                            this.setState({quinta: true});
                            break;
                        case 'sex':
                            this.setState({sexta: true});
                            break;
                        case 'sab':
                            this.setState({sabado: true});
                            break;
                        case 'dom':
                            this.setState({domingo: true});
                            break;
                    }
                });

            });
    }

    salvarMedico() {
        console.log(this);
        let form = {
            crm: this.state.crm,
            especialidade: this.state.especialidade,
            atendeEm: this.state.atendeEm,
            diasAtendimentoDomicilio: []
        };

        if (this.state.segunda)
            form.diasAtendimentoDomicilio.push('seg');

        if (this.state.terca)
            form.diasAtendimentoDomicilio.push('ter');

        if (this.state.quarta)
            form.diasAtendimentoDomicilio.push('qua');

        if (this.state.quinta)
            form.diasAtendimentoDomicilio.push('qui');

        if (this.state.sexta)
            form.diasAtendimentoDomicilio.push('sex');

        if (this.state.sabado)
            form.diasAtendimentoDomicilio.push('sab');

        if (this.state.domingo)
            form.diasAtendimentoDomicilio.push('dom');

        const userId = StaticStorageService.usuarioSessao._id;

        const {navigate} = this.props.navigation;

        if (!this.state.idMedico) {
            MedicoService.salvar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    navigate(SceneEnum.MENU);
                });
        } else {
            MedicoService.atualizar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    navigate(SceneEnum.MENU);
                });
        }
    }

    validarCrm() {

        MedicoService.validarCrm('SC',5151)
            .then((response) => {
                parseString(response,{trim: true}, function (err, result) {
                    const total = result.rss.channel[0].total[0];
                    if(total > 0){
                        this.salvarMedico();
                    } else {
                        ToastAndroid.showWithGravity('CRM informado não existe', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    }
                });
            }).catch((err) => {
            console.log('fetch', err)
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CampoTexto
                                label="CRM"
                                value={this.state.crm}
                                onChange={(crm) => {
                                    this.setState({crm});
                                }}
                            />
                            <SelectBase
                                label="Area medica de especialidade"
                                selectedValue={this.state.especialidade}
                                onValueChange={(especialidade) => this.setState({especialidade})}
                                itens={[{label: "Cardiologista", value: "CARDIOLOGISTA"}, {
                                    label: "Clinico geral",
                                    value: "CLINICO_GERAL"
                                }]}
                            />
                            <SelectBase
                                label="Atende em qual cidade?"
                                selectedValue={this.state.atendeEm}
                                onValueChange={(atendeEm) => this.setState({atendeEm})}
                                itens={[{label: "Criciuma", value: "CRICIUMA"}, {
                                    label: "Içara",
                                    value: "ICARA"
                                }, {label: "Nova Veneza", value: "NOVA_VENEZA"}]}
                            />
                            <CheckBoxBase
                                label="Atende na segunda-feira?"
                                checked={this.state.segunda}
                                onPress={() => {
                                    this.setState({segunda: !this.state.segunda});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na terça-feira?"
                                checked={this.state.terca}
                                onPress={() => {
                                    this.setState({terca: !this.state.terca});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na quarta-feira?"
                                checked={this.state.quarta}
                                onPress={() => {
                                    this.setState({quarta: !this.state.quarta});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na quinta-feira?"
                                checked={this.state.quinta}
                                onPress={() => {
                                    this.setState({quinta: !this.state.quinta});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende na sexta-feira?"
                                checked={this.state.sexta}
                                onPress={() => {
                                    this.setState({sexta: !this.state.sexta});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende no sabado?"
                                checked={this.state.sabado}
                                onPress={() => {
                                    this.setState({sabado: !this.state.sabado});
                                }}
                            />
                            <CheckBoxBase
                                label="Atende no domingo?"
                                checked={this.state.domingo}
                                onPress={() => {
                                    this.setState({domingo: !this.state.domingo});
                                }}
                            />

                        </Form>
                    </Card>
                    <BotaoBase
                        title="Salvar"
                        onPress={this.validarCrm}
                    />
                </Content>
            </Container>
        );
    }
}