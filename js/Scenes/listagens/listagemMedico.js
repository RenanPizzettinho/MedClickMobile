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

        var that = this;
        this.search();
        this.setState({
            search: ''
        });

    }

    search() {
        this.setState({
            loading: true
        });

        var that = this;
        return fetch('https://api.github.com/search/repositories?q=' + this.state.search)
            .then((response) => response.json())
            .then((responseJson) => {
                that.setState({
                    results: responseJson,
                    loading: false
                });

                return responseJson.Search;
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
                <Header searchBar rounded style={{backgroundColor: '#6495ed'}}>
                    <Item>
                        <Button transparent><Icon name="arrow-back"/></Button>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search" value={this.state.search}
                               onChangeText={(text) => this.setState({search: text})}
                               onSubmitEditing={() => this.search()}/>
                        <Button transparent onPress={() => this.search()}>
                            <Text>Go</Text>
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
                    >
                        <Card>
                            {!this.state.selectedItem ? <View />
                                : <Container style={{paddingTop: 0}}>
                                    <Header rounded style={{backgroundColor: '#6495ed', paddingTop: 0}}>
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
                                    <Text object={styles.negativeMargin}>
                                        Open Issues: <Text
                                        object={styles.bold}>{this.state.selectedItem.open_issues_count}</Text>
                                    </Text>
                                    <Text>
                                        Last Update: <Text
                                        style={styles.boldrafa}>{this.state.selectedItem.updated_at.slice(0, 10)}</Text>
                                    </Text>
                                    <CardItem object={styles.buttonInline}>
                                        <Button success>
                                            <Text>Send Messagge</Text>
                                        </Button>
                                        <Button danger onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                        }}>
                                            <Text>Go Back</Text>
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