import React, { useState, useEffect } from "react";
import { Container,Row,Alert,Col,Image,Modal} from 'react-bootstrap'
import { useLocation, Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import cib from '../../images/cib.png'
import {
    Chart as ChartJS,
} from 'chart.js';
ChartJS.defaults.set('plugins.datalabels', {
    color: '#FE777B',
    font: {
        weight: 'bold',
        size: '40rem',
    }
});
export default function DB_point_detail(props) {
    // console.log("DB_point_detail:props",props)
    const [filelist, setFileList] = useState([])
    const [dataSource, setDatasource] = useState()
    const { state } = useLocation();
    const pointdata = state || {}
    //hard code for awail
    const opName = 'op_bell100'


    useEffect(() => {
        console.log(pointdata)
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

    const ChartJS = (setdata) => {
        const label = setdata.map((ar) => ar.label);
        const value = setdata.map((ar) => ar.value);
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: '10rem',
                        },
                    },
                },
                title: {
                    display: false,
                    text: "ตรวจยึดของกลาง",
                },
            },
        };
        const data = {
            labels: label,
            datasets: [
                {
                    display: false,
                    label: "จำนวน",
                    data: value,
                    backgroundColor: "#140E32",
                },
            ],
        };
        return <Bar options={options} data={data} />
    }
    const CardPoint = () => {
        return (
            <div className="card mt-4 w-50" >
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

    const RenderItems = () => {
        let items = dataSource.items
        let dataset = []
        if (Array.isArray(items)) {
            Object.entries(items).forEach(element => {
                const [index, itemObj] = element
                const item = {
                    label: itemObj.name,
                    value: itemObj.value
                }
                dataset.push(item)
            });
        }

        return ChartJS(dataset)

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
      <>
        <Container>
            <Row>
          <div style={{ backgroundColor: "#E5E5E5" }}>
            <div
              id="carouselExampleCaptions"
              className="carousel carousel-dark slide "
              style={{ backgroundColor: "#E5E5E5" }}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={cib}
                    className="d-block w-auto mx-auto"
                    style={{ height: "30vh", objectFit: "cover" }}
                    alt="..."
                  />
                </div>
                {filelist.length == 0 ? <></> : RenderImages()}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          </Row>
          <Row>
          {/* <Container fluid>
                      <Row className="justify-content-md-center">
                          <Col xs="3" sm="3" md="3" lg="auto"  style={{display: "flex",justifyContent: "center"}}> 
                              <Image src={pointdata.datasource.pic_url.replace("file/d/","uc?id=")} style={{height:"10rem"}}/>
                          </Col>
                          <Col xs="9" sm="9" md="9" lg="auto" style={{textAlign:"center",background:bg_color,fontSize:"1.5rem"}} > 
                              <div>{pointdata.datasource.name_target}</div>
                              <div>{pointdata.datasource.address}</div>
                              <div> <a href={pointdata.datasource.link_map} target="_blank">แผนที่จุดตรวจค้น</a></div>
                              <div>สถานะการตรวจค้น: {pointdata.datasource.stat}</div>
                          </Col>                    
                      </Row>
        </Container> */}


          </Row>
        </Container>

        <div className="container-fluid">
          <div style={{ backgroundColor: "#E5E5E5" }}>
            <div
              id="carouselExampleCaptions"
              className="carousel carousel-dark slide "
              style={{ backgroundColor: "#E5E5E5" }}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={cib}
                    className="d-block w-auto mx-auto"
                    style={{ height: "30vh", objectFit: "cover" }}
                    alt="..."
                  />
                </div>
                {filelist.length == 0 ? <></> : RenderImages()}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="row my-4 justify-content-center">
            {filelist.length == 0 ? <></> : <CardPoint></CardPoint>}
          </div>
          <div className="row">
            <div class="container w-50">
              {dataSource == null ? <></> : RenderItems()}
            </div>
          </div>

          <div className="text-center">
            <Link className="btn btn-dark mt-3" to="/dashboard">
              {" "}
              ย้อนกลับ{" "}
            </Link>
          </div>
        </div>
      </>
    );
}