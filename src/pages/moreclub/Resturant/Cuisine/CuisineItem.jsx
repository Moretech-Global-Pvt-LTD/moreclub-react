import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import AddCuisineForm from "../../../../components/Moreclub/Resturant/Cuisine/AddCuisine";
import CuisineCard from "../../../../components/Moreclub/Resturant/Cuisine/CuisineCard";
import { RestaurantItemskeleton } from "../../../../components/Skeleton/SmallCardSkeleton";

const CuisineItem = () => {
    const { res_id } = useParams();
    const [showForm, setShowForm] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant Cuisine List ${res_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/cuisines/${res_id}/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 60000,
    });

    if (isLoading) {
        return (
            <RestaurantItemskeleton />
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving</div>;
    }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between my-2">
                <h4> Cuisines</h4>
                {showForm ? (
                    <Button variant="danger" onClick={() => hideAddCategory()}>
                        Cancel
                    </Button>
                ) : (
                    <Button variant="warning" onClick={() => showAddCategory()}>
                        Add Cuisine
                    </Button>
                )}
            </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size=""
                centered
                show={showForm}
                onHide={hideAddCategory}
            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        Add Cuisines
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddCuisineForm res_id={res_id} onFinish={hideAddCategory} />
                </Modal.Body>

            </Modal>
            <Row
                xs={2}
                sm={3}
                md={4}
                lg={4}
                xl={6}
                xxl={8}
                className="gx-3 gy-3 my-4"
            >
                {data.map((item) => (
                    <Col className="d-flex flex-column">
                        <CuisineCard
                            id={item.id}
                            res_id={res_id}
                            logo={item.image}
                            name={item.name}
                            item={item.no_of_items}

                        />
                    </Col>
                ))}
            </Row>
            {data && data.length === 0 &&
                <p className="text-center">Add Cuisine for your Resturant</p>
            }
        </div>
    );
};

export default CuisineItem;
