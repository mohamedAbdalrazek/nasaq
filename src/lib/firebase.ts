// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyTDxx2GSpBtpdlhXbIRt_nw3OYSTK-Co",
    authDomain: "nasaq-fb601.firebaseapp.com",
    projectId: "nasaq-fb601",
    storageBucket: "nasaq-fb601.firebasestorage.app",
    messagingSenderId: "178215713278",
    appId: "1:178215713278:web:b47583334ba7757b1368af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);