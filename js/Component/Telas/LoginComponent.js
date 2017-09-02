import React, {Component} from "react";
import styles from "../../StyleSheet/mainStyle";
import {Button, Image, Text, TextInput, TouchableHighlight, View} from "react-native";
import SceneEnum from '../../Enums/SceneEnum';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = props.states;
        this.login = props.login;
        this.disabled = props.disabled;
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.view}>
                <Image
                    source={require('../../Images/MedClickLogo.png')}
                    style={styles.img}
                />
                <Text style={styles.title}>MedClick</Text>
                <TextInput
                    placeholder={'Email'}
                    autoFocus={false}

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
                    // disabled={this.disabled()}
                    onPress={() => {
                        this.login();
                    }}
                />
                <TouchableHighlight
                    onPress={() => navigate(SceneEnum.CADASTRO_USUARIO)}
                    style={styles.linksLogin}
                >
                    <Text>
                        Não possui conta?
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}