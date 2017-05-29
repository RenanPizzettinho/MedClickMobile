import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        margin: 10,
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
    img: {
        height: 200,
        width: 200
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
    }

});
