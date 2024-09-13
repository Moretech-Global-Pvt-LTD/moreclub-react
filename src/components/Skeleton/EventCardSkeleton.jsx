import React from 'react'
import { Col, Placeholder, Row } from 'react-bootstrap'

const CardSkeleton = () => {
    return (
      <div class="event-card-container">
      <div class="event-card">
        <div class="event-card-image">
          <Placeholder as="div" animation="wave">
                        <Placeholder xs={12} style={{height:"6rem"}} />
            </Placeholder>
        </div>
        <div class="event-card-details">
            <Placeholder as="p" animation="wave">
                    <Placeholder xs={12} />
                    <Placeholder xs={10} />
                    <Placeholder xs={8} />
                </Placeholder>
          
                    <Placeholder.Button variant='secondary' style={{width:"5rem"}} />
        </div>
        
      </div>
    </div>
    )
}



const EventCardSkeleton = () => {
    return (
        <Row>
            <Col md={12}>
            <div className="d-flex flex-wrap gap-4 mt-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>

            </Col>

        </Row>
    )
}

export default EventCardSkeleton