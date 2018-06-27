import './Navigator'

//ONE SIGNAL INITIALIZATION
// import React, { Component } from 'react';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

// export default class App extends Component {

//     componentWillMount() {
//       	OneSignal.init("135b1bdf-66b4-4428-8801-16526ee52e7b");
      
//         OneSignal.addEventListener('received', this.onReceived);
//         OneSignal.addEventListener('opened', this.onOpened);
//         OneSignal.addEventListener('ids', this.onIds);
//     }

//     componentWillUnmount() {
//         OneSignal.removeEventListener('received', this.onReceived);
//         OneSignal.removeEventListener('opened', this.onOpened);
//         OneSignal.removeEventListener('ids', this.onIds);
//     }

//     onReceived(notification) {
//         console.log("Notification received: ", notification);
//     }

//     onOpened(openResult) {
//       console.log('Message: ', openResult.notification.payload.body);
//       console.log('Data: ', openResult.notification.payload.additionalData);
//       console.log('isActive: ', openResult.notification.isAppInFocus);
//       console.log('openResult: ', openResult);
//     }

//     onIds(device) {
// 		console.log('Device info: ', device);
//     }
// }