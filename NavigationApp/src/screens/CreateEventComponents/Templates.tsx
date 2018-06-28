import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Card, ListItem, List, Icon } from 'react-native-elements'

import { junkBoat, birthdayParty, meetUp, movieNight } from '../CreateEventComponents/ToDoTemplates'

import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { ScrollView } from 'react-native';

interface ITemplatesProps {
    Templatetype: string,
    setModalVisible: (visible) => void
    nextStep: () => void
    setTodoTemplate: (templatetodo) => void
}

interface ITemplatesStates {
    id: number,
    itemlist: string[]
}

export default class Templates extends React.Component<ITemplatesProps, ITemplatesStates> {
    constructor(props: ITemplatesProps) {
        super(props)

        this.state = {
            id: 0,
            itemlist: []
        }
    }

    renderType() {
        switch (this.props.Templatetype) {
            case 'birthdayParty':
                return birthdayParty
            case 'junkBoat':
                return junkBoat
            case 'meetUp':
                return meetUp
            case 'movieNight':
                return movieNight
        }
    }


    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    renderTemplate() {
        return (
            <IndicatorViewPager
                style={{ flex: 1, width: 300 }}
                indicator={this._renderDotIndicator()}
            >
                <View style={{ backgroundColor: 'cadetblue' }}>
                    <ScrollView>
                        <Card title={this.renderType()[0].title}>
                            {
                                this.renderType()[0].itemlist.map((item, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            title={item}
                                            hideChevron={true}
                                            containerStyle={{ borderBottomWidth: 0 }}
                                            leftIcon={<Icon
                                                name='hashtag'
                                                type='font-awesome'
                                                color='#e54d16'
                                                size={20}
                                                iconStyle={{ marginRight: 10 }}
                                            />}
                                        />
                                    );
                                })
                            }
                        </Card>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.nextStep();
                                this.props.setTodoTemplate(this.renderType()[0].itemlist)
                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: 'cornflowerblue' }}>
                    <ScrollView>
                        <Card title={this.renderType()[1].title}>
                            {
                                this.renderType()[1].itemlist.map((item, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            title={item}
                                            hideChevron={true}
                                            containerStyle={{ borderBottomWidth: 0 }}
                                            leftIcon={<Icon
                                                name='hashtag'
                                                type='font-awesome'
                                                color='#e54d16'
                                                size={20}
                                                iconStyle={{ marginRight: 10 }}
                                            />}
                                        />
                                    );
                                })
                            }
                        </Card>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.nextStep();
                                this.props.setTodoTemplate(this.renderType()[1].itemlist)
                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: '#dddddd', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.nextStep();
                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Create Custom To-do List</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </IndicatorViewPager >
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.Templatetype === '0' ? null : this.renderTemplate()
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#d15953',
        padding: 12,
        margin: 16,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 250
    },
    buttonContainer: {
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        color: 'white'
    }
});