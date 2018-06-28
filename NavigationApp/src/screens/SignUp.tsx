import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert
} from 'react-native';

import { Navigator } from 'react-native-navigation';

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
      <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 100, color: 'black', flex: 0.4 }}>
          YouIn
        </Text>
        <View style={{ marginTop: 50, marginBottom: 50 }}>
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Display Name"
            onChangeText={(text) => this.setState({ text })}
          />
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
        <View style={{ width: 300 }}>
          <Button
            onPress={() => {
              Alert.alert('Success! ')
            }}
            title='SignUp'
          />
        </View>

      </View>
    )
  }

}