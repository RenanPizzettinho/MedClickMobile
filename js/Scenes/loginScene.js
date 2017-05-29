import React, {Component} from "react";
import {Button, Image, Text, TextInput, TouchableHighlight, View} from "react-native";
import styles from "../StyleSheet/mainStyle";

export default class LoginScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form:{
                login: "",
                senha: ""
            }
        };
    }

    render() {
        return (
            <View style={styles.view}>
                <Image
                    source={require('../Images/MedClickLogo.png')}
                    style={styles.img}
                />
                <Text style={styles.title}>MedClick</Text>
                <TextInput
                    placeholder={'Login'}
                    autoFocus={true}
                    style={styles.imput}
                    onChangeText={(login) => {
                        this.setState({form:{login}});
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
                    onPress={() => null}
                />
                <TouchableHighlight
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
