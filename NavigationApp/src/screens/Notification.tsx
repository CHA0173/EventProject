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
import { get_user } from '../actions/auth';

interface NotificationProps {
  navigator: Navigator
  user: Iuser
  token: string
  get_user: (token) => void
}

class Notification extends React.Component<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../img/refresh.png'),
        id: 'refresh'
      }
    ]
  };
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'refresh') {
        this.props.get_user(this.props.token)
      }
    }
  }

  renderNotes(item) {
    let datetime = '';
    if (Object.keys(item).length > 0 && item.note) {
      datetime = `${item.timestamp.match(/\d{4}-[01]\d-[0-3]\d/)}, at ${item.timestamp.match(/[\d]{2}:[\d]{2}/)}`;
    }
    return (
      <TouchableOpacity onPress={() => {
        const AuthStr = 'Bearer '.concat(this.props.token);
        axios.get(`https://hivent.xyz/api/events/${item.id}`, { headers: { Authorization: AuthStr } }).then((data) => {
          console.log('data', data.data)
          this.props.navigator.push({
            screen: 'ViewEventScreen',
            title: data.data.name,
            navigatorStyle: { tabBarHidden: true },
            passProps: { eventIdFromBackend: data.data.id }
          })
        })
      }}>
        <View style={{ padding: 10, margin: 10, backgroundColor: '#ffebd2' }}>
          <Text>{item.note}</Text>
          <Text style={{alignItems: 'flex-end'}}>{datetime}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  public render() {
    let { notes } = this.props.user
    let content = <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ marginTop: 30 }}> You don't have any invitations yet</Text></View>
    if (Object.keys(notes).length > 0) {
      content = <View>
        <ScrollView>
          <FlatList
            data={notes}
            renderItem={({ item }) => this.renderNotes(item)}
          />
        </ScrollView>
      </View>
    }

    return (
      <View style={{backgroundColor: '#b5b7b4', flex: 1}}>{content}</View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    token: state.authReducer.token,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    get_user: (token) => dispatch(get_user(token)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Notification)
