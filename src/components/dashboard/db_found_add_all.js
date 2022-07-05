import { useState, useEffect } from "react"
import { Container, Row, Alert, Col, Badge, Image, Modal, Card, Button, ProgressBar, Form, Nav, Navbar, Offcanvas, NavDropdown, Carousel, ModalDialog } from 'react-bootstrap'

const Found_add_all = (props) => {
  const [showCarousel, setCarousel] = useState(false)

  if (props.bol == "all") {
    const sorted = ['gun', 'bullet', 'bomb', 'drug', 'other', 'car', 'boat', 'p3', '']
    console.log(props.data)
    let options = []
    let new_arr = []
    let licl, lnk_pic
    let gun = 0
    let bullet = 0
    let bomb = 0
    let drug_g = 0
    let drug_c = 0
    let car = 0
    let boat = 0
    let other = 0
    let p3 = 0
    for (let i = 0; i < props.data.length; i++) {
      let arr_items = eval(props.data[i].items)//JSON.parse(props.data[i].items)
      //console.log("arr_items:",arr_items)
      for (let n = 0; n < arr_items.length; n++) {
        //console.log({value:arr_items[n].name,label:arr_items[n].name})
        arr_items[n].target = props.data[i].target
        arr_items[n].link_drive = props.data[i].link_folder
        arr_items[n].namelabel = props.data[i].name_target
        options.push(arr_items[n])
      }
    }


    for (let n = 0; n < sorted.length; n++) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].type == sorted[n]) { new_arr.push(options[i]) }
      }
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i].type == 'gun') { gun += Number(options[i].value) }
      if (options[i].type == 'bullet') { bullet += Number(options[i].value) }
      if (options[i].type == 'bomb') { bomb += Number(options[i].value) }
      if (options[i].type == 'car') { car += Number(options[i].value) }
      if (options[i].type == 'boat') { boat += Number(options[i].value) }
      if (options[i].type == 'p3') { p3 += Number(options[i].value) }
      if (options[i].type == 'drug' && options[i].name.search("กรัม") != -1) { drug_g += Number(options[i].value) }
      if (options[i].type == 'drug' && options[i].name.search("กรัม") == -1 && options[i].name.search("เม็ด") == -1) { drug_c += Number(options[i].value) }
      if (options[i].type == 'drug' && options[i].name.search("เม็ด") != -1) { drug_c += Number(options[i].value) }
      if (options[i].type == 'other') { other += Number(options[i].value) }
    }





    const data = [
      { color: { background: "#DFDED8" }, title: "อาวุธปืน", value: gun, link_pic: "https://drive.google.com/file/d/1xyNZOqYfczXMf7FTdr5_0G3oNO8INjU6" },
      { color: { background: "#C7F836" }, title: "กระสุน", value: bullet, link_pic: "https://drive.google.com/file/d/1J1PDIM9D6J-26BehxSBrP7JuRiIKsHyp" },
      { color: { background: "#FC655D" }, title: "วัตถุระเบิด", value: bomb, link_pic: "https://drive.google.com/file/d/1HKkiMbLsef-jT_xKrTf2nQPbzXtzcyyK" },
      { color: { background: "#75FFFF" }, title: "ยาเสพติด", value: 0, link_pic: "https://drive.google.com/file/d/1cJiiKrnbqBT94REq0ueBaeZMkkPDjP2n" },
      { color: { background: "#DFDED8" }, title: "รถยนต์", value: car, link_pic: "https://drive.google.com/file/d/1nvtL2ZJ-dbxBdcUxfDKVLx6ODzI3CK8L" },
      { color: { background: "#DFDED8" }, title: "เรือ", value: boat, link_pic: "https://drive.google.com/file/d/10ubz4Nw1f56EP1RB2vIYR0TxWBvZpkex" },
      { color: { background: "#DFDED8" }, title: "ใบ ป3", value: p3, link_pic: "https://drive.google.com/file/d/14Abl_PaNLMbcyWE1OoeOUeCuWYynpjCS" },
      { color: { background: "#FFDB75" }, title: "อื่น ๆ", value: other, link_pic: "https://drive.google.com/file/d/146jRuWAKHASUkVoLqKfG1nNoGi0rsd_W" }
    ]


    return (<>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ borderBottom: "4px ridge" }}></div>
      </Row>

      <Row style={{ display: "flex", justifyContent: "center" }}>
        {data.map((elm) => {
          if (elm.title == "ยาเสพติด") {
            elm.value = `${drug_c} เม็ด | ${drug_g} กรัม`
          }
          return <Col
            xs="6" sm="auto" md="auto" lg="auto" className="mt-2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image src={elm.link_pic.replace("file/d/", "uc?id=")}  height="100rem" />
            <Alert style={elm.color} >
              <div style={{ textAlign: "center" }}>
                <h5>{elm.title}</h5>
              </div>
              <div style={{ textAlign: "center" }}>
                <h5>{elm.value}</h5>
              </div>
            </Alert>
          </Col>
        })
        }

      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {new_arr.map((lis) => {//console.log("lis:",lis)
          console.log(lis)
          if (lis.type == "gun") {
            licl = "#DFDED8";
            lnk_pic = data[0].link_pic
          } else if (lis.type == "bullet") {
            licl = "#C7F836";
            lnk_pic = data[1].link_pic

          } else if (lis.type == "bomb") {
            licl = "#FC655D";
            lnk_pic = data[2].link_pic

          } else if (lis.type == "drug") {
            licl = "#75FFFF";
            lnk_pic = data[3].link_pic

          } else if (lis.type == "car") {
            licl = "#DFDED8";
            lnk_pic = data[4].link_pic
          } else if (lis.type == "boat") {
            licl = "#DFDED8";
            lnk_pic = data[5].link_pic
          } else if (lis.type == "p3") {
            licl = "#DFDED8";
            lnk_pic = data[6].link_pic
          }
          else {
            licl = "#FFDB75";
            lnk_pic = data[7].link_pic
          }

          return (
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto"
              onClick={setCarousel}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card className="mt-3" style={{ width: '10rem', background: licl }} >
                <Card.Header style={{ textAlign: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <Button href={lis.link_drive} target="_blank" variant="dark" size="sm">{lis.target}</Button>
                  </div>
                
                </Card.Header>
                <Card.Img variant="top" src={lnk_pic.replace("file/d/", "uc?id=")} style={{ height: "8rem" }} />
                <Card.Body>
                  <div style={{ textAlign: "center" }}>
                    {lis.type}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {lis.name.split("/")[0]}
                  </div>

                  <div style={{ borderBottom: "4px ridge" }}></div>
                  <div style={{ textAlign: "center" }}>
                    {lis.value} {lis.name.split("/")[1]}
                  </div>



                </Card.Body>
              </Card>
            </Col>
          )

        }
        )
        }


      </Row>

    </>)
  } else {
    return (<div className="justify-content-md-center"></div>)
  }
}

export default Found_add_all