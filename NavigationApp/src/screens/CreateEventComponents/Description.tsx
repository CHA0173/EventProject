import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Button
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'


interface IDescriptionProps {
    nextStep: () => void
}

export default class Description extends React.Component<IDescriptionProps, {}> {
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
                <Button onPress={ this.props.nextStep } title="next" />

            </View>
        )
    }
}