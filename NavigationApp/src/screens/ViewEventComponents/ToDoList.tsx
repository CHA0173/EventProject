import * as React from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList
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
          this.props.event.todo[0].items.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              hideChevron={true}
              containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
              leftIcon={<Icon
                name='hashtag'
                type='font-awesome'
                color='#e54d16'
                size={15}
                iconStyle={{ marginRight: 10 }}
              />}
              badge={{ value: item.quantity }}
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

// <View style={{ flex: 1, margin: 20, padding: 20, paddingBottom: 0, marginBottom: 40, borderRadius: 10, borderColor: 'gray', borderWidth: 1, height: 400, backgroundColor: 'white' }}>
//   <View >
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//       <Text>Item</Text>
//       <Text>Quantity</Text>
//     </View>

//     <View>
//       <ScrollView style={{ height: 380 }}>

//         <FlatList
//           data={ToDoItem}
//           renderItem={(data) => {
//             return (
//               <View style={{ borderBottomWidth: 0.5, margin: 15 }}>
//                 <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
//                   <Text>{data.item.name}</Text>
//                   <Text>{data.item.quantity}</Text>
//                 </View>
//                 <View style={{justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10}}>
//                   <Text>{data.item.user}</Text>
//                   {
//                     data.item.completed ?
//                   <Icon
//                     name='check'
//                     color='green'

//                   />
//                   : null
//                   }
//                 </View>
//               </View>
//             )
//           }}
//           keyExtractor={data => data.id.toString()}
//         />
{/* {
                  this.state.List.map((List, L) => (
                    <View key={L} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <View style={{ width: '20%' }}>
                        <Icon.Button
                          name='remove'
                          color='red'
                          backgroundColor='white'
                          size={18}

                          onPress={() => {
                            const newList = [...this.state.List]
                            newList.splice(L, 1)
                            this.setState({
                              List: newList
                            })
                          }}

                        />
                      </View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, width: '60%' }}>
                        <TextInput
                          key={L + 'one'}
                          value={List.Name}
                          onChangeText={(text) => {
                            let newList = [...this.state.List]
                            newList[L].Name = text;
                            this.setState({ List: newList })
                          }}
                        />
                        <TextInput
                          key={L + 'two'}
                          value={List.Quantity}
                          keyboardType='numeric'
                          onChangeText={(text) => {
                            let newList = [...this.state.List]
                            newList[L].Quantity = text;
                            this.setState({ List: newList })

                          }} */
                        /* />
                      </View>
                    </View>
                  ))
                } */}
//       </ScrollView >

//     </View >

//   </View >
// </View >)







// const viewEvent = {
//   "id": 1,
//   "name": "Alex's birthday boat",
//   "description": "Alex is getting old!",
//   "datetime": "2018-07-20T09:00:00.000Z",
//   "photo": null,
//   "address": "Saikung Pier 1",
//   "private": false,
//   "deposit": "100.00",
//   "todo": [
//     {
//       "id": 1,
//       "items": [
//         {
//           "id": 1,
//           "name": "champagne bottles",
//           "quantity": 5,
//           "completed": false,
//           "user_id": null,
//           "user_name": null
//         },
//         {
//           "id": 2,
//           "name": "birthday cake",
//           "quantity": 10,
//           "completed": false,
//           "user_id": null,
//           "user_name": null
//         },
//         {
//           "id": 3,
//           "name": "portable speakers",
//           "quantity": 1,
//           "completed": false,
//           "user_id": null,
//           "user_name": null
//         },
//         {
//           "id": 4,
//           "name": "poker set",
//           "quantity": 1,
//           "completed": false,
//           "user_id": null,
//           "user_name": null
//         },
//         {
//           "id": 5,
//           "name": "Inflatable Toys",
//           "quantity": 1,
//           "completed": false,
//           "user_id": null,
//           "user_name": null
//         },
//         {
//           "id": 19,
//           "name": "champagne bottles",
//           "quantity": 5,
//           "completed": false,
//           "user_id": 1,
//           "user_name": "Alex"
//         },
//         {
//           "id": 20,
//           "name": "birthday cake",
//           "quantity": 10,
//           "completed": false,
//           "user_id": 2,
//           "user_name": "Brad"
//         },
//         {
//           "id": 21,
//           "name": "portable speakers",
//           "quantity": 1,
//           "completed": false,
//           "user_id": 3,
//           "user_name": "Jacob"
//         },
//         {
//           "id": 22,
//           "name": "poker set",
//           "quantity": 1,
//           "completed": false,
//           "user_id": 1,
//           "user_name": "Alex"
//         }
//       ]
//     }
//   ],
//   "attendees": [
//     {
//       "id": 1,
//       "name": "Alex",
//       "photo": null,
//       "creator": true
//     },
//     {
//       "id": 3,
//       "name": "Jacob",
//       "photo": null,
//       "creator": false
//     },
//     {
//       "id": 2,
//       "name": "Brad",
//       "photo": null,
//       "creator": false
//     },
//     {
//       "id": 5,
//       "name": "Stephen",
//       "photo": null,
//       "creator": false
//     }
//   ],
//   "discussion": [
//     {
//       "id": 1,
//       "name": "Alex",
//       "comment": "Can someone bring softdrinks?"
//     },
//     {
//       "id": 2,
//       "name": "Brad",
//       "comment": "Sure I'll bring some"
//     },
//     {
//       "id": 3,
//       "name": "Jacob",
//       "comment": "Where are we meeting?"
//     }
//   ]
// }