import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Ievent } from '../../models/events';
import { Iuser } from '../../models/users';
import { connect } from 'react-redux';
import axios from 'axios';
import * as async from 'async';

interface IUsersListProps {
    token: string
    eventId: number
}
interface IUsersListState {
    usersList: IUserDetail[]
    errorMessage: string
    isFetching: boolean
}
interface IUserDetail {
    id: number
    name: string
    photo: string
}

class UsersList extends React.Component<IUsersListProps, IUsersListState> {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            errorMessage: "",
            isFetching: true
        };
    }

    fetchUser() {
        const AuthStr = 'Bearer '.concat(this.props.token);
        axios.get(`https://hivent.xyz/api/users/all`, { headers: { Authorization: AuthStr } }).then((data) => {
            console.log(data);
            this.setState({ usersList: data.data, isFetching: false })
        })
    }
    componentDidMount() {
        this.fetchUser()
    }

    renderItem = ({ item }) => {
        const { name, photo, id } = item;

        return (
            <TouchableOpacity onPress={() => {
                Alert.alert(
                    'Invitation',
                    `Would you like to send invitation to ${name}?`,
                    [
                      { text: 'No', onPress: () => { } },
                      {
                        text: 'Yes', onPress: () => {
                            const AuthStr = 'Bearer '.concat(this.props.token);
                            axios.post(`https://hivent.xyz/api/events/${this.props.eventId}/invite/`, {
                                invite_id: id
                            }, { headers: { Authorization: AuthStr } })
                        }
                      },
                    ])
            }}>
            <View style={styles.cardContainerStyle}>
                <Image
                    style={styles.faceImageStyle}
                    source={{ uri: photo }}
                />
                <View style={{ paddingRight: 5 }}>
                    <Text style={styles.cardTextStyle}>
                        {name}
                    </Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    render() {
        let content = <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginTop: 10}}> Touch contact to invite </Text>
            <ScrollView>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.usersList}
                    renderItem={(item)=> this.renderItem(item)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>
        </View>
        if (this.state.isFetching) {
            content = <ActivityIndicator size="large" />;
        }
        return <View style={{ flex: 1 }}><ScrollView>{content}</ScrollView></View>;
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        eventId: state.getViewEvent.events.id
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return (dispatch) => {
//         // usersArray: state.
//     }
// }

export default connect(mapStateToProps, null)(UsersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#093339",
    },
    cardContainerStyle: {
        flex: 1,
        flexDirection: "row",
        margin: 8,
        marginHorizontal: 20,
        backgroundColor: "#4e8087",
        padding: 10,
        borderRadius: 10,
        elevation: 3
    },
    faceImageStyle: {
        width: 65,
        height: 65,
        borderRadius: 7
    },
    cardTextStyle: {
        color: "white",
        textAlign: "left",
        fontSize: 20,
        marginLeft: 45,
        marginTop: 15
    }
});