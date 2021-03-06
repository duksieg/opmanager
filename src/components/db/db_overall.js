import {
  Container,
  Row,

  Col,

} from "react-bootstrap";

import { v4 as uuidv4 } from 'uuid';
import Chart_segment from "./db_chart_segment";

import Search_segment from "./db_search_segment";
import Catch_segment from "./db_catch_segment";
const Db_overall = (props) => {


  if (props.bol == true) {
    const sorted = ["danger", "", "ready", "start", "current", "end"];
    const arr = props.src;
    const wantedList = props.wanted;
    let new_arr = [];
    const ready = [];
    const start = [];
    const current = [];
    const end = [];
    const danger = [];
    const catched = [];
    const sent_station = [];
    for (let n = 0; n < sorted.length; n++) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].stat == sorted[n]) {
          new_arr.push(arr[i]);
        }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].stat == "danger") {
        danger.push(arr[i]);
      }
      if (arr[i].stat == "ready") {
        ready.push(arr[i]);
      }
      if (arr[i].stat == "start") {
        start.push(arr[i]);
      }
      if (arr[i].stat == "current") {
        current.push(arr[i]);
      }
      if (arr[i].stat == "end") {
        end.push(arr[i]);
      }
      if (arr[i].stat == "end") {
        let arr_endlist = eval(arr[i].end_check_list);
        for (let i = 0; i < arr_endlist.length; i++) {
          if (
            arr_endlist[i].name == "ส่งตัวให้ร้อยเวรฯ" &&
            arr_endlist[i].value == "ดำเนินการแล้ว"
          ) {
            sent_station.push(arr_endlist[i]);
          }
          if (
            arr_endlist[i].name == "บันทึกจับกุม" &&
            (arr_endlist[i].value == "ดำเนินการแล้ว" ||
              arr_endlist[i].value == "ระหว่างดำเนินการ")
          ) {
            catched.push(arr_endlist[i]);
          }
        }
      }
    }

    const main_data = new_arr;
    const targets = main_data.map((r) => {
      return r.target;
    });
    const target_search = main_data.map((r) => {
      return r.target_search;
    });
    const arr_targets = targets.filter(
      (e, i, a) => a.indexOf(e) === i && e != ""
    );
    const arr_target_search = target_search.filter(
      (e, i, a) => a.indexOf(e) === i && e != ""
    );

    // const data0 = [{ color: { background: "#DFDED8" }, title: "จุดตรวจค้น", value: arr_target_search.length }, { color: { background: "#DFDED8" }, title: "เป้าหมาย", value: 16 }]

    const data1 = [
      {
        color: { color: "white", background: "#140E32" },
        title: "สถานะการจับกุม",
      },
      {
        color: { background: "#DFDED8" },
        title: "เป้าหมาย(หมายจับ)",
        value: 16,
      },
      { color: { background: "#DFDED8" }, title: "จับตามหมายจับ", value: 16 },
      { color: { background: "#DFDED8" }, title: "จับซึ่งหน้า", value: 1 },
      {
        color: { background: "#DFDED8", marginTop: "10px" },
        title: "รวมจับกุมได้",
        value: catched.length,
      },

    ];

    //old version use เริ่มตรวจค้น const data2=[{color:{background:"#90EFF9",marginTop:"10px"},title:"ปล่อยแถว",value:ready.length},{color:{background:"#F3FA50",marginTop:"10px"},title:"เริ่มตรวจค้น",value:start.length},{color:{background:"#F1C068",marginTop:"10px"},title:"ขณะตรวจค้น",value:current.length},{color:{background:"#66F530",marginTop:"10px"},title:"หลังตรวจค้น",value:end.length}]
    const search_head = [
      {
        color: { color: "white", background: "#140E32" },
        title: "สถานะจุดตรวจค้น",
        value: "",
        id: "first",
      },
      {
        color: { background: "#DFDED8" },
        title: "จุดตรวจค้น",
        value: target_search.length,
        id: "second",
      },
      {
        color: { background: "#90EFF9" },
        title: "ปล่อยแถว",
        value: ready.length,
        id: uuidv4(),
      },
      {
        color: { background: "#F1C068" },
        title: "ขณะตรวจค้น",
        value: current.length,
        id: uuidv4(),
      },
      {
        color: { background: "#d2e7dd" },
        title: "หลังตรวจค้น",
        value: end.length,
        id: uuidv4(),
      },
    ];
    // { color: { color: "white", background: "#C1361E", marginTop: "10px" }, title: "ฉุกเฉิน", value: danger.length }

    console.log("main_data:", main_data);

    //<!-- mock data for chart-->
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      // "พฤษภาคม",
      // "มิถุนายน",
      // "กรกฎาคม",
      // "สิงหาคม",
      // "กันยายน",
      // "ตุลาคม",
      // "พฤศจิกายน",
      // "ธันวาคม",
    ];
    const arr_data = labels
      .map((lb) => ({ label: lb, value: Math.floor(Math.random() * 100) }))
      .sort((a, b) => b.value - a.value);
    const chart_numcol = 10;
    const arr_chart = arr_data.slice(0, chart_numcol);
    const arr_card = arr_data.slice(chart_numcol);
    //<!-- mock data for chart-->
    // const [ChangeSegment, setChangeSegment] = useState(false);
    return (
      <>
        <Container fluid style={{ backgroundColor: "#13035A" }}>
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
              lg="5"
              style={{
                display: "flex",
                justifyContent: "center",
                // backgroundColor: "#F6EFDC",
                // borderRadius: "100px",
                padding: "0.2rem",
              }}
            >
              <Chart_segment chart={arr_chart} card={arr_card} />
            </Col>
            <Col

              style={{
                display: "flex",
                borderRadius: "30px",
                // backgroundColor: "#FAE5D3",
                padding: "0.2rem",
                marginTop: "1rem",
                marginLeft: "-1.5rem",
                marginRight: "-1rem",
              }}
            >
              <Catch_segment head={data1} list={wantedList} danger_value={danger.length}/>
            </Col>
          </Row>

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#13035A",
              borderRadius: "30px",
              marginTop: "-1rem",
            }}
          >
            <Search_segment maindata={main_data} head={search_head} />
          </Row>
        </Container>
      </>
    );
  } else {
    return <div className="justify-content-md-center"></div>;
  }
};
export default Db_overall;

