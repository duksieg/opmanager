import { Container,Row,Col } from "react-bootstrap";
import Rowstat from "./db_rowstat_comp";
import Card_com from "./card_comp";
import { useState } from "react";


const Catch_segment = (props)=>{
const [showcard,setshow] = useState(true);
return(<>

<Container fluid>
    <Row
                style={{
                    display: "flex",
                    justifyContent: "left",
                    // backgroundColor: "#13035A",
                  }}
    
    >
    <Col     

              style={{
                display: "flex",
                borderRadius: "30px",
                backgroundColor: "#FAE5D3",
                // marginTop: "1rem",
              }}
            >
    {props.head.map((elm) => {
              return <Rowstat {...elm} bol={setshow}/>;
            })}


</Col>
    </Row>

    <Row
    
    style={{
        display: "flex",
        justifyContent: "left",
        backgroundColor: "#FAE5D3",
        borderRadius:"30px", 
        marginTop: "1rem",

      }}
    
    >
                {showcard?props.list.map((elm) => {
                  console.log(elm)
                  return (
                    <Col xs="3" md="2" lg="2"  style={{display: "inline-flex", justifyContent: "center",borderRadius:"30px", marginTop:"-0.5rem"}}>
                      {/* onclick in Col onClick={() => setModalShow([true, elm])} */}
                      <Card_com atb={elm} />
                    </Col>
                  );
                }):null}
                </Row>






</Container>





</>)




}
export default Catch_segment;