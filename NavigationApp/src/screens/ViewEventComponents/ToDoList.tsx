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
// import { get_viewevent } from '../../actions/auth';
// import axios from 'axios';
// import { remoteEditEvent } from '../../actions/Event';
import { assign_todoitem } from '../../actions/Event';

interface IToDoListProps {
  viewEventfromRedux: Ievent[],
  user: Iuser,
  token: string,
  data: any,
  // event:any,
  // remoteEditEvent: () => void,
  assign_todoitem: (token,eventId, toDoItemId, userId, userName) => void,
  eventIdFromBackend: number
}


class ToDoList extends React.Component<IToDoListProps, {}> {
  constructor(props: IToDoListProps) {
    super(props)
  }
  
  render() {
    const viewEventFromAllEvent = this.props.viewEventfromRedux.find(item => item.id == this.props.eventIdFromBackend )
    console.log( this.props)
    return (
      <View>
        <List containerStyle={{ borderWidth: 1, borderTopWidth: 1, margin: 20 }}>
          {
            viewEventFromAllEvent.todo[0].items.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                hideChevron={true}
                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                leftIcon={viewEventFromAllEvent.todo[0].items[i].user_name == null ? <Icon
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
                            console.log('Check User')
                            console.log(this.props.user)
                            this.props.assign_todoitem(this.props.token, this.props.eventIdFromBackend, viewEventFromAllEvent.todo[0].items[i].id, this.props.user.id, this.props.user.name)
                            this.forceUpdate()
                          }
                        }
                      ]
                    )
                  }

                badge={{ value: item.quantity, textStyle: { color: viewEventFromAllEvent.todo[0].items[i].completed ? 'black' : 'white' }, containerStyle: { backgroundColor: viewEventFromAllEvent.todo[0].items[i].completed ? '#0dd80d' : 'grey' } }}
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
    viewEventfromRedux: state.event.events,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assign_todoitem: (token, eventId, toDoItemId, userId, userName) => dispatch(assign_todoitem( token,eventId, toDoItemId, userId,  userName)) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
