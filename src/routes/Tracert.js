import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation'
import { onValue, ref, off } from "firebase/database"
import { firebasedb } from "../utilities/config";


// Initialize Firebase
const db = firebasedb


export default function Tracert(props) {
    const [opnameList, setOpNameList] = useState([])
    const [selectedOpname, setSelected] = useState(null)
    function handleRawData(snapshort) {
        setOpNameList(snapshort)
    }

    useEffect(() => {
        const dbref = ref(db)
        onValue(dbref, (snapshot) => {
            let allop = Object.keys(snapshot.val())
            handleRawData(allop)
        })
        return () => { off(dbref) }
    },[])


    const renderop = () => {
        let setOP = []
        setOP.push(
            // <ul class="list-group">
            //                     <a className="list-group-item list-group-item-action">รายชื่อปฏิบัติการ</a>
            // </ul>
            <Link to='#' key='none' className="list-group-item disabled bg-primary text-white">
                รายชื่อปฏิบัติการ
            </Link> 
        )
        opnameList.forEach(element => {
            setOP.push(
               //  <a href={`${element}`}className="list-group-item list-group-item-action">{element}</a>
                <Link to={`${element}`} key={element} className="list-group-item list-group-item-action">
                    {element}
                </Link> )
        })
        return (setOP)
    }

    const renderSelectedOp = () => {
        let opname = selectedOpname
        return (
            <div className="container">
                <div className="row">
                <button type="button" class="btn btn-outline-secondary">Secondary</button>

                </div>
            </div>)
    }

    return (
        <div className="container-fluid vh-100 homepage text-white">
            <Navigation></Navigation>
            <div className="mt-5 text-center justify-content-center w-50 m-auto ">
                {opnameList == null ? 'loading..' : renderop()}
                {selectedOpname == null ? '' : renderSelectedOp()}
            </div>

        </div>
    )
}