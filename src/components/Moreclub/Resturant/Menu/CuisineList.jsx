import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import CuisineCard from '../Cuisine/CuisineCard';
import { useParams } from 'react-router-dom';

const CuisineList = () => {
    const { res_id } = useParams();

    const menus = useSelector((state) => state.menus);

  return (
    <>
    <Row
    xs={2}
    sm={3}
    md={4}
    lg={4}
    xl={6}
    xxl={8}
    className="gx-3 gy-3 my-4"
>
    {menus.cuisineList.map((item) => (
        <Col className="d-flex flex-column" key={item.id}>
            <CuisineCard
                id={item.id}
                items={item}
                res_id={res_id}
                logo={item.image}
                name={item.name}
                item={item.no_of_items}
            />
        </Col>
    ))}
</Row>
{menus.cuisineList && menus.cuisineList.length === 0 && (
          <p className="normal-case text-center">
            Add some Cuisine for your restaurant
          </p>
        )}
    </>
  )
}

export default CuisineList
