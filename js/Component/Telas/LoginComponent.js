import React, {Component} from "react";
import styles from "../../StyleSheet/mainStyle";
import {Button, Image, Text, TextInput, TouchableHighlight, View} from "react-native";
import SceneEnum from '../../Enums/SceneEnum';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


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
      <KeyboardAwareScrollView style={{backgroundColor: '#F5FCFF'}}>
        <View style={styles.view}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image
              source={require('../../Images/MedClickLogo.png')}
              style={styles.img}
            />
          </View>
          <View style={{
            justifyContent: 'center',
            width: 230
          }}>
            <Text style={styles.title}>MedClick</Text>
            <TextInput
              placeholder={'Email'}
              autoFocus={false}
              style={{marginBottom: 0, alignItems: 'stretch'}}
              onChangeText={(email) => {
                this.setState({email});
              }}
            />
            <TextInput
              placeholder={'Senha'}
              secureTextEntry={true}
              style={{marginBottom: 10, alignItems: 'stretch'}}
              onChangeText={(senha) => {
                this.setState({senha});
              }}
            />
            <Button
              style={styles.btnLogin}
              title="Entrar"
              // disabled={this.disabled()}
              onPress={() => {
                this.login();
              }}
            />
            <TouchableHighlight
              onPress={() => navigate(SceneEnum.CADASTRO_USUARIO)}
              style={[styles.linksLogin, {alignItems: 'center', marginTop: 10}]}
            >
              <Text>
                Não possui conta?
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}