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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// interface IViewEventProps {
//     item: Ievent
// }

interface IViewEventProps {
  event: Ievent,
  user: Iuser,
  item: Ievent
}


class ViewEvent extends React.Component<IViewEventProps, {}> {

    static renderNavbarButton() {
        const navbarButton = [[{
            icon: require('../img/edit.png'),
            id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
          }],
          [{
            icon: require('../img/join.png'),
            id: 'join', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
          }]]
          return navbarButton[0]
    }

    static navigatorButtons = {
        rightButtons: ViewEvent.renderNavbarButton()
    }

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
        console.log("this.props.event", this.props.item)
        return (
            <View style={{ flex: 1 }}>
                <IndicatorViewPager
                    style={{ flex: 1, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}
                    pagerStyle={{ marginTop: 50 }}
                >
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <Info event={this.props.event} />
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <Text>
                            Click # to take responsibility for the item 
                        </Text>
                        <ToDoList event={this.props.event} />
                    </View>
                    <View style={{ backgroundColor: '#1AA094' }}>
                        <Attendees event={this.props.item}/>
                    </View>
                    <View style={{ backgroundColor: 'yellow' }}>
                        { this.props.item ? <Discussion event={this.props.item}/> : null}
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.getView.events,
      user: state.getViewEvent.user,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      get_viewevent: (token, id) => dispatch(get_viewevent(token, id))
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
        color: 'orange',
        width: windowWidth / 4,
        textAlign: 'center',
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: 'orange'
    }
});