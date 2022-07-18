import { Container, Row, Col,Tab,Tabs } from "react-bootstrap";
import Rowstat from "./db_rowstat_comp";
import Search_segment_card from "./db_search_segment-card";
import { useState,useEffect } from "react";

import Search_segment_map from "./db_search_segment-map";
const Search_segment = (props) => {





    const [showcard, setshowcard] = useState(false);
    const [showmap, setshowmap] = useState(false);
    console.log("state showcard:",showcard)
    console.log("state showmap:",showmap)
    useEffect(()=>{
      console.log("search-segment in use effect")
      // if(showcard){
      //   setshowmap(false)
      // }else if(showmap){
      //   setshowcard(false)
      // }
    },[showcard,showmap])

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
              return <Rowstat {...elm} bolcard={setshowcard} bolmap={setshowmap} />;
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
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "#FAF6AD",
            borderRadius: "30px",
            marginTop: "0.5rem",
          }}
        >
          <Container className=" mw-100 w-75">
          <Search_segment_map data={props.maindata} bol={showmap}/>
            </Container>

            
        </Row>
      </Container>
    </>
  );
};

export default Search_segment;
