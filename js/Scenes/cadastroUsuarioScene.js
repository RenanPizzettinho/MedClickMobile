import React, {Component} from "react";
import {Button, Image, Text, TextInput, View} from "react-native";
import styles from "../StyleSheet/mainStyle";
import UsuarioService from "../Services/usuarioService";
import {Card} from "react-native-material-design";


export default class CadastroUsuarioScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                imagem: '',
                login: '',
                senha: '',
                email: '',
            },
            verificarSenha: ''
        }
    }

    cadastrarUsuario() {
        UsuarioService.cadastrarUsuario(this.state.form);
        console.log("cadastro");
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
                                this.setState({form: {email}});
                            }}
                        />
                        <TextInput
                            placeholder={"Login"}
                            style={styles.imputForm}
                            onChangeText={(login) => {
                                this.setState({form: {login}});
                            }}
                        />
                        <TextInput
                            placeholder={"Senha"}
                            style={styles.imputForm}
                            secureTextEntry={true}
                            onChangeText={(senha) => {
                                this.setState({form: {senha}});
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
                    disabled={false}
                    onPress={() => this.cadastrarUsuario}
                />
            </View>
        );
    }
}