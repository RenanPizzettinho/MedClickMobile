import React, {Component} from "react";
import {Body, Card, CardItem, Container, Content, Left, Text, Thumbnail} from "native-base";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {TouchableOpacity} from 'react-native';

export default class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.menus = this.props.menus;
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
        return (
            this.props.menus.map((item, index) =>
                <TouchableOpacity

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
                </TouchableOpacity>
            ));
    }
}