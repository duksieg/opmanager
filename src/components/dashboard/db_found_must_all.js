import { Container,Row,Alert,Col,Badge,Image,Modal,Card,Button,ProgressBar,Form,Nav,Navbar,Offcanvas,NavDropdown,Carousel,ModalDialog } from 'react-bootstrap'

const Found_must_all =(props)=>{

    if(props.bol=="all"){
         let  arr_name=[]
         let  arr_new=[]
         let found_arr=[]
         let notfound_arr=[]
         let during_arr=[]
        let chk_list,name,bg_color,licl
          
        for(let i=0;i<props.data.length;i++){
            chk_list=eval(props.data[i].current_check_list)  //JSON.parse(props.data[i].current_check_list)
            for(let n=0;n<chk_list.length;n++){
              name=`${chk_list[n].name}${chk_list[n].detail1}${chk_list[n].detail2}`
              if(!arr_name.includes(name)){arr_name.push(name);arr_new.push(chk_list[n])}
            }
        }
    
        console.log(arr_name)
        console.log(arr_new)
        //const [arr_new,setarrList]=useState(arr_new)
       // var arr_new=arr_new
       let arr_list=[]
    for(let x=0;x<arr_new.length;x++){
        for(let i=0;i<props.data.length;i++){
            chk_list=eval(props.data[i].current_check_list) ///JSON.parse(props.data[i].current_check_list)
            for(let n=0;n<chk_list.length;n++){
                name=`${chk_list[n].name}${chk_list[n].detail1}${chk_list[n].detail2}`
    
                if(`${arr_new[x].name}${arr_new[x].detail1}${arr_new[x].detail2}`==name){
                      if(chk_list[n].stat=="พบ" ){
                            console.log(name,chk_list[n].stat)
                            arr_new[x].stat="พบ"
    
                            //let a=chk_list[n]
                            arr_new[x].target_search=props.data[i].target_search;
                            arr_new[x].target=props.data[i].target;
                            arr_new[x].link_drive=props.data[i].link_folder;
                            //arr_list.push(a)
                            console.log(name,arr_new[x])
                            break;
                      }else if(chk_list[n].stat=="ระหว่างดำเนินการ" && arr_new[x].stat!="พบ"){
                            console.log(name,chk_list[n].stat)
                            //let a=chk_list[n]
                            arr_new[x].stat="ระหว่างดำเนินการ"
                            arr_new[x].target="target?";
                            arr_new[x].link_drive="";
                            //arr_list.push(a)
                            console.log(name,arr_new[x])               
                            break;
                      }else if(chk_list[n].stat=="ไม่พบ" && arr_new[x].stat!="พบ" && arr_new[x].stat!="ระหว่างดำเนินการ"){
                            console.log(name,chk_list[n].stat)
                            //let a=chk_list[n]
                            arr_new[x].stat="ไม่พบ"
                            arr_new[x].target="target?";
                            arr_new[x].link_drive="";
                            //arr_list.push(a)
                            console.log(name,arr_new[x])                 
                            break;
                      }else if(chk_list[n].stat=="" && arr_new[x].stat!="พบ" && arr_new[x].stat!="ระหว่างดำเนินการ" && arr_new[x].stat!="ไม่พบ"){
                            arr_new[x].target="target?";
                            arr_new[x].link_drive="";
                            break;                  
                      }
    
                }
            }
        }
    }    
    
    console.log(arr_new)
          for(let i=0;i<arr_new.length;i++){
              if (arr_new[i].stat=='พบ'){found_arr.push(arr_new[i]);}
              if (arr_new[i].stat=='ระหว่างดำเนินการ'){during_arr.push(arr_new[i]);}
              if (arr_new[i].stat=='ไม่พบ'){notfound_arr.push(arr_new[i]);}
    
    
          }
    
    
    
    const data=[
                {color:{background:"#DFDED8"},title:"ที่ต้องตรวจค้นพบ",value:arr_new.length},
                {color:{background:"#C7F836"},title:"ตรวจพบ",value:found_arr.length},
                {color:{background:"#FC655D"},title:"ไม่พบ",value:notfound_arr.length},
                {color:{background:"#FFDB75"},title:"ระหว่างดำเนินการ",value:during_arr.length}
              ]    
        
        return (<> 
                  <Row xs="9" sm="9" md="9" lg="9" xl="9" xxl="9" style={{display: "flex",justifyContent: "center"}}>
                      <div   style={{borderBottom: "4px ridge"}}></div>
                  </Row>
                  <Row style={{display: "flex",justifyContent: "center"}}>
                      {data.map((elm)=>{
                                return <Col 
                                          xs="6" sm="auto" md="auto" lg="auto"
                                          style={{display: "flex",justifyContent: "center"}}
                                        >  
                                            <Alert style={elm.color} >   
                                                <div style={{textAlign:"center"}}>
                                                  <h5>{elm.title}</h5>
                                                </div>
                                                <div style={{textAlign:"center"}}>
                                                  <h5>{elm.value}</h5>
                                                </div>
                                            </Alert>                                     
                                        
                                        </Col>  })} 
                  </Row>
                  <Row style={{display: "flex",justifyContent: "center"}}>
    
                      {arr_new.map((lis)=>{//console.log("lis:",lis)
                                    lis.stat=="พบ"?licl="#C7F836":lis.stat=="ไม่พบ"?licl="#FC655D":lis.stat=="ระหว่างดำเนินการ"?licl="#FFDB75":licl="#D9DBDC"
                                    return(
                                            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto" 
                                                  style={{display: "flex",justifyContent: "center"}}
                                                >
                                                <Card style={{ width: '12rem',background:licl}} className='mt-3' >
                                                <Card.Header style={{textAlign:"center"}}>
                                                    <div style={{textAlign:"center"}}>
                                                      <Button href={lis.link_drive} target="_blank" variant="dark" size="sm">{lis.target==""?"target?":lis.target=="target?"?lis.target:`จุด${lis.target_search} ${lis.target}`}</Button>
                                                    </div>  
                                                </Card.Header>
                                                  <Card.Img variant="top" src={lis.link_pic.replace("file/d/","uc?id=")} style={{height:"10rem"}}/>
                                                  <Card.Body>
                                                      <div style={{textAlign:"center"}}>
                                                        {lis.name}
                                                      </div>
                                                      <div style={{textAlign:"center"}}>
                                                        {lis.detail1}
                                                      </div> 
                                                      <div style={{textAlign:"center"}}>
                                                        {lis.detail2}
                                                      </div>
                                                      <div  style={{borderBottom: "4px ridge"}}></div>
                                                      <div style={{textAlign:"center"}}>
                                                        {lis.stat}
                                                      </div>                 
                                                  </Card.Body>
                                                </Card>
                                            </Col>
                                          )
                  
                                          }
                                    )
                      }
                                      
                
                  </Row>
    
    
            </>)
    
        }else{return(<div className="justify-content-md-center"></div>)}
    
    
    
    
    
    
    }
    export default Found_must_all