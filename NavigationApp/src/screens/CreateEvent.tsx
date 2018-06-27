import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
    DatePickerAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'


import StepIndicator from 'react-native-step-indicator';

import SelectTemplate from './CreateEventComponents/SelectTemplate';
import ToDoList from './CreateEventComponents/ToDoList';
import Confirmation from './CreateEventComponents/Confirmation';

import { createStore } from 'redux'
import { connect } from 'react-redux'
import reducer from '../reducers/createReducer'
import { PixelRatio } from 'react-native';

const ImagePicker = require('react-native-image-picker');
const { width } = Dimensions.get('window')

// const store = createStore(reducer)

interface ICreateEventProps {
    navigator: any
}

interface IEvent {
    private: boolean,
    name: string,
    description: string,
    address: string,
    deposit: string,
    todo: any,
    attendees: any,
    discussion: any,  
     ) => void,
    events: any
}
}

class CreateEvent extends React.Component<ICreateEventProps, ICreateEventState> {
    static navigatorStyle = {
        tabBarHidden: true,
        navBarHeight: 45
    };
    static navigatorButtons = {
        leftButtons: [{}]
    };

    constructor(props: ICreateEventProps) {
        id: number,
        name: string,
        description: string,
        datetime: string,
        photo: any,
        address: string,
        private_event: boolean,
        deposit: string,
        todo: events.Itodo[],
        attendees: events.Iattendees[],
        discussion: events.Idiscussion[],
              super(props);
        this.state = {
            step: 1,
            event: {
                private: false,
                name: '',
                description: '',
                address: '',
                deposit: '',
                ImgSource: null,
                uri: '',
                dateTime: '',
            },
            Templatetype: [],
            todolist: []
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    
    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }

    prevStep() {
        this.setState({
            step: this.state.step - 1
        })
      } else if (event.id === 'done') {
        this.props.createEvent(
          this.state.event.id,
          this.state.event.name,
          this.state.event.description,
          this.state.event.datetime,
          this.state.event.photo,
          this.state.event.address,
          this.state.event.private_event,
          this.state.event.deposit,
          this.state.event.todo,
          this.state.event.attendees,
          this.state.event.discussion,
        )
        alert(JSON.stringify(this.props.events))
      }
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'next') {
                this.setState({
                    step: this.state.step + 1
                })
            } else if (event.id == 'prev') {
                this.setState({
                    step: this.state.step - 1
                })
            } else if (event.id === 'done') {
                alert('HI')
            }
        }
    }

    showPicker() {

    }

    renderComponent(step) {
        switch (step) {
            case 1:
                this.props.navigator.setTitle({
                    title: "  1. Event Info"
                });
                this.props.navigator.setButtons({
                    rightButtons: [
                        {
                            title: 'Next',
                            id: 'next'
                        }
                    ]
                })
                return (
                    <View>
                        <View>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <View style={{
                                    borderColor: '#9B9B9B',
                                    borderWidth: 1 / PixelRatio.get(),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: width,
                                    height: 250

                                }}>
                                    {this.state.event.ImgSource === null ? <Text>Select a Photo</Text> :
                                        <Image source={this.state.event.ImgSource} style={{
                                            width: width,
                                            height: 250
                                        }} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10, paddingHorizontal: 10 }}>
                            <Text style={styles.labelText}>Private</Text>
                                {this.state.event.private ?
                                    <Text style={{ fontSize: 12, color: 'red' }}>People cannot search this event now</Text> : null
                                }
                            <Switch
                                value={this.state.event.private}
                                onValueChange={(value) => {
                                    const newPrivate = { ...this.state.event }
                                    newPrivate.private = value

                                    this.setState({
                                        event: newPrivate
                                    })
                                }}
                            />
                        </View>
                        <FormLabel labelStyle={styles.labelText}>Name</FormLabel>
                        <FormInput
                            defaultValue={this.state.event.name}
                            onChangeText={(text) => {
                                const newName = { ...this.state.event }
                                newName.name = text

                                this.setState({ event: newName })
                            }} />
                        <FormLabel labelStyle={styles.labelText}>Date</FormLabel>
                        <DatePicker
                            style={{ width: width, paddingHorizontal: 20 }}
                            date={this.state.event.dateTime}
                            mode="datetime"
                            placeholder="Select Event Date"
                            format="YYYY-MM-DD HH:mm"
                            minDate="2018-06-29"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                    borderBottomWidth: 1.5,
                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({
                                    event: { ...this.state.event, dateTime: date }
                                })
                            }}
                        />
                        <FormLabel labelStyle={styles.labelText}>Description</FormLabel>
                        <FormInput
                            defaultValue={this.state.event.description}
                            onChangeText={(text) => {
                                const newDescription = { ...this.state.event }
                                newDescription.description = text

                                this.setState({ event: newDescription })
                            }} />

                        <FormLabel labelStyle={styles.labelText}>Address</FormLabel>
                        <FormInput
                            defaultValue={this.state.event.address}
                            onChangeText={(text) => {
                                const newAddress = { ...this.state.event }
                                newAddress.address = text

                                this.setState({ event: newAddress })
                            }} />
                        <FormLabel>Deposit</FormLabel>
                        <FormInput
                            defaultValue={this.state.event.deposit}
                            onChangeText={(text) => {
                                const newDeposit = { ...this.state.event }
                                newDeposit.deposit = text

                                this.setState({ event: newDeposit })
                            }} />
                    </View>
                )

            case 2:
                this.props.navigator.setTitle({
                    title: "  2. Select Template"
                });
                this.props.navigator.setButtons({
                    rightButtons: [
                        {
                            title: 'Next',
                            id: 'next',
                            disabled: true
                        },
                        {
                            title: 'Prev',
                            id: 'prev'
                        }
                    ]
                })
                return <SelectTemplate nextStep={this.nextStep.bind(this)}
                    prevStep={this.prevStep.bind(this)} />

            case 3:
                this.props.navigator.setTitle({
                    title: "  3. To-Do items"
                });
                this.props.navigator.setButtons({
                    rightButtons: [
                        {
                            title: 'Next',
                            id: 'next'
                        },
                        {
                            title: 'Prev',
                            id: 'prev'
                        }
                    ]
                })
                return <ToDoList />//FIXME: ToDoList props!

            case 4:
                this.props.navigator.setTitle({
                    title: "  4. Confirmation"
                });
                this.props.navigator.setButtons({
                    rightButtons: [
                        {
                            title: 'Done',
                            id: 'done'
                        },
                        {
                            title: 'Prev',
                            id: 'prev'
                        }

                    ]
                })
                return <Confirmation event={this.state.event} />
        }
    }

    public selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.data) {
                return
            }

            const source = { uri: 'data:image/jpeg;base64,' + response.data };

            // axios.post('url', { photo: source })

const mapStateToProps = (state) => {
  return {
    events: state.event.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (id,
      name,
      description,
      datetime,
      photo,
      address,
      private_event,
      deposit,
      todo,
      attendees,
      discussion, ) => dispatch(addEvent(id,
        name,
        description,
        datetime,
        photo,
        address,
        private_event,
        deposit,
        todo,
        attendees,
        discussion, ))
  }
}

export default connect(mapStateToProps, null)(CreateEvent)


const styles = StyleSheet.create({
    labelText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400'
    },
})