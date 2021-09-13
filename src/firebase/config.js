import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyAJ6wksVINM_Y6RQZXqOnRZ6SeQ0xBTksY",
    authDomain: "memorlee.firebaseapp.com",
    projectId: "memorlee",
    storageBucket: "memorlee.appspot.com",
    messagingSenderId: "322610230427",
    appId: "1:322610230427:web:8650c767958d17e33fc23e",
    measurementId: "G-BK9035555D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { firestore, storage, timestamp };