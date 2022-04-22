import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Navigation from '../components/Navigation'
import { getDatabase, onValue, ref, get, off } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c",
    authDomain: "operation-333705.firebaseapp.com",
    databaseURL: "https://operation-333705-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "operation-333705",
    storageBucket: "operation-333705.appspot.com",
    messagingSenderId: "995869264631",
    appId: "1:995869264631:web:9331079e9606ef2644a1f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)


export default function Tracert() {
    const [opname, setOpName] = useState([])

    function handleRawData(snapshort) {
        setOpName(snapshort)
    }

    useEffect(() => {


        const dbref = ref(db)
        onValue(dbref, (snapshot) => {
            let allop = Object.keys(snapshot.val())
            handleRawData(allop)
        })
        return () => { off(dbref) }
    })


    const renderop = () => {
        let setOP = []
        setOP.push(
            <Link to='#' key='none'  className="list-group-item disabled bg-primary text-white">
                รายชื่อปฏิบัติการ
            </Link>
        )
        opname.forEach(element => {
            setOP.push(
                <Link to={`${element}`} key={element} className="list-group-item text-dark">
                    {element}
                </Link>)
        })
        return (setOP)
    }

    return (
        <div className="container-fluid vh-100 homepage text-white">
        <Navigation></Navigation>
            <div className="mt-5 text-center justify-content-center w-50 m-auto ">
                {opname == null ? 'loading..' : renderop()}

            </div>

        </div>
    )
}