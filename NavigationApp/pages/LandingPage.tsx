import * as React from 'react';
import { View, TouchableOpacity, Text, Button} from 'react-native';
import { Navigator } from 'react-native-navigation';


interface LandingPageProps {
  navigator: Navigator
}

export default class LandingPage extends React.Component<LandingPageProps> {
  
  public render() {
    return (
      <View style={{backgroundColor: 'yellow', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button 
        title='YouIn'
        onPress={() => this.props.navigator.push({
          screen: 'StartScreen',
          navigatorStyle: {navBarHidden: true}
        })} />
        <View style={{borderStyle: 'solid', borderWidth: 1, backgroundColor: 'white'}}>
          <Text style={{fontSize: 50, color: 'black'}}> YouIn </Text>
        </View>  
      </View>
    )
  }

}