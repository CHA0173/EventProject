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

import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users';

interface IAttendeesProps {
    event: Ievent,
  }

export default class Attendees extends React.Component<IAttendeesProps, {}> {
    render() {
        return (
            <View>
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
                {/* <FlatList
                //     data={this.props.event.attendees}
                //     renderItem={(data) => {
                //         return (
                //             <ScrollView>
                //                 <TouchableOpacity style={{ borderBottomWidth: 0.5, backgroundColor: 'white'}}>
                //                     <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', margin: 10, marginHorizontal: 30 }}>

                //                             <Image
                //                                 style={{ borderRadius: 75, width: 70, height: 70, }}
                //                                 source={{ uri: data.item.photo }}
                //                             />

                //                             <Text style={{ marginHorizontal: 20, padding: 10, fontSize: 20, textAlign: 'center' }}>
                //                                 {data.item.name}
                //                             </Text>
                                       
                //                     </View>
                //                 </TouchableOpacity>
                //             </ScrollView>
                //         )
                //     } */}
                </Card>
            </View >
        )
    }
}
