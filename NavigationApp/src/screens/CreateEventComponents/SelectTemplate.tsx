import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Button
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'


interface IViewEventProps {
    name: string,
}

export default class ViewEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>
                    plan A
                </Text>
                <Text>
                    plan B
                </Text>
                <Text>
                    plan C
                </Text>
                <Button onPress={()=>{}} title="Select" />
            </View>
        )
    }
}