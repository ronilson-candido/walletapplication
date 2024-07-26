// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLAP4JitTvUujRu23pR7uZf39DMBs1OSk",
  authDomain: "walletapplication-959cd.firebaseapp.com",
  projectId: "walletapplication-959cd",
  storageBucket: "walletapplication-959cd.appspot.com",
  messagingSenderId: "126611816006",
  appId: "1:126611816006:web:3ffd5c3bb4b99859c7d447",
  measurementId: "G-GY30WXCMNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();


const getRecaptchaVerifier = () => new RecaptchaVerifier('recaptcha-container', {
  size: 'invisible', 
  callback: (response) => {
  }
}, auth);

export { auth, googleProvider, getRecaptchaVerifier };
