import React, {Component} from "react";
import {Badge, Body, Button, Card, CardItem, Container, Content, Icon, Left, Text, Thumbnail} from "native-base";
import {Image} from "react-native";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";

export default class MenuScene extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Content>
                    <Card >
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../Images/AtendimentoLogo3.png')}/>
                                <Body>
                                <Text>Atendimentos</Text>
                                <Text note>Atendimentos em aberto</Text>
                                <Badge primary>
                                    <Text>2</Text>
                                </Badge>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <Card >
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../Images/RecadosLogo.png')}/>
                                <Body>
                                <Text>Recados</Text>
                                <Text note>Recados não visualizados</Text>
                                <Badge primary>
                                    <Text>2</Text>
                                </Badge>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <TouchableItem onPress={() => {
                        navigate('CadastroPessoaScene')
                    }}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../Images/UserLogo.png')}/>
                                    <Body>
                                    <Text>Informações pessoais</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    </TouchableItem>

                    <TouchableItem onPress={() => {
                        navigate('CadastroPacienteScene')
                    }}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../Images/UserLogo.png')}/>
                                    <Body>
                                    <Text>Perfil de paciente</Text>
                                    <Text note>Visualize seu perfil médico</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    </TouchableItem>
                    <TouchableItem onPress={() => {
                        navigate('CadastroMedicoScene')
                    }}>
                        <Card
                        >
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../Images/MedicoLogo.png')}/>
                                    <Body>
                                    <Text>Perfil de médico</Text>
                                    <Text note>Visualize seu perfil médico</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image/>
                            </CardItem>
                        </Card>
                    </TouchableItem>
                </Content>
            </Container>
        );
    }
}