
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

import { connect } from 'react-redux';

const ImagePicker = require('react-native-image-picker');


interface IUserProfile {
  user: Iuser
}

interface IProfileProps {
  navigator: Navigator,
  userProfile: IUserProfile,

  addUser: (user: Iuser) => void,
  user: Iuser,
};

interface IProfileState {
  avatarSource: any,
  eventAttended: number,
  todo: number,

  user: Iuser
}

class Profile extends React.Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)

    this.state = {
      avatarSource: null,
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

  }

  public selectPhotoTapped = (token) => {
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
      const AuthStr = 'Bearer '.concat(token);

      axios.put('https://hivent.xyz/api/users', {headers: { Authorization: AuthStr }, photo: source} ) //FIXME: unauth

      this.setState({
        avatarSource: source
      });
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
    this.props.navigator.setTitle({ title: this.props.user.name })
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', padding: 20, paddingHorizontal: 40, flexDirection: 'row' }}>
          <View style={{ flexGrow: 1 }}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer]}>
                {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
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
    user: state.getUser.user
  }
}

export default connect(mapStateToProps)(Profile)


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
