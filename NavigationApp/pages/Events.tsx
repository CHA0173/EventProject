import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Navigator } from 'react-native-navigation';


type Props = {
  navigator: Navigator;
};
export default class Events extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ id: 1, name: 'Alex' }, { id: 2, name: 'Lucas' }]}
          renderItem={(data) => (
            <TouchableOpacity key={data.item.id} onPress={() =>
              this.props.navigator.push({
                screen: 'InfoPushedScreen',
                title: 'This is for ' + data.item.name,
                passProps: {
                  selectedItem: data.item
                }
              })}>
              <Text style={styles.welcome}>
                Name: {data.item.name}
              </Text>
            </TouchableOpacity>
          )}>
        </FlatList>
        <Text style={styles.instructions}>
          To get started, edit Events.js
        </Text>
      </View>
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
  },
});
