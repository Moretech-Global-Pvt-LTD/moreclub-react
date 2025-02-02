import React from 'react'
import { Col, Row } from 'react-bootstrap'

const PartnerSkeleton = () => {
  return (
    
    <Row className="justify-content-center text-center gap-2 partner-skeleton-row">
    {Array.from({ length: 6 }).map((_, index) => (
      <Col xs={6} sm={3} lg={3} xxl={2} key={index} className="partner-skeleton-col">
        <div className="partner-skeleton-placeholder">
          <div className="partner-skeleton-image" />
          <div className="partner-skeleton-text" />
        </div>
      </Col>
    ))}
  </Row>
  
          
         
  )
}

export default PartnerSkeleton
