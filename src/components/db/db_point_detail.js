import React, { useState, useEffect } from "react";
import cib from '../../images/cib.png'
export default function DB_point_detail(props) {

    const [imagelist, setImageList] = useState([])
    const [renderImages, setRenderImages] = useState([])

    useEffect(() => {
        const getImages = async () => {
            let response = fetch('http://localhost:3000/operation/getimages/tester1/1A1', {
                method: 'get',
            })
            setImageList(await (await response).json())
        }
        getImages()
    }, [])

    const CardPoint = () => {
        return (
            <div className="card mt-4">
                <div className="d-flex row">
                    <div className="col-2">
                        <img src="http://localhost:3000/operation/tester1/targetImages/18131231231.jpg" style={{ textAlign: 'center', maxWidth: '200px' }}></img>
                    </div>
                    <div className="col">
                        <div className="card-header">
                            <p> รายละเอียดจุดค้นที่ 1A1</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                สถานะ : รายงาน
                            </div>
                            <div className="row">
                                หัวหน้าชุด :
                            </div>
                            <div className="row">
                                สิ่งของที่ตรวจยึดได้ ปืนจดทะเบียน 10 ปืนไม่จดทะเบียน 20 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const RenderImages = () => {
        let images = imagelist
        let renderimg = []
        images.forEach(element => {
            const imagetag =
            <div className="carousel-item">
                     <img src={`http://localhost:3000/operation/image/tester1/1A1/${element}`} className="d-block w-auto mx-auto " style={{height:'30vh',objectFit:'cover'}} alt={element} />
                    </div>
            renderimg.push(imagetag)
        });
        return renderimg
    }
    

    return (
        <div className="container">
            <div id="carouselExampleCaptions" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={cib} className="d-block w-auto mx-auto" style={{height:'30vh',objectFit:'cover'}} alt="..." />
                    </div>
                    {imagelist.length == 0 ? <></>:RenderImages()}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {imagelist.length == 0 ? <></> : <CardPoint></CardPoint>}
        </div>)
}