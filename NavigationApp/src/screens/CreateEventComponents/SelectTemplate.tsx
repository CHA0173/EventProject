import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Button,
    Picker
} from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { templateA, templateB } from '../fakeData'
import Templates from './Templates'
import { stepButtons } from '../../styles'

interface ISelectTemplateProps {
    nextStep: () => void,
    prevStep: () => void
}
interface ISelectTemplateState {
    template: string,
}

export default class SelectTemplate extends React.Component<ISelectTemplateProps, ISelectTemplateState> {
    constructor(props: ISelectTemplateProps) {
        super(props);
        this.state = {
            template: ''
        }
    }
    render() {
        return (
            <View>
                <Text>
                    Select Event Type
                </Text>
                <Picker
                    selectedValue={this.state.template}
                    style={{}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ template: itemValue })}>
                    <Picker.Item label="Junk Boat" value="templateA" />
                    <Picker.Item label="Birthday Party" value="templateB" />
                </Picker>
                <Templates type={this.state.template} />
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