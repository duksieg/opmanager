import React, { useState, useEffect } from "react";

export default function AddWanted(props) {
    const [targetName, setTargetName] = useState('')
    const [targetID, setTargetID] = useState('')
    const [targetImage, setTargetImage] = useState('')
    const [allegation,setAllegation] = useState('')


    const submitForm = () => {
        const formData = new FormData();
        formData.append('opName', props.opName)
        formData.append('targetName', targetName)
        formData.append('targetID',targetID)
        formData.append('targetImage',targetImage)
        formData.append('allegation',allegation)
        let response = fetch('http://localhost:3000/manage/addwantedlist', {
            method: 'POST',
            body: formData
        })
    }
    return (
        <form>

            <label htmlFor="targetName">ชื่อ นามสกุล</label>
            <input type='text' className='form-control' id="targetName" name="targetName" onChange={(event) => setTargetName(event.target.value)} required></input>
            <label htmlFor="targetID">เลขบัตรประชาชน</label>
            <input type='text' className='form-control' id="targetID" name="targetID" onChange={(event) => setTargetID(event.target.value)} required></input>
            <label htmlFor="allegation">ข้อหา</label>
            <input type='text' className="form-control" id="allegation" name="allegation" onChange={(event) => setAllegation(event.target.value) } ></input>
          
            <label htmlFor="targetImage">รูปภาพ ทร.14</label>
            <input type='file' className="form-control-file" id="targetImage" name="targetImage" onChange={(event) => setTargetImage(event.target.files[0]) } required></input>
            
            <button type="submit" className="btn btn-dark" onClick={submitForm}>เพิ่มข้อมูลหมายจับ</button>
        </form>
    )

}