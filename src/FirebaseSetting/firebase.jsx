// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlGrOWbLG7WmiqEbLPZglZhjPupgAMS3E",
  authDomain: "todo-app-yt-1c447.firebaseapp.com",
  projectId: "todo-app-yt-1c447",
  storageBucket: "todo-app-yt-1c447.appspot.com",
  messagingSenderId: "59713357118",
  appId: "1:59713357118:web:f611f3706be15b6e0fd86f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)