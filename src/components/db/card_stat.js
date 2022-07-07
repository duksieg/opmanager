import { Card, Image } from "react-bootstrap"
const Card_stat=(elm)=>{
    console.log("from card",elm.atb)
    let bg_color=""
          switch (elm.atb.stat) {
            case "ready":
                bg_color="#90EFF9"
                break;
            case "start":
                bg_color="#F3FA50"
                break;
            case "current":
                bg_color="#F1C068"
                break;
          case "end":
              bg_color="#66F530"
              break;
          case "danger":
              bg_color="#C80C09"
              break;
          default:
              bg_color="#6D6E70"
              }
    const card_style={ width: '20rem',background:bg_color ,borderRadius:"30px",marginTop:"1rem"}
    return (
    <Card style={card_style} >
      <Card.Body>
      {/* <Card.Img variant="top" src={elm.atb.pic_url.replace("file/d/","uc?export=view&id=")} style={{height:"15rem"}} />
      {elm.atb.current_check_list[0].stat =='พบ' ||elm.atb.stat =='end'?
      <div class="card-img-overlay">
         <Image src={'https://drive.google.com/uc?id=1T--5zy6QYKcFfOdw7Tlpj_Q1OVKtUeql'} style={{width:"10vh",marginTop:'1vh'}}/>
      </div>
      :<></>} */}
      <Card.Footer style={{ textAlign: "center" ,borderRadius:"30px",background:"#B4B8C7"}}>
      <Card.Text style={{textAlign:"center",fontSize:"1.5rem",fontWeight:"bold"}}>{elm.atb.target}</Card.Text>
      {/*จุดตรวจค้นที่ {elm.atb.target_search} */}
        <Card.Text style={{textAlign:"center",fontSize:"1.5rem",fontWeight:"bold"}}>{elm.atb.name_target}</Card.Text>

      </Card.Footer>

      </Card.Body>
    </Card>)
}
export default Card_stat