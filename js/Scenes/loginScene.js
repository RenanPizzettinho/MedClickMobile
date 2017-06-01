import React, {Component} from "react";
import {Button, Image, Text, TextInput, TouchableHighlight, View} from "react-native";
import styles from "../StyleSheet/mainStyle";
import LoginService from "../Services/loginService";

export default class LoginScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            senha: ""
        };
    }

    login() {
        const {navigate} = this.props.navigation;
        console.log(this.state);
        const form = {
            email: this.state.email,
            senha: this.state.senha
        };

        LoginService.login(form)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.data._id) {
                    navigate('MenuScene');
                }
                navigate('MenuScene');
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.view}>
                <Image
                    source={require('../Images/MedClickLogo.png')}
                    style={styles.img}
                />
                <Text style={styles.title}>MedClick</Text>
                <TextInput
                    placeholder={'Email'}
                    autoFocus={true}
                    style={styles.imput}
                    onChangeText={(email) => {
                        this.setState({email});
                    }}
                />
                <TextInput
                    placeholder={'Senha'}
                    secureTextEntry={true}
                    style={styles.imput}
                    onChangeText={(senha) => {
                        this.setState({senha});
                    }}
                />
                <Button
                    text=""
                    title="Entrar"
                    disabled={false}
                    onPress={() => {
                        this.login()
                    }}
                />
                <TouchableHighlight
                    onPress={() => navigate('CadastroUsuario')}
                    style={styles.linksLogin}
                >
                    <Text>
                        Não possui conta?
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => navigate('RecuperarSenhaScene')}
                >
                    <Text>
                        Esqueceu a senha?
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}
