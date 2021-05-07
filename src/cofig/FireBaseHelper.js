import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAoCG5GLt8ki5tQAcDOKzaX0V3hD6lGTQY",
  authDomain: "smarttaskbt.firebaseapp.com",
  databaseURL: "https://smarttaskbt-default-rtdb.firebaseio.com",
  projectId: "smarttaskbt",
  storageBucket: "smarttaskbt.appspot.com",
  messagingSenderId: "88973890034",
  appId: "1:88973890034:web:3bd2867a57b4dfad815b6b",
  measurementId: "G-0P6D15XD92",
};

const fbHelper = firebase.initializeApp(firebaseConfig);

export default fbHelper;
