import { useState, useEffect } from "react";

export default function Timeticking() {
    const[timer,setTimer] = useState(new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "medium" }))
    setInterval(() => {
        setTimer(new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "medium" }))
    }, 1000);
    return (
        <>
            {timer}
        </>)
}