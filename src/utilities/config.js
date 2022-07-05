import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, orderByChild, onValue } from "firebase/database"
export const firebaseConfig = {
  apiKey: "AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c",
  authDomain: "operation-333705.firebaseapp.com",
  databaseURL: "https://operation-333705-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "operation-333705",
  storageBucket: "operation-333705.appspot.com",
  messagingSenderId: "995869264631",
  appId: "1:995869264631:web:9331079e9606ef2644a1f2"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export const firebasedb = db


export const matchTel = /(\d+)/g
export const matchPosition = /(\d+.?\d+,?\d+.\d+)/g

export const circleoption = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 500,
  zIndex: 1
}
