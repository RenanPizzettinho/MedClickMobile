import React, {Component} from "react";
import StaticStorageService from '../Services/staticStorageService';
import ContextoEnum from '../Enums/ContextoEnum';
import {Alert, Image} from "react-native";
import SceneEnum from '../Enums/SceneEnum';
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail} from "native-base";
import TouchableItem from "react-navigation/src/views/TouchableItem";

export default class SelecaoContextoScene extends Component {

    static navigationOptions = {
        title: 'Seleção de contexto',
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
                <Content>
                    <TouchableItem onPress={() => this.entrarPaciente()}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../Images/UserLogo.png')}/>
                                    <Body>
                                    <Text>Paciente</Text>
                                    <Text note>Acessar com perfil de paciente</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../Images/SelecaoContextoPaciente.jpg')}
                                       style={{height: 135, width: null, flex: 1}}/>
                            </CardItem>
                        </Card>
                    </TouchableItem>
                    <TouchableItem onPress={() => this.entrarMedico() }>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../Images/MedicoLogo.png')}/>
                                    <Body>
                                    <Text>Médico</Text>
                                    <Text note>Acessar com perfil médico</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../Images/contexto_medico.jpg')}
                                       style={{height: 135, width: null, flex: 1}}/>
                            </CardItem>
                        </Card>
                    </TouchableItem>
                </Content>
            </Container>
        );
    }

    entrarPaciente() {
        const {navigate} = this.props.navigation;
        const usuario = StaticStorageService.usuarioSessao;
        StaticStorageService.contexto = ContextoEnum.PACIENTE;

        if (usuario.idPaciente === undefined) {
            Alert.alert('Aviso', 'Olá,\n Este provavelmente é seu primeiro acesso como paciente, para melhorar sua experiencia neste app vamos lhe redirecionar para o cadastro de paciente, onde voce respondera um questionario medico simples.');
            navigate(SceneEnum.CADASTRO_PACIENTE);
        } else {
            navigate(SceneEnum.MENU);
        }
    }

    entrarMedico() {
        const {navigate} = this.props.navigation;
        const usuario = StaticStorageService.usuarioSessao;
        StaticStorageService.contexto = ContextoEnum.MEDICO;

        if (usuario.idMedico === undefined) {
            Alert.alert('Aviso', 'Olá,\n Este provavelmente é seu primeiro acesso como médico. Para poder usar a nossa app com perfil medico, primeiro voce precisa preencher suas informacoes no formulario de cadastro medico. Entao lhe redirecionaremos para este formulario.');
            navigate(SceneEnum.CADASTRO_MEDICO);
        } else {
            navigate(SceneEnum.MENU);
        }
    }
}