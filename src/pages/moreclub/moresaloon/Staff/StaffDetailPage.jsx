import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import StaffDetail from '../../../../components/Moreclub/Saloon/Staff/StaffDetail'
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TimeSlotForm from '../../../../components/Moreclub/Saloon/Staff/TimeSlot';
import { axiosInstance } from '../../../..';
import { moresaloonURL } from '../../../../config/config';

const StaffDetailPage = () => {
    const { id, slug, staff_id, staff_name } = useParams();
    const [showForm, setShowForm] = useState(false);

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }

    async function logFormData(openingHours) {
        try{
           const response = await axiosInstance.post(`${moresaloonURL}moreclub/users/saloons/${id}/staff/${staff_id}/working-days/`, openingHours)
            return response;
        } catch (err) {
            return err.response;
        }
    }
    


  return (
      <Saloonlayout>
          <div className="d-flex align-items-center justify-content-between my-2">
              <h4> {staff_name}</h4>
              {showForm ? (
                  <Button variant="danger" onClick={() => hideAddCategory()}>
                      Cancel
                  </Button>
              ) : (
                  <Button variant="warning" onClick={() => showAddCategory()}>
                      Add Slot
                  </Button>
              )}
          </div>
          <StaffDetail />
          <TimeSlotForm  submitFunction={logFormData} />
    </Saloonlayout>
  )
}

export default StaffDetailPage