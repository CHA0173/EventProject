import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


import StepIndicator from 'react-native-step-indicator';

import Description from './CreateEventComponents/Description';
import SelectTemplate from './CreateEventComponents/SelectTemplate';
import ToDoList from './CreateEventComponents/ToDoList';
import Confirmation from './CreateEventComponents/Confirmation';

import { createStore } from 'redux'
import { connect } from 'react-redux'
import reducer from '../reducers/createReducer'
import { PixelRatio } from 'react-native';

const ImagePicker = require('react-native-image-picker');
const { width } = Dimensions.get('window')


const store = createStore(reducer)

interface ICreateEventProps {
    navigator: any
}

interface IEvent {
    name: string,
    description: string,
    address: string,
    deposit: string,
    ImgSource: any,
    uri: string
}

interface ICreateEventState {
    step: number
    event: IEvent
    type: string[]
    todolist: object[]
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
                name: '',
                description: '',
                address: '',
                deposit: '',
                ImgSource: null,
                uri: '',
            },
            type: [],
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
                                    height: 300

                                }}>
                                    {this.state.ImgSource === null ? <Text>Select a Photo</Text> :
                                        <Image source={this.state.ImgSource} style={{
                                            width: width,
                                            height: 300
                                        }} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Switch />
                        <FormLabel>Name</FormLabel>
                        <FormInput onChangeText={(text) => this.setState({ name: text })} />
                        <FormLabel>Description</FormLabel>
                        <FormInput onChangeText={(text) => this.setState({ description: text })} />
                        <FormLabel>Address</FormLabel>
                        <FormInput onChangeText={(text) => this.setState({ address: text })} />
                        <FormLabel>Deposit</FormLabel>
                        <FormInput onChangeText={(text) => this.setState({ deposit: text })} />
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
                return <ToDoList />

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

            this.setState({
                ImgSource: source
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

function mapStateToProps(state) {
    return {
        step: state.step
    }
}

export default connect(mapStateToProps, null)(CreateEvent)