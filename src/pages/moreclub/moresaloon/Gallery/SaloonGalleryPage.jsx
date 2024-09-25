import React from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { Col, Image, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const SaloonGalleryPage = () => {

  const { id,  slug } = useParams();


  return (
    <Saloonlayout><div className="d-flex align-items-center my-2">


      <Row xs={2} lg={3} xl={4} className="px-1 " >
        <Col className="">
          <Link to={`/saloon/${id}/gallery/${slug}/saloon`} className="card bg-secondary">
            <Image
              src={'/images/moreclub/morefood/Restaturant.png'}
              alt="Saloon Gallery"
              className="px-0"
            />
            <div>
              <p className="text-center pt-2 text-white">Saloon Gallery</p>
            </div>
          </Link>

        </Col>
        <Col className=" ">
          <Link to={`/saloon/${id}/gallery/${slug}/user-upload`} className="card bg-secondary">
            <Image
              src={`/images/moreclub/morefood/user.png`}
              alt="User Gallery"
              className=""
            />
            <div>
              <p className="text-center pt-2 text-white">User Gallery</p>
            </div>
          </Link>

        </Col>

      </Row>




    </div>
    </Saloonlayout>
  )
}

export default SaloonGalleryPage