{
  /* <Row

style={{ backgroundColor:  "#13035A" }}
>
<Col
  xs="auto"
  sm="auto"
  md="auto"
  lg="5"
  style={{
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "#140E32",
    marginTop:"-4rem",
  }}
>
  <Chart_segment chart={arr_chart} card={arr_card} />

</Col>

</Row>
 */
}

{
  /* <Col
xs="auto"
sm="auto"
md="7"
lg="7"
xl="7"
style={{
  
  display: "flex",
  borderRadius:"30px",
  backgroundColor: "#FAE5D3",
  marginTop:"1rem"
}}
>
<Container fluid>
  <Row>
  {wantedList.map((elm) => {
    console.log(elm)
    return (
      <Col xs="3" md="2" lg="2"  style={{display: "inline-flex", justifyContent: "center",borderRadius:"30px" }}>
        {/* onclick in Col onClick={() => setModalShow([true, elm])} 
        <Card_com atb={elm} />
      </Col>
    );
  })}
  </Row>

</Container>
</Col> */
}

{
  /* {data1.map((elm) => {
              return <Rowstat {...elm} />;
            })}
              <Container fluid>
                <Row>
                {wantedList.map((elm) => {
                  console.log(elm)
                  return (
                    <Col xs="3" md="2" lg="2"  style={{display: "inline-flex", justifyContent: "center",borderRadius:"30px" }}>
                      {/* onclick in Col onClick={() => setModalShow([true, elm])} 
                      <Card_com atb={elm} />
                    </Col>
                  );
                })}
                </Row> */
}
{
  /* <hr style={{color:"#FFFFFF",height:"2rem",borderWidth:"0",backgroundColor:"#FFFFFF",marginTop:"3rem"}}/> */
}
{
  /* </Container> */
}

{
  /* <Row                   
                style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#FAF6AD",
                    borderRadius:"30px",
                    marginTop:"1rem"
                  }}>
                <Col
              xs="auto"
              sm="auto"
              md="1"
              lg="1"

            >


          <Alert   style={{ justifyContent: "center",fontSize:"1.5rem",fontWeight:"bold",backgroundColor: "#140E32",padding:"1rem",borderRadius:"30px", color: "#F6EFDC",marginTop:"3rem"}}>
                            <div style={{display: "flex", justifyContent: "center"}}>สถานะ</div>
                            <div style={{display: "flex", justifyContent: "center"}}>จุดตรวจค้น</div>
                    </Alert>

            </Col>
            <Col
              xs="auto"
              sm="auto"
              md="11"
              lg="11"
              style={{
                display: "flex",
                justifyContent: "center",

              }}
            >
              <Container fluid >
              {main_data.map((elm) => {
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


              </Container>

</Col>
          </Row> */
}

{
  /* <Modal_csl show={modalShow[0]} data={modalShow[1]} onHide={() => setModalShow(false)}/> */
}
{
  /* <Modal_c
            show={modalShow[0]}
            data={modalShow[1]}
            onHide={() => setModalShow(false)}
          /> */
}

{
  /* <Container fluid >
<Row
  style={{
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#F6EFDC" ,
    borderRadius:"30px",
    marginTop:"1rem"
  }}
>
  <Chart_segment chart={arr_chart} card={arr_card} />
  {/* <Chart chart={arr_chart} card={arr_card} /> 
</Row>

<Row
  style={{
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#140E32" ,
    
  }}
>
  {arr_card.map((elm) => {

return (
<Col xs="3" md="2" lg="2"
style={{
display: "inline-flex",
justifyContent: "center",


}}
>
<Card_item src={elm}/>
</Col>
);          
})
}
</Row>                
</Container> */
}

{
  /* <Row
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor:  "#13035A" ,
            }}
          >
            <Col
              xs="auto"
              sm="auto"
              md="auto"
              lg="5"
              style={{
                display: "flex",
                justifyContent: "center",

              }}
            >
          <Alert   style={{ fontSize:"1.5rem",fontWeight:"bold",backgroundColor: "#140E32",padding:"1rem",borderRadius:"50px", color: "#F6EFDC",marginTop:"1rem"}}>
                            การตรวจยึดของกลาง
                    </Alert>
            </Col>

            <Col
              xs="auto"
              sm="auto"
              md="auto"
              lg="7"
              style={{
                display: "flex",
                justifyContent: "center",

              }}
            >
          <Alert   style={{ fontSize:"1.5rem",fontWeight:"bold",backgroundColor: "#140E32",padding:"1rem",borderRadius:"50px", color: "#F6EFDC",marginTop:"1rem"}}>
                            สถานะการจับกุมเป้าหมาย
                    </Alert>

            </Col>
          </Row> */
}
