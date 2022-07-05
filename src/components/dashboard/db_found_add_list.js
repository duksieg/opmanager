import { Row, Col, Image, Card, Button } from 'react-bootstrap'

const Found_add_list = (props) => {

  if (props.bol == "list") {
    //console.log(props.src.items)
    let arr_items, bg_color, licl, lnk_pic
    try {
      arr_items = eval(props.src.items) //JSON.parse(props.src.items)
    }
    catch (err) {
      console.log(err)
      arr_items = props.src.items
    }

    const data = [
      { color: { background: "#DFDED8" }, title: "อาวุธปืน", value: 0, link_pic: "https://drive.google.com/file/d/1xyNZOqYfczXMf7FTdr5_0G3oNO8INjU6" },
      { color: { background: "#C7F836" }, title: "กระสุน", value: 0, link_pic: "https://drive.google.com/file/d/1J1PDIM9D6J-26BehxSBrP7JuRiIKsHyp" },
      { color: { background: "#FC655D" }, title: "วัตถุระเบิด", value: 0, link_pic: "https://drive.google.com/file/d/1HKkiMbLsef-jT_xKrTf2nQPbzXtzcyyK" },
      { color: { background: "#75FFFF" }, title: "ยาเสพติด", value: 0, link_pic: "https://drive.google.com/file/d/1cJiiKrnbqBT94REq0ueBaeZMkkPDjP2n" },
      { color: { background: "#DFDED8" }, title: "รถยนต์", value: 0, link_pic: "https://drive.google.com/file/d/1nvtL2ZJ-dbxBdcUxfDKVLx6ODzI3CK8L" },
      { color: { background: "#DFDED8" }, title: "เรือ", value: 0, link_pic: "https://drive.google.com/file/d/10ubz4Nw1f56EP1RB2vIYR0TxWBvZpkex" },
      { color: { background: "#DFDED8" }, title: "ใบ ป3", value: 0, link_pic: "https://drive.google.com/file/d/14Abl_PaNLMbcyWE1OoeOUeCuWYynpjCS" },
      { color: { background: "#FFDB75" }, title: "อื่น ๆ", value: 0, link_pic: "https://drive.google.com/file/d/146jRuWAKHASUkVoLqKfG1nNoGi0rsd_W" }
    ]

    switch (props.src.stat) {
      case "ready":
        bg_color = "#A7E1FC"
        break;
      case "start":
        bg_color = "#F3FA50"
        break;
      case "current":
        bg_color = "#F9DF8E"
        break;
      case "end":
        bg_color = "#A8FCBC"
        break;
      case "danger":
        bg_color = "#C80C09"
        break;
      default:
        bg_color = "#F2F2F2"
    }
    return (<>
      <Row style={{ display: "flex", background: bg_color }} className='py-2 border border-2 border-dark rounded-2' >
        <Col xs="3" sm="3" md="3" lg="2" xl="2" xxl="1"  >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={props.src.pic_url.replace("file/d/", "uc?id=")} width='100rem' />
          </div>
          <div style={{ textAlign: "center" }}>
            จุดตรวจค้นที่ {props.src.target_search}
          </div>
          <div style={{ textAlign: "center" }}>
            <Button href={props.src.link_folder} target="_blank" variant="dark" size="sm">{props.src.target}</Button>
          </div>
          <div style={{ textAlign: "center" }}>
            ชื่อเป้า {props.src.name_target}
          </div>
          <div style={{ textAlign: "center" }}>
            สถานะตรวจค้น: {props.src.stat}
          </div>
        </Col>


        {arr_items.map((lis) => {
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
          } else {
            licl = "#FFDB75";
            lnk_pic = data[7].link_pic
          }




          return (
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto" style={{ display: "flex", justifyContent: "center" }}>
              <Card style={{ width: '10rem', background: licl }} >
                <Card.Img variant="top" src={lnk_pic.replace("file/d/", "uc?id=")} style={{ height: "10rem" }} />
                <Card.Body>
                  <div style={{ textAlign: "center" }}>
                    {lis.type}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {lis.name.search("/") != -1 ? lis.name.split("/")[0] : lis.name}
                  </div>
                  <div style={{ borderBottom: "4px ridge" }}></div>
                  <div style={{ textAlign: "center" }}>
                    {lis.value} {lis.name.search("/") != -1 ? lis.name.split("/")[1] : ""}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )

        })}

      </Row>



    </>)








  } else { return (<div className="justify-content-md-center"></div>) }

}
export default Found_add_list