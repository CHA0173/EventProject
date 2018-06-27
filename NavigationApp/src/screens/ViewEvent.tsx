import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';

import Info from './ViewEventComponents/Info'
import ToDoList from './ViewEventComponents/ToDoList'
import Attendees from './ViewEventComponents/Attendees'
import Discussion from './ViewEventComponents/Discussion'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface IViewEventProps {
    name: string
}


export default class ViewEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    _renderTitleIndicator() {
        return <PagerTitleIndicator
            titles={['Basic Info', 'To-Do List', 'Attendees', 'Discussion']}
            renderTitle={null}
            style={styles.indicatorContainer}
            itemTextStyle={styles.indicatorText}
            selectedItemTextStyle={styles.indicatorSelectedText}
            selectedBorderStyle={styles.selectedBorderStyle}
            itemStyle={{ width: windowWidth / 4 }}
        />;
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <IndicatorViewPager
                    style={{ flex: 1, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}
                    pagerStyle={{ marginTop: 50 }}
                >
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <Info />
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <ToDoList />
                    </View>
                    <View style={{ backgroundColor: '#1AA094' }}>
                        <Attendees />
                    </View>
                    <View style={{ backgroundColor: 'yellow' }}>
                        <Discussion />
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    indicatorText: {
        color: 'black',
        width: windowWidth / 4,
        textAlign: 'center'
    },
    indicatorSelectedText: {
        color: 'orange',
        width: windowWidth / 4,
        textAlign: 'center',
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: 'orange'
    }
});