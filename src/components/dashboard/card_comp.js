import { Card, Image } from "react-bootstrap"
const Card_com=(elm)=>{
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
              bg_color="#FFFFFF"
              }
    const card_style={ width: '10rem',background:bg_color }
    return (
    <Card style={card_style} className="mt-3">
      <Card.Body>
      <Card.Img variant="top" src={elm.atb.pic_url.replace("file/d/","uc?export=view&id=")} style={{height:"8rem"}} />
      {elm.atb.current_check_list[0].stat =='พบ' ||elm.atb.stat =='end'?
      <div class="card-img-overlay">
         <Image src={'https://drive.google.com/uc?id=1T--5zy6QYKcFfOdw7Tlpj_Q1OVKtUeql'} style={{width:"10vh",marginTop:'1vh'}}/>
      </div>
      :<></>}
        <Card.Text style={{textAlign:"center"}}>จุดตรวจค้นที่ {elm.atb.target_search} {elm.atb.target}</Card.Text>
        <Card.Text style={{textAlign:"center"}}>{elm.atb.name_target}</Card.Text>
      </Card.Body>
    </Card>)
}
export default Card_com