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
            {text: 'Pesquisar por localização', filtro: '?geo='},
            {text: 'Pesquisar por nome', filtro: '?nome='},
            {text: 'Pesquisar por especialidade', filtro: '?especialidade='},
            {text: 'Pesquisar por cidade', filtro: '?atendeEm='},
        ];
        return (
            modos.map((item, index) =>
                <ListItem key={index}>
                    <TouchableItem onPress={() => navigate(SceneEnum.PESQUISA_MEDICO, {filtro: item.filtro})}>
                        <Content>
                            <Text>{item.text}</Text>
                        </Content>
                    </TouchableItem>
                </ListItem>
            ));
    }
}