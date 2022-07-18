import { Container, Row, Col,Tab,Tabs } from "react-bootstrap";
import Rowstat from "./db_rowstat_comp";
import Search_segment_card from "./db_search_segment-card";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
const Search_segment = (props) => {
    const [showcard, setshow] = useState(false);
    console.log("state showcard:",showcard)
  return (
    <>
      <Container fluid>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#13035A",
            borderRadius: "30px",
            marginTop: "1rem",
          }}
        >
          <Col
            xs="auto"
            sm="auto"
            md="auto"
            lg="7"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#FAF6AD",
              borderRadius: "100px",
              padding: "0.2rem",
            }}
          >
            {props.head.map((elm) => {
              return <Rowstat {...elm} bol={setshow} />;
            })}
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "#FAF6AD",
            borderRadius: "30px",
            marginTop: "0.5rem",
          }}
        >
            <Search_segment_card data={props.maindata} bol={showcard}/>

        </Row>
      </Container>
    </>
  );
};

export default Search_segment;
