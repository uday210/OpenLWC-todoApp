import firebase from 'firebase';
//paste firebase config below
var firebaseConfig = {
    apiKey: '******************',
    authDomain: '******************',
    databaseURL: '******************',
    projectId: '******************',
    storageBucket: '******************',
    messagingSenderId: '******************',
    appId: '******************',
    measurementId: '******************'
};

var fire = firebase.initializeApp(firebaseConfig);

export default fire;
