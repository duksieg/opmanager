import React, { useState, useEffect } from 'react'
import { firebasedb } from '../utilities/config';
import { ref, onValue } from 'firebase/database';
import Itemreport from '../components/Reporter/Itemreport'
import { useParams } from 'react-router-dom'
const db = firebasedb

export default function Reporter() {
    const [maindata, setMaindata] = useState()
    const [loading, setLoading] = useState(true)
    const [pointData, setPointData] = useState(null)
    const [wantedlist,setWantedlist] = useState(null)
    const params = useParams()

    useEffect(() => {
        const dataref = ref(db, `${params.opname}/data`);
        const wantedref = ref(db,`${params.opname}/wantedlist`)
        onValue(dataref, (snapshot) => {
            const data = snapshot.val();
            setMaindata(data)
            setLoading(false)
        })
        onValue(wantedref,(snapshot)=>{
            const data = snapshot.val()
            setWantedlist(data)
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
        loading ?
            <div className="d-flex justify-content-center text-center">
                <strong>Loading...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div> :
            <div className='container'>
                <select className="form-select" onChange={(e) => { setItempoint(e) }}>
                    {getpointlist()}
                </select>
                {pointData == null || wantedlist == null  ?<></> :
                <div>
                 <Itemreport itemdata={pointData} wantedlist={wantedlist} opname={params.opname}></Itemreport>

                 </div>
                }
                
            </div>
    )

}
