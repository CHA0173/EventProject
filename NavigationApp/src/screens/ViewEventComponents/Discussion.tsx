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
import { Avatar } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome'


import { Ievent } from '../../models/events'
import { connect } from 'react-redux';
import axios from 'axios';

interface IdiscussionData {
  id: number;
  name: string;
  comment: string;
}

interface IDiscussionProps {
  events: any;
  user: any;
  eventIdFromBackend: number;
  token: any;
}

interface IDiscussionStates {
  comment: string;
  discussionData: any[];
}

class Discussion extends React.Component<IDiscussionProps, IDiscussionStates> {
  constructor(props: IDiscussionProps) {
    super(props)

    this.state = {
      comment: '',
      discussionData: this.props.events.find(ele => ele.id === this.props.eventIdFromBackend).discussion
    }
  }

  // componentWillMount(){
  //   let comments = this.props.events.find(ele => ele.id === this.props.eventIdFromBackend).discussion
  //   this.setState({discussionData: comments})
  // }

  public renderData = () => {
    // console.log(this.props.events)
    // let events = this.props.events
    // this.setState({
    //   Data: events.discussion.concat({
    //     name: this.state.name,
    //     comment: this.state.comment
    //   })
    // })

    let newcomment = this.state.discussionData

    newcomment = newcomment.concat({
      id: this.props.user.id,//userId,
      name: this.props.user.name,//username,
      comment: this.state.comment,//comment,
    })
    this.setState({
      comment: '',
      discussionData: newcomment
    })
  }

  render() {
    console.log(this.props)

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.discussionData}
          renderItem={(data) => {
            return (
              <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10, borderRadius: 10, borderWidth: 0, padding: 10, backgroundColor: '#ffffff' }}>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 16 }}>{data.item.name}</Text>
                  </View>
                  <View style={{ marginHorizontal: 20, padding: 5 }}>
                    <Text style={{ fontSize: 20, color: '#630815' }}>{data.item.comment}</Text>
                  </View>
                </View>
              </ScrollView>
            )
          }}
          keyExtractor={(index) => index.toString()}
        />

        <View style={{ backgroundColor: 'white' }}>

          <TextInput
            value={this.state.comment}
            onChangeText={(text) => this.setState({
              comment: text
            })}
            placeholder='massage'
            keyboardAppearance='dark'
            style={{ backgroundColor: 'transparent', width: '80%', marginHorizontal: 10 }}
          />

          {this.state.comment ?
            <TouchableWithoutFeedback
              onPress={() => {
                // console.log('discussion.state',this.state, this.renderData)
                this.renderData()
                const AuthStr = 'Bearer '.concat(this.props.token);
                axios.post(`https://hivent.xyz/api/events/${this.props.user.id}/comment`, {
                  users_id: this.props.user.id,
                  events_id: this.props.eventIdFromBackend,
                  comment: this.state.discussionData
                }, { headers: { Authorization: AuthStr } }
                )
              }}
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

      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    events: state.event.events,
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(Discussion)
