import { Container,Col,Alert } from "react-bootstrap"
import { useState,useEffect } from "react";


const Danger=(props)=>{

    // const [danger, setdanger] = useState(props.tick);
    const static_color= { background: "#DFDED8", marginTop: "10px" }

    // const dg=      {
    //     color: { background: "#DFDED8", marginTop: "10px" },
    //     title: "ฉุกเฉิน",
    //     value: 1,//danger.length
    //   }

      const [danger, setdanger] = useState({ background: "#DFDED8", marginTop: "10px" });
      useEffect(() => {
        
        // console.log("useeffect in danger",elm.color.background)
        setInterval(() => {
            danger.background==="#DFDED8"?setdanger({ color: "white", background: "#C1361E", marginTop: "10px" }):setdanger({ background: "#DFDED8", marginTop: "10px" })
            console.log("setInterval in danger", danger); //{ color: "white", background: "#C1361E", marginTop: "10px" }
            // setdanger({ color: "white", background: "#C1361E", marginTop: "10px" });
        }, 3000);
        // return function cleanup() {
        //     setdanger("");
        // };
        //     setdanger({ color: "white", background: "#C1361E", marginTop: "10px" })
        // timesleep(3000);
    }, []);
    if (props.value>0){

          return(<>
          <Container>
          <Col  style={{ display: "flex", justifyContent: "center" }}>   
                <Alert  className="link" style={{ fontSize:"1.5rem",fontWeight:"bold",padding:"1rem",borderRadius:"30px",marginTop:"0.5rem",...danger}} >   
      
                      <div >ฉุกเฉิน {props.value}</div>
                      {/* <div>{danger.background}</div> */}
      
                </Alert> 
          </Col>  
      
          </Container>
          </>)
    }else{
        return (<>
            <Container>
            <Col  style={{ display: "flex", justifyContent: "center" }}>   
                  <Alert  className="link" style={{ fontSize:"1.5rem",fontWeight:"bold",padding:"1rem",borderRadius:"30px",marginTop:"0.5rem",...static_color}} >   
        
                        <div >ฉุกเฉิน {props.value}</div>
        
                  </Alert> 
            </Col>  
        
            </Container>
            </>)


    }






  


}

export default Danger