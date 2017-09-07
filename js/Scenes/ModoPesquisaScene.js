import React, {Component} from "react";
import {Card, Container, Content, Icon, List, ListItem, Text} from "native-base";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";
import SceneEnum from '../Enums/SceneEnum';
import PacienteService from "../Services/pacienteService";
import StaticStorageService from "../Services/staticStorageService";

export default class ModoPesquisaScene extends Component {
    static navigationOptions = {
        title: 'Modo de pesquisa',
    };

    constructor(props) {
        super(props);
        this.state = {
            localizacao: null
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        let id = StaticStorageService.usuarioSessao._id;
        PacienteService.get(id)
            .then((response) => {
                console.log(response);
                this.setState({localizacao: response.data[0].localizacao});
            })
            .catch((erro) => console.log('ERRO: ', erro));
    }

    hasLocalizacao() {
        return false;
    }

    modoPesquisa() {
        const {navigate} = this.props.navigation;
        const modos = [
            {text: 'Pesquisar por nome', filtro: '?nome='},
            {text: 'Pesquisar por especialidade', filtro: '?especialidade='},
        ];
        return (
            modos.map((item, index) =>
                <ListItem key={index}>
                    <TouchableItem
                        disabled={this.hasLocalizacao()}
                        onPress={() => navigate(SceneEnum.PESQUISA_MEDICO, {
                            filtro: item.filtro,
                            localizacao: this.state.localizacao
                        })}>
                        <Content>
                            <Text>{item.text}</Text>
                        </Content>
                    </TouchableItem>
                </ListItem>
            ));
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


}