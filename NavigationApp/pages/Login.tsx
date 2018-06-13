import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import { Navigator, Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const FacebookLogIn = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook} style={{ width: 300 }}>
    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>Login with Facebook</Text>
  </Icon.Button>
);


interface LogInProps {
  navigator: Navigator
}

interface LogInState {
  text: string
}

export default class LogIn extends React.Component<LogInProps, LogInState> {
  constructor(props: LogInProps) {
    super(props)

    this.state = {
      text: ''
    }
  }

  public render() {

    return (
      <View style={{ backgroundColor: 'yellow', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 100, color: 'black', flex: 0.4 }}>
          YouIn
        </Text>
        <View style={{ marginTop: 50, marginBottom: 50, }}>
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Email"
            onChangeText={(text) => this.setState({ text })}
          />

          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Password"
            onChangeText={(text) => this.setState({ text })}
          />
        </View>
        <View style={{ width: 300, margin: 10 }}>
          <Button
            title='LogIn'
            onPress={() => {
              Navigation.startTabBasedApp({
                tabs: [
                  {
                    label: 'Search',
                    screen: 'SearchTabScreen', // this is a registered name for a screen
                    icon: require('../img/search.png'),
                    selectedIcon: require('../img/search.png'), // iOS only
                    title: 'SearchBar',
                    navigatorStyle: { navBarTitleTextCentered: true, navBarHidden: true}
                  },
                  {
                    label: 'Events',
                    screen: 'EventsTabScreen',
                    icon: require('../img/Calendar1.png'),
                    selectedIcon: require('../img/Calendar1.png'), // iOS only
                    title: 'Events',
                    navigatorStyle: { navBarTitleTextCentered: true }
                  },
                  {
                    label: 'Notification',
                    screen: 'NotificationTabScreen',
                    icon: require('../img/notification3.png'),
                    selectedIcon: require('../img/notification3.png'), // iOS only
                    title: 'Notification',
                    navigatorStyle: { navBarTitleTextCentered: true }
                  },
                  {
                    label: 'Profile',
                    screen: 'ProfileTabScreen',
                    icon: require('../img/profile.png'),
                    selectedIcon: require('../img/profile.png'), // iOS only
                    title: 'Profile',
                    navigatorStyle: { navBarTitleTextCentered: true }
                  }
                ],
                drawer: {
                  right: {
                    screen: 'MenuScreen',
                  },
                  style: {
                    drawerShadow: true,
                  },
                  animationType: 'fade'
                }
              })
            }}
          />
        </View>
        <View>
          {FacebookLogIn}
        </View>
      </View>
    )
  }
}