import { Container,Row,Alert,Col,Badge,Image,Modal,Card,Button,ProgressBar,Form,Nav,Navbar,Offcanvas,NavDropdown,Carousel,ModalDialog } from 'react-bootstrap'

const Modal_c =(props)=> {

    const {show,data,onHide}=props
    let in_data={}
    if(data===undefined){
    
    console.log(true)
    in_data={point:"",name:"",status:"",reporter:"",current_check_list:[],end_check_list:[],pic_url:""}
    }else{in_data=data}
    //
    console.log("from modal",in_data)
    let bg_color=""
    switch (in_data.stat) {
    case "ready":
    bg_color="#90EFF9"
    break;
    case "start":
    bg_color="#F3FA50"
    break;
    case "current":
    bg_color="#F1C068"
    break;
    case "end":
    bg_color="#66F530"
    break;
    case "danger":
    bg_color="#C80C09"
    break;
    }
    console.log("eval:",eval(in_data))
    const arr=eval(in_data.current_check_list)
    const arr_end=eval(in_data.end_check_list)
    console.log(arr)
    let cl
    return (<>
              <Modal
                    {...props} 
                    animation={true} 
                    size="xl"

                    dialogClassName="modal-90w"

                  >

<Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>


    
              </Modal>
            </>);
    }
    export default Modal_c