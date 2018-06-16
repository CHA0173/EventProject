import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Navigator } from 'react-native-navigation';

interface MenuProps {
  navigator: Navigator
}

export default class Menu extends React.Component<MenuProps> {

  public render() {
    return (
      <View style={{backgroundColor: 'white', opacity: 1, flex: 1}}>
        <TouchableOpacity onPress={() => this.props.navigator.switchToTab({
          tabIndex: 0
        })}>
        <Text>
          this is Menu
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}