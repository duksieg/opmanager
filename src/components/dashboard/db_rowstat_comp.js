import {Col,Alert} from 'react-bootstrap'
const Rowstat =(elm)=>{
    //const {title,value}=elm
    return (<>
      <Col xs="3" md="auto" lg="auto"  style={{display: "flex",justifyContent: "center",background:elm.bg}}> 
          <Alert style={elm.color} >   
              <div style={{textAlign:"center"}}>
                <h5>{elm.title}</h5>
              </div>
              <div style={{textAlign:"center"}}>
                <h5>{elm.value}</h5>
              </div>
          </Alert> 
      </Col>
    </>)
  }
  export default Rowstat