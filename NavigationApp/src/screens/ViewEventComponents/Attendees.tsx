import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'

import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users';
import { Navigator } from 'react-native-navigation';
const { width } = Dimensions.get('window')


interface IAttendeesProps {
    event: Ievent,
    navigator: Navigator
}

export default class Attendees extends React.Component<IAttendeesProps, {}> {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button title='Invite' 
                        buttonStyle={{ elevation: 3, width: 300, borderRadius: 25, backgroundColor: '#d15953', marginTop: 20 }}
                        onPress={() => { 
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
                                        containerStyle={{width: width-50}}
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
