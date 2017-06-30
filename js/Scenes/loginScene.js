import React, {Component} from "react";
import {
    Alert,
    AsyncStorage,
    Button,
    Image,
    Text,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    View
} from "react-native";
import styles from "../StyleSheet/mainStyle";
import LoginService from "../Services/loginService";


export default class LoginScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "batata@abc.com",
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
                    // disabled={this.entrarDisabled()}
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
                console.log(responseJson);
                if (responseJson.status === 403) {
                    ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                }
                if (responseJson.data._id) {
                    //Alert.alert("UsuarioLogado", JSON.stringify(responseJson.data));
                    this.setUsuario(responseJson.data._id).done();
                    navigate('SelecaoContexto');
                } else {
                    Alert.alert('Erro', responseJson.data);
                }

            })
            .catch((error) => {
                Alert.alert('Erro catch', JSON.stringify(error));
            });
    }

    entrarDisabled() {
        return !this.state.email || !this.state.senha;
    }
    async setUsuario(id){
        await AsyncStorage.setItem('userId', id);
    }
}
