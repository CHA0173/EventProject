import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'


interface IViewEventProps {
    name: string,
}

export default class ViewEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    render() {
        return (
            <View>
                <Switch />
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Deposit</FormLabel>
                <FormInput onChangeText={() => { }} />
            </View>
        )
    }
}