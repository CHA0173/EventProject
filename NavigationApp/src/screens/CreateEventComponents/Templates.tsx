import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Card, ListItem, List } from 'react-native-elements'

import { junkBoat, birthdayParty, meetUp, movieNight } from '../CreateEventComponents/ToDoTemplates'

import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { ScrollView } from 'react-native';

interface ITemplatesProps {
    Templatetype: string,
    setModalVisible: (visible) => void
    nextStep: () => void
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
                    <Card title="Basic">
                        {
                            this.renderType()[0].itemlist.map((item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        title={item}
                                        hideChevron={true}
                                    />
                                );
                            })
                        }
                    </Card>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.nextStep();

                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: 'cornflowerblue' }}>
                    <Card title="Supreme">
                        {
                            this.renderType()[1].itemlist.map((item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        title={item}
                                        hideChevron={true}
                                    />
                                );
                            })
                        }
                    </Card>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.nextStep();
                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: 'grey' }}>
                    <Text>
                        Custom
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.nextStep();
                            }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </IndicatorViewPager>
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