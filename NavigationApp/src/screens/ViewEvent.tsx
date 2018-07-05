import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    ActivityIndicator
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
    viewEventfromRedux: Ievent;
    token: any;
    eventId: number;
    get_viewevent: (token, id) => void,
    eventIdFromBackend: number,
    isLoading: boolean
    navigator: Navigator
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

    componentDidMount() {
        this.props.get_viewevent(this.props.token, this.props.eventIdFromBackend)
    }
    render() {
        console.log(this.props.viewEventfromRedux)
        let content =
            <View>
                <IndicatorViewPager
                    style={{ height: windowHeight - 80, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}
                    pagerStyle={{ marginTop: 50 }}
                >
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <Info event={this.props.viewEventfromRedux}
                            user={this.props.user}
                            navigator={this.props.navigator} />
                    </View>
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <ToDoList eventIdFromBackend={this.props.eventIdFromBackend} />
                        {console.log("viewevent", this.props)}
                    </View>
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <Attendees event={this.props.viewEventfromRedux}
                            navigator={this.props.navigator} />
                    </View>
                    <View style={{ backgroundColor: '#bed0db' }}>
                        <Discussion  eventIdFromBackend={this.props.eventIdFromBackend} />
                    </View>
                </IndicatorViewPager>
            </View>
        if (this.props.isLoading) {
            content = <ActivityIndicator size="large" />;
        }
        return <View style={{ flex: 1 }}>{content}</View>;

    }
}

const mapStateToProps = (state) => {
    return {
        viewEventfromRedux: state.getViewEvent.events,
        isLoading: state.getViewEvent.loading,
        user: state.getUser.user,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_viewevent: (token, id) => dispatch(get_viewevent(token, id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);


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