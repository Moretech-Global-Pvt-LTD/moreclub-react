import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { useParams } from 'react-router-dom';
import { moresaloonURL } from '../../../../config/config';
import { RestaurantItemskeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import { Button, Modal} from 'react-bootstrap';
import ServiceVariationCard from '../../../../components/Moreclub/Saloon/Service/ServiceVariationCard';
import ServiceVariationCreationForm from '../../../../components/Moreclub/Saloon/Service/ServiceVariationCreationForm';

const ServiceVariationPage = () => {
    const { id, ser_id, ser_name } = useParams();
    const [showForm, setShowForm] = useState(false);
    const service_name = ser_name.replace(/-/g, " ");
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Saloon variation List ${id} ${ser_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${moresaloonURL}moreclub/users/saloons/${id}/services/${ser_id}/variations/`
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
                        Add Services Variations
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ServiceVariationCreationForm ser_id={ser_id} sal_id={id} onFinish={hideAddCategory} onCancel={hideAddCategory} />
                </Modal.Body>
            </Modal>

            <div className="service-variation-container" >
                {data.map((item) => (
                    <ServiceVariationCard
                        ser_id={ser_id}
                        id={item.id}
                        sal_id={id}
                        item={item}
                        key={item.id}
                    />
                ))}
            </div>




            {/* </Row> */}
            {data && data.length === 0 &&
                <p className="text-center">Add New Service Variation for your Salon</p>
            }
        </Saloonlayout>
    )
}

export default ServiceVariationPage
