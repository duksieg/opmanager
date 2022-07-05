import { Container,Alert } from "react-bootstrap"
const Db_detail =(props)=>{

    if(props.bol){
    
    
    
                  return (<><Container fluid={true}  >
                                                          <Alert variant="info" >   
                                                              <div style={{textAlign:"center"}}>
                                                                <h3>รายละเอียด Operations โดยสังเขป</h3>
                                                              </div>
                                                              <div  style={{borderBottom: "4px ridge"}}>
    
                                                              </div>
                                                          </Alert> 
    
    
    </Container>
                  </>)
    
    
    
    
    }else{return(<div className="justify-content-md-center"></div>)}
    
    
    
    
    }
export default Db_detail    