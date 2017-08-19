import React, {Component} from "react";
import {Card, Container, Content, Icon, List, ListItem, Text} from "native-base";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";
import SceneEnum from '../Enums/SceneEnum';

export default class ModoPesquisaScene extends Component {
    static navigationOptions = {
        title: 'Modo de pesquisa',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <List primaryText="Teste">
                            {this.modoPesquisa()}
                        </List>
                    </Card>
                </Content>
            </Container>
        );
    }

    modoPesquisa() {
        const {navigate} = this.props.navigation;
        const modos = [
            {text: 'Pesquisar por localização'},
            {text: 'Pesquisar por nome'},
            {text: 'Pesquisar por especialidade'},
            {text: 'Pesquisar por cidade'},
        ];
        return (
            modos.map((item, index) =>
                <ListItem key={index}>
                    <TouchableItem onPress={() => navigate(SceneEnum.PESQUISA_MEDICO)}>
                        <Content>
                            <Text>{item.text}</Text>
                        </Content>
                    </TouchableItem>
                </ListItem>
            ));
    }
}