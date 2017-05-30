import React, {Component} from "react";

import {Button as ButtonNative,Image, Text, TextInput, View} from "react-native";

import styles from "../StyleSheet/mainStyle";
import {Card, Toolbar} from "react-native-material-design";
import {Container, Header, Title, Button, Left, Right, Body, Icon} from 'native-base';

export default class CadastroMedicoScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Perfil médico</Title>
                    </Body>
                    <Right />
                </Header>
                <Card style={styles.card}>
                    <View style={styles.formTitleView}>
                        <Image
                            source={require('../Images/CadastroMedicoLogo.png')}
                            style={styles.formTitleImage}
                        />
                        <Text style={styles.formTitleText}>Perfil de médico</Text>
                    </View>
                    <View style={styles.formBodyView}>
                        <TextInput
                            placeholder={'CRM'}
                            style={styles.imputForm}
                        />
                    </View>
                </Card>
                <Button block primary><Text> Primary </Text></Button>
            </Container>
        );
    }
}