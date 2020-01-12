import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

// configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyAsWtC-x7nsi7LFLw4FjhdGF-EkY6lc7hQ",
    authDomain: "bibliostore-d62cb.firebaseapp.com",
    databaseURL: "https://bibliostore-d62cb.firebaseio.com",
    projectId: "bibliostore-d62cb",
    storageBucket: "bibliostore-d62cb.appspot.com",
    messagingSenderId: "892495979474",
    appId: "1:892495979474:web:2a15a69dc1998278ae5e0b"
  };

//inicializar firebase
firebase.initializeApp(firebaseConfig);

//configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// crear el enhancer con compose de redux y firebase
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer
})

// state inicial
const initialState = {};

// Crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;