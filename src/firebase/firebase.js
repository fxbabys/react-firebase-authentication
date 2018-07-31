import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var config = {
    apiKey: "AIzaSyBBcIuY_XNttdTQku10dQ10PJjyeKf3vGg",
    authDomain: "react-authentication-d7093.firebaseapp.com",
    databaseURL: "https://react-authentication-d7093.firebaseio.com",
    projectId: "react-authentication-d7093",
    storageBucket: "react-authentication-d7093.appspot.com",
    messagingSenderId: "667317487959"
}

if (!firebase.apps.length) firebase.initializeApp(config)

const db = firebase.database()
const auth = firebase.auth()

export {
    db,
    auth
}