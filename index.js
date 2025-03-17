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

const modal = /*html*/ `
  <fieldset id="modal">
    <p id="message"></p>
    <div class="modal-btns">
      <button class="modal-btn">Cancel</button>
      <button class="modal-btn">Confirm</button>
    </div>
  </fieldset>
`

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
      ${modal}
      `
      document.getElementById('progress').style.width = ((totalCount / 1000) * 333) + 'px'

      document.getElementById('message').textContent = 'Are you sure you want to pay your child?'

    } else {
      main.innerHTML = /* html */ `
      <section class="bonuses">
        <div class="bonus">
          <div class="bonus-name">Dream team</div>
          <div class="bonus-points positive">+10pts</div>
          <div class="buttons">
            <div class="button" data-points="10" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="10" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="10" data-child="Anna Malandrino">A</div>
          </div>
        </div>
      
        <div class="bonus">
          <div class="bonus-name">Rita Levi-Montalcini</div>
          <div class="bonus-points positive">+8pts</div>
          <div class="buttons">
            <div class="button" data-points="8" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="8" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="8" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Pratica le pratiche</div>
          <div class="bonus-points positive">+5pts</div>
          <div class="buttons">
            <div class="button" data-points="5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Hell's kitchen? No grazie!</div>
          <div class="bonus-points positive">+5pts</div>
          <div class="buttons">
            <div class="button" data-points="5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Marie Kondo</div>
          <div class="bonus-points positive">+5pts</div>
          <div class="buttons">
            <div class="button" data-points="5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Ready-Steady-GO!</div>
          <div class="bonus-points positive">+3pts</div>
          <div class="buttons">
            <div class="button" data-points="3" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="3" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="3" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Giobbe</div>
          <div class="bonus-points positive">+3pts</div>
          <div class="buttons">
            <div class="button" data-points="3" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="3" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="3" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Look total school</div>
          <div class="bonus-points positive">+2pts</div>
          <div class="buttons">
            <div class="button" data-points="2" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="2" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="2" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <!-- Negative Bonuses -->
        <div class="bonus">
          <div class="bonus-name">Amplifon</div>
          <div class="bonus-points negative">-3pts</div>
          <div class="buttons">
            <div class="button" data-points="-3" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-3" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-3" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Hiroshima</div>
          <div class="bonus-points negative">-5pts</div>
          <div class="buttons">
            <div class="button" data-points="-5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">I don't know why</div>
          <div class="bonus-points negative">-5pts</div>
          <div class="buttons">
            <div class="button" data-points="-5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Look Total Bad</div>
          <div class="bonus-points negative">-5pts</div>
          <div class="buttons">
            <div class="button" data-points="-5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Dolby Surround</div>
          <div class="bonus-points negative">-5pts</div>
          <div class="buttons">
            <div class="button" data-points="-5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-5" data-child="Anna Malandrino">A</div>
          </div>
        </div>

        <div class="bonus">
          <div class="bonus-name">The Sleeping Beauty</div>
          <div class="bonus-points negative">-5pts</div>
          <div class="buttons">
            <div class="button" data-points="-5" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-5" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-5" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Ready-Steady-NO!</div>
          <div class="bonus-points negative">-3pts</div>
          <div class="buttons">
            <div class="button" data-points="-3" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-3" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-3" data-child="Anna Malandrino">A</div>
          </div>
        </div>
        
        <div class="bonus">
          <div class="bonus-name">Tom & Jerry</div>
          <div class="bonus-points negative">-7pts</div>
          <div class="buttons">
            <div class="button" data-points="-7" data-child="Luca Malandrino">L</div>
            <div class="button" data-points="-7" data-child="Marco Malandrino">M</div>
            <div class="button" data-points="-7" data-child="Anna Malandrino">A</div>
          </div>
        </div>    
      </section>

      ${modal}
      `
    }
  })
}

render()

main.addEventListener('click', e => {
  if(e.target.classList.contains('fa-refresh')) {
    document.querySelector('fieldset').style.display = 'block'
    document.querySelectorAll('.modal-btn')[0].addEventListener('click', function closeModal(event) {
      document.querySelector('fieldset').style.display = 'none'
      event.target,removeEventListener('click', closeModal)
    })
    document.querySelectorAll('.modal-btn')[1].addEventListener('click', function refreshPoints() {
      const updateObj = e.target.dataset.child === 'Luca Malandrino' ? {luca: 0} :
      e.target.dataset.child === 'Marco Malandrino' ? {marco: 0} : {anna: 0}
      updateDoc(childrenDocRef, updateObj).then(console.log(updateObj))
      render()
    })
  } else if(e.target.dataset.points) {
    document.querySelector('fieldset').style.display = 'block'
    let bonusPoints = Number(e.target.dataset.points)
    document.getElementById('message').textContent = bonusPoints > 0 ? `Add ${bonusPoints}pts to ${e.target.dataset.child.replace(' Malandrino', '')}?`: 
                                                                  `Remove ${String(bonusPoints).replace('-', '')}pts from ${e.target.dataset.child.replace(' Malandrino', '')}?`

    document.querySelectorAll('.modal-btn')[0].addEventListener('click', function closeModal(event) {
      document.querySelector('fieldset').style.display = 'none'
      event.target,removeEventListener('click', closeModal)
    })
    document.querySelectorAll('.modal-btn')[1].addEventListener('click', function addPoints(event) {
      getDoc(childrenDocRef).then(snapshot => {
        let { anna, luca, marco, totalCount } = snapshot.data()
        const points = Number(e.target.dataset.points)

        switch(e.target.dataset.child) {
          case 'Luca Malandrino':
            luca += points
            break
          case 'Marco Malandrino':
            marco += points
            break
          case 'Anna Malandrino':
            anna += points
            break
        }
        
        totalCount += points
        totalCount = totalCount % 1000
        totalCount = totalCount < 0 ? 0 : totalCount

        setDoc(childrenDocRef, {
          luca: luca,
          marco: marco,
          anna: anna,
          totalCount: totalCount
        })
      })

      render()

      event.target.removeEventListener('click', addPoints)

    })
  }
}) 