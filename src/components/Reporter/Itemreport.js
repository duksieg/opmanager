import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import 'bootstrap'
import { v4 as uuidv4 } from 'uuid'
import sosimg from '../../images/sos.png'
import RenderWantedStatus from '../../components/Reporter/wantedlist'

export default function Itemreport(props) {
    const [evidenceList, setEvidence] = useState([])
    const [itemList, setItemlist] = useState([])
    const [reqList, setreqList] = useState([])
    const [status, setStatus] = useState('')
    const [cleanedList, setCleanedList] = useState(null)
    const [modalHandle, setModal] = useState(false)
    const [sos, setSOS] = useState(false)
    const [wantedKey, setWantedKey] = useState(null)

    //initial evidence
    useEffect(() => {
        const getEvidenceData = async () => {
            let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/reporter/evidence`, {
                method: 'GET'
            })
            let evidenceSet = []
            let rawEvidence = (await (await response).json())
            Object.entries(rawEvidence).forEach((entry_1) => {
                const [type, itemset] = entry_1
                Object.entries(itemset).forEach((entry_2) => {
                    const [keyitem, textValue] = entry_2
                    let setOption = <option key={keyitem} value={textValue} />
                    evidenceSet.push(setOption)
                });
            })
            setEvidence(evidenceSet)
        }
        getEvidenceData()
    }, [])

    //intial itemrows
    useEffect(() => {
        let items = props.itemdata.items
        let initReq = []
        if (Array.isArray(items)) {
            items.forEach((element) => {
                const reqItem = { uuid: uuidv4(), name: element.name, value: element.value }
                initReq.push(reqItem)
            })
            setreqList(initReq)
        } else {
            setreqList([])
            console.log('empty items')
        }
    }, [props, evidenceList])

    useEffect(() => {
        let relist = []
        if (reqList !== [] > 0) {
            reqList.forEach((element, index) => {
                let itemtag = <div className="row" key={element.uuid} onChange={(e) => handleValueItem(e, element.uuid)}>
                    <div className="d-inline-flex justify-content-between my-1">
                        <div className="col">
                            <input type='text' className="form-control text-center" value={index + 1} disabled />
                        </div>
                        <div className="col-sm-8">
                            <input className="form-control text-center" list={'datalistOptions'} name="name" defaultValue={element == null ? '' : element.name} placeholder="Type to search..." />
                            <datalist id={'datalistOptions'}>
                                {evidenceList.length == 0 ? '' : evidenceList}
                            </datalist>
                            <input type={'hidden'} name="name" id="hidden"></input>
                        </div>
                        <div className="col">
                            <input type='number' className="form-control text-end" name="value" defaultValue={element == null ? '' : element.value} ></input>
                        </div>
                    </div>
                </div>
                relist.push(itemtag)
            })
        }
        setItemlist(relist)
    }, [reqList])

    const handleAddItem = () => {
        const reqItem = { uuid: uuidv4(), name: '', value: '' }
        setreqList(reqList => [...reqList, reqItem])
        console.log('Add 1 more line success Req size = ' + reqList.length)
    }


    const handleValueItem = (event, uuid) => {
        setreqList(current =>
            current.map(obj => {
                if (obj.uuid === uuid) {
                    return { ...obj, [event.target.name]: event.target.value };
                }
                return obj;
            }),
        );
    };

    const handleSubmit = (e) => {
        setModal(false)
        console.log('submiting')
        console.log(reqList)
        e.preventDefault()
        const formData = new FormData();
        formData.append('reportList', JSON.stringify(reqList))
        formData.append('opName', props.opname)
        formData.append('pointcode', props.itemdata.target)
        const requestProcess = async () => {
            let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/reporter/evidence`, {
                method: 'POST',
                body: formData
            })
            let result = await (await response).json()
            if (result) {
                window.location.reload(true)
            }
        }
        requestProcess()
    }


    useEffect(() => {
        let cleanedListItems = []
        reqList.forEach(element => {
            if (element.name != '' && element.value != '') {
                let checkItemTag = <p> ได้ {element.name} จำนวน {element.value} ชิ้น </p>
                cleanedListItems.push(checkItemTag)
            }
        })
        setCleanedList(cleanedListItems)
    }, [reqList])

    useEffect(() => {
        if (sos) {
            const formData = new FormData();
            formData.append('opName', props.opname)
            formData.append('pointcode', props.itemdata.target)
            const requestProcess = async () => {
                let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/reporter/emergency`, {
                    method: 'POST',
                    body: formData
                })
                let result = await response
                console.log(result.status)
                if (result.status == 200) {
                    setSOS(true)

                }
            }
            requestProcess()
        }
        return window
    }, [sos])

    return (
        <>
            <div className="container">
                <form>
                    {sos ? <Alert variant={"danger"} ket={'danger'} onClose={() => setSOS(false)} dismissible >ท่านได้ร้องขอความช่วยเหลือไปยังศูนย์แล้ว</Alert> : ""}
                    <div className="card mt-2">
                        <div className="card-header justify-content-center d-flex">
                            <div className="bg-light">
                                จุดเข้าค้น {props.itemdata.target}
                                <img className="btn" src={sosimg} onClick={() => setSOS(true)} ></img>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <div className="d-flex justify-content-center">
                                <label className="col-form-label mx-2" htmlFor='statuscheck'> สถานะเข้าค้น </label>
                                <select className="form-select w-auto text-center" id='statuscheck' onChange={(e) => { setStatus(e.target.value) }}>
                                    <option selected>เลือกสถานะ</option>
                                    <option value="ปล่อยแถว">ปล่อยแถว</option>
                                    <option value="ขณะเข้าค้น">ขณะเข้าค้น</option>
                                    <option value="ทำบันทึก">ทำบันทึก</option>
                                </select>
                            </div>

                            <div className="row mt-3" >
                                <div className="card">
                                    <div className="card-header">สิ่งของตรวจยึด</div>
                                    <div className="d-inline-flex justify-content-between my-1">
                                        <div className="col">
                                            ลำดับ
                                        </div>
                                        <div className="col col-sm-auto col-md-8">
                                            รายการ
                                        </div>
                                        <div className="col">
                                            จำนวน
                                        </div>
                                    </div>
                                    {itemList == null ? '' : itemList}
                                    <div className="btn btn-dark" onClick={handleAddItem}>
                                        เพิ่มรายการ
                                    </div>
                                    <div className="btn btn-primary w-auto text-center text-wrap mt-2" onClick={() => setModal(true)}>
                                        ส่งข้อมูลตรวจยึด
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="card">
                                    <div className="card-header">
                                        ผู้ต้องหาตามหมายจับ
                                    </div>
                                    <RenderWantedStatus wantedlist={props.wantedlist} pointcode={props.itemdata.target}></RenderWantedStatus>

                                </div>
                            </div>
                        </div>
                    </div>

                </form>
                <Modal show={modalHandle} onHide={() => setModal(false)} >
                    <Modal.Header>
                        <h5 className="modal-title" id="exampleModalLabel">กรุณาตรวจสอบรายการ</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </Modal.Header>
                    <Modal.Body>
                        รายการที่ไม่มีการกรอกข้อมูลไม่ครบ จะไม่นำมาใช้
                        <hr />
                        <div>จุดค้นที่ {props.itemdata.target} สถานะ : {status}</div>
                        <div>{cleanedList == null ? '' : cleanedList}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => setModal(false)}>ปิด</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>ยืนยัน</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )

}