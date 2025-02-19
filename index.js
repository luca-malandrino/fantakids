import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import { getDatabase, onValue, ref, set } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyASfWL6hCF5EUikZNPJMtiqu2aNsfxd2po",
  authDomain: "fantakids.firebaseapp.com",
  databaseURL: "https://fantakids-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fantakids",
  storageBucket: "fantakids.firebasestorage.app",
  messagingSenderId: "292289812565",
  appId: "1:292289812565:web:a6f3c266edc06a0a7adcdc"
}; 
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

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