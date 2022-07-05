import {Col,Alert} from 'react-bootstrap'
const Rowstat =(elm)=>{
    //const {title,value}=elm
    return (<>
    <Col xs="3" md="3" lg="3"  style={{ display: "flex", justifyContent: "center" }}>   
          <Alert className="p-3 text-center" style={{ fontSize:"3rem",fontWeight:"bold",backgroundColor: elm.color.background,padding:"3rem",borderRadius:"50px"}} >   

                {elm.title}: {elm.value}

              {/* <div style={{textAlign:"center"}}>
                <h2></h2>
              </div> */}
          </Alert> 
          </Col>  
    </>)
  }
  export default Rowstat