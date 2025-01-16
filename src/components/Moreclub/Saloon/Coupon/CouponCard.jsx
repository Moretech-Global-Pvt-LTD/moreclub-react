import React from 'react'
import { Modal } from 'react-bootstrap'
import CouponForm from './CouponForm'

import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import moment from 'moment';
import { moresalonAuthenticatedAxios } from '../../../../utills/axios/moresalonaxios';

const CouponCard = ({coupon }) => {

    const { id, } = useParams();
    const [showEditCoupon, setShowEditCoupon] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const queryClient = useQueryClient();


    const hideeditCoupon = async() => {setShowEditCoupon(false);}


    const handleDelete = async () => {
        setDeleting(true);
        try {
          await moresalonAuthenticatedAxios.delete(
            `moreclub/users/saloons/${id}/coupons/${coupon.id}/details/`
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
    <div className={`saloon-coupons-card `}>
    <div className="saloon-coupons-content">
      <h3 className="saloon-coupons-name">{coupon.code}</h3>
      <p className="saloon-coupons-discount">
        Discount: {coupon.fixed_discount || `${coupon.percentage_discount}%`}
      </p>
      <p className="saloon-coupons-dates">
      <strong>Validity:</strong> <br/>{moment(coupon.start_date).format("DD MMM, YY")}{" "}
      <strong> To </strong>  {moment(coupon.end_date).format("DD MMM, YY")} 
      </p>
      <div className="saloon-coupons-services">
        <h4>Services:</h4>
        <div className="saloon-coupons-badges">
          {coupon.services.map((service, index) => (
            <span key={index} className="saloon-coupons-badge">
              {service.name}
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
    <button
        className={` ${coupon.is_active ? "saloon-coupons-edit-btn" : "saloon-coupons-delete-btn"} coupons-activity`}
       
      >
        <strong className={ `${coupon.is_active ? "saloon-coupons-inactive" : "saloon-coupons-active"} fw-bold fs-6`}>&#8226;</strong> {coupon.is_active ? "Active" : "Inactive"}
      </button>
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
