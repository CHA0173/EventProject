import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  Button,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { junkBoat, birthdayParty } from './ToDoTemplates';

const { height } = Dimensions.get('window')


interface ToDoItem {
  id: number,
  Name: string,
  Quantity: string,
}

interface IToDoListProps {
  id: number,
  itemlist: string[]
  todotemplate: string[]
  setTodo: (list) => void
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
      List: [
        // id: this.props.id,
        // Name: {...this.props.itemlist} , //FIXME:
        // Quantity: '',
      ],
    }
  }

  componentWillMount() {
    const newList = this.props.todotemplate.map(item => {
      return (
        {
          id: Date.now(),
          Name: item,
          Quantity: '0',
        }
      )
    });
    this.setState({ List: newList });
  }

  componentDidMount() {
    this.props.setTodo(this.state.List)
  }

  public renderToDoItem = () => {
    this.setState({
      List: this.state.List.concat({
        id: Date.now(),
        Name: this.state.Name,
        Quantity: this.state.Quantity,

      }),
      Name: '',
      Quantity: '',
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
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', left: 10 }}>
            <Icon
              name='check'
              color='green'
              size={18}
              onPress={this.renderToDoItem}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, margin: 20, padding: 20, paddingBottom: 0, marginBottom: 40, borderRadius: 10, borderColor: 'gray', borderWidth: 1, height: height - 200 }}>
          <View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Action</Text>
              <Text>Item</Text>
              <Text>Quantity</Text>
            </View>

            <View>
              <ScrollView style={{ height: 300 }}>

                {
                  this.state.List.map((List, L) => (
                    <View key={L} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: '20%' }}>
                        <Icon
                          name='remove'
                          color='red'
                          // backgroundColor='transparent'
                          size={18}

                          onPress={() => {
                            const newList = [...this.state.List]
                            newList.splice(L, 1)
                            this.setState({
                              List: newList
                            })
                          }}

                        />
                      </TouchableOpacity>
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
                          onChangeText={(text) => {
                            let newList = [...this.state.List]
                            newList[L].Quantity = text;
                            this.setState({ List: newList })
                          }}
                        />
                      </View>
                    </View>
                  ))
                }

              </ScrollView>

            </View>

          </View>
        </View>

      </View>
    )
  }
}