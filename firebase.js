// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXjcDX8FV5s1uSx9lHruFsvS7BRiQN4vs",
  authDomain: "ourchoice-d2bc3.firebaseapp.com",
  projectId: "ourchoice-d2bc3",
  storageBucket: "ourchoice-d2bc3.appspot.com",
  messagingSenderId: "968027038305",
  appId: "1:968027038305:web:9fca3bbf01a145ffaf0020",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
