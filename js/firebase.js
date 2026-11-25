import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:"AIzaSyA3lxo64tlpDgQZ1DLt1Fc30-WB5eHayv0",
    authDomain: "nextrit-gaming.firebaseapp.com",
    projectId: "nextrit-gaming",
    storageBucket: "nextrit-gaming.firebasestorage.app",
    messagingSenderId: "27045109571",
    appId: "1:27045109571:web:a6ae3acc88364434fdd9f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);