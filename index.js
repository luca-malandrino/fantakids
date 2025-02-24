import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

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
    render()
  })
})

function render() {
  getDoc(childrenDocRef).then(snapshot => {
    const snapshotData = snapshot.data()
    const totalCount = snapshotData.totalCount
    const children = [{name: 'Luca Malandrino', points: snapshotData.luca},
                      {name: 'Marco Malandrino', points: snapshotData.marco},
                      {name: 'Anna Malandrino', points: snapshotData.anna}]
    children.sort((a, b) => b.points - a.points)

    if(houseIcon.classList.contains('active')) {
      const firstChildValue = children[0].points < 0 ? 'negative' : children[0].points > 0 ? 'positive' : ''
      const secondChildValue = children[1].points < 0 ? 'negative' : children[1].points > 0 ? 'positive' : ''
      const thirdChildValue = children[2].points < 0 ? 'negative' : children[2].points > 0 ? 'positive' : ''
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
            <div class="name">${children[0].name}</div>
            <div class="nums">
              <div class="points ${firstChildValue}">${(firstChildValue === 'positive' ? '+' : '') + children[0].points}pts</div>
              <div class="money">
                <i class="fa-solid fa-money-bills"></i>
                <div>${JSON.stringify((children[0].points / 20).toFixed(2)).replace('"', '').replace('"', '')}</div>
              </div>
            </div>
          </div>
          <button class="refresh-btn">
            <i class="fa-solid fa-refresh" data-child="${children[0].name}"></i>
          </button>
        </div>
        <div class="child">
          <i class="fa-solid fa-trophy second"></i>
          <div class="stats">
            <div class="name">${children[1].name}</div>
            <div class="nums">
            <div class="points ${secondChildValue}">${(secondChildValue === 'positive' ? '+' : '') + children[1].points}pts</div>
              <div class="money">
                <i class="fa-solid fa-money-bills"></i>
                <div>${JSON.stringify((children[1].points / 20).toFixed(2)).replace('"', '').replace('"', '')}</div>
              </div>
            </div>
          </div>
          <button class="refresh-btn">
            <i class="fa-solid fa-refresh" data-child="${children[1].name}"></i>
          </button>
        </div>
        <div class="child">
          <i class="fa-solid fa-trophy third"></i>
          <div class="stats">
            <div class="name">${children[2].name}</div>
            <div class="nums">
            <div class="points ${thirdChildValue}">${(thirdChildValue === 'positive' ? '+' : '') + children[2].points}pts</div>
              <div class="money">
                <i class="fa-solid fa-money-bills"></i>
                <div>${JSON.stringify((children[2].points / 20).toFixed(2)).replace('"', '').replace('"', '')}</div>
              </div>
            </div>
          </div>
          <button class="refresh-btn">
            <i class="fa-solid fa-refresh" data-child="${children[2].name}"></i>
          </button>
        </div>
      </section>
      `
      document.getElementById('progress').style.width = ((totalCount / 1000) * 333) + 'px'

    } else {
      main.innerHTML = ``
    }
  })
}

render()

main.addEventListener('click', e => {
  if(e.target.classList.contains('fa-refresh')) {
    console.log(e.target)
    const updateObj = e.target.dataset.child === 'Luca Malandrino' ? {luca: 0} :
                      e.target.dataset.child === 'Marco Malandrino' ? {marco: 0} : {anna: 0}
    updateDoc(childrenDocRef, updateObj).then(console.log(updateObj))
    render()
  }
})