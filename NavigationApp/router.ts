import * as React                       from 'react';
import {
  AppRegistry,
  Text,
  Platform,
}                                       from 'react-native';
import { StackNavigator }               from 'react-navigation';
import Events from './src/screens/Events';
import Search from './src/screens/Search';
import Profile from './src/screens/Profile';
const Router = StackNavigator({
  Events: { screen: Events ,
            path: 'Users/:id/events'},
  Search: { screen: Search},         
  Profile :{ screen: Profile ,
            path: 'Users/:id/profile'}
});
const prefix = Platform.OS== 'android' ? 'WEvent://WEvent' : 'WEvent://';
const MainApp = () => <SimpleApp uriPrefix={prefix} />;


export default Router;