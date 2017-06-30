import React, {Component} from "react";
import {Image, Modal} from "react-native";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    H3,
    Header,
    Icon,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Spinner,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";
import styles from "../../StyleSheet/mainStyle";
import UsuarioService from "../../Services/usuarioService";

export default class listagemMedico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            search: 'Native',
            selectedItem: undefined,
            results: {
                items: []
            }
        }
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    componentDidMount() {

        let that = this;
        this.search();
        this.setState({
            search: ''
        });

    }

    search() {
        this.setState({
            loading: true
        });

        let that = this;
        UsuarioService.pesquisarMedicos(this.state.search)
            .then((responseJson) => {
                that.setState({
                    results: responseJson,
                    loading: false
                });
            })
            .catch((error) => {

                that.setState({
                    loading: false
                });

                console.error(error);
            });
    }

    render() {

        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search" value={this.state.search}
                               onChangeText={(text) => this.setState({search: text})}
                               onSubmitEditing={() => this.search()}/>
                        <Button transparent onPress={() => this.search()}>
                            <Text>Pesquisar</Text>
                        </Button>
                    </Item>
                </Header>
                <Content>
                    {this.state.loading ? <Spinner /> : <List dataArray={this.state.results.items} renderRow={(item) =>
                        <ListItem button onPress={() => this.setModalVisible(true, item)}>
                            <Thumbnail square size={80} source={{uri: item.owner.avatar_url}}/>
                            <View>
                                <Text>Name: <Text
                                    style={{fontWeight: '600', color: '#46ee4b'}}>{item.name}</Text></Text>
                                <Text style={{color: '#007594'}}>{item.full_name}</Text>
                                <Text note>Score: <Text note style={{marginTop: 5}}>{item.score}</Text></Text>
                            </View>
                        </ListItem>
                    }/>}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert("Modal has been closed.")
                        }}
                    ><Header rounded style={{paddingTop: 0}}>
                        <Left>
                            <Button transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                            }}>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Médicos</Title>
                        </Body>
                    </Header>
                        <Card>
                            {!this.state.selectedItem ? <View />
                                : <Container style={{paddingTop: 0}}>
                                    <CardItem style={{alignSelf: 'center', paddingTop: 20}}>
                                        <Image style={styles.modalImage}
                                               source={require('../../Images/chapolim.jpg')}/>
                                    </CardItem>
                                    <Body>
                                    <H3 object={styles.header}>{this.state.selectedItem.name}</H3>
                                    <Text object={styles.negativeMargin}>
                                        Type: <Text
                                        style={{fontWeight: '600'}}>{this.state.selectedItem.owner.type}</Text>
                                    </Text>
                                    <Text object={styles.negativeMargin}>
                                        Stars: <Text
                                        object={styles.bold}>{this.state.selectedItem.stargazers_count}</Text>
                                    </Text>
                                    <Text object={styles.negativeMargin}>
                                        Language: <Text
                                        object={styles.bold}>{this.state.selectedItem.language}</Text>
                                    </Text>
                                    <CardItem object={styles.buttonInline}>
                                        <Button success>
                                            <Text>Atendimento</Text>
                                        </Button>
                                    </CardItem>
                                    </Body>
                                </Container>
                            }
                        </Card>
                    </Modal>
                </Content>
            </Container>
        );
    }
}