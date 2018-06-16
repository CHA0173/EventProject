/**
 * Sample React Native Profile
 * https://github.com/facebook/react-native
 * @flow
 */

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
} from 'react-native';
const { width, height } = Dimensions.get('window')


import { Navigator } from 'react-native-navigation';
const ImagePicker = require('react-native-image-picker');


    const TodoData = [{
      id: 1,
      item : 'Coke',
      quality: 12,
      eventname: 'Even 1',
      isActive: true
    },{
      id: 1,
      item : 'Coke',
      quality: 12,
      eventname: 'Even 1',
      isActive: true
    },{
      id: 1,
      item : 'Coke',
      quality: 12,
      eventname: 'Even 1',
      isActive: false
    },{
      id: 6,
      item : 'Coke',
      quality: 102,
      eventname: 'Even 2',
      isActive: false
    },{
      id: 6,
      item : 'Coke',
      quality: 102,
      eventname: 'Even 2',
      isActive: false
    },{
      id: 1,
      item : 'Coke',
      quality: 12,
      eventname: 'Even 1',
      isActive: true
    },{
      id: 6,
      item : 'Coke',
      quality: 102,
      eventname: 'Even 1',
      isActive: false
    },{
      id: 6,
      item : 'Coke',
      quality: 102,
      eventname: 'Even 2',
      isActive: false
    },{
      id: 6,
      item : 'Coke',
      quality: 102,
      eventname: 'Even 2',
      isActive: false
    },]

interface IProfileProps {
  navigator: Navigator;
};

interface IProfileState {
  avatarSource: any,
  uri: string,
  data: any,
}

export default class Profile extends React.Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)

    this.state = {
      avatarSource: null,
      uri: '',
      data: TodoData,
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

      const source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source
      });
    }
    );
  }

  public renderTodoItem(item) {
    return (
      <View>
        <Text>{item.item}</Text>
        <Text>{item.quality}</Text>
        <Text>{item.eventname}</Text>
        <TouchableWithoutFeedback>
          <Text>{item.isActive}</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  public renderEventItem(item) {
    return (
      <View>
        <Text>{item.item}</Text>
        <Text>{item.quality}</Text>
        <Text>{item.eventname}</Text>
        <TouchableWithoutFeedback>
          <Text>{item.isActive}</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  render() {

    return (
      <View>
        <View style={{ borderBottomWidth: 1, borderColor: '#3a3a3a' }}>
          <View style={{ justifyContent: 'space-between', alignItems: 'center', margin: 20, flexDirection: 'row', maxWidth: 300 }}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer]}>
                {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
              </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>one</Text>
                <Text>two</Text>
                <Text>three</Text>
              </View>
              <Text style={{ fontSize: 20, margin: 5 }}> user.displayname</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <Text style={{ width: width, backgroundColor: 'gray' }}>To Do List</Text>
          <FlatList
            style={{ marginHorizontal: 10 }}
            data={this.state.data}
            renderItem={({ item }) => this.renderTodoItem(item)}
          />
          <Text style={{ width: width, backgroundColor: 'gray'}}>Event History</Text>
          <FlatList 
            style={{ marginHorizontal: 10}}
            data={this.state.data}
            renderItem={({ item }) => this.renderEventItem(item)}
            />
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
