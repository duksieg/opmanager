import { useState, useEffect } from "react";

export default function Timeticking() {
    const[timer,setTimer] = useState(new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "medium" }))
    
    useEffect(()=>{
        setInterval(() => {
            setTimer(new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "medium" }))
            // props.tick(timer)
        }, 1000);
        return function cleanup(){
            setTimer('')
            
        }
        
    },[])
    return (
        <>
            {timer}
        </>)
}