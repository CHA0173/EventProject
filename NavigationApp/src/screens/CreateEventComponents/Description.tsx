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
import { connect } from 'react-redux'
import { saveDescription } from '../../actions'

interface IDescriptionProps {
    nextStep: () => void
}

class Description extends React.Component<IDescriptionProps, {}> {
    constructor(props: IDescriptionProps){
        super(props);
        this.state = {
            name: '',
            description: '',
            date: '',
            time: '',
            address: '',
            private: '',
            deposit: '',
            isactive: true
        }
    }

    render() {
        return (
            <View>
                <Switch />
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Deposit</FormLabel>
                <FormInput onChangeText={() => { }} />
                <Button onPress={this.props.nextStep} title="next" />
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        
    }
}

export default connect(mapStateToProps, { saveDescription })(Description)