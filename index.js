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

const houseIcon = document.querySelector('.fa-house')
const scaleIcon = document.querySelector('.fa-scale-balanced')
const main = document.querySelector('main')
const icons = [houseIcon, scaleIcon]

icons.forEach(icon => {
  icon.addEventListener('click', e => {
    houseIcon.classList.remove('active')
    scaleIcon.classList.remove('active')
    e.target.classList.add('active')
    render('obj')
  })
})

function render(obj) {
  if(houseIcon.classList.contains('active')) {
    main.innerHTML = /*html*/`
    <section class="bar-section">
      <div id="bar"></div>
      
      <div id="progress"></div>

      <div class="numbers">
        <span class="number">250</span>
        <span class="number">500</span>
        <span class="number">750</span>
      </div>

      <h2>Redeem your <span style="color: #FFDE00">prize</span></h2>
    </section>

    <section class="leaderboard">
      <div class="child">
        <i class="fa-solid fa-trophy first"></i>
        <div class="stats">
          <div class="name">Luca Malandrino</div>
          <div class="nums">
            <div class="points positive">+40pts</div>
            <div class="money">
              <i class="fa-solid fa-money-bills"></i>
              <div>2,00</div>
            </div>
          </div>
        </div>
        <button>+</button>
      </div>
      <div class="child">
        <i class="fa-solid fa-trophy second"></i>
        <div class="stats">
          <div class="name">Luca Malandrino</div>
          <div class="nums">
            <div class="points positive">+40pts</div>
            <div class="money">
              <i class="fa-solid fa-money-bills"></i>
              <div>2,00</div>
            </div>
          </div>
        </div>
        <button>+</button>
      </div>
      <div class="child">
        <i class="fa-solid fa-trophy third"></i>
        <div class="stats">
          <div class="name">Luca Malandrino</div>
          <div class="nums">
            <div class="points positive">+40pts</div>
            <div class="money">
              <i class="fa-solid fa-money-bills"></i>
              <div>2,00</div>
            </div>
          </div>
        </div>
        <button>+</button>
      </div>
    </section>
    `
  } else {
    main.innerHTML = ``
  }
}

render('obj')