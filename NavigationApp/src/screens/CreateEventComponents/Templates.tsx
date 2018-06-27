import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Card, ListItem, List } from 'react-native-elements'

import { junkBoat, birthdayParty } from '../CreateEventComponents/ToDoTemplates'

import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { ScrollView } from 'react-native';

interface ITemplatesProps {
    Templatetype: string,
}

interface ITemplatesStates {
    id: number,
    itemlist: string[]
}

export default class Templates extends React.Component<ITemplatesProps, ITemplatesStates> {
    constructor(props: ITemplatesProps) {
        super(props)

        this.state ={
            id: 0,
            itemlist: []
        }
    }

    renderType() {
        if (this.props.Templatetype == 'junkBoat') {
            return junkBoat
        } else {
            return birthdayParty
        }
        // switch (this.props.Templatetype) {
        //     case 'BirthdayParty':
        //         return birthdayParty
        //     case 'junkboat':
        //         return junkBoat
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
                </View>
                <View style={{ backgroundColor: 'grey' }}>
                    <Text>
                        Custom
                    </Text>
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