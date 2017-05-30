import React, {Component} from "react";
import {Button, Image, Text, TextInput, TouchableHighlight, View} from "react-native";
import styles from "../StyleSheet/mainStyle";

export default class LoginScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form:{
                email: "",
                senha: ""
            }
        };
    }

    login(){
        fetch('http://192.168.19.2:3000/api/v1/users/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
        }).then((response)=>{
            console.log("teste",response.data);
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
                        this.setState({form:{email}});
                    }}
                />
                <TextInput
                    placeholder={'Senha'}
                    secureTextEntry={true}
                    style={styles.imput}
                    onChangeText={(senha) => {
                        this.setState({form:{senha}});
                    }}
                />
                <Button
                    text=""
                    title="Entrar"
                    disabled={false}
                    onPress={() => {this.login()}}
                />
                <TouchableHighlight
                    onPress={() => navigate('CadastroUsuario')}
                >
                    <Text>
                        Não possui conta?
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                >
                    <Text>
                        Esqueceu a senha?
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}
