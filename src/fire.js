import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBq1uj1lLbKJ-bVFbXbyhNzW-z0eU0vPqg",
    authDomain: "depaul-vr-society.firebaseapp.com",
    databaseURL: "https://depaul-vr-society.firebaseio.com",
    projectId: "depaul-vr-society",
    storageBucket: "depaul-vr-society.appspot.com",
    messagingSenderId: "164442524505"
};
var fire = firebase.initializeApp(config);
export default fire;
