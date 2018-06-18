import * as React from 'react';
import {
    Text,
    View
} from 'react-native';
import { Card, ListItem } from 'react-native-elements'

import { templateA, templateB } from '../fakeData'

import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import { ScrollView } from 'react-native';

interface ITemplatesProps {
    type: string
}

export default class Templates extends React.Component<ITemplatesProps, {}> {
    constructor(props: ITemplatesProps) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <IndicatorViewPager
                    style={{ height: 300 }}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <Card title="CARD WITH DIVIDER">
                            {
                                templateA.map((item, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            title={item.name}
                                        />
                                    );
                                })
                            }
                        </Card>
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <Card title="CARD WITH DIVIDER">
                            {
                                templateB.map((item, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            title={item.name}
                                        />
                                    );
                                })
                            }
                        </Card>                    
                    </View>
                </IndicatorViewPager>
            </View>
        );
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }
}