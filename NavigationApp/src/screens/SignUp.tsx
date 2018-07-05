import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert,
  Image
} from 'react-native';

import { Navigator } from 'react-native-navigation';
import axios from 'axios';

interface LogInProps {
  navigator: Navigator
}

interface LogInState {
  displayName: string;
  email: string;
  password: string;
}

export default class LogIn extends React.Component<LogInProps, LogInState> {
  constructor(props: LogInProps) {
    super(props)

    this.state = {
      displayName: '',
      email: '',
      password: '',
    }
  }

  public render() {
    return (
      <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../img/Wevent.png')} />
        <View style={{ marginTop: 50, marginBottom: 50 }}>
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Display Name"
            onChangeText={(text) => this.setState({ displayName: text })}
          />
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={{ height: 40, width: 300 }}
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={{ width: 300 }}>
          <Button
            title='SignUp'
            onPress={() => {
              Alert.alert(
                '',
                'Success !!!',
                [
                  {
                    text: 'OK', onPress: () => {
                      axios.post('https://hivent.xyz/api/signup', {
                        name: this.state.displayName,
                        email: this.state.email,
                        password: this.state.password,
                      })
                    }
                  },
                ],
                { cancelable: false }
              )
              this.props.navigator.resetTo({
                screen: 'StartScreen',
                navigatorStyle: {navBarHidden: true},
              })
            }}
          />
        </View>

      </View>
    )
  }

}