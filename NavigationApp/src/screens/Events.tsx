import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Card, ListItem, ButtonGroup, Icon } from 'react-native-elements';
import { Navigator, NavigatorButton } from 'react-native-navigation';
import { Iuser, Ievents } from '../models/users';
import { connect } from 'react-redux'
import axios from 'axios';


interface IEventsProps {
  navigator: Navigator,
  user: Iuser,
  token: string,
};

interface IEventsStates {
  selectedIndex: number
};

class Events extends React.Component<IEventsProps, IEventsStates> {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../img/plus.png'),
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
    // const filterEventCardOption = [true || false, true]
    console.log('this.props.user.events', this.props)
    const { user } = this.props;
    const events = user.events ? user.events : [];

    return (
      <View style={{ flex: 1, backgroundColor: '#7d899a' }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={buttons}
          selectedTextStyle={{color: 'white', backgroundColor: '#d15953'}}
          containerStyle={{ marginTop: 10, height: 30, backgroundColor: 'white', borderWidth: 0, elevation: 3 }}
          textStyle={{ fontSize: 14 }}
          selectedButtonStyle={{backgroundColor: '#d15953'}}
        />
        <ScrollView style={{ flex: 1 }}>
          {console.log(this.props)}
          <FlatList
            data={!this.state.selectedIndex ? events : events && events.filter(event => event.creator == true)}
            renderItem={(event) => {
              return (
                <View style={{ backgroundColor: 'transparent' }}>
                  <TouchableOpacity onPress={() => {
                    const AuthStr = 'Bearer '.concat(this.props.token);
                    axios.get(`https://hivent.xyz/api/events/${event.item.id}`, { headers: { Authorization: AuthStr } }).then((data) => {
                      console.log('data', data.data)
                      this.props.navigator.push({
                        screen: 'ViewEventScreen',
                        title: event.item.name,
                        navigatorStyle: { tabBarHidden: true },
                        passProps: { eventIdFromBackend: data.data.id }
                      })
                    })
                  }}>
                    <Card
                      containerStyle={{
                        marginHorizontal: 20,
                        marginVertical: 30,
                        elevation: 3,
                        borderRadius: 8,
                        borderWidth: 0
                      }}
                      title={event.item.name}
                      image={{ uri: event.item.photo }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name='date-range' color='#ac6264' containerStyle={{ marginHorizontal: 16 }} />
                        <Text style={{ fontSize: 16 }}>
                          {event.item.datetime.match(/\d{4}-[01]\d-[0-3]\d/)}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={data => data.id.toString()}
          />

        </ScrollView>
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(Events);

