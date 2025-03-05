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
      main.innerHTML = /* html */ `
      <section class="bonuses">
        <div class="bonus">
          <div class="bonus-name">Pratica le pratiche</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Dolby sorround</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Dream team</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">I don't know why</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Look total school</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Hell's kitchen? No grazie!</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Rita Levi-Montalcini</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Ready-Steady-GO!</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        <div class="bonus">
          <div class="bonus-name">Amplifon</div>
          <div class="bonus-points positive">+40pts</div>
          <div class="buttons">
            <div class="button" data-points="40" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="40" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="40" data-child="Anna Malandrino">A</div>
          </div>
        </div>
      </section>
      `
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
  } else if(e.target.dataset.points) {
    getDoc(childrenDocRef).then(snapshot => {
      let { anna, luca, marco, totalCount } = snapshot.data()
      const points = Number(e.target.dataset.points)

      switch(e.target.dataset.child) {
        case 'Luca Malandrino':
          luca += points
          console.log('luca')
          break
        case 'Marco Malandrino':
          marco += points
          console.log('marco')
          break
        case 'Anna Malandrino':
          anna += points
          console.log('anna')
          break
      }
      
      totalCount += points
      totalCount = totalCount % 1000

      setDoc(childrenDocRef, {
        luca: luca,
        marco: marco,
        anna: anna,
        totalCount: totalCount
      })

      render()
    })
  }
})