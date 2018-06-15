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

} from 'react-native';

const { width, height } = Dimensions.get('window')
import { Navigator, NavigatorButton } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Events } from './fakeData';

const fakedata = [{
  id: 1,
  name: 'Event 1',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E1'
}, {
  id: 2,
  name: 'Event 2',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E2'
}]


interface ISearchProps {
  navigator: Navigator;
};

interface ISearchState {
  text: string,
  data: any,
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      text: '',
      data: '',
    }
  }

  public filter(text) {
    const newData = fakedata.filter(function (item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    });

    this.setState({
      data: newData,
      text: text,
    });
  };

  public deleteData() {
    this.setState({
      text: '',
      data: '',
    });
  };

  public renderItem(item) {
    return (
      <FlatList
      data= {fakedata}
      renderItem={(fakedata) =>(
      <TouchableWithoutFeedback onPress={() => {
        this.props.navigator.push({
          screen: 'EventsTabScreen',
          title: 'This is for ' + fakedata.item.name,
          passProps: {
            selectedItem: item.item
          }
        })
      }}>
        <Image style={styles.image} source={{ uri: item.img }} />
      </TouchableWithoutFeedback>
      )}/>
    )
  }

  render() {
    // TODO: go back
    // const back = this.props.navigatorButton
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
            autoFocus={true}
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

          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <View>
              <Text style={styles.cancelButtonText} >Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            style={{ marginHorizontal: 5 }}
            data={this.state.data}
            numColumns={3}
            columnWrapperStyle={{ marginTop: 5, marginLeft: 5 }}
            renderItem={({ item }) => this.renderItem(item)}
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
    width: 115,
    height: 170
  },
});
