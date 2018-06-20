import * as React from 'react';
import {
    Text,
    View
} from 'react-native';
import { Card, ListItem, List } from 'react-native-elements'

import { junkBoat, birthdayParty } from '../fakeData'

import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { ScrollView } from 'react-native';

interface ITemplatesProps {
    type: string
}

export default class Templates extends React.Component<ITemplatesProps, {}> {
    constructor(props: ITemplatesProps) {
        super(props)
    }

    renderType() {
        if (this.props.type == 'junkBoat') {
            return junkBoat
        } else {
            return birthdayParty
        }
    }


    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    renderTemplate() {
        return (
            <IndicatorViewPager
                style={{ height: 300 }}
                indicator={this._renderDotIndicator()}
            >
                <View style={{ backgroundColor: 'cadetblue' }}>
                    <Card title="Basic">
                        {
                            this.renderType().templateA.map((item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        title={item.name}
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
                            this.renderType().templateB.map((item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        title={item.name}
                                        hideChevron={true}
                                    />
                                );
                            })
                        }
                    </Card>
                </View>
                <View>
                    <Text>
                        You choose la 
                    </Text>
                </View>
            </IndicatorViewPager>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.type === '0'? null : this.renderTemplate()
                }
            </View>
        );
    }
}