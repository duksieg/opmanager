import { useState } from "react";
import { Alert } from "bootstrap";
const Date_t =()=>{
    //const datetime=new Date().toLocaleString("th-TH",{dateStyle:"full",timeStyle:"medium"})
    const [datetime, update_date] = useState(new Date().toLocaleString("th-TH",{dateStyle:"full",timeStyle:"medium"}));
    //console.log(datetime)
    //setInterval(update_date(Date().toLocaleString("th-TH",{dateStyle:"full",timeStyle:"medium"})), 1000);
    
    return (<><Alert variant='dark' className="mb-2" ><div id="dt" style={{textAlign:"center"}}></div></Alert></>)
    
    }
    export default Date_t