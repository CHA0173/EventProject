import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Image,
    Dimensions,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { Ievent } from '../../models/events'

const { width } = Dimensions.get('window')


interface IConfirmationProps {
    event: Ievent,
}

export default class Confirmation extends React.Component<IConfirmationProps, {}> {
    constructor(props: IConfirmationProps) {
        super(props);
    }
    render() {
        return (
            <View>
                <Image
                    style={{ width: width, height: 300 }}
                    source={this.props.event.photo}
                />
                {this.props.event.private_event ?
                    <Text>Privae</Text>
                    : <Text>Public</Text>}
                <Text>
                    {this.props.event.name}
                    {this.props.event.description}
                    {this.props.event.address}
                    {this.props.event.datetime}
                    {this.props.event.deposit}
                </Text>
            </View>
        )
    }
}