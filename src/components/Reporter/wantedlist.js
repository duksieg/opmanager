import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'


export default function Wantedlist(props) {
    const params = useParams()
    const [wantedKey, setWantedKey] = useState(null)
    const [wantedInfo, setWantedInfo] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        Object.entries(props.wantedlist).map((entry1, index) => {
            const [key, data] = entry1
            if (key === wantedKey)
                setWantedInfo(data)
            setStatus('')
        });
    }, [wantedKey])

    const handleSubmit = () => {
        const formData = new FormData();
        let wantedObj =
        {
            wantedKey: [wantedKey],
            status: status,
            pointfound: props.pointcode
        }

        formData.append('opName', params.opname)
        formData.append('wantedobj', JSON.stringify(wantedObj))
        const requestProcess = async () => {
            let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/reporter/wanted`, {
                method: 'POST',
                body: formData
            })
            let result = await (await response).json()
            if (result) {
                // window.location.reload(true)
                console.log(result)
            }
        }
        requestProcess()
    }

    const RenderWanted = () => {
        return Object.entries(props.wantedlist).map((entry1, index) => {
            const [key, data] = entry1
            return <option value={key}>{index + 1} {data.targetName} </option>
        });
    }


    const renderStatus = () => {
        return (
            <div className="card">
                <div className="card-header">
                    {wantedInfo.targetName}
                </div>
                <div className="card-body">
                    <div className="row d-flex">
                        <div className='col'>
                            <img src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/targetImages/${params.opname}/${wantedInfo.targetPic}`} className="card-img-top" style={{ textAlign: 'center', maxHeight: '180px' }}></img>
                        </div>
                        <div className="col text-wrap">
                            <label htmlFor='statuscheck'> รายงานสถานะ </label>
                            <select className="form-select w-auto text-center" id='statuscheck' defaultValue={''} onChange={(e) => { setStatus(e.target.value) }}>
                                <option value={''} disabled>เลือกสถานะ</option>
                                <option value="จับกุม">จับกุม</option>
                                <option value="เชิญตัว">เชิญตัว</option>
                                <option value="ไล่ติดตาม">ไล่ติดตาม</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn btn-primary" onClick={handleSubmit}>
                        อัพเดทสถานะ
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <select className="form-select" defaultValue={''} onChange={(e) => { setWantedKey(e.target.value) }}>
                <option selected>รายชื่อตามหมายจับ</option>
                <RenderWanted></RenderWanted>
            </select>
            {wantedInfo == null ? '' : renderStatus()}
        </div>)
}