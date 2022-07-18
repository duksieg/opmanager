import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Chart from "./db_chart";
import Card_item from "./db_card_item";
import Rowstat from "./db_rowstat_comp";

const Tab_search = (props) => {
  const [taptitle, setKey] = useState("Chart");

  if (props.bol) {
    return (
      <>
        <Tabs
          defaultActiveKey="Chart"
          id="uncontrolled-tab-example"
          className="justify-content-start"
          style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "-4rem" }}
          onSelect={setKey}
        >
          <Tab eventKey="Chart" title="Chart">
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#F6EFDC",
                borderRadius: "30px",
                marginTop: "1rem",
              }}
            >
              <Chart chart={props.chart} />
            </Row>

            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#140E32",
              }}
            >
              {props.card.map((elm) => {
                return (
                  <Col
                    xs="3"
                    md="2"
                    lg="2"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card_item src={elm} />
                  </Col>
                );
              })}
            </Row>
          </Tab>
          <Tab eventKey="Card" title="Card">
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#140E32",
              }}
            >
              {[...props.chart, ...props.card].map((elm) => {
                return (
                  <Col
                    xs="3"
                    md="2"
                    lg="3"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card_item src={elm} tapname={taptitle} />
                  </Col>
                );
              })}
            </Row>
          </Tab>
        </Tabs>
      </>
    );
  } else {
    return <div className="justify-content-md-center"></div>;
  }
};



const Chart_segment = (props) => {
  
  const [showchart, setshow] = useState(true);

  const head=[{
    color: { color: "white", background: "#140E32" },
    title: "สถานะการตรวจยึดของกลาง",
    value: "",
  },
  {
    color: { background: "#DFDED8" },
    title: "รายการตรวจยึดรวม",
    value: [...props.chart,...props.card].length,
  }]

  return (
    <Container fluid>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F6EFDC",
          borderRadius: "30px",
          marginTop: "1rem",
        }}
      >
        {head.map((elm) => {
              return <Rowstat {...elm} bol={setshow}/>;


        })}
        {/* <Rowstat
          {...{
            color: { color: "white", background: "#140E32" },
            title: "สถานะการตรวจยึดของกลาง",
            value: "",
          },
          {
            color: { color: "white", background: "#140E32" },
            title: "รายการตรวจยึดรวม",
            value: "",
          }
          
        }
        bol={setshow}
        /> */}
      </Row>

      <Tab_search bol={showchart} card={props.card} chart={props.chart}/>
    </Container>
  );
};

export default Chart_segment;
