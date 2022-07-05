import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import { firebasedb } from '../utilities/config';
import { ref, onValue, getDatabase } from 'firebase/database';
import Itemreport from '../components/Reporter/Itemreport'
import { CircleLoader } from 'react-spinners';
const db = firebasedb

export default function Reporter() {
    const [maindata, setMaindata] = useState()
    const [loading, setLoading] = useState(true)
    const [pointData, setPointData] = useState()
    useEffect(() => {
        const starCountRef = ref(db, 'op_bell100/1vhPSwm7DBMcxEBGIpLTzDgAzUPoqlTj14Yt2hvWvU6Y/data');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setMaindata(data)
            setLoading(false)
        })
    }, [])

    const getpointlist = () => {
        let pointlist = []
        Object.entries(maindata).forEach((entry) => {
            const [point, data] = entry
            let points = <option key={point} value={point}>{point}</option>
            pointlist.push(points)
        })
        return pointlist
    }


    const setItempoint = (e) => {
        let pointInput = e.target.value
        Object.entries(maindata).forEach((entry) => {
            const [point, data] = entry
            if (point == pointInput) {
                setPointData(data)
            }
        })
    }

    return (
        loading ? <CircleLoader loading={loading} color={"#000000"}></CircleLoader> :
            <div className='container'>
                <select className="form-select" onChange={(e) => { setItempoint(e) }}>
                    {getpointlist()}
                </select>
                {pointData == null ? <></> : <Itemreport itemdata={pointData}></Itemreport>}
            </div>
    )

}
