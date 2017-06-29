import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail} from "native-base";
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";
import {AsyncStorage, Alert} from "react-native";

export default class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.menus = this.props.menus;
        this.getPerfil = this.props.getPerfil;
    }

    componentWillMount() {
        this.getPerfil().done();
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.itemMenu()}
                </Content>
            </Container>
        );
    }

    itemMenu() {
        const {navigate} = this.props.navigation;

        Alert.alert("perfil", JSON.stringify(this.perfil));
        let menusValidos = this.props.menus;
        this.props.menus.forEach((item) => {
            if (item.perfil === null || item.perfil === this.perfil) {
                menusValidos.push(item);
            }
        });

        return (
            menusValidos.map((item, index) =>
                <TouchableItem
                    key={index}
                    onPress={() => {
                        navigate(item.irPara);
                    }}
                >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={item.icone}/>
                                <Body>
                                <Text>{item.header}</Text>
                                <Text note>{item.nota}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </TouchableItem>
            ));

    }

}