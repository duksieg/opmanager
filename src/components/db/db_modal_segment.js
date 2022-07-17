import { Container, Row, Alert, Col, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  onValue,
  update,
} from "firebase/database";

import { firebasedb } from "../../utilities/config";
import { v4 as uuidv4 } from 'uuid';
// import Update_point_detail from './db-model_update_point-detail'
const Modal_c = (props) => {
  const { show, data, onHide } = props;
  let in_data = {};
  if (data === undefined) {
    console.log(true);
    in_data = {
      point: "",
      name: "",
      status: "",
      reporter: "",
      current_check_list: [],
      end_check_list: [],
      pic_url: "",
      target: "",
    };
  } else {
    in_data = data;
  }
  //
  console.log("from modal", in_data);
  let bg_color = "";
  switch (in_data.stat) {
    case "ready":
      bg_color = "#90EFF9";
      break;
    case "start":
      bg_color = "#F3FA50";
      break;
    case "current":
      bg_color = "#F1C068";
      break;
    case "end":
      bg_color = "#66F530";
      break;
    case "danger":
      bg_color = "#C80C09";
      break;
  }
  console.log("eval:", eval(in_data));
  const arr = eval(in_data.current_check_list);
  const arr_end = eval(in_data.end_check_list);
  console.log(arr);
  let cl;

  const updates = {};
  updates["/tester1/focus_point_detail"] = in_data.target;
  console.log(updates);
  update(ref(firebasedb), updates);

  return (
    <>
      <Modal
        {...props}
        animation={true}
        dialogClassName="modal-dialog-centered mw-100 w-75"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            <div>
              จุดตรวจค้นที่ {in_data.target_search} เป้า {in_data.target}{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container fluid>
            <Row className="justify-content-md-start">
              <Col lg="2" xl="2"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Left_model_segment indata={in_data} target_detail={arr} must_do={arr_end}/>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" xl="9">
                <Container fluid>
                  <Row
                    className="justify-content-md-center"
                    style={{ display: "inline-flex" }}
                  >
                    <Topcenter_model_segment indata={in_data} />
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row
              className="justify-content-md-center"
              style={{ textAlign: "center" }}
              sm="auto"
              md="auto"
              lg="auto"
            >
              {props.data == null ? (
                <></>
              ) : (
                <Link
                  to={"./pointdetail"}
                  state={{ datasource: props.data }}
                  className="btn btn-dark"
                  style={{ fontSize: "1.5rem" }}
                >
                  ภาพถ่าย/วิดีโอ/เอกสารที่เกี่ยวข้อง
                </Link>
              )}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Modal_c;

const Left_model_segment = (props) => {
  try {
    console.log("left-model-seg", props.target_detail[0].stat);
  } catch (e) {
    console.log(e);
    props.target_detail[0] = { stat: "", name: "", detail1: "", detail2: "" };
  }
  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ textAlign: "center" }}
        >
          <Container fluid style={{ backgroundColor: "#d2e7dd" }}>
            <Row
              className="justify-content-md-center"
              style={{ textAlign: "center" }}
            >
              <Alert variant="info" className="mb-2">
                <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
                  เป้าหมายตรวจค้น
                </div>
              </Alert>
            </Row>
            <Row
              className="justify-content-md-center"
              style={{ textAlign: "center" }}
            >
              <Image
                src={props.indata.pic_url.replace("file/d/", "uc?id=")}
                style={{ height: "15rem" }}
              />
            </Row>
            <Row
              className="justify-content-md-center"
              style={{ textAlign: "center" }}
            >
              <Alert
                variant={
                  props.target_detail[0].stat === "พบ"
                    ? "success"
                    : props.target_detail[0].stat === "ไม่พบ"
                    ? "danger"
                    : "dark"
                }
                className="mb-2"
                style={{ textAlign: "center", fontSize: "1.2rem" }}
              >
                <div style={{ textAlign: "center" }}>
                  {props.target_detail[0].name}
                </div>
                <div style={{ textAlign: "center" }}>
                  {props.target_detail[0].detail1}
                </div>
                <div style={{ textAlign: "center" }}>
                  {props.target_detail[0].detail2}
                </div>
                <div style={{ textAlign: "center" }}>
                  สถานะจับกุม: {props.target_detail[0].stat}
                </div>
              </Alert>
            </Row>
          </Container>
        </Row>

        <Row
          className="justify-content-md-center"
          style={{ textAlign: "center" }}
        >
          <Container fluid>
            <Row
              className="justify-content-md-center"
              style={{ textAlign: "center" }}
            >
              <Alert variant="info" className="mb-2">
                <div style={{ textAlign: "center" }}>สิ่งที่ต้องดำเนินการ</div>
              </Alert>
            </Row>
            {props.must_do.map((elm) => {
              return (
                <>
                  <Row
                    className="justify-content-md-center"
                    style={{ textAlign: "center" }}
                  >
                    <Alert
                      variant={
                        elm.value === "ดำเนินการแล้ว"
                          ? "success"
                          : elm.value === "ไม่ดำเนินการแล้ว"
                          ? "danger"
                          : "dark"
                      }
                      className="mb-2"
                    >
                      <div style={{ textAlign: "center" }}>{elm.name}</div>
                      <div style={{ textAlign: "center" }}>{elm.value}</div>
                    </Alert>
                  </Row>
                </>
              );
            })}
          </Container>
        </Row>
      </Container>
    </>
  );
};

const Center_model_segment = (props) => {};

const Topcenter_model_segment = (props) => {
  let list = [
    {
      color: { color: "white", background: "#140E32" },
      title: `จุดตรวจค้นที่ ${props.indata.target}`,
    },
    {
      color: { color: "white", background: "#140E32" },
      title: `สถานะการตรวจค้น: ${props.indata.stat}`,
    },
    {
      color: { color: "white", background: "#140E32" },
      title: `สถานที่ ${props.indata.address}`,
    },
  ];
  return (
    <>
      <Container fluid style={{ backgroundColor: "#d1f4fb" }}>
        <Row
          className="justify-content-md-center"
          style={{ textAlign: "center", display: "inline-flex" }}
        >
          {list.map((elm) => {
            return (
              <>
                <Col
                  sm="auto"
                  md="auto"
                  lg="auto"
                  style={{ textAlign: "center" }}
                >
                  <Alert
                    style={{
                      backgroundColor: elm.color.background,
                      color: elm.color.color,
                      fontSize: "1.2rem",
                    }}
                    className="mb-2"
                    
                  >
                    <div style={{ textAlign: "center" }} id={uuidv4()}>{elm.title}</div>
                  </Alert>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

{
  /* <Alert
style={{
  textAlign: "center",
  background: bg_color,
  fontSize: "1.5rem",
  padding: "1rem",
  borderRadius: "30px",
  justifyContent: "center",
  marginTop: "1rem",
}}
>
<div>จุดตรวจค้นที่ {in_data.target} สถานะการตรวจค้น: {in_data.stat} </div>

{/* <Link to={"./map"}>แผนที่จุดตรวจค้น</Link> */
}
{
  /* <div> <a href={in_data.link_map} target="_blank">แผนที่จุดตรวจค้น</a></div> 
<div>สถานที่ {in_data.address}</div>
</Alert> */
}
