import { Container,Row,Alert,Col,Badge,Image,Modal,Card,Button,ProgressBar,Form,Nav,Navbar,Offcanvas,NavDropdown,Carousel,ModalDialog } from 'react-bootstrap'

const Found_must_list =(props)=>{

    if(props.bol=="list"){
          //console.log(props.src.current_check_list)
          let arr_chklist,bg_color,licl
          try {
              arr_chklist=eval(props.src.current_check_list)  //JSON.parse(props.src.current_check_list)
          }
          catch(err) {
              console.log(err)
              arr_chklist=props.src.current_check_list
          }  
    
    
    
          switch (props.src.stat) {
                  case "ready":
                      bg_color="#A7E1FC"
                      break;
                  case "start":
                      bg_color="#F3FA50"
                      break;
                  case "current":
                      bg_color="#F9DF8E"
                      break;
                  case "end":
                      bg_color="#A8FCBC"
                      break;
                  case "danger":
                      bg_color="#C80C09"
                      break;
                  default:
                      bg_color="#F2F2F2"
          }
                  return (<>
                  <Row  style={{display: "flex",background:bg_color}} className='py-2 border border-2 border-dark rounded-2'>
                        <Col xs="3"sm="3" md="3" lg="2"  xl="2" xxl="1"  >
                            <div style={{display: "flex",justifyContent: "center"}}>
                            <Image src={props.src.pic_url.replace("file/d/","uc?id=")} style={{height:'10rem'}} />
                            </div>
                            <div style={{textAlign:"center"}}>
                              จุดตรวจค้นที่ {props.src.target_search}
                            </div>
                            <div style={{textAlign:"center"}}>
                              <Button href={props.src.link_folder} target="_blank" variant="dark" size="sm">{props.src.target}</Button>
                            </div>
                            <div style={{textAlign:"center"}}>
                              ชื่อเป้า {props.src.name_target}
                            </div> 
                            <div style={{textAlign:"center"}}>
                              สถานะตรวจค้น: {props.src.stat}
                            </div>                       
                        </Col>
                        {arr_chklist.map((lis)=>{lis.stat=="พบ"?licl="#C7F836":lis.stat=="ไม่พบ"?licl="#FC655D":licl="#D9DBDC"
                                                  return(
                                                  <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto" style={{display: "flex",justifyContent: "center"}}>
                                                      <Card style={{ width: '11rem',background:licl}} >
                                                        <Card.Img variant="top" src={lis.link_pic.replace("file/d/","uc?id=")} style={{height:"10rem"}}/>
                                                        <Card.Body>
                                                            <div style={{textAlign:"center"}}>
                                                              {lis.name}
                                                            </div>
                                                            <div style={{textAlign:"center"}}>
                                                              {lis.detail1}
                                                            </div> 
                                                            <div style={{textAlign:"center"}}>
                                                              {lis.detail2}
                                                            </div>
                                                            <div  style={{borderBottom: "4px ridge"}}></div>
                                                            <div style={{textAlign:"center"}}>
                                                              {lis.stat}
                                                            </div>
                                                        </Card.Body>
                                                      </Card>
                                                  </Col>
                                                  )
                        
                        })}
                                            
                      </Row>
    
    
    
                  </>)
    
    
    
    
    
    
    
    
    }else{return(<div className="justify-content-md-center"></div>)}
    
    
    
    
    
    
    }
    export default Found_must_list