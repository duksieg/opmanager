import { React, useState, useEffect } from 'react'

export default function BaseJustify(props) {
    const [rawbase, setRawBase] = useState()
    const [baseResponse, setBaseRespons] = useState()
    const objtemplate = {
        Subscriber4G5G: '',
        Source: '',
        MSISDN: '',
        position: { lat: '', lng: '' },
        IMSI: '',
        TAC: '',
        LAC: '',
        CellId: '',
        ECID: '',
        LCID: '',
        ENB: '',
        OperatorName: '',
        SubscriberStatus: '',
        CountryName: '',
        MCC: '',
        MNC: '',
        Roaming: '',
        LastCollectResult: '',
        LastCollectMilli: '',
        stampdatetime: Date.now(),
    }

    const justifyMsg = async (msg) => {
        const formData = new FormData();
        formData.append('opName', props.opName)
        formData.append('rawBase', rawbase)
        let response = fetch('http://localhost:3000/basejustify', {
            method: 'POST',
            body: formData
        })
        setBaseRespons(await (await response).json())
    }

    useEffect(() => {
        console.log(baseResponse)
        if (baseResponse != undefined) {
            document.getElementById('Subscriber4G5G').value = baseResponse != null ? baseResponse.Subscriber4G5G : ''
        }
    }, [baseResponse])

    const onSubmitReq = () => {
        const formData = new FormData();
        formData.append('opName', props.opName)
        fetch('http://localhost:3000/importexcel', {
            method: 'POST',
            body: formData
        })
    }

    return (
        <div className='card'>
            <div className='card-header'>
                โยนเบส
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="rawbase">ข้อมูลเบสต้นฉบับ</label>
                        <textarea className='form-control' id="rawbase" rows="15" onChange={(e) => { setRawBase(e.target.value) }}></textarea>
                    </div>
                    <div className='col'>
                        <form>
                            <div className='row'>
                                <div className='col'>
                                    <div className='row'>
                                            <label htmlFor='Subscriber4G5G' className='col-sm-7 col-form-label' >SubScriber4G5G</label>
                                            <input className='col form-control' id="Subscriber4G5G" name="Subscriber4G5G" type='text' />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='msisdn' className='col-sm-7 col-form-label' >เบอร์โทรศัพท์ **</label>
                                        <input className='col form-control' id="msisdn" name="MSISDN" type='tel' required />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='position' className='col-sm-7 col-form-label' >พิกัด **</label>
                                        <input className='col form-control' id="position" name="position" type='text' required/>
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='lac' className='col-sm-7 col-form-label' >LAC</label>
                                        <input className='col form-control' id="lac" name="LAC" type='text'  />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='cellid' className='col-sm-7 col-form-label' >CellID</label>
                                        <input className='col form-control' id="cellid" name="CellId" type='text'  />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='lcid' className='col-sm-7 col-form-label' >LCID</label>
                                        <input className='col form-control' id="lcid" name="LCID" type='text' />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='mcc' className='col-sm-7 col-form-label' >MCC</label>
                                        <input className='col form-control' id="mcc" name="MCC" type='text' required/>
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='mnc' className='col-sm-7 col-form-label' >MNC</label>
                                        <input className='col form-control' id="mnc" name="MNC" type='text' required/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='row'>
                                        <label htmlFor='country' className='col-sm-7 col-form-label' >ประเทศ</label>
                                        <input className='col form-control' id="country" name="CountryName" type='text' />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='ecid' className='col-sm-7 col-form-label' >ECID</label>
                                        <input className='col form-control' id="ecid" name="ECID" type='text' />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='enb' className='col-sm-7 col-form-label' >ENB</label>
                                        <input className='col form-control' id="enb" name="ENB" type='text' />
                                    </div>
                                    <div className='row'>
                                        <label htmlFor='imsi' className='col-sm-7 col-form-label' >IMSI</label>
                                        <input className='col form-control' id="imsi" name="IMSI" type='text' />
                                    </div>
                                </div>
                            </div>

                            <button className='btn btn-primary' type='submit'>
                                ยืนยัน
                            </button>
                        </form>


                    </div>
                </div>
                <div className='btn btn-primary' typeof='button' onClick={justifyMsg}>
                    ตรวจสอบ
                </div>


            </div>
        </div>
    )
}