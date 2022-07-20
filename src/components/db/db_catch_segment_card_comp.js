import { Card, Image } from "react-bootstrap"
import arrested from '../../images/arrested.png'
const Card_com = (elm) => {
    const card_style = { width: '12rem', background: "#6D6E70", borderRadius: "30px", marginTop: "1rem" }
    console.log("card_com", elm)
    return (<>
            <Card style={card_style} >
            <Card.Body>
            {/* <Card.Img variant="top" src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/targetimages/op_bell100/${elm.targetPic}` } style={{height:'8rem',width:'100%',objectFit:'cover'}} /> */}
            {/* {mock test} */}
            <Card.Img variant="top" src={`${elm.atb.link_pic.replace("file/d/","uc?id=")}` } style={{height:'8rem',width:'100%',objectFit:'cover'}} />
            
            {elm.atb.status !== 'found' ? <></> :<>
                            <div className="card-img-overlay text-center align-items-center">
                                <Image src={arrested} style={{ objectFit:'cover',width:'100%',marginTop:"-3rem"}}/>
                                <label  style={{ objectFit:'cover',width:'75%',marginTop:"3rem",color:"#A71B12",fontSize:"1rem",fontWeight:"bold",border:"0.2rem double #A71B12"}}>จับที่ ABC</label>
                            </div>
                            <div className="card-overlay text-center align-items-center">
                            
                           {/* <label style={{ objectFit:'cover',width:'100%',marginTop:"0.2rem"}}>adbd</label> */}

                        </div></>
                        }
            <Card.Footer style={{ textAlign: "center" ,borderRadius:"30px",background:"#B4B8C7"}}>
            {/* <Card.Text style={{textAlign:"center",fontSize:"1rem",fontWeight:"bold"}}>{elm.targetName}</Card.Text> */}
            <Card.Text style={{textAlign:"center",fontSize:"1rem",fontWeight:"bold"}}>{elm.atb.name}</Card.Text>
            </Card.Footer>
            </Card.Body>
            </Card>


        {/* <div className="card">
            <div className="card-body" style={card_style}>
                <img  src={`${process.env.REACT_APP_SERVICE_ENDPOINT}/operation/targetimages/op_bell100/${elm.targetPic}` } style={{height:'100%',width:'100%',objectFit:'cover'}} className="card-img-top"></img>
            </div>
            {elm.status != 'found' ? <></> :
                <div class="card-img-overlay text-center align-items-center">
                    <img src={arrested} style={{ objectFit:'cover',width:'100%'}} />
                </div>
            }
            <div className="card-footer text-center" style={{fontSize:'1.5rem'}}>
                {/* <Card.Text style={{textAlign:"center",fontSize:"2rem",fontWeight:"bold"}}>จุดตรวจค้นที่ {elm.target_search} {elm.target}</Card.Text>
                <div className="card-footer text-muted">{elm.targetName}</div>
            </div>
        </div>  */}
    </>)
}
export default Card_com