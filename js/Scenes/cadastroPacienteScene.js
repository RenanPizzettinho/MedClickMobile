import React, {
    Component
}  from 'react';
import {Card, CheckBox, Container, Content, Form, Input, Item, Label, ListItem, Text} from "native-base";
import {TouchableOpacity} from "react-native";

export default class CadastroPacienteScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            possuiDiabetes: false,
            possuiPressaoAlta: false
    };

    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <ListItem>
                                <TouchableOpacity/>
                                <CheckBox
                                    checked={this.state.possuiDiabetes}
                                    onPress={()=>{
                                        this.setState({possuiDiabetes:!this.state.possuiDiabetes});
                                    }}
                                />
                                <Text>Possui diabetes?</Text>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.possuiPressaoAlta}
                                    onPress={()=>{
                                        this.setState({possuiPressaoAlta:!this.state.possuiPressaoAlta});
                                    }}
                                />
                                <Text>Possui pressão alta?</Text>
                            </ListItem>
                        </Form>
                    </Card>
                </Content>
            </Container>
        );
    }
}