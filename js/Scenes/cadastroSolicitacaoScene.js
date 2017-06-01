import React, {Component} from 'react';
import styles from "../StyleSheet/mainStyle";
import {Container, Content, Form, Input, Item, Label} from "native-base";

export default class CadastroSolicitacaoScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}