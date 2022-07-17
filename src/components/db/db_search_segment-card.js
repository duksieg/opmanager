import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Card_stat from "./card_stat";
import Modal_c from "./db_modal_segment";

const Search_segment_card = (props) => {
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
            {props.data.map((elm) => {
              return (
                <Col
                  xs="3"
                  md="2"
                  lg="1"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                  }}
                  onClick={() => setModalShow([true, elm])}
                >
                  <Card_stat atb={elm} />
                </Col>
              );
            })}
          </Row>
        </Container>

        <Modal_c
          show={modalShow[0]}
          data={modalShow[1]}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  } else {
    return <div className="justify-content-md-center"></div>;
  }
};
export default Search_segment_card;
