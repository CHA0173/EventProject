import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Button,
    Picker,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import Modal from 'react-native-modal'
import { Card, ListItem, Tile } from 'react-native-elements'
import Templates from './Templates'
import { stepButtons } from '../../styles'

interface ISelectTemplateProps {
    nextStep: () => void,
    prevStep: () => void
}
interface ISelectTemplateState {
    Templatetype: string,
    modalVisible: boolean
}

export default class SelectTemplate extends React.Component<ISelectTemplateProps, ISelectTemplateState> {
    constructor(props: ISelectTemplateProps) {
        super(props);
        this.state = {
            Templatetype: '0',
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setType(Templatetype) {
        this.setState({ Templatetype: Templatetype })
    }

    render() {
        return (
            <View>
                <Tile
                    imageSrc={require('../../img/birthday.jpg')}
                    title="Birthday Party"
                    featured
                    height={130}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.setType('birthdayParty'
                        )
                    }}
                />
                <Tile
                    imageSrc={require('../../img/junkboat.jpg')}
                    title="Junk Boat Party"
                    featured
                    height={130}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.setType('junkboat'
                        )
                    }}
                />
                <Tile
                    imageSrc={require('../../img/meetup.jpg')}
                    title="Meet Up"
                    featured
                    height={130}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => this.setState({ Templatetype: 'meetup' })}
                />
                <Tile
                    imageSrc={require('../../img/movie.jpg')}
                    title="Movie night"
                    featured
                    height={130}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => this.setState({ Templatetype: 'movie' })}
                />
                <Tile
                    imageSrc={require('../../img/custom.png')}
                    title="Custom"
                    featured
                    height={130}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => this.props.nextStep()}
                />

                <Modal
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                    isVisible={this.state.modalVisible}
                >
                    <View style={styles.modalContent}>
                        <View>
                            {/* FIXME: maybe need to move to Templates page */}
                            <Templates Templatetype={this.state.Templatetype} />
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <View style={styles.buttonBack}>
                                        <Text style={styles.buttonText}>Back</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.props.nextStep();
                                    }}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Select</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#d15953',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 120
    },
    buttonBack: {
        backgroundColor: '#999999',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 120
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonText: {
        fontSize: 15,
        color: 'white'
    }
});