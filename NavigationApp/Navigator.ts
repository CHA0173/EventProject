import { Navigation } from 'react-native-navigation';
// import { store } from './store';
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

// one page no tab ( LandingPage )
// Navigation.registerComponent('LandingScreen', () => LandingPage,  Provider);
Navigation.registerComponent('StartScreen', () => Start,  Provider);

//drawer
Navigation.registerComponent('MenuScreen', () => Menu,  Provider);

// inside the app with tab
Navigation.registerComponent('ProfileTabScreen', () => Profile,  Provider);
Navigation.registerComponent('SearchTabScreen', () => Search,  Provider);
Navigation.registerComponent('EventsTabScreen', () => Events,  Provider);
Navigation.registerComponent('NotificationTabScreen', () => Notification,  Provider);

// action in Stack without tab
Navigation.registerComponent('LogInScreen', () => LogIn,  Provider);
Navigation.registerComponent('SignUpScreen', () => SignUp,  Provider);
Navigation.registerComponent('InfoPushedScreen', () => Info,  Provider);



// Landing page
Navigation.startSingleScreenApp({
  screen: {
    screen: 'StartScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
  }
});
