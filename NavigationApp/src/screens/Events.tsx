import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Card, ListItem, Icon, ButtonGroup } from 'react-native-elements';
import { Navigator, NavigatorButton } from 'react-native-navigation';
import { event } from './fakeData'

interface IEventsProps {
  navigator: Navigator;
};
interface IEventsStates {
  selectedIndex: number;
};

export default class Events extends React.Component<IEventsProps, IEventsStates> {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Create',
        id: 'create'
      }
    ]
  };

  constructor(props: IEventsProps) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'create') {
        this.props.navigator.push({
          screen: 'CreateEventScreen'
        })
      }
    }
  }

  render() {
    const buttons = ['Upcoming', 'Created']

    return (
      <View style={{flex: 1}}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 30 }}
        />
        <ScrollView style={{flex: 1}}>
          <FlatList
            data={event}
            renderItem={(event) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => this.props.navigator.push({
                    screen: 'ViewEventScreen',
                    title: event.item.name,
                    navigatorStyle: { tabBarHidden: true }
                  })}>
                    <Card
                      title={event.item.name}
                      image={event.item.image}>
                      <Text style={{ marginBottom: 10 }}>
                        {event.item.description}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={data => data.id.toString()}
          />
        </ScrollView>
      </View>
    )
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
