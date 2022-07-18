import { Card} from "react-bootstrap"
const Card_item=(elm)=>{
  let hi;
  let wi;
console.log("carditem-taptile elm",elm.tapname)
if (elm.tapname === "Card"){
     hi="7rem";
     wi="15rem";


}else{

     hi="7rem";
     wi="15rem";
}

    return (
      <Card style={{ width: wi,height:hi, background:"#F6EFDC",borderRadius:"30px" }} className="mt-3">

        <Card.Body>
            <Card.Title style={{ textAlign: "center",fontSize:"1.5rem",fontWeight:"bold"}}>{elm.src.label}</Card.Title>

            <Card.Footer style={{ textAlign: "center" ,fontSize:"1.5rem",fontWeight:"bold"}}>{elm.src.value}</Card.Footer>

        </Card.Body>
      </Card>
    );
}
export default Card_item