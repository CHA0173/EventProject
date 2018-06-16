import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Description from './CreateEventComponents/Description';
import SelectTemplate from './CreateEventComponents/SelectTemplate';
import ToDoList from './CreateEventComponents/ToDoList';
import Confirmation from './CreateEventComponents/Confirmation';

interface ICreateEventProps {
    nextStep: ()=> void
}

interface ICreateEventState {
    step: number
}

export default class CreateEvent extends React.Component<{}, ICreateEventState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            step: 1
        }
    }

    nextStep () {
        this.setState({
            step:  this.state.step + 1
        })
    }

    prevStep () {
        this.setState({
            step:  this.state.step - 1
        })
    }

    render() {
        switch (this.state.step) {
            case 1:
                return <Description nextStep={this.nextStep.bind(this)} />
            case 2:
                return <SelectTemplate />
            case 3:
                return <ToDoList />
            case 4:
                return <Confirmation />
        }

    }
}