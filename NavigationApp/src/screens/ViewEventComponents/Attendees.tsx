import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import { Card, ListItem } from 'react-native-elements'

const AttendeesList = [
    {
        "id": 1,
        "name": "Alex",
        "photo": null,
        "creator": true
    },
    {
        "id": 3,
        "name": "Jacob",
        "photo": null,
        "creator": false
    },
    {
        "id": 2,
        "name": "Brad",
        "photo": null,
        "creator": false
    },
    {
        "id": 5,
        "name": "Stephen",
        "photo": null,
        "creator": false
    }
]

export default class Attendees extends React.Component<{}, {}> {
    render() {
        return (
            <View>
                <Card containerStyle={{ padding: 0 }} >
                    {
                        AttendeesList.map((u, i) => {
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
            </View >
        )
    }
}
