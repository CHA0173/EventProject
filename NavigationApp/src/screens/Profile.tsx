
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  PixelRatio,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Switch
} from 'react-native';
import { Button } from 'react-native-elements'
const { width, height } = Dimensions.get('window')

import { Navigator } from 'react-native-navigation';
import { Card, CheckBox } from 'react-native-elements';
import { Iuser } from '../models/users'
import axios from 'axios';
import {clear_token} from '../actions/auth';
import { connect } from 'react-redux';

const ImagePicker = require('react-native-image-picker');


interface IUserProfile {
  user: Iuser
}

interface IProfileProps {
  navigator: Navigator,
  userProfile: IUserProfile,
  clearToken: () => void,
  addUser: (user: Iuser) => void,
  user: Iuser,
  token: any,
};

interface IProfileState {
  avatarSource: any,
  eventAttended: number,
  todo: number,

  user: Iuser
}

class Profile extends React.Component<IProfileProps, IProfileState> {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../img/exit-512.png'),
        id: 'logout'
      }
    ]
  };
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'logout') {
        this.props.clearToken()
        this.props.navigator.resetTo({
          screen: 'StartScreen',
          navigatorStyle: { navBarHidden: true, tabBarHidden: true }
      })
      }
    }
  }

  constructor(props: IProfileProps) {
    super(props)
    this.state = {
      avatarSource: this.props.user.photo,
      eventAttended: 0,
      todo: 0,
      user: {
        id: -1,
        name: '',
        photo: '',
        events: [],
        items: [],
      }
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  public selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.data) {
        return
      }

      // const source = { uri: response.uri };


      // You can also display the image using data:
      const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // const header = {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json'
      //   }
      // }
      const AuthStr = 'Bearer '.concat(this.props.token);

      axios.post('https://hivent.xyz/api/users',{ photo: 'data:image/jpeg;base64,' + response.data } , { headers: { Authorization: AuthStr } }) //FIXME: unauth
      // axios({
      //   method: 'PUT',
      //   url:'https://hivent.xyz/api/users',
      //   header: { Authorization: AuthStr },
      //   data: { photo: source}
      // })

      this.setState({
        avatarSource: source,
      });
      console.log('photo source',source)
    }
    );
  }

  public renderTodoItem(item) {
    let eventId = item.itemEventId;

    let event = this.props.user.events.find(e => e.id == eventId);
    return (
      event &&
      <View style={{ borderWidth: 0, padding: 10, margin: 10, borderRadius: 5, backgroundColor: '#ffffff' }}>
        <Text>
          {event.datetime.match(/\d{4}-[01]\d-[0-3]\d/)}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{fontSize: 18, color: 'black'}}>
              {item.name}
            </Text>
            <Text>
              at {event.name}
            </Text>
          </View>
          <View>
            <CheckBox
              center
              iconRight={true}
              title={`Qty: ${item.quantity}`}
              checked={item.completed}
            />
          </View>
        </View>
      </View>
    )
  }

  // componentDidMount() {
  //   const now = Date.now();
  //   const eventAttended = this.props.user.events.reduce((count: number, event: any) => {
  //     const eventdate = Date.parse(event.datetime);
  //     return (eventdate > now) ? count += 1 : count += 0;
  //   }, 0);

  //   this.setState({ eventAttended });
  // }

  public renderEventHistory(item) {
    let eventdate = Date.parse(item.datetime)
    let now = Date.now()
    if (eventdate > now) {
      return (
        <View style={{ borderWidth: 0, padding: 10, margin: 10, borderRadius: 5, backgroundColor: '#ffffff' }}>
          <Text>
            {item.name}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { eventAttended } = this.state;
    console.log("this.props.user", this.props);
    // this.props.navigator.setTitle({ title: this.props.user.name })
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', padding: 20, paddingHorizontal: 40, flexDirection: 'row' }}>
          <View style={{ flexGrow: 1 }}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer]}>
                {
                  !this.props.user.photo ? <Text>Select a Photo</Text> :
                  <Image style={styles.avatar} source={
                    this.state.avatarSource && this.state.avatarSource !== '' ? 
                    this.state.avatarSource : {uri: this.props.user.photo}
                }/> 
                }
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexGrow: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: 'grey' }}>To-do</Text>
            <Text style={{ fontSize: 36, padding: 5 }}>{eventAttended}</Text>
          </View>
          <View style={{ flexGrow: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: 'grey' }}>Attended</Text>
            <Text style={{ fontSize: 36, padding: 5 }}>{eventAttended}</Text>
          </View>
        </View>
        <View>
          <Button icon={{ name: 'view-list' }} title='To-do List' disabledStyle={{ backgroundColor: '#d15953' }} disabled onPress={() => { }} />
          <FlatList
            style={{ marginHorizontal: 10 }}
            data={this.props.user.items}
            renderItem={({ item }) => this.renderTodoItem(item)}
            keyExtractor={item => item.id.toString()}
          />
          <Button icon={{ name: 'local-library' }} title='Event History' disabledStyle={{ backgroundColor: '#004263' }} disabled onPress={() => { }} />
          <FlatList
            style={{ marginHorizontal: 10 }}
            data={this.props.user.events}
            renderItem={({ item }) => this.renderEventHistory(item)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    );
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
    clearToken: () => dispatch(clear_token())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)


const styles = StyleSheet.create({
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 100,
    height: 100
  },
});
