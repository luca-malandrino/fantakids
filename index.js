import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import { getDatabase, ref, push, remove } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js'

const firebaseConfig = {
  databaseURL : 'https://fantakids-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const famRef = ref(database, 'fam')
const countRef = ref(database, 'count')