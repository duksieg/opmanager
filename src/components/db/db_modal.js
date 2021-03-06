import { Container,Row,Alert,Col,Image,Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { getDatabase, ref, query, orderByChild, onValue,update } from "firebase/database"

import { firebasedb } from "../../utilities/config"
// import Update_point_detail from './db-model_update_point-detail'
const Modal_c =(props)=> {

    const {show,data,onHide}=props
    let in_data={}
    if(data===undefined){
    
    console.log(true)
    in_data={point:"",name:"",status:"",reporter:"",current_check_list:[],end_check_list:[],pic_url:"",target:""}
    }else{in_data=data}
    //
    console.log("from modal",in_data)
    let bg_color=""
    switch (in_data.stat) {
    case "ready":
    bg_color="#90EFF9"
    break;
    case "start":
    bg_color="#F3FA50"
    break;
    case "current":
    bg_color="#F1C068"
    break;
    case "end":
    bg_color="#66F530"
    break;
    case "danger":
    bg_color="#C80C09"
    break;
    }
    console.log("eval:",eval(in_data))
    const arr=eval(in_data.current_check_list)
    const arr_end=eval(in_data.end_check_list)
    console.log(arr)
    let cl

    const updates ={};
    updates["/tester1/focus_point_detail"]=in_data.target
    console.log(updates)
    update(ref(firebasedb), updates)


    return (<>
              <Modal 
                    {...props} 
                    animation={true} 
                    // size="xl"

                    dialogClassName="modal-dialog-centered mw-100 w-75"
                    // style={{maxWidth:"2400px"}}
                    >
                <Modal.Header  closeButton>
                  
                  <Modal.Title style={{textAlign:"center"}}>
                    <div>จุดตรวจค้นที่ {in_data.target_search} เป้า {in_data.target} </div>
                    
                  </Modal.Title>
    
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <Container fluid>
                      <Row className="justify-content-md-center">
                          <Col xs="3" sm="3" md="3" lg="auto" xl="auto" style={{display: "flex",justifyContent: "center"}}> 
                              <Image src={in_data.pic_url.replace("file/d/","uc?id=")} style={{height:"15rem"}}/>
                          </Col>
                          <Col xs="9" sm="9" md="9" lg="auto" xl="auto"> 
                          <Alert style={{textAlign:"center",background:bg_color,fontSize:"1.5rem",padding:"1rem",borderRadius:"30px",justifyContent: "center",marginTop:"1rem"}} >
                              <div>{in_data.name_target}</div>
                              <div>{in_data.address}</div>
                              <Link to={"./map"}>แผนที่จุดตรวจค้น</Link>
                              {/* <div> <a href={in_data.link_map} target="_blank">แผนที่จุดตรวจค้น</a></div> */}
                              <div>สถานะการตรวจค้น: {in_data.stat}</div>
                          </Alert>
                          </Col>      
           
                      </Row>
                      <Row className="justify-content-md-center" style={{textAlign:"center",fontSize:"1.5rem"}}>
                      <Col sm="auto" md="auto" lg="auto"  className="justify-content-md-center"> 
                      <Row className="justify-content-md-center"  >
                                                                        <Alert variant="info" className="mb-2">
                                                          <div style={{textAlign:"center"}}>
                                                            เป้าหมายตรวจค้น
                                                          </div>
    
                                                      </Alert>
                      </Row>
                      {arr.map((elm)=>{elm.stat=="พบ"?cl="success":elm.stat=="ไม่พบ"?cl="danger":cl="dark"
                                        return(<>
                                                  <Row className="justify-content-md-center" style={{textAlign:"center"}} >
    
                                                      <Alert variant={cl} className="mb-2">
                                                          <div style={{textAlign:"center"}}>
                                                            {elm.name}
                                                          </div>
                                                          <div style={{textAlign:"center"}}>
                                                            {elm.detail1}
                                                          </div>
                                                          <div style={{textAlign:"center"}}>
                                                            {elm.detail2}
                                                          </div>
                                                          <div style={{textAlign:"center"}}>
                                                            สถานะตรวจพบ: {elm.stat}
                                                          </div>
                                                      </Alert>
    
                                                  </Row>
                                                </>)
                                      }
                                )
                      }
                      </Col> 
                      <Col sm="auto" md="auto" lg="auto" className="justify-content-md-center">
                                                          <div style={{textAlign:"center"}}> </div>                                               
                      </Col>
                      <Col sm="auto" md="auto" lg="auto" className="justify-content-md-center" >
                                        <Row className="justify-content-md-center" style={{textAlign:"center"}} >
                                                                        <Alert variant="info" className="mb-2">
                                                          <div style={{textAlign:"center"}}>
                                                            สิ่งที่ต้องดำเนินการ
                                                          </div>
    
                                                      </Alert>
                      </Row>
                      {arr_end.map((elm)=>{elm.value=="ดำเนินการแล้ว"?cl="success":elm.value=="ไม่ดำเนินการแล้ว"?cl="danger":cl="dark"
                                        return(<>
                                                  <Row className="justify-content-md-center" style={{textAlign:"center"}}>
                                                      <Alert variant={cl} className="mb-2">
                                                          <div style={{textAlign:"center"}}>
                                                            {elm.name}
                                                          </div>
                                                          <div style={{textAlign:"center"}}>
                                                            {elm.value}
                                                          </div>
                                                      </Alert>
                                                      
                                                  </Row>
                                                </>)
                                      }
                                )
                      }    
                      </Col> 
                      </Row>
                  <Row className="justify-content-md-center" style={{textAlign:"center"}} sm="auto" md="auto" lg="auto">
                  {props.data == null ?<></>:<Link to={"./pointdetail"} state={{datasource:props.data}} className="btn btn-dark" style={{fontSize:"1.5rem"}}>
                  ภาพถ่าย/วิดีโอ/เอกสารที่เกี่ยวข้อง
                </Link>}
                  </Row>
                  </Container>
                </Modal.Body>
    
              </Modal>
            </>);
    }
    export default Modal_c