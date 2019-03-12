// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { reduxFirestore, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyAFKPa3FKfxFEZ0pffJoD6XnDBjBbEAT8k",
  authDomain: "reactclientpanel-e7d3f.firebaseapp.com",
  databaseURL: "https://reactclientpanel-e7d3f.firebaseio.com",
  projectId: "reactclientpanel-e7d3f",
  storageBucket: "reactclientpanel-e7d3f.appspot.com",
  messagingSenderId: "570119446204"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// Check the local storage settings
if (localStorage.getItem("settings") == null) {
  const settings = {
    disableBalanceAdd: true,
    disableBalanceEdit: false,
    allowRegistration: false
  };
  localStorage.setItem("settings", JSON.stringify(settings));
}

// Create store with reducers and initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem("settings"))
};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
