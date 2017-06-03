import React, {Component} from "react";
import {Button, Image, Text, TextInput, View} from "react-native";
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

    cadastrar() {
        const {navigate} = this.props.navigation;
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
                //TODO: Fazer validacoes de erro
            });
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
                    disabled={false}
                    onPress={() => this.cadastrar()}
                />
            </View>
        );
    }
}