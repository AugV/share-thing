import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

//const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyB5ZRrP_8L9i2mdxD6SwB5oJMejXNOWiho",
  authDomain: "sharething-13c61.firebaseapp.com",
  databaseURL: "https://sharething-13c61.firebaseio.com",
  projectId: "sharething-13c61",
  storageBucket: "sharething-13c61.appspot.com",
  messagingSenderId: "141243147234"
  };
firebase.initializeApp(config);

//firebase.firestore().settings(settings);
export default firebase;