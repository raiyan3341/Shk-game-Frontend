// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEtc9F_TRDKoZUuuDf8AXHv-cOdD0jG8I",
  authDomain: "shk-games.firebaseapp.com",
  projectId: "shk-games",
  storageBucket: "shk-games.firebasestorage.app",
  messagingSenderId: "216091819805",
  appId: "1:216091819805:web:d75edffb1e19368809abf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);