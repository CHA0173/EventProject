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



export default class Start extends React.Component<StartProps, { renderStart: boolean }> {
  constructor(props: StartProps) {
    super(props)
    this.state = {
      renderStart: false
    }
    setTimeout(() => {
      this.setState({
        renderStart: true,
      })
    }, 2000);
  }
  renderStart = () => {
    if (this.state.renderStart) {
      return (
        <View style={{ backgroundColor: 'yellow', flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1.5 }}>
            <Text style={{ fontSize: 100, color: 'black' }}>
              YouIn
          </Text>
          </View>
          <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 150 }}>
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
            <View style={{ width: 150 }}> 
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
    } else {
      return (
        <View style={{ backgroundColor: 'yellow', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View >
            <Text style={{ fontSize: 100, color: 'black' }}> YouIn </Text>
          </View>
        </View>
      )
    }
  }
  public render() {
    return (
      this.renderStart()
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

