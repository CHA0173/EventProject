import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Button,
    ScrollView
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

interface IDescriptionProps {
}

export default class Description extends React.Component<IDescriptionProps, {}> {
    constructor(props: IDescriptionProps){
        super(props);
        this.state = {
            name: '',
            description: '',
            address: '',
            deposit: ''
        }
    }
    
    render() {
        return (
            <View>
                <Switch />
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={(text) => this.setState({name: text})} />
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={(text) => this.setState({description: text})} />
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={(text) => this.setState({address: text})} />
                <FormLabel>Deposit</FormLabel>
                <FormInput onChangeText={(text) => this.setState({deposit: text})} />
            </View>
        )
    }
}