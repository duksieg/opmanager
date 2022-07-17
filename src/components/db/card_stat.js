import { Card, Image } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
const Card_stat=(elm)=>{
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
              bg_color="#d2e7dd"
              break;
          case "danger":
              bg_color="#C80C09"
              break;
          default:
              bg_color="#6D6E70"
              }
    const card_style={ width: '15rem',background:bg_color ,borderRadius:"30px",marginTop:"1rem"}
    return (
    <Card style={card_style} id={uuidv4()}>
      <Card.Body>
      {/* <Card.Img variant="top" src={elm.atb.pic_url.replace("file/d/","uc?export=view&id=")} style={{height:"15rem"}} />
      {elm.atb.current_check_list[0].stat =='พบ' ||elm.atb.stat =='end'?
      <div class="card-img-overlay">
         <Image src={'https://drive.google.com/uc?id=1T--5zy6QYKcFfOdw7Tlpj_Q1OVKtUeql'} style={{width:"10vh",marginTop:'1vh'}}/>
      </div>
      :<></>} */}
      <Card.Header style={{ textAlign: "center",fontSize:"1.5rem",fontWeight:"bold",borderRadius:"10px",background:"#B4B8C7",marginTop:"-0.5rem",padding:"0.2rem"}}>{elm.atb.target}</Card.Header>
      
      <Card.Footer style={{ textAlign: "center" ,borderRadius:"20px",background:"#B4B8C7",marginTop:"0.5rem"}}>
      <Card.Text style={{textAlign:"center",fontSize:"1rem",fontWeight:"bold"}}>ค้นเพื่อพบ<br/>{elm.atb.name_target}</Card.Text>
      <Card.Text style={{textAlign:"center",fontSize:"0.8rem",fontWeight:"bold"}}>{elm.atb.address}</Card.Text> 
      {/*จุดตรวจค้นที่ {elm.atb.target_search} */}
        

      </Card.Footer>
      {/* <Card.Footer style={{ textAlign: "center" ,borderRadius:"20px",background:"#B4B8C7",marginTop:"0.5rem"}}>

      </Card.Footer> */}
      </Card.Body>
    </Card>)
}
export default Card_stat