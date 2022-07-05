import { Container, Row, Alert, Col, Badge, Image, Modal, Card, Button, ProgressBar, Form, Nav, Navbar, Offcanvas, NavDropdown, Carousel, ModalDialog } from 'react-bootstrap'
import { useState } from 'react'
import Card_stat from './card_stat';


import Modal_c from './db_modal';
import Rowstat from './db_rowstat_comp';
import Card_item from './db_card_item';
const Db_stat_report = (props) => {
  const [modalShow, setModalShow] = useState(false);

  if (props.bol == true) {
    const sorted = ['danger', '', 'ready', 'start', 'current', 'end']
    const arr = props.src
    let new_arr = []
    const ready = []
    const start = []
    const current = []
    const end = []
    const danger = []
    const catched = []
    const sent_station = []
    for (let n = 0; n < sorted.length; n++) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].stat == sorted[n]) { new_arr.push(arr[i]) }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].stat == 'danger') { danger.push(arr[i]); }
      if (arr[i].stat == 'ready') { ready.push(arr[i]); }
      if (arr[i].stat == 'start') { start.push(arr[i]); }
      if (arr[i].stat == 'current') { current.push(arr[i]); }
      if (arr[i].stat == 'end') { end.push(arr[i]); }
      if (arr[i].stat == 'end') {
        let arr_endlist = eval(arr[i].end_check_list)
        for (let i = 0; i < arr_endlist.length; i++) {
          if (arr_endlist[i].name == "ส่งตัวให้ร้อยเวรฯ" && arr_endlist[i].value == "ดำเนินการแล้ว") {
            sent_station.push(arr_endlist[i])
          }
          if (arr_endlist[i].name == "บันทึกจับกุม" && (arr_endlist[i].value == "ดำเนินการแล้ว" || arr_endlist[i].value == "ระหว่างดำเนินการ")) {
            catched.push(arr_endlist[i])
          }
        }
      }


    }





    const main_data = new_arr
    const targets = main_data.map((r) => { return r.target })
    const target_search = main_data.map((r) => { return r.target_search })
    const arr_targets = targets.filter((e, i, a) => a.indexOf(e) === i && e != "")
    const arr_target_search = target_search.filter((e, i, a) => a.indexOf(e) === i && e != "")
    console.log(arr_targets)
    console.log(arr_target_search)
    console.log("catched_arr:", catched)
    console.log("sent_station_arr:", sent_station)


    const data0 = [{ color: { background: "#DFDED8" }, title: "จุดตรวจค้น", value: arr_target_search.length }, { color: { background: "#DFDED8" }, title: "เป้าหมาย", value: 16 }]

    const data1 = [{ color: { background: "#DFDED8" }, title: "จุดตรวจค้น", value: arr_target_search.length }, { color: { background: "#DFDED8" }, title: "เป้าหมาย", value: 16 },{ color: { color: "white", background: "#DFDED8" , marginTop: "10px" }, title: "จับกุมได้", value: catched.length }]

    //old version use เริ่มตรวจค้น const data2=[{color:{background:"#90EFF9",marginTop:"10px"},title:"ปล่อยแถว",value:ready.length},{color:{background:"#F3FA50",marginTop:"10px"},title:"เริ่มตรวจค้น",value:start.length},{color:{background:"#F1C068",marginTop:"10px"},title:"ขณะตรวจค้น",value:current.length},{color:{background:"#66F530",marginTop:"10px"},title:"หลังตรวจค้น",value:end.length}]
    const data2 = [
      { color: { background: "#90EFF9"}, title: "ปล่อยแถว", value: ready.length },
      { color: { background: "#F1C068"}, title: "ขณะตรวจค้น", value: current.length },
      { color: { background: "#66F530" }, title: "หลังตรวจค้น", value: end.length },
      { color: { color: "white", background: "#C1361E", marginTop: "10px" }, title: "ฉุกเฉิน", value: danger.length }]





    console.log("main_data:", main_data)






    return (
      <>
        <Container fluid>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#13035A",
            }}
          >
            <Col
              xs="auto"
              sm="auto"
              md="auto"
              lg="6"
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#560A04",
                borderRadius: "100px",
                padding: "3rem",
              }}
            >
              {data2.map((elm) => {
                return <Rowstat {...elm} />;
              })}
            </Col>

            <Col
              xs="auto"
              sm="auto"
              md="auto"
              lg="6"
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#0E3E23",
                borderRadius: "100px",
                padding: "3rem",
              }}
            >
              <div> </div>
              {data1.map((elm) => {
                return <Rowstat {...elm} />;
              })}
            </Col>
          </Row>
          <Row             style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#13035A",
            }}>
                          <Col
              xs="auto"
              sm="auto"
              md="auto"
              lg="6"
              style={{
                display: "flex",
                justifyContent: "center",

              }}
            >
          <Alert   style={{ fontSize:"5rem",fontWeight:"bold",backgroundColor: "#140E32",padding:"3rem",borderRadius:"50px", color: "#F6EFDC",marginTop:"3rem"}}>
                            สถานะการตรวจค้น ปัจจุบัน
                    </Alert>

            </Col>


          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#13035A",
            }}
          >
            <Container >
              {main_data.map((elm) => {
                console.log("test elm" + elm.target);

                return (
                  <Col
                    xs="3"
                    md="3"
                    lg="3"
                    xl="2"
                    xxl="2"
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
            </Container>
          </Row>
          <Modal_c
            show={modalShow[0]}
            data={modalShow[1]}
            onHide={() => setModalShow(false)}
          />
        </Container>
      </>
    );
  } else { return (<div className="justify-content-md-center"></div>) }
}
export default Db_stat_report