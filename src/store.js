import { createStore, combineReducers, compose } from "redux";
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

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
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firebase
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;