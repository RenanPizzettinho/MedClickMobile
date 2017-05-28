import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
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
        flex: 0.5,
        flexDirection: 'row',
        height: 10,
        marginTop: 15,
        marginBottom: 0,
    },
    formTitleImage: {
        height: 100,
        width: 100
    },
    formTitleText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },
    imput: {
        width: 200,
        margin: 1
    },
    img: {
        height: 200,
        width: 200
    }
});
