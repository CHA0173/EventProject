import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native'

const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome'

interface IData {
    username: string,
    massage: string,
};


interface IDiscussionStates {
    text: string,
    data: IData[],
}

export default class Discussion extends React.Component<{}, IDiscussionStates> {
    constructor(props: {}) {
        super(props)

        this.state = {
            text: '',
            data: [{
                username: '',
                massage: '',
            }],
        }
    }



    render() {
        return (
            <View>
                <FlatList
                    data={
                        [{
                            username: 'Lucas',
                            massage: 'awesome event !!!!',
                        }, {
                            username: 'Brad',
                            massage: 'YOYOYO',
                        }, {
                            username: 'Jacob',
                            massage: 'Yeah',
                        }, {
                            username: 'Stephen',
                            massage: 'not bad',
                        }]
                    }
                    renderItem={(data) => {
                        return (
                            <ScrollView>
                                <View style={{ marginHorizontal: 20, marginTop: 10, borderRadius: 25, borderWidth: 1, backgroundColor: '#ffffcc' }}>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20 }}>{data.item.username}</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 20, padding: 20 }}>
                                        <Text>{data.item.massage}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        )
                    }}
                />

                <View style={{backgroundColor: 'white'}}>
                    {/* try to make it fixd in bottom even scrolling the page */}
                    <TextInput //FIXME: need to changed position to flix keybord 
                        value={this.state.text}
                        onChangeText={(text) => this.setState({
                            text: text
                        })}
                        placeholder='massage'
                        keyboardAppearance='dark'
                        autoFocus={true}
                        style={{backgroundColor: 'transparent', width: width - (width / 5) , marginHorizontal: 10}}
                    />
                    {this.state.text ?
                        <TouchableWithoutFeedback onPress={() => { // FIXME: action to insect data to backend
                            this.state.data.map(discussion =>{
                                {discussion.username}
                                {discussion.massage}
                            })
                        }}
                        >
                            <Icon
                                name='send-o'
                                color='green'
                                size={25}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 20,
                                    backgroundColor: 'transparent',
                                    zIndex: 1
                                }}

                            />
                        </TouchableWithoutFeedback>
                        : null}
                </View>

            </View>
        )
    }
}