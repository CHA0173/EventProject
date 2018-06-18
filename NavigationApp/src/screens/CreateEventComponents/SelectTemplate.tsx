import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Button,
    Picker
} from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import Templates from './Templates'
import { stepButtons } from '../../styles'

interface ISelectTemplateProps {
    nextStep: () => void,
    prevStep: () => void
}
interface ISelectTemplateState {
    type: string,
}

export default class SelectTemplate extends React.Component<ISelectTemplateProps, ISelectTemplateState> {
    constructor(props: ISelectTemplateProps) {
        super(props);
        this.state = {
            type: '0'
        }
    }
    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.type}
                    style={{}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
                    <Picker.Item label="Select Event Type" value="0" />
                    <Picker.Item label="Junk Boat" value="junkBoat" />
                    <Picker.Item label="Birthday Party" value="birthdayParty" />
                    <Picker.Item label="Custom..." value="custom" />
                </Picker>
                
                <Templates type={this.state.type} />


                <View style={stepButtons.container}>
                    <View style={stepButtons.button}>
                        <Button title="prev" onPress={this.props.prevStep} />
                    </View>
                    <View style={stepButtons.button}>
                        <Button title="next" onPress={this.props.nextStep} />
                    </View>
                </View>
            </View>
        )
    }
}