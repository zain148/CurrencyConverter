import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyD4OcMmCI8KYfma0NzgVO8VeLczSQAIr68",
  authDomain: "currenyconverter-b0ab5.firebaseapp.com",
  databaseURL: "https://currenyconverter-b0ab5.firebaseio.com",
  projectId: "currenyconverter-b0ab5",
  storageBucket: "currenyconverter-b0ab5.appspot.com",
  messagingSenderId: "49420125087",
  appId: "1:49420125087:web:c25e0fb318e8c67b7433aa",
  measurementId: "G-LX6KFQVGW9"
};

let app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
