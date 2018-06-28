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
import { FormLabel, FormInput, List, ListItem, Icon } from 'react-native-elements'

const { width } = Dimensions.get('window')


interface IConfirmationProps {
    event: Ievent,
}

export default class Confirmation extends React.Component<IConfirmationProps, {}> {
    constructor(props: IConfirmationProps) {
        super(props);
    }

    private = this.props.event.private_event ? 'Private' : 'Public'

    basicInfoList = [
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
                <List containerStyle={{borderWidth: 1, borderTopWidth: 1, margin: 20}}>
                    {
                        this.basicInfoList.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon, color: '#123456' }}
                                hideChevron={true}
                                containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                            />
                        ))
                    }
                </List>
                <List containerStyle={{borderWidth: 1, borderTopWidth: 1, margin: 20}}>
                    {
                        this.props.event.todo.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.Name}
                                hideChevron={true}
                                containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                                leftIcon={<Icon
                                    name='hashtag'
                                    type='font-awesome'
                                    color='#e54d16'
                                    size={15}
                                    iconStyle={{ marginRight: 10 }}
                                />}
                                badge={{value: item.Quantity}}
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
