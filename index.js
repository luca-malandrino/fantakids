import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js'

const firebaseConfig = {
  databaseURL : 'https://fantakids-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, 'fam')

onValue(referenceInDB, snapshot => {
  console.log(snapshot.val())
})