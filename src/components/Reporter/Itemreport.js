import React, { useState, useEffect } from "react";
import 'bootstrap'


export default function Itemreport(props) {
    const [evidenceList, setEvidence] = useState([])
    const [itemList, setItemlist] = useState([])
    const [reqList, setreqList] = useState([])
    const [pointcode, setPointCode] = useState('')
    const [onReq ,setOnReq] = useState(false)
    const [responseSubmit, setResponseSubmit] = useState(null)
    const [cleanedList,setCleanedList] = useState(null)

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
        let initItem = []
        let initReq = []
        if (Array.isArray(items)) {
            items.forEach((element, index) => {
                let rowItem = handleRowItem(element, index)
                const reqItem = { name: element.name, value: element.value }
                initItem.push(rowItem)
                initReq.push(reqItem)
            })
            setItemlist(initItem)
            setreqList(initReq)
        } else {
            setItemlist([])
            setreqList([])
            console.log('empty items')
        }
    }, [props, evidenceList])

    const handleRowItem = (element, index) => {
        return (
            <div className="row" key={index} onChange={(e) => handleValueItem(e, index)}>
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
        )
    }

    const handleValueItem = (event, index) => {
        
        let tempArry = reqList
        let arrindex = tempArry[index]
        arrindex[event.target.name] = event.target.value
        console.log('set item'+index+" with "+event.target.name +" : "+event.target.value)
        setreqList(tempArry)
        console.log(reqList)
    }

    const handleAddItem = () => {
        let index = itemList.length
        let rowItem = handleRowItem(null, index)
        let reqItemList = reqList
        const reqItem = { name: '', value: '' }
        reqItemList.push(reqItem)
        setreqList(reqItemList)
        setItemlist(itemList => [...itemList, rowItem])
        console.log('Add 1 more line success :'+reqItemList.length)
    }

    const handleSubmit = (e) => {
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
            setResponseSubmit(await (await response).json())
        }
        requestProcess()
    }

       
        useEffect(()=>{
            let cleanedListItems = []
            reqList.forEach(element => {
                if(element.name != '' && element.value != ''){
                    let checkItemTag = <p> ได้ {element.name} จำนวน {element.value} ชิ้น </p>
                    cleanedListItems.push(checkItemTag)
                }
            })
            console.log(cleanedListItems)
            setCleanedList(cleanedListItems)
        },[reqList])

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
                            {itemList}
                            <div className="row">
                                <span className="btn btn-dark" onClick={handleAddItem}>เพิ่มรายการ</span>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="btn btn-dark w-25 text-center" type='submit' data-bs-toggle="modal" data-bs-target="#checkModal">
                            ยืนยันส่งข้อมูล
                        </div>
                    </div>
                </form>
                <div className="modal fade" id="checkModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">กรุณาตรวจสอบรายการ</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            รายการที่ไม่มีการกรอกข้อมูลใดๆ จะไม่นำมาใช้
                                <div>{cleanedList == null ? '':cleanedList}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}