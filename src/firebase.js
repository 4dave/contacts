import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyCwSEnZjFA180OC3BiEojrN4J75RyxewEQ",
  authDomain: "contacts-72379.firebaseapp.com",
  databaseURL: "https://contacts-72379-default-rtdb.firebaseio.com",
  projectId: "contacts-72379",
  storageBucket: "contacts-72379.appspot.com",
  messagingSenderId: "449993073750",
  appId: "1:449993073750:web:ea5930f26acfaf05c907f7",
}
// Initialize Firebase
const firebaseDB = firebase.initializeApp(firebaseConfig)

export default firebaseDB.database().ref()
