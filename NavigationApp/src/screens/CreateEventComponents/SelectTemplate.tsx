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
    prevStep: () => void,
    setTodoTemplate: (templatetodo) => void
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
                    titleStyle={{ marginTop: 25 }}
                    imageSrc={require('../../img/birthday.jpg')}
                    title="Birthday Party"
                    featured
                    height={160}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.setType('birthdayParty')
                    }}
                />
                <Tile
                    titleStyle={{ marginTop: 25 }}
                    imageSrc={require('../../img/junkboat.jpg')}
                    title="Junk Boat Party"
                    featured
                    height={160}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.setType('junkBoat')
                    }}
                />
                <Tile
                    titleStyle={{ marginTop: 25 }}
                    imageSrc={require('../../img/meetup.jpg')}
                    title="Meet Up"
                    featured
                    height={160}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.setType('meetUp')
                    }}
                />
                <Tile
                    titleStyle={{ marginTop: 25 }}
                    imageSrc={require('../../img/movie.jpg')}
                    title="Movie night"
                    featured
                    height={160}
                    imageContainerStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'white' }}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.setType('movieNight')
                    }}
                />
                <Tile
                    titleStyle={{ marginTop: 25 }}
                    imageSrc={require('../../img/custom.png')}
                    title="Custom"
                    featured
                    height={160}
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
                            <Templates Templatetype={this.state.Templatetype}
                                setModalVisible={this.setModalVisible.bind(this)}
                                nextStep={this.props.nextStep} 
                                setTodoTemplate={this.props.setTodoTemplate.bind(this)}
                                />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(false);
                                    }}>
                                    <View style={styles.buttonBack}>
                                        <Text style={styles.buttonText}>Back</Text>
                                    </View>
                                </TouchableOpacity>
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
    buttonBack: {
        backgroundColor: '#999999',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 250
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        color: 'white'
    }
});