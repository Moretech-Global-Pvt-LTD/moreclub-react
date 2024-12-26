import React from 'react'
import { Modal } from 'react-bootstrap'
import CouponForm from './CouponForm'
import { axiosInstance } from '../../../..';
import { moresaloonURL } from '../../../../config/config';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const CouponCard = ({coupon }) => {

    const { id, } = useParams();
    const [showEditCoupon, setShowEditCoupon] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const queryClient = useQueryClient();


    const hideeditCoupon = async() => {setShowEditCoupon(false);}


    const handleDelete = async () => {
        setDeleting(true);
        try {
          await axiosInstance.delete(
            `${moresaloonURL}moreclub/users/saloons/${id}/coupons/${coupon.id}/details/`
          );
          queryClient.invalidateQueries({
            queryKey: [`Coupon List ${id}`],
          });
          message.success("Coupon Deleted successfully");
        } catch (err) {
          message.error("error deleting");
          queryClient.invalidateQueries({
            queryKey: [`Coupon List ${id}`],
          });
        }finally{
            setDeleting(false);
        }
    }

  return (
    <>
    <div className="saloon-coupons-card">
    <div className="saloon-coupons-content">
      <h3 className="saloon-coupons-name">{coupon.code}</h3>
      <p className="saloon-coupons-discount">
        Discount: {coupon.fixed_discount || `${coupon.percentage_discount}%`}
      </p>
      <p className="saloon-coupons-dates">
        Valid from: <strong>{new Date(coupon.start_date).toLocaleString()}</strong>{" "}
        to <strong>{new Date(coupon.end_date).toLocaleString()}</strong>
      </p>
      <p className="saloon-coupons-status">
        Status:{" "}
        <span
          className={
            coupon.is_active
              ? "saloon-coupons-active"
              : "saloon-coupons-inactive"
          }
        >
          {coupon.is_active ? "Active" : "Inactive"}
        </span>
      </p>
      <p className="saloon-coupons-global">
        Global:{" "}
        <span
          className={
            coupon.is_global
              ? "saloon-coupons-active"
              : "saloon-coupons-inactive"
          }
        >
          {coupon.is_global ? "Yes" : "No"}
        </span>
      </p>
      <div className="saloon-coupons-services">
        <h4>Services:</h4>
        <div className="saloon-coupons-badges">
          {coupon.services.map((service, index) => (
            <span key={index} className="saloon-coupons-badge">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="saloon-coupons-actions">
      <button
        className="saloon-coupons-edit-btn"
        onClick={() => setShowEditCoupon(true)}
      >
        ✏️ Edit
      </button>
      <button
        className="saloon-coupons-delete-btn"
        onClick={() => handleDelete()}
        disabled={deleting}
      >
        {deleting ? <span className="spinner-border spinner-border-sm"></span> : "❌"}
         Delete
      </button>
    </div>
  </div>

  <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
                show={showEditCoupon}
                onHide={hideeditCoupon}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        <h5>Edit Coupon</h5> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CouponForm mode={"update"} initialData={coupon} onFinish={hideeditCoupon}/>
                   
                </Modal.Body>
            </Modal>   
    
    </>

  )
}

export default CouponCard
