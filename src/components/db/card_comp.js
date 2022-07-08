import { Card, Image } from "react-bootstrap"
import arrested from '../../images/arrested.png'
const Card_com = (elm) => {
    const card_style = { width: '20rem', background: "#6D6E70", borderRadius: "30px", marginTop: "1.5rem" }
    return (
        <div className="card">
            <div className="card-body">
                <img  src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/targetimages/op_bell100/${elm.atb.targetPic}` } style={{height:'100%',width:'100%',objectFit:'cover'}} className="card-img-top"></img>
            </div>
            {elm.atb.status != 'found' ? <></> :
                <div class="card-img-overlay text-center align-items-center">
                    <img src={arrested} style={{ objectFit:'cover',width:'100%'}} />
                </div>
            }
            <div className="card-footer text-center" style={{fontSize:'1.5rem'}}>
                {/* <Card.Text style={{textAlign:"center",fontSize:"2rem",fontWeight:"bold"}}>จุดตรวจค้นที่ {elm.atb.target_search} {elm.atb.target}</Card.Text> */}
                <div className="card-text">{elm.atb.targetName}</div>
            </div>
        </div>
    )
}
export default Card_com