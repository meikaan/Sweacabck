//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyBAo2ikrt0ngAgK9GsoZUs2j4JA9_ftWDs",
//     authDomain: "sweaca-nursery.firebaseapp.com",
//     databaseURL: "https://sweaca-nursery.firebaseio.com",
//     projectId: "sweaca-nursery",
//     storageBucket: "sweaca-nursery.appspot.com",
//     messagingSenderId: "1018808263607"
//   };

//   firebase.initializeApp(config);

//  // Reference to the sampleone object in your Firebase database
// var sampleone = firebase.database().ref("sampleone");

const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const app = express();
app.get('/timestamp',(request, response)=>{
	response.send('${Date.now()}');
});

// app.get('/timestamp-cached',(request, response)=>{
// 	response.set('cache-Control', 'public, max-age=300, s-maxage=600');
// 	response.send('${Date.now()}');
// });
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
