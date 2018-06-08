import { Navigation } from 'react-native-navigation';
import App from './App';
import LandingPage from './pages/LandingPage';
import Start from './pages/Start';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import Setting from './pages/Setting';
import Info from './pages/Info';
import Menu from './pages/Menu';
import Notification from './pages/Notification';

// one page no tab ( LandingPage )
Navigation.registerComponent('LandingScreen', () => LandingPage);
Navigation.registerComponent('StartScreen', () => Start);

//drawer
Navigation.registerComponent('MenuScreen', () => Menu);

// inside the app with tab
Navigation.registerComponent('FirstTabScreen', () => App);
Navigation.registerComponent('SecondTabScreen', () => Setting);
Navigation.registerComponent('SignUpScreen', () => SignUp);
Navigation.registerComponent('NotificationTabScreen', () => Notification);

// action in Stack without tab
Navigation.registerComponent('LogInScreen', () => LogIn);
Navigation.registerComponent('SignUpScreen', () => SignUp);
Navigation.registerComponent('InfoPushedScreen', () => Info);



// Landing page
Navigation.startSingleScreenApp({
  screen: {
    screen: 'LandingScreen', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
  }
});
