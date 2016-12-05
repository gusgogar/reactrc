import React from 'react'
import {render} from 'react-dom'
import firebase from 'firebase'



  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBqTupB5iZ-E0lEOPyTdL-h8ncBQhAFMBM",
    authDomain: "curso-react-c0a1b.firebaseapp.com",
    databaseURL: "https://curso-react-c0a1b.firebaseio.com",
    storageBucket: "curso-react-c0a1b.appspot.com",
    messagingSenderId: "614082004304"
  });

import App from './components/App'
render(<App/>, document.getElementById("root"))
