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

const { width } = Dimensions.get('window')

interface IEvent {
    private: boolean,
    name: string,
    description: string,
    address: string,
    deposit: string
    ImgSource: any,
    uri: string
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
                <Image
                    style={{ width: width, height: 300 }}
                    source={this.props.event.ImgSource}
                />
                {this.props.event.private ?
                    <Text>Privae</Text>
                    : <Text>Public</Text>}
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