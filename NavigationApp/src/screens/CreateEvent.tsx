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
import DatePicker from 'react-native-datepicker';
import { addEvent } from '../actions/CreateEvent';

import StepIndicator from 'react-native-step-indicator';

import SelectTemplate from './CreateEventComponents/SelectTemplate';
import ToDoList from './CreateEventComponents/ToDoList';
import Confirmation from './CreateEventComponents/Confirmation';

import { createStore } from 'redux'
import { connect } from 'react-redux'
import reducer from '../reducers/createReducer'
import { PixelRatio } from 'react-native';
import { Ievent } from '../models/events';
import { Navigator } from 'react-native-navigation';

const ImagePicker = require('react-native-image-picker');
const { width } = Dimensions.get('window')

const store = createStore(reducer)

interface ICreateEventProps {
    navigator: any,
    createEvent: (
        id: number,
        name: string,
        description: string,
        datetime: string,
        photo: any,
        address: string,
        private_event: boolean,
        deposit: string, ) => void,
        events: any
}

interface ICreateEventState {
    step: number
    event: Ievent

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
        super(props);

        this.state = {
            step: 1,
            event: {
                id: 0,
                name: '',
                description: '',
                datetime: '',
                photo: null,
                address: '',
                private_event: false,
                deposit: '',
                todo: [],
                attendees: [],
                discussion: [],
            }
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
    }

    onNavigatorEvent = (event) => {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'next') {
                this.setState({
                    step: this.state.step + 1
                })
            } else if (event.id == 'prev') {
                this.setState({
                    step: this.state.step - 1
                })
            } else if (event.id === 'done') { //FIXME:
                this.props.createEvent(
                    this.state.event.id,
                    this.state.event.name,
                    this.state.event.description,
                    this.state.event.datetime,
                    this.state.event.photo,
                    this.state.event.address,
                    this.state.event.private_event,
                    this.state.event.deposit,
                )
                // alert(JSON.stringify(this.props.events))
                this.props.navigator.resetTo({
                    screen: 'EventsTabScreen',
                    title: 'Events',
                    navigatorStyle: { navBarTitleTextCentered: true }
                })
            }
        }
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
                                    height: 230

                                }}>
                                    {this.state.event.photo === null ? <Text>Select a Photo</Text> :
                                        <Image source={this.state.event.photo} style={{
                                            width: width,
                                            height: 230
                                        }} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10, paddingHorizontal: 10 }}>
                            <Text style={styles.labelText}>Private</Text>
                            {this.state.event.private_event ?
                                <Text style={{ color: 'red' }}>Now your Event will be private</Text> : null
                            }
                            <Switch
                                value={this.state.event.private_event}
                                onValueChange={(value) => {
                                    const newPrivate = { ...this.state.event }
                                    newPrivate.private_event = value

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

                        <FormLabel labelStyle={styles.labelText}>Date</FormLabel>
                        <DatePicker
                            style={{ width: 350 }}
                            date={this.state.event.datetime}
                            mode="datetime"
                            placeholder="select date"
                            format="YYYY-MM-DD HH:mm"
                            minDate="2018-06-29"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({
                                    event: { ...this.state.event, dateTime: date }
                                })
                            }}
                        />

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
                return <ToDoList id={1} itemlist={[]} /> //FIXME: 

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

            const newImgSource = { ...this.state.event }
            newImgSource.photo = source
            this.setState({
                event: newImgSource
            });
        }
        );
    }
    render() {
        return (
            <ScrollView>
                {this.renderComponent(this.state.step)}
            </ScrollView>
        )
    }
}

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



const styles = StyleSheet.create({
    labelText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)

