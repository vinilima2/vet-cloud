// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh-xwvQOD0rI0LKgIPyF2FpWaXx5dicKI",
  authDomain: "vue-course-50638.firebaseapp.com",
  databaseURL: "https://vue-course-50638-default-rtdb.firebaseio.com",
  projectId: "vue-course-50638",
  storageBucket: "vue-course-50638.firebasestorage.app",
  messagingSenderId: "127793290426",
  appId: "1:127793290426:web:2cc03be9046329a875f683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export { app, database, auth }