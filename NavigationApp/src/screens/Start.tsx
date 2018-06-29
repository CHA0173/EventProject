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
import { Navigator, Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { auth } from '../actions/auth';

interface IStartProps {
  navigator: Navigator,
  token: string,
  auth: (email: string, password: string) => void,
}

interface IStartState {
  renderStart: boolean,
  email: string,
  password: string
}


class Start extends React.Component<IStartProps, IStartState> {
  constructor(props: IStartProps) {
    super(props)
    this.state = {
      renderStart: false,
      email: '',
      password: ''
    }
    setTimeout(() => {
      this.setState({
        renderStart: true,
      })
    }, 2000);
  }

  renderStart = () => {
    if(this.props.token) {
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: 'Events',
            screen: 'EventsTabScreen',
            icon: require('../img/Calendar1.png'),
            selectedIcon: require('../img/Calendar1.png'), // iOS only
            title: 'Events',
            navigatorStyle: { navBarTitleTextCentered: true }
          },
          {
            label: 'Search',
            screen: 'SearchTabScreen', // this is a registered name for a screen
            icon: require('../img/search.png'),
            selectedIcon: require('../img/search.png'), // iOS only
            title: 'SearchBar',
            navigatorStyle: { navBarTitleTextCentered: true, navBarHidden: true}
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
        ]
      })
    }
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
              onChangeText={(text) => this.setState({ email: text })}
            />

            <TextInput
              style={{ marginBottom: 20, height: 40, width: 300 }}
              placeholder="Password"
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
          <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              iconRight={{ name: 'input' }}
              title='Login'
              buttonStyle={{width: 300, borderRadius: 25, backgroundColor: '#d15953', marginBottom: 20}}
              onPress={() => {
                this.props.auth(this.state.email, this.state.password)
                
              }}
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

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password) => dispatch(auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);