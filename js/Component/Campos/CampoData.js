import React, {Component} from "react";
import {Text, View} from "react-native";
import {Label} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import TouchableItem from "../../../node_modules/react-navigation/lib-rn/views/TouchableItem";
import Moment from "moment";

export default class CampoData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Moment(this.props.data.toISOString()).format('DD/MM/YYYY')
        };
    }

    showPiker = () => this.setState({isDateTimePickerVisible: true});

    hidePiker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (data) => {
        this.setState({
            data: Moment(data.toISOString()).format('DD/MM/YYYY')
        });
        console.log('DATE: ', data);
        this.hidePiker();
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableItem onPress={this.showPiker}>
                    <Label>{this.props.label}<Text>{this.state.data}</Text></Label>

                </TouchableItem>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this.hidePiker}
                    date={this.state.data.toString()}
                />
            </View>
        );
    }
}