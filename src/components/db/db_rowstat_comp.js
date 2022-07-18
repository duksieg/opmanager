import {Col,Alert} from 'react-bootstrap'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const Rowstat =(elm)=>{
    //const {title,value}=elm

    // console.log("test elm",elm)
    // console.log("search elm",elm.title.search("ของกลาง"))
    const [show, setshow] = useState(false);
    const [showmap, setshowmap] = useState(false);
    const [showchart, setshowchart] = useState(true);
    const [showcatch, setshowcatch] = useState(true);
    const sent_to_search_segment =(e)=>{
      console.log("sent_to_search_segment",elm.id)
      if(elm.id=="first"){
        console.log("sent_to_search_segment-card",show)
        show?setshow(false):setshow(true)
        elm.bolcard(show)

      }

      if(elm.id=="second"){
        console.log("sent_to_search_segment-map",showmap)
        showmap?setshowmap(false):setshowmap(true)
        elm.bolmap(showmap)

      }

      if(elm.title.search("ตรวจยึดของกลาง")!==-1){
        console.log("sent_to_chart_segment",show)
        showchart?setshowchart(false):setshowchart(true)
        elm.bol(showchart)

      }

      if(elm.title.search("สถานะการจับกุม")!==-1){
        console.log("sent_to_catch_segment",show)
        showcatch?setshowcatch(false):setshowcatch(true)
        elm.bol(showcatch)

      }     

    }




    return (<>
    <Col xs="3" md="3" lg={elm.title.search("ของกลาง")!==-1 || elm.title.search("รายการตรวจยึด")!==-1?"4":"2"}  style={{ display: "flex", justifyContent: "center" }}>   
          <Alert  className="link" style={{ fontSize:"1.5rem",fontWeight:"bold",padding:"1rem",borderRadius:"30px",...elm.color,marginTop:"0.5rem"}} onClick={sent_to_search_segment} >   

                <div >{elm.title} {elm.value}</div>

              {/* <div style={{textAlign:"center"}}>
                <h2></h2>
              </div> */}
          </Alert> 
          </Col>  
    </>)
  }
  export default Rowstat