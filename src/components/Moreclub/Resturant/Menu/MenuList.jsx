import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const MenuList = () => {
const { res_id, slug } = useParams();

const menus = useSelector((state) => state.menus);

  return (
    <>
     <Row
        xs={2}
        sm={3}
        md={4}
        lg={4}
        xl={5}
        xxl={6}
        className="gx-3 gy-3 my-4"
      >
        {menus.menuList.map((item) => (
          <Col className="d-flex flex-column" key={item.id}>
            <CategoryCard
              id={item.id}
              res_id={res_id}
              logo={item.icon?? ""}
              name={item.name?? ""}
              item={item.no_of_items}
              slug={slug}
              data={item}
            />
          </Col>
        ))}
      </Row>
    {menus.menuList && menus.menuList.length === 0 && (
          <p className="normal-case text-center">
            Add some Menu for your restaurant
          </p>
        )}
    </>
   
  )
}

export default MenuList
