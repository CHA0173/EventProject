import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Navigator } from 'react-native-navigation';

interface NotificationProps {
  navigator: Navigator
}

export default class Notification extends React.Component<NotificationProps> {

  // public renderNotificationItem(item) {
  //   return (
  //     <TouchableOpacity onPress={() => this.props.navigator.push({
  //       screen: 'EventsTabScreen',
  //     })}>
  //       <View>
  //         <Text>
  //           {data.item.user} created new event {data.item.event}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }

  public render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigator.switchToTab({
          tabIndex: 0
        })}>
          <FlatList

            data={[{
              id: 1,
              user: 'Lucas',
              event: 'Sex Party',
              eventImg: 'https://dummyimage.com/600x400/000000/fff.png&text=Sex'
            }, {
              id: 2,
              user: 'Brad',
              event: 'Boat Party',
              eventImg: 'https://dummyimage.com/600x400/000000/fff.png&text=Boat'
            }]}
            renderItem={(data) => {
              return (
                <TouchableOpacity
                  style={{ borderBottomWidth: 0.5, }}
                  onPress={() => this.props.navigator.push({
                    screen: 'ViewEventScreen',
                    title: data.item.event,
                  })}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                    <Image
                      style={{ borderRadius: 75, width: 70, height: 70, }}
                      source={{ uri: data.item.eventImg }}
                    />
                    <Text style={{ marginHorizontal: 20, padding: 10 }}>
                      {data.item.user} created new event {data.item.event}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={data => data.id.toString()} 
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  FlatListStyle: {

  }
});