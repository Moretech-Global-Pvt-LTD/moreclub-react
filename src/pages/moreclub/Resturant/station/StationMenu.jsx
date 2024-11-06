import React, { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import { axiosInstance } from '../../../..';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { morefoodURL } from '../../../../config/config';
import Cookies from "js-cookie"
import MenuCategoryAddForm from '../../../../components/Moreclub/Resturant/common/MenuCategoryAddForm';
import StationMenuCard from '../../../../components/Moreclub/Resturant/station/StationMenuCard';
import StationLayout from '../../Station/StationLayout';


const StationMenu = () => {

    const { id, name } = useParams();
    const SlugName = name.replace(/-/g, " ");
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();
    
    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station Menu List  ${id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/station/${id}/menu/`, {
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
            <StationLayout title={`${SlugName} `
    } >
                <RestaurantCardSkeleton />
            </StationLayout>
        );
    }

    if (isError) {
        return <StationLayout title={`${SlugName} `} className="text-dynamic-white">Error: retriving</StationLayout>;
    }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }

    const submit = async (datas) => {
        try {
            const response = await axiosInstance.post(
                `${morefoodURL}moreclub/station/${id}/menu/`,
                datas,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            queryClient.invalidateQueries({
                queryKey: [`Station Menu List  ${id}`],
            });

            return response; // Return the response directly
        } catch (error) {
            console.error("There was an error submitting the form:", error);
            throw error; // Rethrow the error to be caught in the calling function
        }
    };


    return (
        <StationLayout title={`${SlugName} `}>
            <div className="d-flex align-items-center justify-content-start my-2 gap-2">
                {/* <Link to={`/resturant/${res_id}/station/${stationId}/orders/${slug}`} >
                    <Button variant="warning">
                        Station Orders
                    </Button>

                </Link>
                <Link to={`/resturant/${res_id}/${stationId}/allorders/${slug}`} >
                    <Button variant="warning">
                        All Food Orders
                    </Button>

                </Link> */}
            </div>
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
                    <MenuCategoryAddForm
                        onSubmit={submit}
                        onFinish={hideAddCategory}
                        onCancel={hideAddCategory}
                        initialMenuName=""
                        buttonText="Create Menu"
                    />
                
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
                        <StationMenuCard
                            id={item.id}
                            slug={SlugName}
                            stationId={id}
                            logo={item.icon ?? ""}
                            name={item.name ?? ""}
                            item={item.no_of_items}
                        />
                    </Col>
                ))}
            </Row>
            {data && data.length === 0 &&
                <p className="text-center">Add New Menu Category for your Station</p>
            }

        </StationLayout>
    )
}

export default StationMenu