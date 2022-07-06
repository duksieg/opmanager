import React, { useState, useEffect } from "react";
import 'bootstrap'
import { CircleLoader } from 'react-spinners';


export default function Itemreport(props) {
    const [evidenceList, setEvidence] = useState([])
    const [itemList, setItemlist] = useState([])
    const [reqList, setreqList] = useState([])
    //initial evidence
    useEffect(() => {
        const getEvidenceData = async () => {
            let response = fetch('http://localhost:3000/reporter/evidence', {
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
        let initItem = []
        if (Array.isArray(items)) {
            items.forEach((element, index) => {
                index = index + 1
                let rowItem = handleRowItem(element,index)
                initItem.push(rowItem)
            })
            setItemlist(initItem)
        } else {
            console.log('empty items')
        }
    }, [props.itemdata,evidenceList])

    const handleRowItem =(element,index)=>{
        return(
        <div className="row mt-4" key={index} >
        <div className="col text-center">
            <input type='text' className="" value={index} disabled />
        </div>
        <div className="col">
            <input className="form-control" list={'datalistOptions' + index} name="itemname" defaultValue={element.name == null ?'':element.name} placeholder="Type to search..." onChange={(e) => handleValueItem(e, index)} />
            <datalist id={'datalistOptions' + index}>
                {evidenceList.length == 0 ? '' : evidenceList}
            </datalist>
        </div>
        <div className="col">
            <input type='number' className="form-control" name="itemvalue" defaultValue={element.value ==null ? '':element.value} onChange={(e) => handleValueItem(e, index)}></input>
        </div>
    </div>)
    }

    const handleValueItem = (event,showindex) => {
    }

    const handleAddItem = () => {
        let index = itemList.length + 1
        let rowItem = handleRowItem(null,index) 
        setItemlist(itemList => [...itemList, rowItem])
    }

    const submitForm = () => {

    }
    return (
        <div className="container">
            <form>
                <div className="justify-content-center text-center">
                    <div className="row">
                        จุดเข้าค้น {props.point}
                    </div>
                    <div className="row">
                        <div className="col">
                            ลำดับ
                        </div>
                        <div className="col">
                            รายการ
                        </div>
                        <div className="col">
                            จำนวน
                        </div>
                    </div>
                    <div>
                        {itemList}
                        <div className="row">
                            <span className="btn btn-dark" onClick={handleAddItem}>เพิ่มรายการ</span>
                        </div>
                    </div>
                </div>
                <div className="btn btn-dark" type='submit' onClick={submitForm()}>
                    ยืนยันส่งข้อมูล
                </div>
            </form>
        </div>
    )

}