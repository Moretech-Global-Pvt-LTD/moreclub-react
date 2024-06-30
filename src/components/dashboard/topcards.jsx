import React from 'react'
import { Card } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Topcards = ({title, subtitle, icon, description, href}) => {
    
    return (
        <Col >
        <Link to={href}>
        <Card >
          <Card.Body>
            <Card.Title className='text-dynamic-white'>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
            <Card.Text className='text-end'>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
        </Link>
        
        </Col>
  )
}

export default Topcards;
