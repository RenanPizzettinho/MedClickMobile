import React, {Component} from "react";

import {Alert, AsyncStorage, Button, Text} from "react-native";

import styles from "../StyleSheet/mainStyle";
import {Card, CheckBox, Container, Content, Form, Input, Item, Label, ListItem, Picker} from "native-base";
import UsuarioService from "../Services/usuarioService";

export default class CadastroMedicoScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crm: '',
            especialidade: '',
            atendeEm: '',
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false

        }
    }
//TODO:ver picker
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <Item>
                                <Text style={styles.formTitleText}>Perfil de médico</Text>
                            </Item>
                            <Item>
                                <Label>CRM</Label>
                                <Input/>
                            </Item>
                            <Picker
                                supportedOrientations={['portrait', 'landscape']}
                                headerComponent="Especialidade"
                                mode="dropdown"
                                selectedValue={this.state.especialidade}
                                onValueChange={this.setEspecialidade.bind(this)}>
                                <Item label="Cardiologista" value="CARDIOLOGISTA"/>
                                <Item label="Teste" value="TESTE"/>
                            </Picker>
                            <Picker
                                supportedOrientations={['portrait', 'landscape']}
                                headerComponent="Atende em"
                                mode="dropdown"
                                selectedValue={this.state.atendeEm}
                                onValueChange={this.setLocal.bind(this)}>
                                <Item label="Criciuma" value="CRICIUMA"/>
                                <Item label="Içara" value="ICARA"/>
                                <Item label="Nova Veneza" value="NOVA_VENEZA"/>
                            </Picker>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.segunda}
                                    onPress={()=>{
                                        this.setState({segunda:!this.state.segunda});
                                    }}
                                />
                                <Text>Atende na segunda-feira?</Text>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.terca}
                                    onPress={()=>{
                                        this.setState({terca:!this.state.terca});
                                    }}
                                />
                                <Text>Atende na terça-feira?</Text>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.quarta}
                                    onPress={()=>{
                                        this.setState({quarta:!this.state.quarta});
                                    }}
                                />
                                <Text>Atende na quarta-feira?</Text>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.quinta}
                                    onPress={()=>{
                                        this.setState({quinta:!this.state.quinta});
                                    }}
                                />
                                <Text>Atende na quinta-feira?</Text>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.sexta}
                                    onPress={()=>{
                                        this.setState({sexta:!this.state.sexta});
                                    }}
                                />
                                <Text>Atende na sexta-feira?</Text>
                            </ListItem>
                        </Form>
                    </Card>
                    <Button
                        text="Salvar"
                        title="Salvar"
                        onPress={() => {
                            this.cadastrarMedico();
                        }}/>
                </Content>
            </Container>
        );
    }

    async cadastrarMedico() {
        const form = {
            crm: this.state.crm
        };

        const userId = await AsyncStorage.getItem('userId');

        UsuarioService.salvarMedico(userId, form)
            .then((response) => {

                Alert.alert('Cadastro', JSON.stringify(response))
            });
    }

    setEspecialidade(value: string) {
        this.setState({
            especialidade: value
        });
    }

    setLocal(value: string){
        this.setState({
            atendeEm: value
        });
    }
}