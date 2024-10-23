import React, { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import StationSetupForm from '../../../../components/Moreclub/Resturant/station/StationSetuppage';
import StationCard from '../../../../components/Moreclub/Resturant/station/StationCard';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import Cookies from "js-cookie"

const StationPage = () => {

    const { res_id, slug } = useParams();
    const [showForm, setShowForm] = useState(false);


    const name = slug.replace(/-/g, " ")
    

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station List  ${res_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}restaurants/station/list/`, {
                headers: {
                    'x-country-code': Cookies.get("countryCode"),
                }
            }
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <RestaurantCardSkeleton/>
            </DashboardLayout>
        );
    }

    if (isError) {
        return <DashboardLayout className="text-dynamic-white">Error: retriving</DashboardLayout>;
    }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }


    return (
        <DashboardLayout title={`${name} Stations`} >
            <div className="d-flex align-items-center justify-content-end my-2">
               
                {showForm ? (
                    <Button variant="danger" onClick={() => hideAddCategory()}>
                        Cancel
                    </Button>
                ) : (
                    <Button variant="warning" onClick={() => showAddCategory()}>
                        Add Station
                    </Button>
                )}
            </div>


            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
                show={showForm}
                onHide={hideAddCategory}
            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        Add Station
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StationSetupForm onFinish={hideAddCategory} onCancel={hideAddCategory} />
                </Modal.Body>

            </Modal>
            
            <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
                {data.map((item) => (
                    <Col className="d-flex flex-column">

                        <StationCard
                            res_id={res_id}
                            id={item.id}
                            name={item.name}
                            address={item.address}
                            banner={item.banner}
                        />
                    </Col>
                ))}
            </Row>



        </DashboardLayout>
    )
}

export default StationPage