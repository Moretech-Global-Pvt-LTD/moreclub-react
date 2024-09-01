import React from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import QRDownload from '../QR/QRDownload';

const BusinessDiscountCard = ({ item }) => {


    const [modalShow, setModalShow] = React.useState(false);
   





  return (
      <div className="d-flex align-items-center user-profile w-100 border-bottom p-3">
          {!item.business_type_icon ? (
              <div
                  className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                  style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                  }}
              >
                  {item.business_type_name.charAt(0)}

              </div>
          ) : (
              <img
                  src={`${item.business_type_icon}`}
                  style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                      backgroundColor: "#fff",
                  }}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3 profile-image"
              />
          )}
          <div className='d-flex w-100 ms-3 justify-content-between'>
              <div className="ms-3">
                  <Link to="/profile">
                      <h6 className="mb-0 text-dark fz-18">
                          {item.business_type_name}
                      </h6>
                  </Link>
                  <Link to="/profile">
                      <p className="text-dynamic-white my-0">
                          Discount: <span className='text-warning'>{item.business_type_discount}</span>
                      </p>
                  </Link>
              </div>
              <div className=''>
                  <Button variant="secondary" onClick={() => setModalShow(true)}>
                      View QR
                  </Button>
              </div>
          </div>
          <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header >
                  <Modal.Title closeButton id="contained-modal-title-vcenter " className='w-100' >
                      <div className='d-flex justify-content-between w-100 '>
                        {item.business_type_name}  QR
                      <Button variant='outline' className='text-black' onClick={() => setModalShow(false)}>X</Button>
                       
                     </div>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             
                  <Image
                      src={`${item.qr_code}`}
                      alt={`Qr Code for ${item.business_type_name}`}
                  />
                  <div className='d-flex justify-content-center'>
                  <QRDownload
                      imageUrl={`${item.qr_code}`}
                      name={`Merchant-qr_${item.business_type_name}}`}
                  />     
                  </div>
          </Modal.Body>
          
      </Modal>
      </div>
  )
}

export default BusinessDiscountCard

function QRcodeModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}