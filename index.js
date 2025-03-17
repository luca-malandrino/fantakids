import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAu7YlMpmprBlKOh25fQYRIC3fl_P51Dc8",
  authDomain: "chat-per-marco-fd0b2.firebaseapp.com",
  projectId: "chat-per-marco-fd0b2",
  storageBucket: "chat-per-marco-fd0b2.firebasestorage.app",
  messagingSenderId: "1045759820763",
  appId: "1:1045759820763:web:9594d8dcafe8c879351dfe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

const familyCollection = collection(db, 'chat')
const childrenDocRef = doc(familyCollection, 'messages')