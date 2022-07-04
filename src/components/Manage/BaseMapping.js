import { React, useEffect, useState } from "react";

export default function Matchperson(props) {
    const [position, setPosition] = useState(null)
    const [relation, setRelation] = useState(null)
    const [tel, setTel] = useState(null)
    const [type, setType] = useState('home')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState()
    const [selected, setSelected] = useState('home');
    const [datepicker, setDatepicker] = useState(new Date());
    const postmatch = async () => {
        let formData = new FormData();
        formData.append('opName', props.opName)
        formData.append('address', address)
        formData.append('position', position)
        formData.append('type', type)
        formData.append('tel', tel)
        formData.append('relation', relation)
        formData.append('filestore', image)
        formData.append('datepicker',datepicker)
        fetch('https://gunman.csd.go.th/manualaddbase', {
            method: 'POST',
            body: formData
        })


    }

    const handlechangeType = (e) => {
        setSelected(e.target.value)
        setType(e.target.value)
    }





    return (
        <div className="card mt-3">
            <div className="card-header">
                บันทึกพิกัด
            </div>
            <div className="card-body">
                <form onSubmit={postmatch}>
                    <div className="row d-flex">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="inputposition">พิกัด</label>
                                <input type="text" className="form-control" id="inputposition" name='position' placeholder="13.00000,100.000000" onChange={(e) => setPosition(e.target.value)} required />
                                <label htmlFor="inputTel">ความสัมพันธ์กับเบอร์โทรศัพท์</label>
                                <input type="tel" className="form-control" id="inputTel" name='tel' placeholder="66912345678" onChange={(e) => setTel(e.target.value)} required />
                                <label htmlFor="inputRel">ความสัมพันธ์</label>
                                <input type="text" className="form-control" id="inputRel" name='relation' placeholder="บ้านแม่" onChange={(e) => setRelation(e.target.value)} required />
                                <label htmlFor="inputImages">รูปถ่าย(ถ้ามี)</label>
                                <input type="file" className="form-control" id="inputImages" name='image' onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="col">
                            <div class="form-group">
                                <label for="inputAddress">รายละเอียดเพิ่มเติม</label>
                                <textarea class="form-control" id="inputAddress" name='address' rows="8" placeholder="บ้านเลขที่ 12/12 หมู่บ้าน ต.ใหม่ อ.ใหม่ กทม." onChange={(e) => setAddress(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="col">
                            <label for="birthdaytime">วันเวลาตามสถานที่</label>
                            <input type="datetime-local" id="datepicker" name="datepicker" onChange={(e)=>{e.preventDefault(); setDatepicker(e.target.value)}}/>
                            <div className="form-check col">
                                <input className="form-check-input" type="radio" name="type" id="typeHome" value="home" checked={selected === 'home'} onChange={(e) => handlechangeType(e)} />
                                <label className="form-check-label" htmlFor="typeHome">
                                    บ้าน
                                </label>

                            </div>
                            <div className="form-check col">
                                <input className="form-check-input" type="radio" name="type" id="typecamera" value="camera" onChange={(e) => handlechangeType(e)} />
                                <label className="form-check-label" htmlFor="typecamera">
                                    กล้อง
                                </label>
                            </div>
                            <div className="form-check col">
                                <input className="form-check-input" type="radio" name="type" id="typeATM" value="atm" onChange={(e) => handlechangeType(e)} />
                                <label className="form-check-label" htmlFor="typeATM">
                                    ตู้กดเงิน
                                </label>
                            </div>
                            <div className="form-check col">
                                <input className="form-check-input" type="radio" name="type" id="typeETC" value="etc" onChange={(e) => handlechangeType(e)} />
                                <label className="form-check-label" htmlFor="typeETC">
                                    อื่นๆ
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="align-bottom">
                        <button className='btn btn-primary' type='submit'>
                            ยืนยัน
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

