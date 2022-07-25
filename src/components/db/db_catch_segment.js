import { Container,Row,Col } from "react-bootstrap";
import Rowstat from "./db_rowstat_comp";
import Card_com from "./db_catch_segment_card_comp";
import Danger from "./db_catch_segment_danger";
import { useState } from "react";


const Catch_segment = (props)=>{
const [showcard,setshow] = useState(true);

console.log("catch segment",props.list)
return (
  <>
    <Container fluid>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          // backgroundColor: "#13035A",
        }}
      >
        <Col lg="10" xl="10"
          style={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "30px",
            backgroundColor: "#FAE5D3",
            // marginTop: "1rem",lg="2" xl="2"
          }}
        >
          {props.head.map((elm) => {
            return <Rowstat {...elm} bol={setshow} />;
          })}
        </Col>
        <Col  lg="2" xl="2">
          <Danger value={props.danger_value} />
        </Col>
      </Row>

      <Row
        style={{
          display: "flex",
          justifyContent: "left",
          backgroundColor: "#FAE5D3",
          borderRadius: "30px",
          marginTop: "1rem",
        }}
      >
        {showcard
          ? props.list.map((elm) => {
              console.log(elm[0]);
              return (
                <Col
                  xs="3"
                  md="2"
                  lg="2"
                  xl="2"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    borderRadius: "30px",
                    marginTop: "-0.5rem",
                  }}
                >
                  {/* onclick in Col onClick={() => setModalShow([true, elm])} */}
                  <Card_com atb={elm} />
                </Col>
              );
            })
          : null}
      </Row>
    </Container>
  </>
);




}
export default Catch_segment;