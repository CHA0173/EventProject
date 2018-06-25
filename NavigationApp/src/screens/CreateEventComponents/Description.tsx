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

const ImagePicker = require('react-native-image-picker');

const { width } = Dimensions.get('window')



interface IDescriptionProps {
}

<<<<<<< HEAD
export default class Description extends React.Component<IDescriptionProps, {}> {
    constructor(props: IDescriptionProps){
        super(props);
        this.state = {
            name: '',
            description: '',
            address: '',
            deposit: ''
        }
    }
    
=======
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



>>>>>>> 3c5edeeffd095b9dd5f700aea3db3ce197cd9010
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
                <FormInput onChangeText={(text) => this.setState({name: text})} />
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={(text) => this.setState({description: text})} />
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={(text) => this.setState({address: text})} />
                <FormLabel>Deposit</FormLabel>
                <FormInput onChangeText={(text) => this.setState({deposit: text})} />
            </View>
        )
    }
<<<<<<< HEAD
}
=======
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, { saveInfo })(Description)
>>>>>>> 3c5edeeffd095b9dd5f700aea3db3ce197cd9010
