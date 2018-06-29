import * as React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions
} from 'react-native'

import {
    List,
    ListItem
} from 'react-native-elements'

import { Ievent } from '../../models/events'

const { width } = Dimensions.get('window')

interface IInfoProps {
    event: Ievent
}


export default class Info extends React.Component<IInfoProps, {}> {
    constructor(props: IInfoProps){
        super(props)
    }

    private = true ? 'Private' : 'Public'

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
            title: this.props.event.datetime,
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
                <List containerStyle={{borderWidth: 0, borderTopWidth: 0, margin: 20}}>
                    {
                        this.basicInfoList.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                hideChevron={true}
                                containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                            />
                        ))
                    }
                </List>
            </View>
        )
    }
}