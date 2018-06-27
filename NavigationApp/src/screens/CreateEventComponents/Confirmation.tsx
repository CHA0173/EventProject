import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import { FormLabel, FormInput, List, ListItem } from 'react-native-elements'

const { width } = Dimensions.get('window')

interface IEvent {
    private: boolean,
    name: string,
    description: string,
    address: string,
    deposit: string
    ImgSource: any,
    uri: string,
    dateTime: string,
}

interface IConfirmationProps {
    event: IEvent,
}

export default class Confirmation extends React.Component<IConfirmationProps, {}> {
    constructor(props: IConfirmationProps) {
        super(props);
    }

    private = this.props.event.private ? 'Private' : 'Public'

    list = [
        {
            title: this.private,
            icon: 'lock'
        },
        {
            title: this.props.event.description,
            icon: 'info'
        },
        {
            title: this.props.event.address,
            icon: 'location-on'
        },
        {
            title: this.props.event.deposit,
            icon: 'date-range'
        },
        {
            title: this.props.event.deposit,
            icon: 'attach-money'
        }
    ]
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
                    {this.props.event.dateTime}
                    {this.props.event.deposit}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
