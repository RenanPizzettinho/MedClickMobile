import React, {
    Component
}  from 'react';

import {
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';

import {Toolbar, Subheader, Avatar, Card, Drawer,} from 'react-native-material-design';

import styles from '../StyleSheet/mainStyle';

export default class CadastroPessoaScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                nome: '',
                cpf: '',
                dataNascimento: ''
            }
        }
    }

    render() {
        return (
            <View style={[styles.view]}>
                <Card style={[styles.card]}>
                    <Text style={styles.formTitleText}>
                        Informações pessoais
                    </Text>
                    <TextInput
                        placeholder={'Nome completo'}
                        style={styles.imputForm}
                        onChangeText={(nome) => {
                            this.setState({form: {nome}})
                        }}
                    />
                    <TextInput
                        placeholder={'CPF'}
                        style={styles.imputForm}
                        onChangeText={(cpf) => {
                            this.setState({form: {cpf}})
                        }}
                    />
                    <TextInput
                        placeholder={'Data de nascimento'}
                        style={styles.imputForm}
                        onChangeText={(dataNascimento) => {
                            this.setState({form: {dataNascimento}})
                        }}
                    />
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