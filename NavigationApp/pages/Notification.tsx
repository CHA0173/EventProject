import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Navigator } from 'react-native-navigation';

interface NotificationProps {
  navigator: Navigator
}

export default class Notification extends React.Component<NotificationProps> {

  public render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigator.switchToTab({
          tabIndex: 0
        })}>
        <Text>
          this is Notification
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}