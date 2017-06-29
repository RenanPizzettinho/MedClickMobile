import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail} from "native-base";
import {Image} from "react-native";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";

export default class SelecaoContextoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.states;
        this.entrarPaciente = this.props.entrarPaciente;
        this.entrarMedico = this.props.entrarMedico;
        this.acessar = this.props.acessar;
        this.navigation = this.props.navigation;
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Content>
                    <TouchableItem onPress={() => this.entrarPaciente() }>
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
                                <Image source={require('../Images/UserLogo.png')}
                                       style={{height: 135, width: null, flex: 1}}/>
                            </CardItem>
                        </Card>
                    </TouchableItem>
                    <TouchableItem onPress={() => this.entrarPaciente() }>
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
                                <Image source={require('../Images/UserLogo.png')}
                                       style={{height: 135, width: null, flex: 1}}/>
                            </CardItem>
                        </Card>
                    </TouchableItem>
                </Content>
            </Container>
        );
    }
}