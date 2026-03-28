// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNrRGNei3VY_HcecEwsuj1RvWMjleA934",
  authDomain: "habit-tracker-auth-5e9a6.firebaseapp.com",
  projectId: "habit-tracker-auth-5e9a6",
  storageBucket: "habit-tracker-auth-5e9a6.firebasestorage.app",
  messagingSenderId: "1016487916031",
  appId: "1:1016487916031:web:08b70b68dc83e7b73977ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;