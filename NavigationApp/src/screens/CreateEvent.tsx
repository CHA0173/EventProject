import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    ScrollView,
    StyleSheet
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import StepIndicator from 'react-native-step-indicator';

import Description from './CreateEventComponents/Description';
import SelectTemplate from './CreateEventComponents/SelectTemplate';
import ToDoList from './CreateEventComponents/ToDoList';
import Confirmation from './CreateEventComponents/Confirmation';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducers/createReducer'

const store = createStore(reducer)

interface ICreateEventProps {
    navigator: any
}

interface ICreateEventState {
    step: number
}


export default class CreateEvent extends React.Component<ICreateEventProps, ICreateEventState> {
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
                return <Description nextStep={this.nextStep.bind(this)} />

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
<<<<<<< HEAD

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
=======
            case 3:
                return <ToDoList nextStep={this.nextStep.bind(this)}
                    prevStep={this.prevStep.bind(this)} />
>>>>>>> 4a828a63e91728ee69cd98c15e62f4d27c005f05

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
                return <Confirmation />
        }
    }

    render() {
        return (
<<<<<<< HEAD
            <Provider store={store}>
                <ScrollView>
                    {this.renderComponent(this.state.step)}
                </ScrollView>
            </Provider>
=======
            <ScrollView>
                {this.renderComponent(this.state.step)}
            </ScrollView>
>>>>>>> 4a828a63e91728ee69cd98c15e62f4d27c005f05
        )
    }
}