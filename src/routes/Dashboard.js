import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"
import { useEffect, useState } from "react"
import { firebaseConfig } from '../utilities/config'
import Board from "../components/db/board_comp"


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


export default function Dashboard() {
    const [onloaded, setloading] = useState(false)
    const [allData ,setAlldata] = useState([])
    const[wantedData,setWandtedData] = useState([])
    const starCountRef_score = ref(db, 'op_bell100/score')
    const pointDataRef = ref(db, 'op_bell100/1vhPSwm7DBMcxEBGIpLTzDgAzUPoqlTj14Yt2hvWvU6Y/data');
    const wantedListRef= ref(db,'op_bell100/wantedlist')
    const opName = 'op_bell100'
    let allscore
    onValue(starCountRef_score, (snapshot) => {
        const data = snapshot.val();
        let score = []
        try {
            score = Object.values(data)
        } catch (err) {
            console.error(err)
        }
    })

    const getData=()=>{
        onValue(pointDataRef, (snapshot) => {
            let maindata = []
            const data = snapshot.val();
            Object.values(data).forEach(element => {
                maindata.push(element)
            });
            setAlldata(maindata)
        })
        onValue(wantedListRef,(snapshot)=>{
            let wanteddata = []
            const data = snapshot.val();
            Object.values(data).forEach(element => {
                wanteddata.push(element)
            });
            setWandtedData(wanteddata)
        })
        setloading(true)
    }


    
    return (
        <>
            {!onloaded ? getData():<Board source={allData} wanted={wantedData} src_score={allscore} /> }
        </>
    )


}




