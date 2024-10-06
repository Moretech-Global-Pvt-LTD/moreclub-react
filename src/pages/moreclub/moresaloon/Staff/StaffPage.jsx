import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { useParams } from 'react-router-dom';
import { moresaloonURL } from '../../../../config/config';
import { RestaurantItemskeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import ServiceCard from '../../../../components/Moreclub/Saloon/Service/ServiceCard';
import StaffCreationForm from '../../../../components/Moreclub/Saloon/Staff/StaffCreationForm';
import StaffCard from '../../../../components/Moreclub/Saloon/Staff/StaffCard';


const StaffPage = () => {
  const { id, slug } = useParams();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Saloon Staff List ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${moresaloonURL}moreclub/users/saloons/${id}/staff/`
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
    return <Saloonlayout className="text-dynamic-white">Error: retriving
    </Saloonlayout>;
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
        <h4> Staff List</h4>
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddCategory()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddCategory()}>
            Add Staff
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
            Add Staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StaffCreationForm id={id} onFinish={hideAddCategory} onCancel={hideAddCategory} />
        </Modal.Body>

      </Modal>


      <Row
        xs={1}
        sm={2}
        md={3}
        lg={3}
        xl={4}
        xxl={5}
        className="gx-3 gy-3 my-4"
      >
        {data.map((item) => {
          return(
          <Col className="d-flex flex-column">
            <StaffCard
              id={item.id}
              sal_id={id}
              profile={item.image}
              name={item.name}
              sal_name={slug}
              item={item}
              email={item.email}
              contact={item.contact_no}
              services={item.services}
            />
          </Col>
        
          )}
        )}

      </Row>


      {data && data.length === 0 &&
        <p className="text-center">Add Staff for your Saloon</p>
      }


    </Saloonlayout>
  )
}

export default StaffPage
