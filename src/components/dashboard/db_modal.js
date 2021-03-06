import { Container,Row,Alert,Col,Badge,Image,Modal,Card,Button,ProgressBar,Form,Nav,Navbar,Offcanvas,NavDropdown,Carousel,ModalDialog } from 'react-bootstrap'

const Modal_c =(props)=> {

    const {show,data,onHide}=props
    let in_data={}
    if(data===undefined){
    
    console.log(true)
    in_data={point:"",name:"",status:"",reporter:"",current_check_list:[],end_check_list:[],pic_url:""}
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
    return (<>
              <Modal 
                    {...props} 
                    animation={true} 
                    size="lg"
                    fullscreen="xxl"
                   
    
                    >
                <Modal.Header  closeButton>
                  
                  <Modal.Title style={{textAlign:"center"}}>
                    <div>จุดตรวจค้นที่ {in_data.target_search} เป้า {in_data.target} </div>
                    
                  </Modal.Title>
    
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <Container fluid>
                      <Row className="justify-content-md-center">
                          <Col xs="3" sm="3" md="3" lg="auto"  style={{display: "flex",justifyContent: "center"}}> 
                              <Image src={in_data.pic_url.replace("file/d/","uc?id=")} style={{height:"100px"}}/>
                          </Col>
                          <Col xs="9" sm="9" md="9" lg="auto" style={{textAlign:"center",background:bg_color}} > 
                              <div>{in_data.name_target}</div>
                              <div>{in_data.address}</div>
                              <div> <a href={in_data.link_map} target="_blank">แผนที่จุดตรวจค้น</a></div>
                              <div>สถานะการตรวจค้น: {in_data.stat}</div>
                          </Col>                    
                      </Row>
                      <Row className="justify-content-md-center">
                      <Col sm="auto" md="auto" lg="auto"  className="justify-content-md-center"> 
                      <Row className="justify-content-md-center" style={{textAlign:"center"}} >
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
                  <Button variant="primary" href={in_data.link_folder} target="_blank">ภาพถ่าย/วิดีโอ/เอกสารที่เกี่ยวข้อง</Button>{' '}
                  </Row>
                  </Container>
                </Modal.Body>
    
              </Modal>
            </>);
    }
    export default Modal_c