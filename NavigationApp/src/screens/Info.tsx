import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Navigator } from 'react-native-navigation';

interface InfoProps {
  navigator: Navigator,
  selectedItem: {
    name: string,
    id: number,
  }
}

export default class Info extends React.Component<InfoProps> {

  public render() {
    return (
      <View>
        <TouchableOpacity >
        <Text>
          this is Info page
        </Text>
        <Text>
          HI, {this.props.selectedItem.name}
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}