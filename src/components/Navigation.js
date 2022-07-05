import React from 'react'
import { Navbar, Container, Nav, NavbarBrand } from 'react-bootstrap'
import cib from '../images/cib.png'
import gunman from '../images/gunman.png'

export default function Navlink() {
    return (
        <div className='container-fluid'>
        <br></br>
            <div className='row'>
                <div className='col'>
                    <h1 className='text-light' >Operation Manager</h1>
                    <Navbar expand="md" bg="none" variant="dark" >
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Container >
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className='text-light' href="/opmanager">หน้าแรก</Nav.Link>
                                    <Nav.Link className='text-light' href="/opmanager/createop">สร้างโอเปอเรชั่น</Nav.Link>
                                    <Nav.Link className='text-light' href="/opmanager/manageop">จัดการโอเปอเรชั่น</Nav.Link>
                                    <Nav.Link className='text-light' href="/opmanager/tracert">ติดตามเป้าหมาย</Nav.Link>
                                    <Nav.Link className='text-light' href="/opmanager/reporter">รายงานภารกิจ</Nav.Link>
                                    <Nav.Link className='text-light' href="/opmanager/dashboard">ผลการปฏิบัติ</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className='col text-end d-none d-lg-block'>
                    <img src={gunman} height="130px" className="d-inline-flex align-top align-self-end" />{' '}
                    <img src={cib} height="120px" className="d-inline-flex align-top align-self-end" />{' '}
                </div>
            </div>
        </div>
    )
}