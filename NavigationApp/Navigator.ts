import { Navigation } from 'react-native-navigation';
import { store } from './store';
import { Provider } from 'react-redux';

// import App from './App';
import LandingPage from './pages/LandingPage';
import Start from './pages/Start';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Menu from './pages/Menu';
import Notification from './pages/Notification';

// one page no tab ( LandingPage )
Navigation.registerComponent('LandingScreen', () => LandingPage, store, Provider);
Navigation.registerComponent('StartScreen', () => Start, store, Provider);

//drawer
Navigation.registerComponent('MenuScreen', () => Menu, store, Provider);

// inside the app with tab
Navigation.registerComponent('ProfileTabScreen', () => Profile, store, Provider);
Navigation.registerComponent('SearchTabScreen', () => Search, store, Provider);
Navigation.registerComponent('NotificationTabScreen', () => Notification, store, Provider);

// action in Stack without tab
Navigation.registerComponent('LogInScreen', () => LogIn, store, Provider);
Navigation.registerComponent('SignUpScreen', () => SignUp, store, Provider);
Navigation.registerComponent('InfoPushedScreen', () => Info, store, Provider);



// Landing page
Navigation.startSingleScreenApp({
  screen: {
    screen: 'StartScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
  }
});
