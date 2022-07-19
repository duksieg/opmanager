import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import 'bootstrap'
import { v4 as uuidv4 } from 'uuid'


export default function Itemreport(props) {
    const [evidenceList, setEvidence] = useState([])
    const [itemList, setItemlist] = useState([])
    const [reqList, setreqList] = useState([])
    const [pointcode, setPointCode] = useState('')
    const [responseSubmit, setResponseSubmit] = useState(null)
    const [cleanedList, setCleanedList] = useState(null)
    const [modalHandle, setModal] = useState(false)

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
        let pointcode = props.itemdata.target
        setPointCode(pointcode)
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
        console.log('changing :' + uuid)
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
        formData.append('pointcode', pointcode)
        const requestProcess = async () => {
            let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/reporter/submit`, {
                method: 'POST',
                body: formData
            })
            let result = await (await response).json()
            if (result) {
                setResponseSubmit(result)
                window.location.reload(true)
            }
        }
        requestProcess()
    }


    useEffect(() => {
        console.log(reqList)
        let cleanedListItems = []
        reqList.forEach(element => {
            if (element.name != '' && element.value != '') {
                let checkItemTag = <p> ได้ {element.name} จำนวน {element.value} ชิ้น </p>
                cleanedListItems.push(checkItemTag)
            }
        })
        setCleanedList(cleanedListItems)

    }, [reqList])

    const RenderReport = () => {
        let responseResult = responseSubmit
        let itemResult = []
        responseResult.forEach(element => {
            let ptag = <p>รายการ {element.name} จำนวน  {element.value}</p>
            itemResult.push(ptag)
        });
        return itemResult == [] ? <></> : itemResult
    }
    return (
        <>
            <div className="container">
                <form>
                    <div className="text-center">
                        <div className="row">
                            จุดเข้าค้น {props.point}
                        </div>
                        <div className="row" >
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
                        </div>
                        <div className="container">
                            {itemList == null ? '' : itemList}
                            <div className="row">
                                <span className="btn btn-dark" onClick={handleAddItem}>เพิ่มรายการ</span>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="btn btn-dark w-25 text-center" onClick={() => setModal(true)}>
                            ยืนยันส่งข้อมูล
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