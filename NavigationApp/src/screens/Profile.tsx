
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
} from 'react-native';
const { width, height } = Dimensions.get('window')

import { Navigator } from 'react-native-navigation';
import { Card } from 'react-native-elements';
import { TodoData } from './fakeData';
import axios from 'axios';

const ImagePicker = require('react-native-image-picker');


const EventData = [{
  id: 1,
  name: 'Boat Party',
  image: require('../img/boatparty.jpg'),
  description: 'Wanna meet some sexy ladies this weekend? Join and bring enough cash!',
  location: 'sai kung',
  price: 'HKD300',
  todo: {
    food: [{
      name: 'cake',
      quantity: '2'
    }, {
      name: 'apple',
      quantity: '3'
    }],
    drink: [{
      name: 'water',
      quantity: '12'
    }, {
      name: 'coke',
      quantity: '5'
    }]
  }
}, {
  id: 2,
  name: 'Boat Party',
  image: require('../img/boatparty.jpg'),
  description: 'Wanna meet some sexy ladies this weekend? Join and bring enough cash!',
  location: 'sai kung',
  price: 'HKD300',
  todo: {
    food: [{
      name: 'cake',
      quantity: '2'
    }, {
      name: 'apple',
      quantity: '3'
    }],
    drink: [{
      name: 'water',
      quantity: '12'
    }, {
      name: 'coke',
      quantity: '5'
    }]
  }
}, {
  id: 3,
  name: 'Boat Party',
  image: require('../img/boatparty.jpg'),
  description: 'Wanna meet some sexy ladies this weekend? Join and bring enough cash!',
  location: 'sai kung',
  price: 'HKD300',
  todo: {
    food: [{
      name: 'cake',
      quantity: '2'
    }, {
      name: 'apple',
      quantity: '3'
    }],
    drink: [{
      name: 'water',
      quantity: '12'
    }, {
      name: 'coke',
      quantity: '5'
    }]
  }
}]


interface IProfileProps {
  navigator: Navigator;
};

interface IProfileState {
  avatarSource: any,
  uri: string,
  itemdata: any,
  eventdata: any,
  isActive: boolean
}

export default class Profile extends React.Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)

    this.state = {
      avatarSource: null,
      uri: '',
      itemdata: TodoData,
      eventdata: EventData,
      isActive: false,
      // isActive: TodoData.isActive,
    }
  }
 
  onNavigatorEvent(event) {
    // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link.split('/'); // Link parts
      // const payload = event.payload; // (optional) The payload

      if (parts[0] == 'profile') {
        this.props.navigator.push({
          screen: 'ProfileTabScreen'// handle the link somehow, usually run a this.props.navigator command
        })
      }
    }
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
      axios.post('url', {photo: source})

      this.setState({
        avatarSource: source
      });
    }
    );
  }

  public renderTodoItem(item) { //FIXME: need to send back the data(uri/ base64) to backend  
    return (
      <View style={{ borderColor: 'gray', borderWidth: 1, margin: 10 }}>
        <TouchableOpacity onPress={() => {
          this.props.navigator.push({
            screen: 'ViewEventScreen',
            title: item.eventname,
            navigatorStyle: { tabBarHidden: true },
            passProps: {
              selectedItem: item.item
            }
          })
        }}>
          <View style={{ marginHorizontal: 10 }}>
            <Text>{item.item}</Text>
            <Text>{item.quality}</Text>
            <Text>{item.eventname}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableWithoutFeedback>
            <Switch
              onValueChange={value => {
                this.setState({
                  isActive: value
                })
                item.isActive = value
              }}

              value={item.isActive}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  public renderEventItem(item) {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigator.push({
          screen: 'ViewEventScreen',
          title: item.name,
          navigatorStyle: { tabBarHidden: true },
          passProps: {
            selectedItem: item.item
          }
        })
      }}>
        <Card
          title={item.name}
          image={item.image}>
          <Text style={{ marginBottom: 10 }}>
            {item.description}
          </Text>
        </Card>
      </TouchableOpacity>
    )
  }

  render() {

    return (
      <View>
        <ScrollView>
          <View style={{ borderBottomWidth: 1, borderColor: '#3a3a3a' }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', margin: 20, flexDirection: 'row', maxWidth: 300 }}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer]}>
                  {this.state.avatarSource === null  ? <Text>Select a Photo</Text> :
                    <Image style={styles.avatar} source={this.state.avatarSource} />
                  }
                </View>
              </TouchableOpacity>
              <View style={{ justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , paddingHorizontal: 20}}>
                  <Text style={{ fontSize: 20 }}>{TodoData.length}</Text>
                  <Text style={{ fontSize: 20 }}>{EventData.length}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                  <Text style={{ color: 'gray' }}>ToDo</Text>
                  <Text style={{ color: 'gray' }}>Event</Text>
                </View>
                <Text style={{ fontSize: 20, margin: 5 }}> user.displayname</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ width: width, borderWidth: 1 }}>To Do List</Text>
            <FlatList
              style={{ marginHorizontal: 10 }}
              data={TodoData}
              renderItem={({ item }) => this.renderTodoItem(item)}
              keyExtractor={item => item.id.toString()} 
            />
          </View>
          <View>
            <Text style={{ width: width, borderWidth: 1, marginVertical: 20 }}>Event History</Text>
            <FlatList
              style={{ marginHorizontal: 10 }}
              data={EventData}
              renderItem={({ item }) => this.renderEventItem(item)}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
      // render() {
      //   return (
      //     <View style={styles.container}>
      //       <View>

      //       </View>

      //       <FlatList
      //         data={[{ id: 1, name: '' }]}
      //         renderItem={(data) => (
      //           <TouchableOpacity key={data.item.id} onPress={() =>
      //             this.props.navigator.push({
      //               screen: 'InfoPushedScreen',
      //               title: 'This is for ' + data.item.name,
      //               passProps: {
      //                 selectedItem: data.item
      //               }
      //             })}>
      //             <Text style={styles.welcome}>
      //               Name: {data.item.name}
      //             </Text>
      //           </TouchableOpacity>
      //         )}>
      //       </FlatList>
      //       <Text style={styles.instructions}>
      //         To get started, edit Profile.js
      //       </Text>
      //       <Text style={styles.instructions}>
      //         {instructions}
      //       </Text>
      //     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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
