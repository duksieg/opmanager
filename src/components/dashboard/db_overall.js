import { Container, Row, Alert, Col, Badge, Image, Modal, Card, Button, ProgressBar, Form, Nav, Navbar, Offcanvas, NavDropdown, Carousel, ModalDialog } from 'react-bootstrap'
import { useState } from 'react'
import Pg_bar from './db_bar';
import Card_com from './card_comp';
import Modal_c from './db_modal';
import Rowstat from './db_rowstat_comp';
const Db_overall = (props) => {
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

    const data1 = [{ color: { color: "white", background: "#3048F5", marginTop: "10px" }, title: "จับกุมได้", value: catched.length }, { color: { color: "white", background: "#C80C09", marginTop: "10px" }, title: "ฉุกเฉิน", value: danger.length }]

    //old version use เริ่มตรวจค้น const data2=[{color:{background:"#90EFF9",marginTop:"10px"},title:"ปล่อยแถว",value:ready.length},{color:{background:"#F3FA50",marginTop:"10px"},title:"เริ่มตรวจค้น",value:start.length},{color:{background:"#F1C068",marginTop:"10px"},title:"ขณะตรวจค้น",value:current.length},{color:{background:"#66F530",marginTop:"10px"},title:"หลังตรวจค้น",value:end.length}]
    const data2 = [
      { color: { background: "#90EFF9", marginTop: "10px" }, title: "ระหว่างดำเนินการ", value: ready.length },
      { color: { background: "#F1C068", marginTop: "10px" }, title: "ขณะตรวจค้น", value: current.length },
      { color: { background: "#66F530", marginTop: "10px" }, title: "หลังตรวจค้น", value: end.length }]





    console.log("main_data:", main_data)

    return (<>

      <Container fluid >
        <Row className="justify-content-md-center" style={{ backgroundColor: '#112B3C' }}>

          {data0.map((elm) => {
            return <Col
              xs="3" sm="auto" md="auto" lg="auto"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Alert style={elm.color} >
                <div style={{ textAlign: "center" }}>
                  <h5>{elm.title}</h5>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h5>{elm.value}</h5>
                </div>
              </Alert>

            </Col>
          })}

          {/* <Col xs="6" sm="6" md="6" lg="6">
                  <Pg_bar obj={props.src} all_score={props.all_score}/>
              </Col> */}



        </Row>
        <Row className='py-3 justify-content-center d-flex-inline' style={{ backgroundColor: '#F8E97B' }}>
            {data2.map((elm) => { return <Rowstat {...elm} bg={"#F8E97B"} /> })}
            <div className='col-2'></div>
            {data1.map((elm) => { return <Rowstat {...elm} bg={"#F8E97B"} /> })}
        </Row>


        <Row className="justify-content-md-center pt-4" style={{ backgroundColor: '#EFEFEF' }}>
          {main_data.map((elm) => {
            console.log("test elm"+elm.target)
            if(elm.target!="3A1-2" && elm.target!="3A1-4" && elm.target!="3A1-5" && elm.target !="2A6-2" && elm.target !="1A16-2" && elm.target !="2A17-2" )
            return (
              <Col xs="4" sm="3" md="auto" lg="auto"
                onClick={() => setModalShow([true, elm])}
                style={{ display: "flex", justifyContent: "center" }}>
                <Card_com atb={elm} />
              </Col>
            )
          })}
        </Row>

        <Modal_c
          show={modalShow[0]}
          data={modalShow[1]}
          onHide={() => setModalShow(false)} />
      </Container>

    </>)
  } else { return (<div className="justify-content-md-center"></div>) }
}
export default Db_overall