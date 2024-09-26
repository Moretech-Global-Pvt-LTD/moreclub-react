import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { useParams } from 'react-router-dom';
import { moresaloonURL } from '../../../../config/config';
import { RestaurantItemskeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import ServiceCreateForm from '../../../../components/Moreclub/Saloon/Service/ServiceCreateForm';
import CategoryCard from '../../../../components/Moreclub/Resturant/Menu/CategoryCard';
import ServiceVariationCard  from '../../../../components/Moreclub/Saloon/Service/ServiceVariationCard';

const ServiceVariationPage = () => {
    const { id, ser_id, slug , ser_name } = useParams();
    const [showForm, setShowForm] = useState(false);
    const service_name = ser_name.replace(/-/g, "");
    // const { data, isLoading, isError } = useQuery({
    //     queryKey: [`Saloon service List ${id}`],
    //     queryFn: async () => {
    //         const response = await axiosInstance.get(
    //             `${moresaloonURL}moreclub/user/saloon/${id}/`
    //         );
    //         const data = await response.data.data;
    //         return data;
    //     },
    //     staleTime: 100,
    // });

    // if (isLoading) {
    //     return (
    //         <Saloonlayout>
    //             <RestaurantItemskeleton />
    //         </Saloonlayout>
    //     );
    // }

    // if (isError) {
    //     return <Saloonlayout className="text-dynamic-white">Error: retriving</Saloonlayout>;
    // }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }



    return (
        <Saloonlayout>
            <div className="d-flex align-items-center justify-content-between my-2">
                <h4> {service_name} Variation</h4>
                {showForm ? (
                    <Button variant="danger" onClick={() => hideAddCategory()}>
                        Cancel
                    </Button>
                ) : (
                    <Button variant="warning" onClick={() => showAddCategory()}>
                        Add Variations
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
                    <ServiceCreateForm id={id} onFinish={hideAddCategory} onCancel={hideAddCategory} />
                </Modal.Body>

            </Modal>


            {/* <Row
                xs={1}
                sm={1}
                md={2}
                lg={3}
                xl={3}
                xxl={4}
                className="gy-3 my-4"
            > */}
                <div className="service-variation-container" >
                <ServiceVariationCard/>
                 <ServiceVariationCard/> <ServiceVariationCard/> <ServiceVariationCard/> <ServiceVariationCard/>
                </div>
                
              
                
                {/* {data.map((item) => (
          <Col className="d-flex flex-column">
            <CategoryCard
              id={item.id}

              res_id={id}
              logo={item.menu.icon}
              name={item.menu.name}
              item={item.no_of_items}
            />
          </Col>
        ))} */}
            {/* </Row> */}
            {/* {data && data.length === 0 &&
        <p className="text-center">Add New Menu Category for your Resturant</p>
      }   */}
        </Saloonlayout>
    )
}

export default ServiceVariationPage
