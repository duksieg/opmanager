import { ProgressBar } from "react-bootstrap"
const Pg_bar=(props)=>{
    console.log(props.obj)

    let arr_chk_list,arr_end_list,total
    console.log("eval:",props.obj)
    let all_score=props.all_score[0]

    //console.log("eval:",props.obj[0].LAT)
    //let all_score=JSON.parse(props.obj[0].LAT).score
    let arr_total=[]
    console.log("all_score:",all_score)

    for(let i=0;i<props.obj.length;i++){
            if (props.obj[i].stat=="ready"){
              let sc=`${props.obj[i].target_search}_${props.obj[i].target}_${props.obj[i].stat}`;
                  if(!all_score.includes(sc)){
                      all_score.push(sc);
                  }
              }
            if (props.obj[i].stat=="start"){
              let sc=`${props.obj[i].target_search}_${props.obj[i].target}_${props.obj[i].stat}`;
                  if(!all_score.includes(sc)){
                      all_score.push(sc);
                  }
              }
            if (props.obj[i].stat=="current"){
              let sc=`${props.obj[i].target_search}_${props.obj[i].target}_${props.obj[i].stat}`;
                  if(!all_score.includes(sc)){
                      all_score.push(sc);
                  }
              }   
            if (props.obj[i].stat=="end"){
              let sc=`${props.obj[i].target_search}_${props.obj[i].target}_${props.obj[i].stat}`;
                  if(!all_score.includes(sc)){
                      all_score.push(sc);
                  }
              } 
            arr_chk_list=JSON.parse(props.obj[i].current_check_list)
            arr_total=[...arr_total,...arr_chk_list]
            for(let n=0;n<arr_chk_list.length;n++ ){
                if(arr_chk_list[n].stat=="พบ" || arr_chk_list[n].stat=="ไม่พบ"){
                    let sc=`${props.obj[i].target_search}_${props.obj[i].target}_chk_${arr_chk_list[n].name}`;
                        if(!all_score.includes(sc)){
                            all_score.push(sc);
                        }                        
                }
            
            }    
            arr_end_list=JSON.parse(props.obj[i].end_check_list)
            arr_total=[...arr_total,...arr_end_list]
            for(let n=0;n<arr_end_list.length;n++ ){
                if(arr_end_list[n].value!="" && arr_end_list[n].stat!="ระหว่างดำเนินการ"){
                    let sc=`${props.obj[i].target_search}_${props.obj[i].target}_end_${arr_end_list[n].name}`;
                        if(!all_score.includes(sc)){
                            all_score.push(sc);
                        }                        
                }
            
            } 



    }
    console.log("current all_score:",all_score)
    console.log("current arr_total:",arr_total)
    total=(4*props.obj.length)+(arr_total.length)
    console.log(all_score.length,total)











      const now = parseInt((all_score.length/total)*100).toFixed(0)//parseInt((props.items.length/44)*100).toFixed(0)
      //{"bar":100,"total":100,"color":"#F3FA50"}
      
      return(<>
                <ProgressBar animated now={now} label={`${now}%`} variant="#F3FA50" style={{marginTop:"20px",height:"20px"}} />
            </>)
  }

  export default Pg_bar