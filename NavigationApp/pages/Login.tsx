import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert
} from 'react-native';

import { Navigator, Navigation } from 'react-native-navigation';

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
        <View style={{marginTop: 50, marginBottom: 50, backgroundColor: 'white'}}>
          <TextInput
            style={{ height: 40, width: 200 }}
            placeholder="Email"
            onChangeText={(text) => this.setState({ text })}
          />
          <TextInput
            style={{ height: 40, width: 200 }}
            placeholder="Password"
            onChangeText={(text) => this.setState({ text })}
            />
        </View>
        <Button
            title='LogIn'
            onPress={() => {
              Navigation.startTabBasedApp({
                tabs: [
                  {
                    label: 'Search',
                    screen: 'FirstTabScreen', // this is a registered name for a screen
                    icon: require('../img/react.png'),
                    selectedIcon: require('../img/react.png'), // iOS only
                    title: 'YouIn'
                  },
                  {
                    label: 'Profile',
                    screen: 'SecondTabScreen',
                    icon: require('../img/react.png'),
                    selectedIcon: require('../img/react.png'), // iOS only
                    title: 'Profile'
                  },
                  {
                    label: 'Notification',
                    screen: 'NotificationTabScreen',
                    icon: require('../img/react.png'),
                    selectedIcon: require('../img/react.png'), // iOS only
                    title: 'Notification'
                  }],
                drawer: {
                  right: {
                    screen: 'MenuScreen',
                  },
                  style: {
                    drawerShadow: true,
                  }
                }
              })
            }}
        />
      </View>
    )
  }
}