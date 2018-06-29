import * as React from 'react'
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'

const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome'

// const DiscussionData = [{
//   username: 'Lucas',
//   massage: 'awesome event !!!!',
// }, {
//   username: 'Brad',
//   massage: 'YOYOYO',
// }, {
//   username: 'Jacob',
//   massage: 'Yeah',
// }, {
//   username: 'Stephen',
//   massage: 'not bad',
// }, {
//   username: 'Alex',
//   massage: 'Good!',
// }]
import { Ievent } from '../../models/events'

interface IData {
  username: string,
  massage: string,
};

interface IDiscussionProps {
  event: Ievent,
}

interface IDiscussionStates {
  Text: string,
  Data: IData[],
}

export default class Discussion extends React.Component<IDiscussionProps, IDiscussionStates> {
  constructor(props: IDiscussionProps) {
    super(props)

    this.state = {
      Text: '',
      Data: [{
        username: '',
        massage: '',
      }],
    }
  }

  // public renderData = () => {
  //   this.setState({
  //     Data: this.props.event.discussion.concat({
  //       name: this.props.event.name,
  //       comment: this.state.TextBox,
  //     })
  //   })
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.event.discussion}
          renderItem={(data) => {
            return (
              <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 10, borderRadius: 25, borderWidth: 1, padding: 10, backgroundColor: '#ffffcc' }}>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 20 }}>{data.item.name}</Text>
                  </View>
                  <View style={{ marginHorizontal: 20, padding: 20 }}>
                    <Text>{data.item.comment}</Text>
                  </View>
                </View>
              </ScrollView>
            )
          }}
          keyExtractor={data => data.id.toString()}
        />

        <View style={{ backgroundColor: 'white' }}>

          <TextInput
            value={this.state.Text}
            onChangeText={(text) => this.setState({
              Text: text
            })}
            placeholder='massage'
            keyboardAppearance='dark'
            style={{ backgroundColor: 'transparent', width: '80%', marginHorizontal: 10 }}
          />

          {this.state.Text ?
            <TouchableWithoutFeedback 
            // onPress={() => this.renderData} //FIXME:
            >
              <Icon
                name='send-o'
                color='green'
                size={25}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 20,
                  zIndex: 1
                }}
              />
            </TouchableWithoutFeedback>
            : null}

        </View>

      </View >
    )
  }
}