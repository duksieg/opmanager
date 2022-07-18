import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import DB_Gmap from "./db_Gmap";

const Search_segment_map = (props) => {
  const [modalShow, setModalShow] = useState(false);
  if (props.bol) {
    return (
      <>
        <Container fluid>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#FAF6AD",
              borderRadius: "30px",
              marginTop: "1rem",
            }}
          >
            <DB_Gmap/>
          </Row>
        </Container>


      </>
    );
  } else {
    return <div className="justify-content-md-center"></div>;
  }
};
export default Search_segment_map;
