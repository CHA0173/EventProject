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
import { Ievent } from '../models/events';
import { Iuser } from '../models/users'
import { connect } from 'react-redux';
import { get_viewevent } from '../actions/auth'
import { IviewEventsState } from '../reducers/getViewEvent';
import axios from 'axios';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// interface IViewEventProps {
//     item: Ievent
// }

interface IViewEventProps {
    events: any;
    user: Iuser;
    item: Ievent;
    token: any;
    eventId: number;
}

interface IViewEventsState {
    event: any
}


class ViewEvent extends React.Component<IViewEventProps, IViewEventsState> {
    // componentWillMount() {
    //     const AuthStr = 'Bearer '.concat(this.props.token);

    //     console.log("View Event AuthStr", AuthStr, this.props.eventId)
    //     axios.get(`https://hivent.xyz/api/events/${this.props.eventId}`, { headers: { Authorization: AuthStr } }).then((event) => {
    //         console.log("View Event event", event)
    //         this.setState({event: event.data})
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    constructor(props: IViewEventProps) {
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
        console.log(this.props.item)
        return (
            <View style={{ flex: 1 }}>
                <IndicatorViewPager
                    style={{ flex: 1, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}
                    pagerStyle={{ marginTop: 50 }}
                >
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <Info event={this.props.item}
                                user={this.props.user} />
                    </View>
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <ToDoList event={this.props.item} />
                        {console.log("viewevent",this.props)}
                    </View>
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <Attendees event={this.props.item} />
                    </View>
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <Discussion event={this.props.item} />
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("view event events", state.getViewEvent.events)
    return {
        // events: state.getViewEvent.events,
        user: state.getUser.user,
        token: state.authReducer.token
    }
}


export default connect(mapStateToProps)(ViewEvent);


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
        color: '#ea8f8a',
        width: windowWidth / 4,
        textAlign: 'center',
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: '#9ab4cc'
    }
});