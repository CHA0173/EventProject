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
  Image
} from 'react-native';
import { Navigator } from 'react-native-navigation';
const ImagePicker = require('react-native-image-picker');

interface IProfileProps {
  navigator: Navigator;
};

interface IProfileState {
  avatarSource: any,
  uri: string,
}

export default class Profile extends React.Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)

    this.state = {
      avatarSource: '',
      uri: '',
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

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
            {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
          </View>
        </TouchableOpacity>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }, avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
});
