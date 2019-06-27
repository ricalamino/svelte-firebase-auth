import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {

  // YOUR FIREBASE CREDENTIALS
  
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();