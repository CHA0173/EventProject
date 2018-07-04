import * as React from 'react'
import {
    View,
    ScrollView,
    Text
} from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users';
import { connect } from 'react-redux';
import Axios from 'axios';

interface IUsersList {
}

// fetchUserList() {
//     Axios.get('https://hivent.xyz/api/users')
// }

class UsersList extends React.Component<UsersList, {}> {
    render() {
        return (
            <View>
                <Text> Touch contact to invite </Text>
                <ScrollView>
                <Card containerStyle={{ padding: 0 }} >
                    {
                        this.props.users.attendees.map((u, i) => {
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
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    // users: state.
}

const mapDispatchToProps = (dispatch) => {
    return (dispatch) => {
        // usersArray: state.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)