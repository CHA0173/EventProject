
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
  Switch,
  Button
} from 'react-native';
const { width, height } = Dimensions.get('window')

import { Navigator } from 'react-native-navigation';
import { Card, CheckBox } from 'react-native-elements';
import { TodoData } from './fakeData';
import axios from 'axios';
import { connect } from 'react-redux';

const ImagePicker = require('react-native-image-picker');


const userProfile = {
  "id": 1,
  "name": "Alex",
  "photo": null,
  "events": [
    {
      "id": 1,
      "name": "UpdateTest2",
      "datetime": "2018-07-21T09:00:00.000Z",
      "photo": null,
      "creator": true
    },
    {
      "id": 2,
      "name": "Mary's Wedding",
      "datetime": "2018-09-20T10:00:00.000Z",
      "photo": null,
      "creator": false
    }
  ],
  "items": [
    {
      "id": 6,
      "name": "ceremonial tea",
      "quantity": 1,
      "completed": false,
      "itemEventId": 2
    },
    {
      "id": 1,
      "name": "Test2",
      "quantity": 100,
      "completed": true,
      "itemEventId": 1
    }
  ]
}

interface IUserProfile {
  id: number,
  name: string,
  photo: string,
  events: object[],
  items: object[]
}

interface IProfileProps {
  navigator: Navigator,
  userProfile: IUserProfile
};

interface IProfileState {
  avatarSource: any,
  eventAttended: number,
  todo: number
}

class Profile extends React.Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)

    this.state = {
      avatarSource: null,
      eventAttended: 0,
      todo: 0,
    }
  }
 
  onNavigatorEvent(event) {
    // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link.split('/'); // Link parts
      // const payload = event.payload; // (optional) The payload

<<<<<<< HEAD
=======
      if (parts[0] == 'profile') {
        this.props.navigator.push({
          screen: 'ProfileTabScreen'// handle the link somehow, usually run a this.props.navigator command
        })
      }
    }
  }

>>>>>>> 43e71e59f0476f70665ff383451dd053effeda9e
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
      axios.post('url', { photo: source })

      this.setState({
        avatarSource: source
      });
    }
    );
  }

  public renderTodoItem(item) { //FIXME: need to send back the data(uri/ base64) to backend
    let eventId = item.itemEventId
    let event = userProfile.events.find(event => event.id == eventId)
    return (
      <View style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 5 }}>
        <Text>
          {event.datetime.match(/\d{4}-[01]\d-[0-3]\d/)}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>
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

  componentWillMount() {
    this.props.navigator.setTitle({ title: userProfile.name })
  }

  componentDidMount() {
    const now = Date.now();
    const eventAttended = userProfile.events.reduce((count: number, event: any) => {
      const eventdate = Date.parse(event.datetime);
      return (eventdate > now) ? count += 1 : count += 0;
    }, 0);

    this.setState({ eventAttended });
  }

  public renderEventHistory(item) {
    let eventdate = Date.parse(item.datetime)
    let now = Date.now()
    if (eventdate > now) {
      return (
        <View style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 5 }}>
          <Text>
            {item.name}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { eventAttended } = this.state;

    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', margin: 20, marginHorizontal: 40, flexDirection: 'row'}}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer]}>
                {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 36, margin: 5 }}>{eventAttended}</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>To-do</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 36, margin: 5 }}>{eventAttended}</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>Attended</Text>
          </View>
        </View>
        <View>
          <Button title='To-do List' onPress={() => { }} />
          <FlatList
            style={{ marginHorizontal: 10 }}
            data={userProfile.items}
            renderItem={({ item }) => this.renderTodoItem(item)}
            keyExtractor={item => item.id.toString()}
          />
          <Button title='Event History' onPress={() => { }} />
          <FlatList
            style={{ marginHorizontal: 10 }}
            data={userProfile.events}
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
      events: state.event.events
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
