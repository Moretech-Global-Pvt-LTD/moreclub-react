import React, { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import { axiosInstance } from '../../../..';
import { useQuery } from '@tanstack/react-query';
import { morefoodURL } from '../../../../config/config';
import Cookies from "js-cookie"
import StationMenuFoodForm from '../../../../components/Moreclub/Resturant/station/StationMenuFoodForm';
import StationMenuForm from '../../../../components/Moreclub/Resturant/station/StationMenuForm';


const StationMenu = () => {

    const { res_id, stationId, slug } = useParams();
    const name = slug.replace(/-/g, " ");
    const [showForm, setShowForm] = useState(false);


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
                <RestaurantCardSkeleton />
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
        <DashboardLayout title={`${name} Menu`}>
            <div className="d-flex align-items-center justify-content-end my-2">

                {showForm ? (
                    <Button variant="danger" onClick={() => hideAddCategory()}>
                        Cancel
                    </Button>
                ) : (
                    <Button variant="warning" onClick={() => showAddCategory()}>
                        Add Station Menu
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
                        Add Station Menu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StationMenuForm />
                </Modal.Body>

            </Modal>
        
        </DashboardLayout>
    )
}

export default StationMenu