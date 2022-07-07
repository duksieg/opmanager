import { useState, useEffect } from "react"
import 'bootstrap'
import { Container, Row, Alert, Col, Badge, Image, Modal, Card, Button, ProgressBar, Form, Nav, Navbar, Offcanvas, NavDropdown, Carousel, ModalDialog } from 'react-bootstrap'
import Db_overall from './db_overall'
import Db_detail from './db_detail'
import Db_found from './db_found'
import Db_stat_report from './db_stat_report'
import Found_must_all from "./db_found_must_all"
import Found_add_all from "./db_found_add_all"
import Found_must_list from "./db_found_must_list"
import Found_add_list from "./db_found_add_list"
import csdlogo from '../../images/csd.png'
import Timeticking from "./timeticking"
import {Link} from 'react-router-dom'
const Board = (props) => {
    //<!-- console.log(props.date_time) -->
    const [dbShow, setdbcomp] = useState([false, "primary"]);
    const [foundShow, setfoundcomp] = useState([false, "primary"]);
    const [forceShow, setforcecomp] = useState([false, "primary"]);
    const [detailShow, setdetailcomp] = useState([false, "primary"]);
    const [mustfoundShow, setmustfoundcomp] = useState([false, "primary"]);
    const [additionfoundShow, setadditionfoundcomp] = useState([false, "primary"]);
    const [datetime, setDatetime] = useState(new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "medium" }))

    return (<>
        <Navbar variant="dark" bg="dark" expand={false} sticky='top' collapseOnSelect={true}>
            <Container>
                <Col xs="2" sm="1" md="1" lg="1">
                    <Navbar.Brand >
                        <Image
                            // src="https://drive.google.com/uc?id=1iJlhuQ9YF9eqRT3PucL-GIVVDhMCd_PG"
                            src={csdlogo}
                            width="50"
                            className="responsive-img circle z-depth-10 "
                            alt="logo"
                        />
                    </Navbar.Brand>
                </Col>
                <Col >
                    <div style={{ textAlign: "left", padding: "0.5rem", color: "#EFD530" }}
                        onClick={() => window.scrollTo(0, 0)}>
                        <h5 >CSD3 Operations_เบล1000กระบอก</h5>
                    </div>
                </Col>
                <Navbar.Toggle aria-controls="offcanvasNavbar" style={{ marginBottom: "1.5rem" }} />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">ตัวเลือก</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-6"
                            onSelect={(e) => {
                                console.log(e)
                                switch (e) {
                                    case "detail":
                                        setdetailcomp([true, "success"]);
                                        setdbcomp([false, "primary"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([false, "primary"]);
                                        setmustfoundcomp([false, "primary"]);
                                        setadditionfoundcomp([false, "primary"]);
                                        break;
                                    case "overall":
                                        setdetailcomp([false, "primary"]);
                                        setdbcomp([true, "success"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([false, "primary"]);
                                        setmustfoundcomp([false, "primary"]);
                                        setadditionfoundcomp([false, "primary"]);
                                        break;
                                    case "must_list":
                                        setdetailcomp([false, "primary"]);
                                        setdbcomp([false, "success"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([false, "primary"]);
                                        setmustfoundcomp(["list", "primary"]);
                                        setadditionfoundcomp([false, "primary"]);
                                        break;
                                    case "must_all":
                                        setdetailcomp([false, "primary"]);
                                        setdbcomp([false, "success"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([false, "primary"]);
                                        setmustfoundcomp(["all", "primary"]);
                                        setadditionfoundcomp([false, "primary"]);
                                        break;
                                    case "add_list":
                                        setdetailcomp([false, "primary"]);
                                        setdbcomp([false, "success"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([false, "primary"]);
                                        setmustfoundcomp([false, "primary"]);
                                        setadditionfoundcomp(["list", "primary"]);
                                        break;
                                    case "add_all":
                                        setdetailcomp([false, "primary"]);
                                        setdbcomp([false, "success"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([false, "primary"]);
                                        setmustfoundcomp([false, "primary"]);
                                        setadditionfoundcomp(["all", "primary"]);
                                        break;

                                    case "force":
                                        setdetailcomp([false, "primary"]);
                                        setdbcomp([false, "primary"]);
                                        setfoundcomp([false, "primary"]);
                                        setforcecomp([true, "success"]);
                                        setmustfoundcomp([false, "primary"]);
                                        setadditionfoundcomp([false, "primary"]);
                                        break;

                                }

                            }
                            }

                        >

                            <Nav.Link eventKey="detail">Detail</Nav.Link>
                            <Nav.Link eventKey="overall">Overall</Nav.Link>
                            <NavDropdown title="Found" id="offcanvasNavbarDropdown">
                                <NavDropdown.Divider />
                                <NavDropdown.Item disabled>ที่ต้องค้นพบ</NavDropdown.Item >
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="must_list">รายเป้าหมาย</NavDropdown.Item>
                                <NavDropdown.Item eventKey="must_all">ภาพรวม</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item disabled>ตรวจค้นพบเพิ่มเติม</NavDropdown.Item >
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="add_list">รายเป้าหมาย</NavDropdown.Item>
                                <NavDropdown.Item eventKey="add_all">ภาพรวม</NavDropdown.Item>

                            </NavDropdown>
                            <Nav.Link eventKey="force">Force</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>

        <Container fluid style={{ backgroundColor: '#112B3C' }}>
            <Row className="justify-content-md-center py-2">
                <Col md="auto" lg="auto" style={{ textAlign: "center" }}>
                    <Image
                        src={csdlogo}
                        width="400rem" className="responsive-img circle z-depth-10 align-items-start" />
                </Col>
                <Col md="auto" lg="auto">
                    <div className="rounded-3 text-center p-2 text-black mt-4 mx-3 fw-lighter" style={{ backgroundColor: "#140E32",padding:"30rem",borderRadius:"100px"}} >
                        <h1 style={{fontSize:"10rem",fontWeight:"bold", color: "#EFD530"}}>CSD Operations Car-Illegal</h1>
                    </div>
                </Col>
                <Col md="auto" className="align-self-center">
                    <Alert  className="p-3 text-center" style={{ fontSize:"4rem",fontWeight:"bold",backgroundColor: "#140E32",padding:"30rem",borderRadius:"50px", color: "#F6EFDC"}}>
                            <Timeticking/>
                    </Alert>
                </Col>
            </Row>
        </Container>
        <Db_overall src={props.source} all_score={props.src_score} bol={dbShow[0]} />
        
        <Link to={'1A1'} key={'1A1'} state={{datasource:props.source[14]}} className="list-group-item text-dark">
                    1A1
                </Link>
        <Db_stat_report src={props.source} all_score={props.src_score} bol={detailShow[0]}/>
        {/* <Db_detail src={props.source} bol={detailShow[0]} /> */}
        <Db_found src={props.source} bol={foundShow[0]} />
        <Row style={{ display: "flex", justifyContent: "center" }}>
            {props.source.map((elm) => { return <Found_must_list src={elm} bol={mustfoundShow[0]} /> })}
        </Row>

        <Found_must_all data={props.source} bol={mustfoundShow[0]} />
        <Found_add_all data={props.source} bol={additionfoundShow[0]} />
        <Row style={{ display: "flex", justifyContent: "center" }}>
            {props.source.map((elm) => { return <Found_add_list src={elm} bol={additionfoundShow[0]} /> })}
        </Row>



    </>)
}
export default Board