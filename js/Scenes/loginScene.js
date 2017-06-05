import React, {Component} from "react";
import {Alert, AsyncStorage, Button, Image, Text, TextInput, TouchableHighlight, View} from "react-native";
import styles from "../StyleSheet/mainStyle";
import LoginService from "../Services/loginService";

export default class LoginScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "teste@teste.com",
            senha: "123456"
        };
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
                    value='teste@teste.com'
                    style={styles.imput}
                    onChangeText={(email) => {
                        this.setState({email});
                    }}
                />
                <TextInput
                    placeholder={'Senha'}
                    secureTextEntry={true}
                    value='123456'
                    style={styles.imput}
                    onChangeText={(senha) => {
                        this.setState({senha});
                    }}
                />
                <Button
                    text=""
                    title="Entrar"
                    disabled={this.entrarDisabled()}
                    onPress={() => {
                        this.login();
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

    login() {
        const {navigate} = this.props.navigation;
        const form = {
            email: this.state.email,
            senha: this.state.senha
        };

        LoginService.login(form)
            .then((responseJson) => {
                if (responseJson.data._id) {
                    try {
                        AsyncStorage.setItem('userId', responseJson.data._id,()=>{
                            AsyncStorage.getItem('userId',(err,result)=>{Alert.alert('UserID',result);})
                        });

                    } catch (error) {
                        console.error("Erro ao salvar o id do usuario!");
                    }
                    navigate('MenuScene');
                } else {
                    Alert.alert('Erro',responseJson.data);
                }

            })
            .catch((error)=>{
                Alert.alert('Erro',JSON.stringify(error));
            });
    }

    entrarDisabled(){
        return !this.state.email || !this.state.senha;
    }
}
