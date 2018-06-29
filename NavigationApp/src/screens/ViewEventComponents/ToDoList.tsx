import * as React from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet
} from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'
import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users'
import { connect } from 'react-redux';
import { get_viewevent } from '../../actions/auth'

interface IToDoListProps {
  event: Ievent,
  user: Iuser,
}


class ToDoList extends React.Component<IToDoListProps, {}> {
  constructor(props: IToDoListProps) {
    super(props)
  }

  render() {
    return (
      <List containerStyle={{ borderWidth: 1, borderTopWidth: 1, margin: 20 }}>
        {
          this.props.event.todo.map((item, i) => (
            <ListItem
              key={i}
              title={item.items[i].name}
              hideChevron={true}
              containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
              leftIcon={this.props.event.todo[0].items[i].user_name==null? <Icon
                name='hashtag'
                type='font-awesome'
                color='#e54d16'
                size={15}
                iconStyle={{ marginRight: 10 }}
              />: <Icon
              name='flag'
              type='font-awesome'
              color='#273960'
              size={15}
              iconStyle={{ marginRight: 10 }}
            /> }
              leftIconOnPress={()=>{

              }}

              badge={{ value: item.items[i].quantity,textStyle: { color: this.props.event.todo[0].items[i].completed? 'black': 'white' }, containerStyle: { backgroundColor: this.props.event.todo[0].items[i].completed? '#0dd80d': 'grey' }}}
            />
          ))
        }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.getView.events,
    user: state.getViewEvent.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_viewevent: (token, id) => dispatch(get_viewevent(token, id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
