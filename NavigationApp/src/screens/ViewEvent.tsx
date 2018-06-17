import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

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

                </Text>
            </View>
        )
    }
}