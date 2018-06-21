import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IToDoListProps {
  nextStep: () => void,
  prevStep: () => void
}

interface IToDoListStates {
  Name: string,
  Quantity: string,
  AddName: string,
  AddQuantity: string,
}

export default class ToDoList extends React.Component<IToDoListProps, IToDoListStates> {
  constructor(props: IToDoListProps) {
    super(props);

    this.state = {
      Name: '',
      Quantity: '',
      AddName: '',
      AddQuantity: '',
    }
  }

  public renderToDoItem = () => { //FIXME:return
    this.setState({
      AddName: this.state.Name,
      AddQuantity: this.state.Quantity,
      // AddName: this.state.AddName.concat(this.state.Name),
      // AddQuantity: this.state.AddQuantity.concat(this.state.Quantity)
    })
    // return (
    //   <TouchableOpacity>
    //     <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
    //       <Text>{this.state.AddName}</Text>
    //       <Text>{this.state.AddQuantity}</Text>
    //     </View>
    //   </TouchableOpacity>
    // )
  }

  public DeleteItem = () => {
    this.setState({
      AddName: '',
      AddQuantity: '',
    })
  }

  public render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
          <TextInput
            style={{ width: '70%' }}
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
              onPress={this.renderToDoItem}//FIXME:
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
                <TouchableOpacity onPress={() => { //FIXME: should be showup a red x todo delete item

                  <View>
                    <Icon
                      name='remove'
                      color='red'
                      onPress={this.DeleteItem}
                      style={{
                        position: 'absolute',
                        top: 5,
                        left: 10,
                        backgroundColor: 'transparent',
                        zIndex: 1
                      }}
                    />
                  </View>

                }}>

                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>{this.state.AddName}</Text>
                    <Text>{this.state.AddQuantity}</Text>

                    {/* {this.state.AddName.concat(Name => { //FIXME:
                       <Text>{this.state.AddName}</Text>
                     })}
                     {this.state.AddQuantity.map(() => {
                       <Text>{this.state.AddQuantity}</Text>
                     })} */}
                  </View>
                </TouchableOpacity>
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