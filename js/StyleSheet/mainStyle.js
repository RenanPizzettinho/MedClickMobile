import {StyleSheet} from "react-native";

export default StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection : 'column',
        padding : 10
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 1,
        color: 'black'
    },
    formTitleView: {
        flexDirection: 'row',
    },
    formTitleImage: {
        height: 50,
        width: 50
    },
    formTitleText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },
    formBodyView: {
        flexDirection: 'column'
    },
    imputForm: {
        width: 300,
        margin: 1
    },
    imput: {
        width: 200,
        margin: 1
    },
    btnLogin: {
        flex: 1,
        padding: 100
    },
    img: {
        height: 200,
        width: 200,

    },
    card: {
        justifyContent: 'center',
        padding: 10
    },
    imagemPerfil: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    linksLogin:{
        padding: 10,
    },
    header: {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: 0,
        lineHeight: 24,
        color: '#2253b6'
    },
    modalImage: {
        resizeMode: 'contain',
        height: 200
    },
    bold: {
        fontWeight: '600'
    },
    negativeMargin: {
        marginBottom: -10
    },
    buttonInline: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: 250,
        height: 250,
    },
    selectBase: {
        width: 250,
    },
    webView: {
        backgroundColor: 'white',
        height: 350,
    },
});
