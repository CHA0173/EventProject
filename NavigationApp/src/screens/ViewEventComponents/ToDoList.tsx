import * as React from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'
import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users'
import { connect } from 'react-redux';
import { get_viewevent } from '../../actions/auth';
import axios from 'axios';
// import { remoteEditEvent } from '../../actions/Event';
import { assign_todoitem } from '../../actions/Event';

interface IToDoListProps {
  event: Ievent,
  user: Iuser,
  token: string,
  data: any,
  // event:any,
  // remoteEditEvent: () => void,
  assign_todoitem: (token,eventId, toDoItemId, userId, userName) => void,
}


class ToDoList extends React.Component<IToDoListProps, {}> {
  constructor(props: IToDoListProps) {
    super(props)
  }

  render() {
    console.log( this.props)
    return (
      <View>
        <List containerStyle={{ borderWidth: 1, borderTopWidth: 1, margin: 20 }}>
          {
            this.props.event.todo[0].items.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                hideChevron={true}
                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                leftIcon={this.props.event.todo[0].items[i].user_name == null ? <Icon
                  name='hashtag'
                  type='font-awesome'
                  color='#e54d16'
                  size={15}
                  iconStyle={{ marginRight: 10 }}
                  

                /> : <Icon
                    name='flag'
                    type='font-awesome'
                    color='#273960'
                    size={15}
                    iconStyle={{ marginRight: 10 }}
                  />}
                  onPress={() =>
                    Alert.alert(
                      item.name,
                      item.user_name + ' has token the item',
                      [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        {
                          text: 'OK', onPress: () =>  {
                            this.props.assign_todoitem(this.props.token, this.props.event.id, this.props.event.todo[0].items[i].id, this.props.user.id, this.props.user.name)
                            this.forceUpdate()
                          }
                          //   const username = this.props.user.name
                          //   this.props.event.todo[0].items[i].user_name = username
                          //   console.log('this.props', this.props)

                          //   remoteEditEvent(
                          //     this.props.token,
                          //     this.props.event.id,
                          //     this.props.event.name,
                          //     this.props.event.description,
                          //     this.props.event.datetime,
                          //     this.props.event.photo,
                          //     this.props.event.address,
                          //     this.props.event.private_event,
                          //     this.props.event.deposit,
                          //     this.props.event.todo,
                          //     this.props.event.attendees,
                          //     this.props.event.discussion,
                          //   )
                          //   const AuthStr = 'Bearer '.concat(this.props.token);
                          //   console.log('todolist token', this.props.token)
                          //   axios.put(`https://hivent.xyz/api/events/${item.id}`, { headers: { Authorization: AuthStr } })
                          // }
                        }
                      ]
                    )
                  }

                badge={{ value: item.quantity, textStyle: { color: this.props.event.todo[0].items[i].completed ? 'black' : 'white' }, containerStyle: { backgroundColor: this.props.event.todo[0].items[i].completed ? '#0dd80d' : 'grey' } }}
              />
            ))
          }
        </List>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // events: state.getView.events,
    user: state.getUser.user,
    token: state.authReducer.token,
    allEvents: state.event.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_viewevent: (token, id) => dispatch(get_viewevent(token, id)),
    assign_todoitem: (token, eventId, toDoItemId, userId, userName) => dispatch(assign_todoitem( token,eventId, toDoItemId, userId,  userName)) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
