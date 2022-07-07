import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import cib from '../../images/cib.png'
import Chart from "./db_chart";
export default function DB_point_detail(props) {

    const [filelist, setFileList] = useState([])
    const [dataSource, setDatasource] = useState()
    const { state } = useLocation();
    const pointdata = state || {}
    //hard code for awail
    const opName = 'op_bell100'


    useEffect(() => {

        if (pointdata.datasource == null) console.error('not get point data')
        else setDatasource(pointdata.datasource)
        const getImages = async () => {
            let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/getimages/${opName}/1A1`, {
                method: 'get',
            })
            setFileList(await (await response).json())
        }
        getImages()
    }, [state])


    const CardPoint = () => {
        console.log(dataSource)
        return (
            <div className="card mt-4 w-90" >
                <div className="d-flex row">
                    <div className="col-md-2 align-self-center">
                        <img src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/targetImages/${opName}/18131231231.jpg`} class="card-img-top" style={{ textAlign: 'center', maxWidth: '200px' }}></img>
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
                                    {RenderListPDF()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const RenderImages = () => {
        let images = filelist
        let renderimg = []
        images.forEach(element => {
            let ext = element.split('.').pop()
            if (ext.includes('jpg') || ext.includes('png')) {
                const imagetag =
                    <div className="carousel-item">
                        <img src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/image/${opName}/1A1/${element}`} className="d-block w-auto mx-auto " style={{ height: '30vh', objectFit: 'cover' }} alt={element} />
                    </div>
                renderimg.push(imagetag)
            }
        });
        return renderimg
    }

    const RenderItems = () =>{
        let items = dataSource.items
        let dataset = []
        if(Array.isArray(items)){
            Object.entries(items).forEach(element => {
                const[index,itemObj] = element
                const item = {
                    label:itemObj.name,
                    value:itemObj.value
                }
                dataset.push(item)
            });
        }

        return  <Chart chart={dataset} />
       
    }
    const RenderListPDF = () => {
        let files = filelist
        let renderFile = []
        const firstRow = <a className="list-group-item list-group-item-info list-group-item-action disabled">ไฟล์ประกอบประจำจุด</a>
        renderFile.push(firstRow)
        files.forEach(element => {
            let ext = element.split('.').pop()
            if (ext.includes('pdf') || ext.includes('PDF')) {
                const filetag =
                    <a href={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/image/${opName}/1A1/${element}`} class="list-group-item list-group-item-action">{element}</a>
                renderFile.push(filetag)
            }
        });
        return renderFile
    }


    return (
        <div className="container">
            <div style={{ backgroundColor: '#4A4949' }}>
                <div id="carouselExampleCaptions" className="carousel carousel-dark slide " style={{ backgroundColor: '#4A4949' }} data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={cib} className="d-block w-auto mx-auto" style={{ height: '30vh', objectFit: 'cover' }} alt="..." />
                        </div>
                        {filelist.length == 0 ? <></> : RenderImages()}
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
                {filelist.length == 0 ? <></> : <CardPoint></CardPoint>}
                {dataSource ==null ?<></>:RenderItems()}
                <Link className='btn btn-dark mt-3' to="/dashboard" > ย้อนกลับ </Link>
            </div>
        </div>)
}