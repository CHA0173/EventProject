import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { Navigator } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Iuser } from '../models/users';
import axios from 'axios';

interface NotificationProps {
  navigator: Navigator
  user: Iuser
  token: string
}

class Notification extends React.Component<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'refresh') {

      }
    }
  }

  renderNotes(item) {
    let datetime = '';
    if (Object.keys(item).length > 0 && item.note) {
      datetime = `${item.timestamp.match(/\d{4}-[01]\d-[0-3]\d/)}, at ${item.timestamp.match(/[\d]{2}:[\d]{2}/)}`;
    }
    return (
      // <TouchableOpacity onPress={() => {
      //   const AuthStr = 'Bearer '.concat(this.props.token);
      //   axios.get(`https://hivent.xyz/api/events/${event.item.id}`, { headers: { Authorization: AuthStr } }).then((data) => {
      //     console.log('data', data.data)
      //     this.props.navigator.push({
      //       screen: 'ViewEventScreen',
      //       title: event.item.name,
      //       navigatorStyle: { tabBarHidden: true },
      //       passProps: { eventIdFromBackend: data.data.id }
      //     })
      //   })
      // }}>
      <View style={{ padding: 10, margin: 10, }}>
        <Text>{item.note}</Text>
        <Text>{datetime}</Text>
      </View>
      // {/* </TouchableOpacity> */}
    )
  }
  public render() {
    let { notes } = this.props.user
    let content = <View><Text> You don't have any invitations yet</Text></View>
    if (Object.keys(notes).length > 1) {
      content = <View style={{ backgroundColor: '#7d899a' }}>
        <ScrollView>
          <FlatList
            data={notes}
            renderItem={({ item }) => this.renderNotes(item)}
          />
        </ScrollView>
      </View>
    }

    return (
      <View>{content}</View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(Notification)
