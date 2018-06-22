import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IToDoListProps {
  nextStep: () => void,
  prevStep: () => void
}

interface ToDoItem {
  Name: string,
  Quantity: string,
  IsActive: boolean,
}

interface IToDoListStates {
  Name: string,
  Quantity: string,
  List: ToDoItem[],
}

export default class ToDoList extends React.Component<IToDoListProps, IToDoListStates> {
  constructor(props: IToDoListProps) {
    super(props);

    this.state = {
      Name: '',
      Quantity: '',
      List: [],
    }
  }

  public renderToDoItem = () => {
    this.setState({
      List: this.state.List.concat({
        Name: this.state.Name,
        Quantity: this.state.Quantity,
        IsActive: false
      }),
      Name: '',
      Quantity: '',
    })

  }

  // public DeleteItem = () => {
  //   this.setState({
  //     // List: []
  //   })
  // }

  public render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
          <TextInput
            style={{ width: '70%', left: 20 }}
            value={this.state.Name}
            onChangeText={(text) => this.setState({
              Name: text
            })}
            placeholder='Name'
          />
          <TextInput
            style={{ width: '20%' }}
            value={this.state.Quantity}
            onChangeText={(text) => this.setState({
              Quantity: text
            })
            }
            placeholder='Quantity'
            keyboardType='numeric'
          />
          <View style={{ justifyContent: 'center', alignItems: 'center', left: 10 }}>
            <Button
              title='ok'
              // name='check'
              color='green'
              // size={18}
              onPress={this.renderToDoItem}
            />
          </View>
        </View>

        <View style={{ margin: 20, padding: 20, borderRadius: 10, borderColor: 'gray', borderWidth: 1, height: 300 }}>
          <View >
            {/* limited item 10 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Item</Text>
              <Text>Quantity</Text>
            </View>

            <View>
              <ScrollView>

                {
                  this.state.List.map((List, L) => (
                    <TouchableOpacity onPress={() => {

                      const newList = [...this.state.List]
                      newList[L].IsActive = !newList[L].IsActive;
                      this.setState({
                        List: newList
                      })
                    }
                    }>
                      <View key={L} style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

                        {this.state.List[L].IsActive &&
                          <Icon
                          name='remove'
                          color='red'
                          onPress={() => {
                            
                            const newList = [...this.state.List]
                            newList.splice(L, 1)
                            this.setState({
                              List: newList
                            })
                          }}
                          style={{
                            position: 'relative',
                            top: 5,
                            
                            backgroundColor: 'transparent',
                            zIndex: 1
                          }}
                          />
                        }
                        <Text>{List.Name}</Text>
                        <Text>{List.Quantity}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }

              </ScrollView>
            </View>

          </View>
        </View>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 30 }}>
          <View>
            <Button title="prev" onPress={this.props.prevStep} />
          </View>
          <View>
            <Button title="next" onPress={this.props.nextStep} />
          </View>
        </View >

      </View>
    )
  }
}