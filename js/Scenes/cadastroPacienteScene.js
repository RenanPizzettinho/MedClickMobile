import React, {
    Component
}  from 'react';

import {
    View,
    Text,
    Button,
    TextInput,
    Image,
    TouchableHighlight
} from 'react-native';

import styles from '../StyleSheet/mainStyle'
import Card from "react-native-material-design/lib/Card/index";

export default class CadastroPacienteScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.view}>
                <Card style={styles.card}>
                    <View style={styles.formTitleView}>

                    </View>
                    <View style={styles.formBodyView}>

                    </View>
                </Card>
                <Button
                    text=""
                    title="Salvar"
                    disabled={false}
                    onPress={() => null}
                />
            </View>
        );
    }
}