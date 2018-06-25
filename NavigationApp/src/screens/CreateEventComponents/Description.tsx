import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Button,
    Image,
    PixelRatio,
    Dimensions,
    ScrollView
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import { saveInfo } from '../../actions'

const ImagePicker = require('react-native-image-picker');

const { width } = Dimensions.get('window')



interface IDescriptionProps {
    nextStep: () => void
}

interface IDescriptionStates {
    ImgSource: any,
    uri: string,
}

class Description extends React.Component<IDescriptionProps, IDescriptionStates> {
    constructor(props: IDescriptionProps) {
        super(props);

        this.state = {
            ImgSource: null,
            uri: '',
        }
    }

    public selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.data) {
                return
            }

            const source = { uri: 'data:image/jpeg;base64,' + response.data };

            // axios.post('url', { photo: source })

            this.setState({
                ImgSource: source
            });
        }
        );
    }



    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={{
                            borderColor: '#9B9B9B',
                            borderWidth: 1 / PixelRatio.get(),
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: width,
                            height: 300

                        }}>
                            {this.state.ImgSource === null ? <Text>Select a Photo</Text> :
                                <Image source={this.state.ImgSource} style={{
                                    width: width,
                                    height: 300
                                }} />
                            }
                        </View>
                    </TouchableOpacity>
                </View>

                <Switch />
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={() => { }} />
                <FormLabel>Deposit</FormLabel>
                <FormInput onChangeText={() => { }} />
                <Button onPress={this.props.nextStep} title="next" />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, { saveInfo })(Description)