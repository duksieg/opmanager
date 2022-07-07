import {Col,Alert} from 'react-bootstrap'
const Rowstat =(elm)=>{
    //const {title,value}=elm
    return (<>
    <Col xs="3" md="3" lg="3"  style={{ display: "flex", justifyContent: "center" }}>   
          <Alert  style={{ fontSize:"1.5rem",fontWeight:"bold",padding:"1rem",borderRadius:"30px",...elm.color}}  >   

                {elm.title}: {elm.value}

              {/* <div style={{textAlign:"center"}}>
                <h2></h2>
              </div> */}
          </Alert> 
          </Col>  
    </>)
  }
  export default Rowstat