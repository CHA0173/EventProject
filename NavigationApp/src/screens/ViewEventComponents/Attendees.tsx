import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image,
    Button
} from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users';
import { Navigator } from 'react-native-navigation';


interface IAttendeesProps {
    event: Ievent,
    navigator: Navigator
}

export default class Attendees extends React.Component<IAttendeesProps, {}> {
    render() {
        return (
            <View>
                <Button title='Invite' onPress={() => { 
                    this.props.navigator.push({
                        screen: 'UsersListScreen',
                        title: 'Users List'
                      })
                }} />
                <ScrollView>
                    <Card containerStyle={{ padding: 0 }} >
                        {
                            this.props.event.attendees.map((u, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        roundAvatar
                                        title={u.name}
                                        hideChevron={true}
                                        avatar={{ uri: u.photo }}
                                    />
                                );
                            })
                        }
                    </Card>
                </ScrollView >
            </View>
        )
    }
}
