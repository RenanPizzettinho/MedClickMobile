import React, {Component} from "react";
import styles from "../StyleSheet/mainStyle";
import {
    Body,
    Button as ButtonBase,
    Container,
    Content,
    Form,
    H1,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Title
} from "native-base";
import {Alert, Button, Image, ScrollView} from "react-native";

export default class CadastroSolicitacaoScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Left>
                            <ButtonBase transparent>
                                <Icon name='arrow-back'/>
                            </ButtonBase>
                        </Left>
                        <Body style={{alignSelf: 'center'}}>
                        <Title>Atendimento</Title>
                        </Body>
                    </Header>
                    <Form>
                        <ScrollView>
                            <Image
                                source={require('../Images/chapolim.jpg')}
                                object={styles.img}
                                style={{
                                    width: 100,
                                    height: 100,
                                    alignSelf: "center",
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            />
                            <H1>Dra. Muriel Fatima Bernardes</H1>
                            <Item floatingLabel>
                                <Label>Sintomas apresentados</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Data da Consulta</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Endereço</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Observações</Label>
                                <Input />
                            </Item>
                        </ScrollView>
                    </Form>
                    <Button text="Registrar"
                            disabled={false}
                            title="Registrar"
                            style={{marginBottom: 0}}
                            onPress={() =>
                                Alert.alert("Solicitação registrada com sucesso")}
                    />
                </Content>
            </Container>
        )
    }
}