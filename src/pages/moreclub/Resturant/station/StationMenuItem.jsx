import React, { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import { useParams } from 'react-router-dom';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import RestaurantCardSkeleton from '../../../../components/Skeleton/RestaurantCardSkeleton';
import { axiosInstance } from '../../../..';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { morefoodURL } from '../../../../config/config';
import Cookies from "js-cookie"
import StationMenuFoodForm from '../../../../components/Moreclub/Resturant/station/StationMenuFoodForm';
import StationFoodCard from '../../../../components/Moreclub/Resturant/station/StationFoodCard';


const StationMenuItems = () => {

    const { res_id, stationId, slug , menuId , menuSlug} = useParams();
    const name = slug.replace(/-/g, " ");
    const menu= menuSlug.replace(/-/g, " ");
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Station Menu List for ${menuId}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/station/${stationId}/${menuId}/food-items/`, {
                headers: {
                    'x-country-code': Cookies.get("countryCode"),
                }
            }
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 1000,
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <RestaurantCardSkeleton />
            </DashboardLayout>
        );
    }

    if (isError) {
        return <DashboardLayout title={`${name} ${menu}`} className="text-dynamic-white">
            
        
            Error: retriving
        
        </DashboardLayout>;
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
                `${morefoodURL}moreclub/user/station/${stationId}/${menuId}/food-items/`,
                datas,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            queryClient.invalidateQueries({
                queryKey: [`Station Menu List for ${menuId}`],
            });

            return response; // Return the response directly
        } catch (error) {
            console.error("There was an error submitting the form:", error);
            throw error; // Rethrow the error to be caught in the calling function
        }
    };




    return (
        <DashboardLayout title={`${name} ${menu}`}>
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
                        Add Station MenuItems
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StationMenuFoodForm onSubmit={submit} onCancel={hideAddCategory} ButtonText={"Add Menu Items"} onFinish={hideAddCategory}/>
                </Modal.Body>
            </Modal>

            <Row
                xs={1}
                sm={1}
                md={1}
                lg={2}
                xl={2}
                xxl={3}
                className="gx-3 gy-3 my-4"
            >
                {data.map((item) => (
                    <Col className="d-flex flex-column">

                        <StationFoodCard
                            id={item.id}
                            logo={item.image}
                            name={item.name}
                            price={item.item_price}
                            short_description={item.short_description}
                            currency_Symbol={item.currency_symbol}
                            actual_price={item.actual_price}
                            discount_percentage={item.discount_percentage}
                            ingredient={item.ingredient}
                        />
                    </Col>
                ))}
            </Row>

            {data && data.length === 0 && (
                <p className="normal-case text-center">
                    Add some food items in your {name} Menu
                </p>
            )}

        </DashboardLayout>
    )
}

export default StationMenuItems