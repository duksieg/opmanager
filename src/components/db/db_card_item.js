import { Card} from "react-bootstrap"
const Card_item=(elm)=>{



    return (
      <Card style={{ width: "30rem",height:"15rem", background:"#F6EFDC",borderRadius:"30px" }} className="mt-3">

        <Card.Body>
            <Card.Title style={{ textAlign: "center",fontSize:"3rem",fontWeight:"bold"}}>{elm.src.label}</Card.Title>
            <hr/>
            <Card.Footer style={{ textAlign: "center" ,fontSize:"3rem",fontWeight:"bold"}}>{elm.src.value}</Card.Footer>

        </Card.Body>
      </Card>
    );
}
export default Card_item