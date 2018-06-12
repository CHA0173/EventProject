import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Navigator } from 'react-native-navigation';

interface SettingProps {
  navigator: Navigator
}

export default class Setting extends React.Component<SettingProps> {

  public render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigator.switchToTab({
          tabIndex: 0
        })}>
        <Text>
          this is Setting
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}