import firebase from 'firebase/app';
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBJ4HysglTdp2K4v5gs6sJ8FH1yj_8vhtI",
  authDomain: "book-recommendation-14e11.firebaseapp.com",
  databaseURL: "https://book-recommendation-14e11.firebaseio.com",
  projectId: "book-recommendation-14e11",
  storageBucket: "",
  messagingSenderId: "615843413757",
  appId: "1:615843413757:web:b5201aaf3183393a"
};
const firebaseApp = firebase.initializeApp(config);
const fire = firebaseApp.auth();

export default fire;
