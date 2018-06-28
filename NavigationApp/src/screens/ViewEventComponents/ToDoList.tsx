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

interface IToDoListProps {
  event: Ievent
}


export default class ToDoList extends React.Component<IToDoListProps, {}> {
  constructor(props: IToDoListProps) {
    super(props)
  }
  render() {
    return (
      <List containerStyle={{ borderWidth: 1, borderTopWidth: 1, margin: 20 }}>
        {
          viewEvent.todo[0].items.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              hideChevron={true}
              containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
              leftIcon={viewEvent.todo[0].items[i].user_name==null? <Icon
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

              badge={{ value: item.quantity,textStyle: { color: viewEvent.todo[0].items[i].completed? 'black': 'white' }, containerStyle: { backgroundColor: viewEvent.todo[0].items[i].completed? '#0dd80d': 'grey' }}}
            />
          ))
        }
      </List>
    )
  }
}





const viewEvent = {
  "id": 1,
  "name": "Alex's birthday boat",
  "description": "Alex is getting old!",
  "datetime": "2018-07-20T09:00:00.000Z",
  "photo": null,
  "address": "Saikung Pier 1",
  "private": false,
  "deposit": "100.00",
  "todo": [
    {
      "id": 1,
      "items": [
        {
          "id": 1,
          "name": "champagne bottles",
          "quantity": 5,
          "completed": false,
          "user_id": null,
          "user_name": null
        },
        {
          "id": 2,
          "name": "birthday cake",
          "quantity": 10,
          "completed": false,
          "user_id": null,
          "user_name": null
        },
        {
          "id": 3,
          "name": "portable speakers",
          "quantity": 1,
          "completed": false,
          "user_id": null,
          "user_name": null
        },
        {
          "id": 4,
          "name": "poker set",
          "quantity": 1,
          "completed": false,
          "user_id": null,
          "user_name": null
        },
        {
          "id": 5,
          "name": "Inflatable Toys",
          "quantity": 1,
          "completed": false,
          "user_id": null,
          "user_name": null
        },
        {
          "id": 19,
          "name": "champagne bottles",
          "quantity": 5,
          "completed": false,
          "user_id": 1,
          "user_name": "Alex"
        },
        {
          "id": 20,
          "name": "birthday cake",
          "quantity": 10,
          "completed": true,
          "user_id": 2,
          "user_name": "Brad"
        },
        {
          "id": 21,
          "name": "portable speakers",
          "quantity": 1,
          "completed": false,
          "user_id": 3,
          "user_name": "Jacob"
        },
        {
          "id": 22,
          "name": "poker set",
          "quantity": 1,
          "completed": true,
          "user_id": 1,
          "user_name": "Alex"
        }
      ]
    }
  ],
  "attendees": [
    {
      "id": 1,
      "name": "Alex",
      "photo": null,
      "creator": true
    },
    {
      "id": 3,
      "name": "Jacob",
      "photo": null,
      "creator": false
    },
    {
      "id": 2,
      "name": "Brad",
      "photo": null,
      "creator": false
    },
    {
      "id": 5,
      "name": "Stephen",
      "photo": null,
      "creator": false
    }
  ],
  "discussion": [
    {
      "id": 1,
      "name": "Alex",
      "comment": "Can someone bring softdrinks?"
    },
    {
      "id": 2,
      "name": "Brad",
      "comment": "Sure I'll bring some"
    },
    {
      "id": 3,
      "name": "Jacob",
      "comment": "Where are we meeting?"
    }
  ]
}