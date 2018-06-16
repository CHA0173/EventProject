import { Navigation } from 'react-native-navigation';
import { store } from './src/store';
import { Provider } from 'react-redux';

// import App from './App';
// import LandingPage from './pages/LandingPage';
import Start from './src/screens/Start';
import LogIn from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Search from './src/screens/Search';
import Events from './src/screens/Events';
import Profile from './src/screens/Profile';
import Info from './src/screens/Info';
import Menu from './src/screens/Menu';
import Notification from './src/screens/Notification';
import ViewEvent from './src/screens/ViewEvent';
import CreateEvent from './src/screens/CreateEvent';

// one page no tab ( LandingPage )
// Navigation.registerComponent('LandingScreen', () => LandingPage,  Provider);
Navigation.registerComponent('StartScreen', () => Start, store, Provider);

//drawer
Navigation.registerComponent('MenuScreen', () => Menu, store, Provider);

// inside the app with tab
Navigation.registerComponent('ProfileTabScreen', () => Profile, store, Provider);
Navigation.registerComponent('SearchTabScreen', () => Search, store, Provider);
Navigation.registerComponent('EventsTabScreen', () => Events, store, Provider);
Navigation.registerComponent('NotificationTabScreen', () => Notification, store, Provider);

// action in Stack without tab
Navigation.registerComponent('LogInScreen', () => LogIn, store, Provider);
Navigation.registerComponent('SignUpScreen', () => SignUp, store, Provider);
Navigation.registerComponent('InfoPushedScreen', () => Info, store, Provider);
Navigation.registerComponent('ViewEventScreen', () => ViewEvent, store, Provider);
Navigation.registerComponent('CreateEventScreen', () => CreateEvent, store, Provider);



// Landing page
// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'StartScreen', // unique ID registered with Navigation.registerScreen
//     navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
//   }
// });

//TEMP USE, easier access to main screen for testing
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Search',
      screen: 'SearchTabScreen', // this is a registered name for a screen
      icon: require('./src/img/search.png'),
      selectedIcon: require('./src/img/search.png'), // iOS only
      title: 'SearchBar',
      navigatorStyle: { navBarTitleTextCentered: true, navBarHidden: true}
    },
    {
      label: 'Events',
      screen: 'EventsTabScreen',
      icon: require('./src/img/Calendar1.png'),
      selectedIcon: require('./src/img/Calendar1.png'), // iOS only
      title: 'Events',
      navigatorStyle: { navBarTitleTextCentered: true }
    },
    {
      label: 'Notification',
      screen: 'NotificationTabScreen',
      icon: require('./src/img/notification3.png'),
      selectedIcon: require('./src/img/notification3.png'), // iOS only
      title: 'Notification',
      navigatorStyle: { navBarTitleTextCentered: true }
    },
    {
      label: 'Profile',
      screen: 'ProfileTabScreen',
      icon: require('./src/img/profile.png'),
      selectedIcon: require('./src/img/profile.png'), // iOS only
      title: 'Profile',
      navigatorStyle: { navBarTitleTextCentered: true }
    }
  ]
})