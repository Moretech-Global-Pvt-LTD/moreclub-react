import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { axiosInstance } from '../..';
import { baseURL } from '../../config/config';
import { Button, Card, Modal, Placeholder } from 'react-bootstrap';
import { businessQRInfoSuccess } from '../../redux/slices/businessSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import BusinessDiscountCard from './BusinessDiscountCard';
import BusinessDiscountForm from './BusinessDiscountForm';


const BusinessInfo = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [showForm, setShowForm] = useState(queryParams.get('q') ?? false);
    const businessProfiles = useSelector((state) => state.businessReducer);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["business qr and  info discount"],
        queryFn: async () => {
            const response = await axiosInstance.get(`${baseURL}business/qr/code/`);
            const data = await response.data.data;
            await dispatch(businessQRInfoSuccess(data));
            return data;
        },
        staleTime: 60000,
    });

    if (isLoading) {
        return (
            <>
                <Placeholder as="p" animation="glow" className="rounded">
                    <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
                </Placeholder>
            </>
        );
    }

    if (isError) {
        <div className="text-dynamic white">Error getting page data</div>;
    }


    async function showAddCategory() {
        setShowForm(true);
      }
    
      async function hideAddCategory() {
        setShowForm(false);
      }


    return (
        <>
        <div className='d-flex flex-column my-4'>
            <Card className='p-2'>
                <div className='d-flex justify-content-between align-items-center'>
                <h5>Business Discounts</h5>
                <Button className='btn btn-warning ' size='sm' onClick={showAddCategory}>Add New</Button>
                </div>
                <div className='d-flex flex-column gap-3'>
                    {businessProfiles?.businessQRInfo && businessProfiles.businessQRInfo?.map((item) => (
                        <BusinessDiscountCard item={item} key={item.business_type_name} />
                    ))}
                </div>
            </Card>
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
           <h6>Add Business Discount</h6> 
          </Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <BusinessDiscountForm  onClose={hideAddCategory}/>
            </Modal.Body>
            
        </Modal>
        </>
    )
}

export default BusinessInfo