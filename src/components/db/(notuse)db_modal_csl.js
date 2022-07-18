import React from 'react';
import Carousel , { Modal , ModalGateway } from 'react-images';
import { useState } from 'react'



const  Modal_csl=(prop)=>{

  const images = [{ src: "C:\Users\NaNaS\Pictures\zomm.jpg" }, { src: "C:\Users\NaNaS\Pictures\ประชุมสั่งการ กก.3.jpg" }];
  // const images = prop.data.map((elm)=>{{src:elm.pic_url.replace("file/d/","uc?id=")}})
  const [modalShow, setModalShow] = useState(prop.onHide);
  const [currentImage, setCurrentImage] = useState(0);
  const toggleModal = () => {
    // this.setState(state => ({ modalIsOpen: !modalShow }));
    setModalShow(!modalShow);
  }


    return (
      <ModalGateway>
         (
          <Modal onClose={toggleModal}>
            <Carousel views={images} />
          </Modal>
        )

        {/* {modalShow ? (
          <Modal onClose={toggleModal}>
            <Carousel views={images} />
          </Modal>
        ) : null} */}
      </ModalGateway>
    );
  }

export default Modal_csl