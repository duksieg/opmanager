import {Col,Alert} from 'react-bootstrap'
import { useState } from 'react'
const Rowstat =(elm)=>{
    //const {title,value}=elm

    // console.log("test elm",elm)
    // console.log("search elm",elm.title.search("ของกลาง"))
    const [show, setshow] = useState(false);
    const sent_to_search_segment =(e)=>{
      if(elm.title.search("สถานะจุดตรวจค้น")!==-1){
        console.log("sent_to_search_segment",show)
        show?setshow(false):setshow(true)
        elm.bol(show)

      }


    }




    return (<>
    <Col xs="3" md="3" lg={elm.title.search("ของกลาง")!==-1?"5":"2"}  style={{ display: "flex", justifyContent: "center" }}>   
          <Alert  className="link" style={{ fontSize:"1.5rem",fontWeight:"bold",padding:"1rem",borderRadius:"30px",...elm.color,marginTop:"0.5rem"}} onClick={sent_to_search_segment} >   

                {elm.title} {elm.value}

              {/* <div style={{textAlign:"center"}}>
                <h2></h2>
              </div> */}
          </Alert> 
          </Col>  
    </>)
  }
  export default Rowstat