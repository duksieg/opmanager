import { useState, useEffect } from "react"
import 'bootstrap'
import { Container, Row, Alert, Col, Badge, Image, Modal, Card, Button, ProgressBar, Form, Nav, Navbar, Offcanvas, NavDropdown, Carousel, ModalDialog } from 'react-bootstrap'
import csdlogo from '../../images/csd.png'
const Nav_bar = (props) => {



    return (<>
 {/* <Navbar variant="dark" bg="dark" expand={false} sticky='top' collapseOnSelect={true}>
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
        </Navbar>  */}
</>)
                        }
export default Nav_bar;