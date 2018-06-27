import * as React from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { ToDoItem } from '../fakeData'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class ToDoList extends React.Component<{}, {}> {
  render() {
    return (
      <View style={{ flex: 1, margin: 20, padding: 20, paddingBottom: 0, marginBottom: 40, borderRadius: 10, borderColor: 'gray', borderWidth: 1, height: 400, backgroundColor: 'white' }}>
        <View >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Item</Text>
            <Text>Quantity</Text>
          </View>

          <View>
            <ScrollView style={{ height: 380 }}>

              <FlatList
                data={ToDoItem[0].items}
                renderItem={(data) => {
                  return (
                    <View style={{ borderBottomWidth: 0.5, margin: 15 }}>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View>
                          {
                            !data.item.user_name ? //FIXME:
                              <TouchableWithoutFeedback
                                onPress={() => {
                                  <Icon
                                    name='check'
                                    color='red'
                                  />
                                }}>
                                <Text>{data.item.user_name}</Text>
                              </TouchableWithoutFeedback> : <Text>{data.item.user_name}</Text>
                          }
                        </View>
                        <Text>{data.item.quantity}</Text>
                      </View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10 }}>

                        {
                          data.item.completed ?
                            <Icon
                              name='check'
                              color='green'

                            />
                            : null
                        }

                      </View>
                    </View>
                  )
                }}
                keyExtractor={data => data.id.toString()}
              />
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
            </ScrollView>

          </View>

        </View>
      </View>)
  }
}