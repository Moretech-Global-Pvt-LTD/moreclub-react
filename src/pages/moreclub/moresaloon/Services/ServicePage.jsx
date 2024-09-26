import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { useParams } from 'react-router-dom';
import { moresaloonURL } from '../../../../config/config';
import { RestaurantItemskeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import ServiceCreateForm from '../../../../components/Moreclub/Saloon/Service/ServiceCreateForm';
import ServiceCard from '../../../../components/Moreclub/Saloon/Service/ServiceCard';


const ServicePage = () => {
  const { id, slug } = useParams();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Saloon service List ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${moresaloonURL}moreclub/users/saloons/${id}/services/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 100,
  });

  if (isLoading) {
    return (
      <Saloonlayout>
        <RestaurantItemskeleton />
      </Saloonlayout>
    );
  }

  if (isError) {
    return <Saloonlayout className="text-dynamic-white">Error: retriving</Saloonlayout>;
  }

  async function showAddCategory() {
    setShowForm(true);
  }

  async function hideAddCategory() {
    setShowForm(false);
  }



  return (
    <Saloonlayout>
      <div className="d-flex align-items-center justify-content-between my-2">
        <h4> Services Category</h4>
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddCategory()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddCategory()}>
            Add Category
          </Button>
        )}
      </div>
      

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showForm}
        onHide={hideAddCategory}

      >

        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
            Add Services
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceCreateForm id={id} onFinish={hideAddCategory} onCancel={hideAddCategory}/>
        </Modal.Body>

      </Modal>
      

      <Row
        xs={2}
        sm={3}
        md={4}
        lg={4}
        xl={5}
        xxl={6}
        className="gx-3 gy-3 my-4"
      >
        {data.map((item) => (
          <Col className="d-flex flex-column">
            <ServiceCard
              id={4}
              sal_id={id}
              logo={item.logo}
              name={item.name}
              sal_name={slug}
              item={item.variations?.length ?? 0}
            />
          </Col>
        ))}
        
      </Row>
      
      {data && data.length === 0 &&
        <p className="text-center">Add New Menu Category for your Resturant</p>
      }  
    </Saloonlayout>
  )
}

export default ServicePage
