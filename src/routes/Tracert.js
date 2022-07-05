import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation'
import {  onValue, ref, off } from "firebase/database"
import { firebasedb } from "../utilities/config";


// Initialize Firebase
const db = firebasedb


export default function Tracert(props) {
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