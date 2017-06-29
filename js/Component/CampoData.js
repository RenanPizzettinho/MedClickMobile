import React, {Component} from "react";
import {Text, View} from "react-native";
import {Label} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import TouchableItem from "../../node_modules/react-navigation/lib-rn/views/TouchableItem";

export default class CampoData extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showPiker = () => this.setState({isDateTimePickerVisible: true});

    hidePiker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        this.props.setData(date);
        this.hidePiker();
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableItem onPress={this.showPiker}>
                    <Label>{this.props.label}<Text>{this.props.data.toString()}</Text></Label>

                </TouchableItem>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this.hidePiker}
                    date={new Date(this.props.data.toString())}
                />
            </View>
        );
    }
}