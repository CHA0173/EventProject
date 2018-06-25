import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

interface IEvent {
    name: string,
    description: string,
    address: string,
    deposit: string
}

interface IConfirmationProps {
    event: IEvent,
}

export default class Confirmation extends React.Component<IConfirmationProps, {}> {
    constructor(props: IConfirmationProps) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>
                    {this.props.event.name}
                    {this.props.event.description}
                    {this.props.event.address}
                    {this.props.event.deposit}
                </Text>
            </View>
        )
    }
}