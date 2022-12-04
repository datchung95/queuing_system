import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAxhI5HTRSSGJObEF4ecDzM1VYJV403fBQ",
    authDomain: "queuing-system-c25ae.firebaseapp.com",
    projectId: "queuing-system-c25ae",
    storageBucket: "queuing-system-c25ae.appspot.com",
    messagingSenderId: "90716589681",
    appId: "1:90716589681:web:0a6314740b449cecee55d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export const storage = getStorage(app); 

export default database;