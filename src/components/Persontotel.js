import { React, useEffect, useState } from "react";

export default function Matchperson(props) {
    const [tel, setTel] = useState('')
    const [name,setName] = useState('')
    const [img, setImage] = useState(null)

    const postmatch = async () => {
        let formData = new FormData();
        formData.append('opName', props.opName)
        formData.append('tel', tel)
        formData.append('name',name)
        formData.append('filestore', img)
        fetch('https://gunman.csd.go.th/matchingtel', {
            method: 'POST',
            body: formData
        })
        
    }


    return (
        <div className="card mt-3">
            <div className="card-header">
                ผูกเบอร์เป้าหมาย
            </div>
            <div className="card-body">
                <div className="row">
                    <form onSubmit={postmatch}>
                        <div className="form-group col">
                            <label htmlFor="inputTel">เบอร์โทรศัพท์</label>
                            <input type="tel" className="form-control" id="inputTel" name='tel' placeholder="เบอร์โทรศัพท์ 6685123456" onChange={(e) => setTel(e.target.value)} />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="inputName">ชื่อ-สกุล เป้าหมาย</label>
                            <input type="text" className="form-control" id="inputName" name='name' placeholder="นายกอง ปราบปราม" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="inputImage">รูปถ่าย ทร.14</label>
                            <input type="file" className="form-control" id="inputImage" name='fileimg' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="col align-bottom">
                            <button className="btn-primary" type="submit">
                                ยืนยัน
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

