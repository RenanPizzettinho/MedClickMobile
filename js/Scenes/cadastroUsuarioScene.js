import React, {
    Component
}  from 'react';

import {
    View,
    Text,
    Button,
    TextInput,
    Image,
    TouchableHighlight
} from 'react-native';

import styles from '../StyleSheet/styleSheet';
import UsuarioService from '../Services/usuarioService';

export default class CadastroUsuarioView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                login: "",
                senha: "",
                email: "",
            },
            verificarSenha: ""
        }
    }

    cadastrarUsuario() {
        UsuarioService.cadastrarUsuario(this.state.form);
        console.log("cadastro");
    }

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.formTitleView}>
                    <Image
                        source={require('../Images/CadastroUsuariosLogo.png')}
                        style={styles.formTitleImage}
                    />
                    <Text style={styles.formTitleText}>Cadastro de usuário</Text>
                </View>
                <TextInput
                    placeholder={"Email"}
                    style={styles.imput}
                    onChangeText={(email) => {
                        this.setState({form: {email}});
                    }}
                />
                <TextInput
                    placeholder={"Login"}
                    style={styles.imput}
                    onChangeText={(login) => {
                        this.setState({form: {login}});
                    }}
                />
                <TextInput
                    placeholder={"Senha"}
                    style={styles.imput}
                    secureTextEntry={true}
                    onChangeText={(senha) => {
                        this.setState({form: {senha}});
                    }}
                />
                <TextInput
                    placeholder={"Repita a senha"}
                    style={styles.imput}
                    secureTextEntry={true}
                    onChangeText={(verificarSenha) => {
                        this.setState({verificarSenha});
                    }}
                />
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