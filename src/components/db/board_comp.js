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
const Board = (props) => {
    //<!-- console.log(props.date_time) -->
    const [dbShow, setdbcomp] = useState([true, "primary"]);
    const [foundShow, setfoundcomp] = useState([false, "primary"]);
    const [forceShow, setforcecomp] = useState([false, "primary"]);
    const [detailShow, setdetailcomp] = useState([false, "primary"]);
    const [mustfoundShow, setmustfoundcomp] = useState([false, "primary"]);
    const [additionfoundShow, setadditionfoundcomp] = useState([false, "primary"]);
    const [datetime, setDatetime] = useState(new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "medium" }))

    return (<>
        
        {/* <Nav_bar/> */}
        <Container fluid style={{ backgroundColor: '#112B3C' }}>
            <Row className="justify-content-md-center py-2">
                <Col md="auto" lg="auto" style={{ textAlign: "center" }}>
                    <Image
                        src={csdlogo}
                        width="200rem" className="responsive-img circle z-depth-10 align-items-start" />
                </Col>
                <Col md="auto" lg="auto">
                    <Alert style={{fontSize:"2.5rem",fontWeight:"bold", color: "#EFD530",backgroundColor: "#140E32",borderRadius:"50px",marginTop:"1.5rem"}} >
                           ___CSD Operations Car-Illegal___
                    </Alert>
                </Col>
                <Col md="auto" className="align-self-center">
                    <Alert  className="p-3 text-center" style={{ fontSize:"2rem",fontWeight:"bold",backgroundColor: "#140E32",padding:"3rem",borderRadius:"50px", color: "#F6EFDC",marginTop:"1rem"}}>
                            <Timeticking/>
                    </Alert>
                </Col>
            </Row>
        </Container>
        <Db_overall src={props.source} all_score={props.src_score} bol={dbShow[0]} />
        
      
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