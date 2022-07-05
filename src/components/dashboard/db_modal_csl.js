import { Container,Row,Alert,Col,Badge,Image,Modal,Card,Button,ProgressBar,Form,Nav,Navbar,Offcanvas,NavDropdown,Carousel,ModalDialog } from 'react-bootstrap'

const Modal_csl =(props)=> {

    //if(props.bol==true){
          return (<>
                    <Modal
                          {...props} 
                          
                          animation={true} 
                          size="xxl"
                          fullscreen="xxl"
                        
                          centered
                          >
                    <Modal.Header  closeButton>
            <Modal.Title style={{textAlign:"center"}}>

              
            </Modal.Title>                      
                    </Modal.Header>
                          <div>
                      
                                                      <Carousel>
                                <Carousel.Item>
                                    <img
                                      className="d-block w-100"
                                      src="https://drive.google.com/uc?id=1AqXoYl1KVSGZ9qX1IeT-v671iYQVLYwo"
                                      alt="First slide"
                                    />
                                    <Carousel.Caption>
                                          <h3>First slide label</h3>
                                              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                      className="d-block w-100"
                                      src="https://drive.google.com/uc?id=1EozL0u3pr7IuO2Lyo2_Tf1haqdTUjkuk"
                                      alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                      <h3>Second slide label</h3>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                      className="d-block w-100"
                                      src="https://drive.google.com/uc?id=1csHpKJCOA4ILgyzhlQO7P2_vJ-o_6hLi"
                                      alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                      <h3>Third slide label</h3>
                                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel> 
                       
                        
                      
                    </div>
                    </Modal>
                  </>);


}
export default Modal_csl