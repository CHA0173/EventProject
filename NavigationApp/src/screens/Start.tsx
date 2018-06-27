import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get("window")
import { Button } from 'react-native-elements'
import { Navigator } from 'react-native-navigation';

interface IStartProps {
  navigator: Navigator
}

interface IStartState {
  renderStart: boolean,
  text: string
}


export default class Start extends React.Component<IStartProps, IStartState> {
  constructor(props: IStartProps) {
    super(props)
    this.state = {
      renderStart: false,
      text: ''
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
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <View>
            <Image source={require('../img/6mb.gif')}
              style={{ width: width, height: 200 }} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: 'black', marginTop: 20 }}>
              Welcome to Wevent
            </Text>
            <Text style={{ fontSize: 16, color: 'darkgrey' }}>
              Start planning now!
            </Text>
          </View>
          <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={{ marginBottom: 20, height: 40, width: 300 }}
              placeholder="Email"
              onChangeText={(text) => this.setState({ text })}
            />

            <TextInput
              style={{ marginBottom: 20, height: 40, width: 300 }}
              placeholder="Password"
              onChangeText={(text) => this.setState({ text })}
            />
          </View>
          <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              iconRight={{ name: 'input' }}
              title='Login'
              buttonStyle={{width: 300, borderRadius: 25, backgroundColor: '#d15953', marginBottom: 20}}
              onPress={() => {}}
            />
              <Button
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'SignUpScreen',
                    title: 'SignUp',
                    navigatorStyle: { navBarTitleTextCentered: true }
                  })
                }}
                title='Sign up here'
                buttonStyle={{width: 300, borderRadius: 25, backgroundColor: '#f7eded'}}
                color='black'
              />
          </View>
        </View>
      )
    } else {
      return (
        <View style={{flex:1}}>
            <Image  source={require('../img/startbackground.jpg')}
                    style={{ 
                      flex: 1,
                      width: null,
                      height: null,}} />
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
