import * as React from 'react'
import {
    View,
    Dimensions,
    ScrollView,
    Text
} from 'react-native'

import {
    List,
    ListItem,
    Button,
    Icon
} from 'react-native-elements'

import { Ievent } from '../../models/events'
import { Iuser } from '../../models/users';
import { connect } from 'react-redux';
import { join_event } from '../../actions/Event'
import { left_event } from '../../actions/Event'
const { width } = Dimensions.get('window')
import { Navigator } from 'react-native-navigation';


interface IInfoProps {
    event: Ievent
    user: Iuser
    token: string
    join_event: (token, user, eventId) => void
    left_event: (token, userId, eventId) => void
    navigator: Navigator
}

interface IinfoState {
    render: boolean
}

class Info extends React.Component<IInfoProps, IinfoState> {
    constructor(props: IInfoProps) {
        super(props)
        this.state = {
            render: true
        }
        this.renderActionButton = this.renderActionButton.bind(this)
    }

    private = true ? 'Private' : 'Public';
    datetime = `${this.props.event.datetime.match(/\d{4}-[01]\d-[0-3]\d/)}, start at ${this.props.event.datetime.match(/[\d]{2}:[\d]{2}/)}`;
    creator = this.props.event.attendees.find(attendee => attendee.creator == true)

    basicInfoList = [
        {
            title: this.creator.name,
            icon: 'person-pin'
        },
        {
            title: this.private,
            icon: 'lock'
        },
        {
            title: this.props.event.address,
            icon: 'location-on'
        },
        {
            title: this.datetime,
            icon: 'date-range'
        },
        {
            title: this.props.event.deposit,
            icon: 'attach-money'
        },
    ]

    renderActionButton = () => {
        const userId = this.props.user.id
        this.creator = this.props.event.attendees.find(attendee => attendee.creator == true)
        const userInEvent = this.props.event.attendees.some(attendee => attendee.id == userId)
        if (userId == this.creator.id) {
            return <Button title='Delete Event'
                buttonStyle={{ elevation: 3, width: 300, borderRadius: 25, backgroundColor: '#d15953', marginTop: 20 }}
                onPress={() => {
                    this.props.left_event(this.props.token, this.props.user.id, this.props.event.id)
                    this.props.navigator.resetTo({
                        screen: 'EventsTabScreen',
                        title: 'Events',
                        navigatorStyle: { navBarTitleTextCentered: true }
                    })
                }} />
        } else if (userInEvent) {
            return <Button title='Leave'
                buttonStyle={{ elevation: 3, width: 300, borderRadius: 25, backgroundColor: '#d15953', marginTop: 20 }}
                onPress={() => {
                    this.props.left_event(this.props.token, this.props.user.id, this.props.event.id)
                    this.props.navigator.resetTo({
                        screen: 'EventsTabScreen',
                        title: 'Events',
                        navigatorStyle: { navBarTitleTextCentered: true }
                    })
                }} />
        } else {
            return <Button title='Join this event'
                buttonStyle={{ elevation: 3, width: 300, borderRadius: 25, backgroundColor: '#7d899a', marginTop: 20 }}
                onPress={() => {
                    this.props.join_event(this.props.token, this.props.user, this.props.event.id)
                    this.props.navigator.resetTo({
                        screen: 'EventsTabScreen',
                        title: 'Events',
                        navigatorStyle: { navBarTitleTextCentered: true }
                    })
                }} />
        }
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <List containerStyle={{ borderWidth: 0, borderTopWidth: 0, margin: 20, width: width - 50 }}>
                    {
                        this.basicInfoList.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon, color: '#004263' }}
                                hideChevron={true}
                                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                            />
                        ))
                    }
                </List>
                <View style={{ marginHorizontal: 20, width: width - 50, height: 100, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={{margin: 10}}>
                        <Icon 
                            name='info'
                            color='#004263' />
                        </View>
                        <View>
                        <Text style={{fontSize: 16,padding: 10, color: 'black'}}>
                            {this.props.event.description}
                        </Text>
                        </View>
                    </View>
                </View>
                {this.renderActionButton()}
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        join_event: (token, user, eventId) => dispatch(join_event(token, user, eventId)),
        left_event: (token, userId, eventId) => dispatch(left_event(token, userId, eventId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)