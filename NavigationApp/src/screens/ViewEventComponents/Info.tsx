import * as React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'

export default class Info extends React.Component<{}, {}> {
    render() {
        return (
            <ScrollView >
                <Text>
                    info is here
                </Text>
                <Text>
                    info is here
                </Text>
            </ScrollView>
        )
    }
}