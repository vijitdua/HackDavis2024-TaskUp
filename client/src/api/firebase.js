// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyU3ZzxRKfRjg2a8LX7EUbI-pRdajwQPc",
    authDomain: "taskup-tnav.firebaseapp.com",
    databaseURL: "https://taskup-tnav-default-rtdb.firebaseio.com",
    projectId: "taskup-tnav",
    storageBucket: "taskup-tnav.appspot.com",
    messagingSenderId: "432052856517",
    appId: "1:432052856517:web:2a81d7abb11f5eae1db2ac",
    measurementId: "G-2GVKD73VNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
