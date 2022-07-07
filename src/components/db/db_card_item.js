import { Card} from "react-bootstrap"
const Card_item=(elm)=>{



    return (
      <Card style={{ width: "30rem",height:"6rem", background:"#F6EFDC",borderRadius:"30px" }} className="mt-3">

        <Card.Body>
            <Card.Title style={{ textAlign: "center",fontSize:"1.5rem",fontWeight:"bold"}}>{elm.src.label}</Card.Title>

            <Card.Footer style={{ textAlign: "center" ,fontSize:"1.5rem",fontWeight:"bold"}}>{elm.src.value}</Card.Footer>

        </Card.Body>
      </Card>
    );
}
export default Card_item