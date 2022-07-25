
import React, { useState, useEffect } from "react";
import { Container,Row,Alert,Col,Image,Modal} from 'react-bootstrap'
import { useLocation, Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import cib from '../../images/cib.png'
// import { doc, getDoc} from "firebase/firestore"; 
import {  ref ,onValue} from "firebase/database"
import { firebasedb } from "../../utilities/config";
import {
    Chart as ChartJS,
} from 'chart.js';






export default function Midcenter_model_segment() {





    const [focus_point, setfocus_point] = useState("");
    const getfocus_point = async () => {
        const refdoc = ref(firebasedb, "tester1/focus_point_detail");
        
        await onValue(refdoc, (snapshot) => {
            console.log(snapshot.val());
            // res_point.push(snapshot.val()) ;
            setfocus_point(snapshot.val())
          })
        console.log(focus_point)
        // console.log(`"tester1/data/${res_point[0]}"`)
        if (focus_point !== "") {
            const ref_point_detail = ref(firebasedb, `/tester1/data/${focus_point}`);
            await onValue(ref_point_detail, (point_detail) => {
                console.log("point_detail:",point_detail.val());
                setDatasource(point_detail.val());
                
            }) 

        }
        
    }




    const [filelist, setFileList] = useState([])
    const [dataSource, setDatasource] = useState()
    const { state } = useLocation();
    console.log("state",state)

    const pointdata = state || {}
    //hard code for awail
    const opName = 'op_bell100'

    useEffect( () => {
                    console.log(pointdata)
                    if (pointdata.datasource == null) {
                        // console.error('not get point data');
                        getfocus_point();
                    }

                    
                    setDatasource(pointdata.datasource);
                    
                    
                    
                    const getImages = async () => {
                        let response = fetch(`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/getimages/${opName}/${focus_point}`, {
                            method: 'get',
                        })
                        setFileList(await (await response).json())
                    }
                    getImages()
                    }, 
                    [state,focus_point]
    )

    const Chart = (setdata) => {
        
        ChartJS.defaults.font.size = "15rem";
        ChartJS.defaults.set('plugins.datalabels', {
            color: '#FE777B',
            font: {
                weight: 'bold',
                size: '20rem',
            }
        });

        const label = setdata.map((ar) => ar.label);
        const value = setdata.map((ar) => ar.value);
        const options = {
            responsive: true,
            // aspectRatio: 1,
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
            // scales: {
            //     xAxes: [{
            //         barThickness: "10px",  // number (pixels) or 'flex'
            //         maxBarThickness: "15px" // number (pixels)
            //     }]}
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
        let status = dataSource.stat
        console.log(status)
        switch (status) {
            case 'end': status = 'หลังเข้าค้น'
                break;
            case 'current': status = 'ขณะเข้าค้น'
                break;
            case 'start': status = 'ปล่อยแถว'
                break;
            default:
                break;
        }
        return (
            <div className="card mt-4 w-50" >
                <div className="d-flex row">
                    <div className="col">
                        <div className="card-header">
                            <p> รายละเอียดจุดค้นที่ {dataSource.target}</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                สถานะ : {status}
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
                    value: itemObj.value,
                    
                }
                dataset.push(item)
                
            });
            // dataset.push({barThickness: 2,barPercentage:0.5,maxBarThickness: 4,minBarLength: 2,})
            return Chart(dataset)
        } else {
            return (<Row xl="5" style={{display:"flex",justifyContent:"center",marginTop:"1rem"}}>
              <Alert
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "1.2rem",
                  marginTop:"10rem"
                }}
                className="mb-2"
              >
                <div style={{ textAlign: "center",fontSize: "1.2rem",fontWeight:"bold" }}>
                  ยังไม่พบสิ่งผิดกฎหมาย{" "}
                </div>
              </Alert>

            </Row>

            );
        }



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
      <Container fluid >
        <Row style={{marginTop:"1rem"}}>
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
              {filelist.length === 0 ? <></> : RenderImages()}
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
        </Row>
        <Row    style={{marginTop:"1rem"}} >{/*className="mw-100"*/}
        <Col md={12} xl={12} xxl={12} >
        {dataSource == null ? <></> : RenderItems()}
        </Col>
        {/* <Col md={6} xl={6} xxl={6} >
     
        </Col>        */}

        </Row>
      </Container>
      //   <div className="container">
      //     <div className="row">
      //       <div style={{ backgroundColor: "#E5E5E5" }}>

      //     <div className="row my-4 justify-content-center">
      //         <div className="col-md-2 align-self-center">
      //             <img src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/targetImages/${opName}/18131231231.jpg`} class="card-img-top" style={{ textAlign: 'center', maxWidth: '200px' }}></img>
      //         </div>
      //         {filelist.length === 0 ? <></> : <CardPoint></CardPoint>}
      //     </div>
      //     <div className="row">
      //       <div class="container fluid">
      //         {dataSource == null ? <></> : RenderItems()}
      //       </div>
      //     </div>
      //     <div className="text-center">
      //       <Link className="btn btn-dark mt-3" to="/dashboard">
      //         {" "}
      //         ย้อนกลับ{" "}
      //       </Link>
      //     </div>
      //   </div>
    );
}