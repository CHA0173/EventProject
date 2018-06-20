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
  AddToDoItem: string[],
  AddQuantity: string[],
}

export default class ToDoList extends React.Component<IToDoListProps, IToDoListStates> {
  constructor(props: IToDoListProps) {
    super(props);

    this.state = {
      Name: '',
      Quantity: '',
      AddToDoItem: [],
      AddQuantity: [],
    }
  }

  public renderToDoItem(item) { //FIXME:
    return (
      <TouchableOpacity onPress={() => {
        const obj =this.state
        // obj.AddToDoItem.push(this.state.AddQuantity)
      }}>
        <View>
          <Text>
            {this.state.Name}{this.state.Quantity}
          </Text>
        </View>
      </TouchableOpacity>
    )
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
          <View style={{justifyContent: 'center', alignItems: 'center', left: 10}}>
            <Icon
              name='check'
              color='green'
              size={18}
              onPress={}//FIXME:
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
                <FlatList //FIXME:
                  data={}
                  renderItem={}
                />
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