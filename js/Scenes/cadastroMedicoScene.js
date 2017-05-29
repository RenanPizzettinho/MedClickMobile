import React, {Component} from "react";

import {Button, Image, Text, TextInput, View} from "react-native";

import styles from "../StyleSheet/mainStyle";
import {Card} from "react-native-material-design";

export default class CadastroMedicoScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.view}>
                <Card style={styles.card}>
                    <View style={styles.formTitleView}>
                        <Image
                            source={require('../Images/CadastroMedicoLogo.png')}
                            style={styles.formTitleImage}
                        />
                        <Text style={styles.formTitleText}>Perfil de médico</Text>
                    </View>
                    <View style={styles.formBodyView}>
                        <TextInput
                            placeholder={'CRM'}
                            style={styles.imputForm}
                        />
                    </View>
                </Card>
                <Button
                    text=""
                    title="Salvar"
                    disabled={false}
                    onPress={() => null}
                />
            </View>
        );
    }
}