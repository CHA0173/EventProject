import { Navigation } from 'react-native-navigation';
// import { store } from './store';
import { Provider } from 'react-redux';

// import App from './App';
// import LandingPage from './pages/LandingPage';
import Start from './pages/Start';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Menu from './pages/Menu';
import Notification from './pages/Notification';

// one page no tab ( LandingPage )
// Navigation.registerComponent('LandingScreen', () => LandingPage,  Provider);
Navigation.registerComponent('StartScreen', () => Start,  Provider);

//drawer
Navigation.registerComponent('MenuScreen', () => Menu,  Provider);

// inside the app with tab
Navigation.registerComponent('ProfileTabScreen', () => Profile,  Provider);
Navigation.registerComponent('SearchTabScreen', () => Search,  Provider);
Navigation.registerComponent('EventsTabScreen', () => Search,  Provider);
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
