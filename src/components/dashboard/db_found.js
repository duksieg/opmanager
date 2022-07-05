import { Container,Row,Alert,Col,Badge,Image,Modal,Card,Button,ProgressBar,Form,Nav,Navbar,Offcanvas,NavDropdown,Carousel,ModalDialog } from 'react-bootstrap'
import { useState, useEffect } from "react";
import Found_add_all from './db_found_add_all'
import Found_add_list from './db_found_add_list'
import Found_must_all from './db_found_must_all'
import Found_must_list from './db_found_must_list'


const Db_found = (props) => {
  const [mustfoundShow, setmustfoundcomp] = useState([false, "primary"]);
    const [additionfoundShow, setadditionfoundcomp] = useState([false, "primary"]);
  if (props.bol) {

    

    return (<>
      <Container fluid>
        <NavDropdown title={props.title} id="nav-dropdown" onClick={e => console.log(e.target.value)}>
          <NavDropdown.Item eventKey="4.1" value="row">รายเป้าหมาย</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" value="all">ภาพรวม</NavDropdown.Item>

        </NavDropdown>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs="6" sm="4" md="4" lg="4" xl="auto" xl="auto" style={{ display: "flex", justifyContent: "center" }}>

            <Nav
              variant="pills"
              activeKey="1"
              onSelect={(e) => {
                console.log(e)
                if (e == "split") {
                  setmustfoundcomp([e, "success"]);
                  setadditionfoundcomp([false, "primary"]);


                } else if (e == "all") {
                  console.log("in all")
                  setmustfoundcomp([e, "primary"]);
                  setadditionfoundcomp([false, "primary"]);
                }
              }
              }
            >
              <NavDropdown active={true} title="ที่ต้องตรวจค้นพบ" id="nav-dropdown" >
                <NavDropdown.Item eventKey="split" >รายเป้าหมาย</NavDropdown.Item>
                <NavDropdown.Item eventKey="all" >ภาพรวม</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Col>
          <Col xs="6" sm="4" md="4" lg="4" xl="auto" xl="auto" style={{ display: "flex", justifyContent: "center" }}>

            <Nav
              variant="pills"
              activeKey="1"
              onSelect={(e) => {
                console.log(e)
                if (e == "list") {
                  setmustfoundcomp([false, "primary"]);
                  setadditionfoundcomp([e, "success"]);


                } else if (e == "all") {
                  console.log("in all")
                  setmustfoundcomp([false, "primary"]);
                  setadditionfoundcomp([e, "success"]);
                }
              }
              }
            >
              <NavDropdown active={true} title="ตรวจค้นพบเพิ่มเติม" id="nav-dropdown" >
                <NavDropdown.Item eventKey="list" >รายเป้าหมาย</NavDropdown.Item>
                <NavDropdown.Item eventKey="all" >ภาพรวม</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Col>

        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {props.src.map((elm) => { return <Found_must_list src={elm} bol={mustfoundShow[0]} /> })}
        </Row>

        <Found_must_all data={props.src} bol={mustfoundShow[0]} />
        <Found_add_all data={props.src} bol={additionfoundShow[0]} />
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {props.src.map((elm) => { return <Found_add_list src={elm} bol={additionfoundShow[0]} /> })}
        </Row>
      </Container>


    </>)

  } else { return (<div className="justify-content-md-center"></div>) }




}
export default Db_found