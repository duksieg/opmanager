import { React, useState, useEffect } from 'react'


export default function UploadCDR(props) {
    const [excelfile, setExcelFile] = useState()

    const onUploadExcel = () => {
        const formData = new FormData();
        formData.append('filestore', excelfile)
        formData.append('opName', props.opName)
        fetch('https://gunman.csd.go.th/importexcel', {
            method: 'POST',
            body: formData
        })
    }

    return (
        <div className='card'>
            <div className='card-header'>
                CDR Section
            </div>
            <div className='card-body'>
                <form onSubmit={onUploadExcel}>
                    <div className="mb-3">
                        <label>
                            อัพโหลดไฟล์ CDR
                            <input type="file" className="form-control" onChange={(e) => setExcelFile(e.target.files[0])} />
                        </label>
                    </div>
                    <div className="col align-bottom">
                        <button className="btn-primary" type="submit">
                            ยืนยัน
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}