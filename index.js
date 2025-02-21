import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASfWL6hCF5EUikZNPJMtiqu2aNsfxd2po",
  authDomain: "fantakids.firebaseapp.com",
  databaseURL: "https://fantakids-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fantakids",
  storageBucket: "fantakids.firebasestorage.app",
  messagingSenderId: "292289812565",
  appId: "1:292289812565:web:a6f3c266edc06a0a7adcdc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const familyCollection = collection(db, 'family')
const childrenDocRef = doc(familyCollection, 'children')

setDoc(childrenDocRef, { anna: 0, luca: 0, marco: 0 })

const houseIcon = document.querySelector('.fa-house')
const scaleIcon = document.querySelector('.fa-scale-balanced')
const main = document.querySelector('main')
const icons = [houseIcon, scaleIcon]

icons.forEach(icon => {
  icon.addEventListener('click', e => {
    houseIcon.classList.remove('active')
    scaleIcon.classList.remove('active')
    e.target.classList.add('active')
  })
})