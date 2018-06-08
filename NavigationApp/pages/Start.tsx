import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  StyleSheet
} from 'react-native';

import { Navigator } from 'react-native-navigation';

interface StartProps {
  navigator: Navigator
}



export default class Start extends React.Component<StartProps> {
  constructor(props: StartProps) {
    super(props)

  }

  public render() {
    return (
      <View style={{ backgroundColor: 'yellow', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 100, color: 'black', flex: 0.4, marginTop: 50 }}>
          YouIn
        </Text>
        <View style={{ margin: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View >
            <Button
              title='LogIn'
              onPress={() => {
                this.props.navigator.push({
                  screen: 'LogInScreen',
                  title: 'LogIn',
                  navigatorStyle: { navBarTitleTextCentered: true }
                })

              }}
            />
          </View>
          <View style={{ marginBottom: 50 }}>
            <Button
              onPress={() => {
                this.props.navigator.push({
                  screen: 'SignUpScreen',
                  title: 'SignUp',
                  navigatorStyle: { navBarTitleTextCentered: true }
                })
              }}
              title='SignUp'
            />
          </View>
        </View>
        {/* <View style={{ marginBottom: 50 }}>
          <Button
            onPress={() => {
              this.props.navigator.push({
                screen: ''
              })
            }}
            title='Social LogIn'
          />
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

