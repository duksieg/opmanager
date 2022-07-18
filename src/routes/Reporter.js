import React, { useState, useEffect } from 'react'
import { firebasedb } from '../utilities/config';
import { ref, onValue } from 'firebase/database';
import Itemreport from '../components/Reporter/Itemreport'
import { CircleLoader } from 'react-spinners';
import { useParams } from 'react-router-dom'
const db = firebasedb

export default function Reporter() {
    const [maindata, setMaindata] = useState()
    const [loading, setLoading] = useState(true)
    const [pointData, setPointData] = useState()
    const params = useParams()
    useEffect(() => {
        const starCountRef = ref(db, `${params.opname}/1vhPSwm7DBMcxEBGIpLTzDgAzUPoqlTj14Yt2hvWvU6Y/data`);
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
        loading ? <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div> :
            <div className='container'>
                <div>

                </div>
                <select className="form-select" onChange={(e) => { setItempoint(e) }}>
                    {getpointlist()}
                </select>
                {pointData == null ? <></> : <Itemreport itemdata={pointData} opname={params.opname}></Itemreport>}
            </div>
    )

}
