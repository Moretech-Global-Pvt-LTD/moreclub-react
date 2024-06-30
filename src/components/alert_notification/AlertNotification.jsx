import React, { useEffect, useState } from 'react'
import { alertNotification } from '../../redux/api/notification';
import { Link } from 'react-router-dom';


const AlertNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
    alertNotification()
        .then(response => {
        setNotifications(response.data.data);
        setLoading(false);
        })
        .catch(error => {
        console.error('Error fetching notifications:', error);
        });
    }, []);
  return (
    <>
    {!loading ? (
        
    
    <>
        <div className="notification-content-wrap">
        <ul className="notification-list ps-0 mb-2 mt-1 row justify-content-end ">
        { notifications?.business_profile === false &&  (
        <li className="col-12 col-lg-6 col-xl-6">
            <Link to="/business/update" className='bg-danger'>
                <i class="me-2 bg- bi bi-building"></i><span style={{fontSize:"12px"}}>Upload your business document to be verified for business.</span>
                <span class="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                Click Here
                </span>
            </Link>
            </li>
        )}
        { !notifications.kyc &&  (
        <li className="col-12 col-lg-6 col-xl-6 ">
            <Link to="/KYC/update" className='bg-danger'>
                <i class="me-2 bg- bi bi-building"></i><span style={{fontSize:"12px"}}>Verify your KYC Form.</span>
                <span class="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                Click Here
                </span>
            </Link>
            </li>
        )}



        {!notifications.phone_verified && (
        <li className="col-12 col-lg-6 col-xl-6">
            <Link to="/otp-phone" className='bg-danger'>
                <i class="me-2 bg- bi bi-phone"></i><span style={{fontSize:"12px"}}>Please verify your phone Number.</span>
                <span class="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                Click Here
                </span>
            </Link>
            </li>
        )}

        </ul>
        </div>
    </>
    ):null}
    </>
  )
}

export default AlertNotification