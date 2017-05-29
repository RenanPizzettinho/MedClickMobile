/**
 * Created by Rafael on 26/05/2017.
 */
import React, {Component} from 'react-native';
import RestService from '/./restService';
import {Container, Content, List, ListItem, Thumbnail, Text, Body} from 'native-base';

const URI_REST_MEDICOS = RestService.webService + '/api/medicos';

export default class ListThumbnailExample extends Component {

    constructor(props) {
        super(props);
        this.state = {medicos: []}
    }

    componentWillMount() {
        this.setState = {medicos: RestService.get(URI_REST_MEDICOS)}
    }

    render() {
        return (
            <Container>
                <Content>
                    <List primaryText={Médicos}>
                        {
                            <ListItem>
                                <Thumbnail square size={80} source={require('./img/one.png')}/>
                                <Body>
                                <Text>{this.state.medicos.nome}</Text>
                                <Text note>{this.state.medicos.descricao}</Text>
                                </Body>
                            </ListItem>
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}