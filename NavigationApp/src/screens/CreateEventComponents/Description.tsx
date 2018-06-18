import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Button,
    ScrollView
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

interface IDescriptionProps {
    nextStep: () => void
}

export default class Description extends React.Component<IDescriptionProps, {}> {

    render() {
        return (
            <View>
                <ScrollView>
                <Switch />
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Deposit</FormLabel>
                <FormInput onChangeText={() => { }} />
                <Button onPress={this.props.nextStep} title="next" />
                </ScrollView>
            </View>
        )
    }
}