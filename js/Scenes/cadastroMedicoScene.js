import React, {Component} from "react";
import {Slider, ToastAndroid} from "react-native";
import StaticStorageService from "../Services/staticStorageService";
import MedicoService from "../Services/medicoService";
import SceneEnum from "../Enums/SceneEnum";
import {Card, Container, Content, Form, Text} from "native-base";
import CampoTexto from "../Component/Campos/CampoTexto";
import SelectBase from "../Component/Campos/SelectBase";
import CheckBoxBase from "../Component/Campos/CheckBoxBase";
import BotaoBase from "../Component/Campos/BotaoBase";
import {parseString} from "react-native-xml2js";
import UsuarioService from "../Services/usuarioService";

export default class CadastroMedicoScene extends Component {

    static navigationOptions = {
        title: 'Perfil de médico',
    };

    constructor(props) {
        super(props);

        this.state = {
            crm: '',
            estado: '',
            nome: null,
            valido: false,
            especialidade: '',
            atendeEm: '',
            distanciaMaxima: 50,
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
                    nome: StaticStorageService.usuarioSessao.nome,
                    idMedico: dados._id,
                    crm: dados.crm,
                    estado: dados.estado,
                    atendeEm: dados.atendeEm,
                    especialidade: dados.especialidade,
                    distanciaMaxima: dados.distanciaMaxima,
                    valido: true
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
        let form = {
            idUsuario: StaticStorageService.usuarioSessao._id,
            crm: this.state.crm,
            estado: this.state.estado,
            especialidade: this.state.especialidade,
            atendeEm: this.state.atendeEm,
            diasAtendimentoDomicilio: [],
            distanciaMaxima: this.state.distanciaMaxima
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

        console.log(form);

        if (!this.state.idMedico) {
            MedicoService.salvar(userId, form)
                .then((response) => {
                    this.posSave(response, navigate);
                })
                .catch((err) => console.log(err));
        } else {
            MedicoService.atualizar(userId, form)
                .then((response) => {
                    this.posSave(response, navigate);
                });
        }
    }

    posSave(response, navigate) {
        this.atualizarNome();
        ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        console.log('RESPONSE: ', response);
        StaticStorageService.usuarioSessao.idMedico = response.data._id;
        console.log('USUARIO: ', StaticStorageService.usuarioSessao);
        navigate(SceneEnum.MENU);
    }

    atualizarNome() {
        const userId = StaticStorageService.usuarioSessao._id;
        const body = {nome: this.state.nome};
        UsuarioService.salvarInformacoesPessoais(userId, body)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err))
    }

    validarCrm() {
        console.log('Validando');
        ToastAndroid.showWithGravity('Validando', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        let nome = '';
        let total = 0;
        MedicoService.validarCrm(this.state.estado, this.state.crm)
            .then((response) => {
                parseString(response, function callback(err, result) {
                    console.log(result.rss.channel[0]);
                    total = result.rss.channel[0].total[0];
                    if (total > 0) {
                        nome = result.rss.channel[0].item[0].nome[0];
                    }
                });
                console.log('Validado', total);
                if (total > 0 && nome === this.state.nome) {
                    this.setState({
                        valido: true,
                        nome: nome
                    });
                } else {
                    ToastAndroid.showWithGravity('Informações invalidas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    this.setState({valido: false});
                }
            }).catch((err) => {
            console.log('fetch', err)
        });
    };

    dadosMedico() {
        if (this.state.valido) {
            return (
                <Card>
                    <Form>
                        <SelectBase
                            label='Area medica de especialidade'
                            title='Area medica de especialidade'
                            selectedValue={this.state.especialidade}
                            onValueChange={(especialidade) => this.setState({especialidade})}
                            itens={[
                                {value: "Cardiologista"},
                                {value: "Clinico geral"}
                            ]}
                        />
                        <SelectBase
                            label='Atende em qual cidade?'
                            title='Atende em qual cidade?'
                            selectedValue={this.state.atendeEm}
                            onValueChange={(atendeEm) => this.setState({atendeEm})}
                            itens={[
                                {value: "Criciuma"},
                                {value: "Içara"},
                                {value: "Nova Veneza"}
                            ]}
                        />
                        <Text style={{textAlign: 'center'}}>Distância máxima de
                            atendimento: {this.state.distanciaMaxima} metros</Text>
                        <Slider
                            minimumValue={1000}
                            maximumValue={100000}
                            step={1000}
                            value={this.state.distanciaMaxima}
                            onValueChange={(distanciaMaxima) => this.setState({distanciaMaxima})}/>

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
                    <BotaoBase
                        title="Salvar"
                        onPress={() => {
                            this.salvarMedico();
                        }}
                    />
                </Card>
            );
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <CampoTexto
                                label={'Nome'}
                                value={this.state.nome}
                                onChange={(nome) => {
                                    this.setState({nome});
                                    this.setState({valido: false});
                                }}
                            />
                            <CampoTexto
                                label="CRM"
                                value={this.state.crm}
                                onChange={(crm) => {
                                    this.setState({crm});
                                    this.setState({valido: false});
                                }}
                            />
                            <SelectBase
                                label='Estado do registro'
                                title='Estado do registro'
                                selectedValue={this.state.estado}
                                onValueChange={(estado) => {
                                    this.setState({estado});
                                    this.setState({valido: false});
                                }}
                                itens={[
                                    {value: "SC"},
                                    {value: "PR"},
                                    {value: "RS"}
                                ]}
                            />
                        </Form>
                        {(!this.state.valido) ?
                            <BotaoBase
                                title="Validar Crm"
                                onPress={() => this.validarCrm()}
                            />
                            : null
                        }
                    </Card>
                    {this.dadosMedico()}

                </Content>
            </Container>
        );
    }
}