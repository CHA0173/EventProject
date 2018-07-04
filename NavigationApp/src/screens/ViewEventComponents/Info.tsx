import * as React from 'react'
import {
    View,
    Dimensions,
    Button
} from 'react-native'

import {
    List,
    ListItem
} from 'react-native-elements'

import { Ievent } from '../../models/events'
import { Iuser } from '../../models/users';
import { connect } from 'react-redux';
import { join_event } from '../../actions/Event'
import { left_event } from '../../actions/Event'
const { width } = Dimensions.get('window')

interface IInfoProps {
    event: Ievent
    user: Iuser
    token: string
    join_event: (token, user, eventId) => void
    left_event: (token, userId, eventId) => void
}


class Info extends React.Component<IInfoProps, {}> {
    constructor(props: IInfoProps) {
        super(props)
    }

    private = true ? 'Private' : 'Public';
    datetime = `${this.props.event.datetime.match(/\d{4}-[01]\d-[0-3]\d/)}, start at ${this.props.event.datetime.match(/[\d]{2}:[\d]{2}/)}`;

    basicInfoList = [
        {
            title: this.private,
            icon: 'lock'
        },
        {
            title: this.props.event.description,
            icon: 'info'
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
        }
    ]

    renderActionButton() {
        const userId = this.props.user.id
        const creator = this.props.event.attendees.find(attendee => attendee.creator == true)
        const userInEvent = this.props.event.attendees.some(attendee => attendee.id == userId)
        if (userId == creator.id) {
            return <Button title='Delete Event' onPress={() => { }} />
        } else if (userInEvent) {
            return <Button title='Quit' onPress={() => { 
                this.props.left_event(this.props.token, this.props.user.id, this.props.event.id)
            }} />
        } else if (!userInEvent) {
            return <Button title='Join this event' onPress={() => {
                this.props.join_event(this.props.token, this.props.user, this.props.event.id)
             }} />
        }
    }

    render() {
        return (
            <View>
                <List containerStyle={{ borderWidth: 0, borderTopWidth: 0, margin: 20 }}>
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