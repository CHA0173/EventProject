import * as React from 'react';
import {
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { Navigator } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { fakedata } from './fakeData';
// import { auth } from '../actions/auth';


import { connect } from 'react-redux'
import { Ievent } from '../models/events' 
import { get_viewevent } from '../actions/auth';
import axios from 'axios';

interface ISearchProps {
  navigator: Navigator,
  fetchEvents: () => string[],
  get_viewevent: (token, id) => void,

  token: any,
  events: Ievent[],
  text: string,
};

interface ISearchState {
  text: string,
  // data: any,
  event: Ievent[],
  isFetching: boolean
}

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      text: '',
      // data: [],
      event: this.props.events,
      isFetching: true
    }
  }
  onNavigatorEvent(event) {
    // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link.split('/'); // Link parts
      // const payload = event.payload; // (optional) The payload

      if (parts[0] == 'search') {
        this.props.navigator.push({
          screen: 'SearchTabScreen'
        })// handle the link somehow, usually run a this.props.navigator command
      }
    }
  }

  public filter(text) {//insert axios get to backend
    console.log("serach this.props.events", this.props)
    const newData = this.props.events.slice().filter(function (item) { //FIXME: 
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      console.log("itemData", itemData, "textData", textData);
      return itemData.indexOf(textData) > -1
    });

    this.setState({
      event: newData,
      text: text,
    });
  };

  public deleteData() {
    this.setState({
      text: '',
      event: this.props.events,
    });
  };

  public renderItem(item) {
    let datetime = `${item.datetime.match(/\d{4}-[01]\d-[0-3]\d/)}, start at ${item.datetime.match(/[\d]{2}:[\d]{2}/)}`;
    return (
      <TouchableWithoutFeedback onPress={() => {
        const AuthStr = 'Bearer '.concat(this.props.token);
        axios.get(`https://hivent.xyz/api/events/${item.id}`, { headers: { Authorization: AuthStr } }).then((data) => {
          console.log('data', data.data)
          this.props.navigator.push({
            screen: 'ViewEventScreen',
            title: item.name,
            navigatorStyle: { tabBarHidden: true },
            passProps: { eventIdFromBackend: data.data.id }
          })
        })
      }}>
        <View>
          <Image style={styles.image} source={{ uri: item.photo }} />
          <Text style={{ color: 'white', margin: 20 }}>{`${item.name}  ${datetime}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name='search'
            color='grey'
            size={18}
            style={styles.searchIcon}
          />
          <TextInput
            value={this.state.text}
            onChangeText={(text) => this.filter(text)}
            style={styles.input}
            placeholder='Search'
            keyboardAppearance='dark'

          />
          {this.state.text ?
            <TouchableWithoutFeedback onPress={() => this.deleteData()}>
              <Icon
                name='times-circle'
                color='grey'
                size={18}
                style={styles.iconInputClose}
              />
            </TouchableWithoutFeedback>
            : null}

          <TouchableOpacity onPress={() => this.deleteData()}>
            {/* <TouchableOpacity onPress={() => this.props.navigator.switchToTab({
            tabIndex: 1
          })}> */
          Keyboard.dismiss()
          }
            <View>
              <Text style={styles.cancelButtonText} >Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            style={styles.flatstyle} 
            data={this.state.event} //FIXME:
            renderItem={({ item }) => this.renderItem(item)}
            // keyExtractor={item => item.id.toString()} 
          />
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818'
  },
  header: {
    height: 40,
    backgroundColor: '#181818',
    borderBottomWidth: 1,
    borderColor: '#3a3a3a',
    paddingBottom: 5,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    top: 5,
    left: 15,
    zIndex: 1,
    backgroundColor: 'transparent'
  },
  iconInputClose: {
    position: 'absolute',
    top: 5,
    right: 90,
    backgroundColor: 'transparent',
    zIndex: 1
  },
  input: {
    width: width - (width / 4),
    height: 40,
    backgroundColor: '#323232',
    marginHorizontal: 10,
    paddingLeft: 30,
    borderRadius: 3,
    color: 'grey'
  },
  cancelButtonText: {
    color: 'white'
  },
  image: {
    marginRight: 5,
    width: width,
    height: 170
  },
  flatstyle: {
    marginHorizontal: 10,
  }
});

const mapStateToProps = state => {
  return {
    events: state.event.events,
    token: state.authReducer.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_viewevent: (token, id) => dispatch(get_viewevent(token, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)