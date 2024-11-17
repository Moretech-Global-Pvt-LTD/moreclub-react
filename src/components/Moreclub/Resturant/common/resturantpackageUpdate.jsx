import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { message } from 'antd';

const ResturantpackageUpdate = ({ id }) => {
 
    const [showPackageForm, setShowPackageForm] = useState(false);
    const [stationMaxPackage, setStationMaxPackage] = useState("");
    const [loading, setLoading] = useState(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: [`max station Package for ${id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/user/restaurants/${id}/max-package/update/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10000,
    });

    useEffect(() => {
        if (data) {
            setStationMaxPackage(data.station_no_of_packed_item)  
        }

    }, [data])

    if (isLoading) {
        return (
            <div>Max package: <span
                class="spinner-border spinner-border-sm text-warning"
                role="status"
            ></span></div>
        );
    }

    if (isError) {
        return <div>Max package: Error getting data</div>;
    }


    

    async function showAddCategory() {
        setShowPackageForm(true);
    }

    async function hideAddCategory() {
        setShowPackageForm(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res =await axiosInstance.patch(`${morefoodURL}moreclub/user/restaurants/${data.id}/`,
                {
                    "station_no_of_packed_item": stationMaxPackage
                }
            )
            setStationMaxPackage(res.data.data.station_no_of_packed_item);
            setShowPackageForm(false);
            message.success("updated successfully")
        } catch (err) {
            console.log(err.response);
            setStationMaxPackage(data.station_no_of_packed_item);
            message.error("error updating")
        } finally {
            setLoading(false);
        }
    }


    return (
      <>
            <div className="text-dynamic-white m-2"><strong>Max package:</strong> <span className='text-dynamic-white fs-5 fw-bold ms-2'>{stationMaxPackage}</span> <i className="bi bi-pencil-square mx-2" style={{cursor:"pointer"}} onClick={showAddCategory}></i> </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="sm"
                centered
                show={showPackageForm}
                onHide={hideAddCategory}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        <h5>Update your limit</h5> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className="" >
                        
                          
                            <Col>
                                <Form.Group controlId="formItemPrice">
                                    <Form.Label>Retailer Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter item price"
                                    name="station_no_of_packed_item"
                                        value={stationMaxPackage}
                                        onChange={(e)=>setStationMaxPackage(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            

                     
                        <div className='d-flex justify-content-end gap-2'>

                        <Button
                            size='sm'
                            variant="secondary"
                            onClick={hideAddCategory}
                            className="my-3"

                        >
                            
                            Cancel
                        </Button>

                      

                        <Button
                            size='sm'
                            variant="success"
                            type="submit"
                            className="my-3"
                           
                        >
                            {loading && (
                                <span
                                    class="spinner-border spinner-border-sm text-warning"
                                    role="status"
                                ></span>
                            )}
                            Update
                        </Button>
                        </div>
                    </Form>
                   
                </Modal.Body>
            </Modal>      
      </>
  )
}

export default ResturantpackageUpdate