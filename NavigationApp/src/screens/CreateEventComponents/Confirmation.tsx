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
import { Ievent } from '../../models/events'
import { FormLabel, FormInput, List, ListItem } from 'react-native-elements'

const { width } = Dimensions.get('window')


interface IConfirmationProps {
    event: Ievent,
}

export default class Confirmation extends React.Component<IConfirmationProps, {}> {
    constructor(props: IConfirmationProps) {
        super(props);
    }

    private = this.props.event.private_event ? 'Private' : 'Public'

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
                    source={this.props.event.photo}
                />
                <List containerStyle={{borderWidth: 10, borderTopWidth: 10}}>
                    {
                        this.list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                hideChevron={true}
                                containerStyle={{borderBottomWidth: 0.5, borderTopWidth: 0.5}}
                            />
                        ))
                    }
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
