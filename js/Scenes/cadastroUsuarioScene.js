import React, {Component} from "react";
import {Alert, Button, Image, Text, TextInput, View} from "react-native";
import styles from "../StyleSheet/mainStyle";
import UsuarioService from "../Services/usuarioService";
import {Card} from "react-native-material-design";


export default class CadastroUsuarioScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: '',
            verificarSenha: ''
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <Card style={styles.card}>
                    <View style={styles.formTitleView}>
                        <Image
                            source={require('../Images/CadastroUsuariosLogo.png')}
                            style={styles.formTitleImage}
                        />
                        <Text style={styles.formTitleText}>Cadastro de usuário</Text>
                    </View>
                    <View style={styles.formBodyView}>
                        <TextInput
                            placeholder={"Email"}
                            style={styles.imputForm}
                            autoFocus={true}
                            onChangeText={(email) => {
                                this.setState({email});
                            }}
                        />
                        <TextInput
                            placeholder={"Nome"}
                            style={styles.imputForm}
                            onChangeText={(nome) => {
                                this.setState({nome});
                            }}
                        />
                        <TextInput
                            placeholder={"Senha"}
                            style={styles.imputForm}
                            secureTextEntry={true}
                            onChangeText={(senha) => {
                                this.setState({senha});
                            }}
                        />
                        <TextInput
                            placeholder={"Repita a senha"}
                            style={styles.imputForm}
                            secureTextEntry={true}
                            onChangeText={(verificarSenha) => {
                                this.setState({verificarSenha});
                            }}
                        />
                    </View>
                </Card>
                <Button
                    text=""
                    title="Cadastrar"
                    disabled={this.cadastrarDisabled()}
                    onPress={() => this.cadastrar()}
                />
            </View>
        );
    }

    cadastrar() {
        const {navigate} = this.props.navigation;
        if (this.state.senha !== this.state.verificarSenha){
            Alert.alert('Atenção','A senha informada não confere com a verificação!');
            return;
        }

        if(this.state.senha.length < 6){
            Alert.alert('Atenção','A senha deve conter ao menos 6 caracteres!');
            return;
        }

        const form = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        };

        UsuarioService.cadastrarUsuario(form)
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.data._id){
                    navigate('Main');
                }

            })
            .catch((error)=>{
                Alert.alert('Erro',JSON.stringify(error.data));
            });

    }

    cadastrarDisabled() {
        return !this.state.email || !this.state.nome || !this.state.senha || !this.state.verificarSenha;
    }
}