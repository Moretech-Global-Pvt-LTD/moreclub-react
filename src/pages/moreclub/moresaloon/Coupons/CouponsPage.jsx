import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import CouponForm from '../../../../components/Moreclub/Saloon/Coupon/CouponForm'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../../../..'
import { moresaloonURL } from '../../../../config/config'
import CouponCard from '../../../../components/Moreclub/Saloon/Coupon/CouponCard'
import { Button, Modal } from 'react-bootstrap'
import Divider from '../../../../components/divider/Divider'

const CouponsPage = () => {


  const {id}= useParams();
   const [showForm, setShowForm] = useState(false);


  const { data, isLoading, isError} = useQuery({
    queryKey: [`Coupon List ${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${moresaloonURL}moreclub/users/saloons/${id}/coupons/list/`
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if(isLoading){  
    <Saloonlayout>
    <p>Loading</p>
  
</Saloonlayout>

  }

  if(isError){
    <Saloonlayout>
      <p>Something went wrong</p>
    </Saloonlayout>
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
        <h4>Available Coupons</h4>
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddCategory()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddCategory()}>
            Add Coupons
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
        <CouponForm  onFinish={hideAddCategory}/>
        </Modal.Body>

      </Modal>
       
        <div className='Coupon-Container'>
       {data  && data.length > 0 && data?.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon}/>
        ))}
       

        </div>
        {data  && data.length === 0 && (
          <div className="text-center text-dynamic-white w-100">No Coupons Found
          <Divider/>
          <Divider/>
          </div>

        )}
      
    </Saloonlayout>
  )
}

export default CouponsPage
