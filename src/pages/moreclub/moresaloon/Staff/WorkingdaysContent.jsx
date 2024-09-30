import React from 'react'
import { moresaloonURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Saloonlayout from '../setup/Saloonlayout';
import { RestaurantItemskeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import TimeSlotForm from '../../../../components/Moreclub/Saloon/Staff/TimeSlot';
import TimeSlotUpdateForm from '../../../../components/Moreclub/Saloon/Staff/TimeSlotUpdate';

const WorkingdaysContent = () => {

    const { id, slug, staff_id, staff_name } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Saloon Staff Working days ${staff_id}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${moresaloonURL}moreclub/users/saloons/${id}/staff/${staff_id}/working-days/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 100,
    });

    if (isLoading) {
        return (
            <div>
                <RestaurantItemskeleton />
            </div>
        );
    }

    if (isError) {
        return <div className="text-dynamic-white">Error: retriving
        </div>;
    }

    async function logFormData(openingHours) {
        try {
            const response = await axiosInstance.post(`${moresaloonURL}moreclub/users/saloons/${id}/staff/${staff_id}/working-days/`, openingHours)
            return response;
        } catch (err) {
            return err.response;
        }
    }

    async function updateWokingData(openingHours) {
        console.log("openingHours", openingHours)
        // if (openingHours.id) {
        //     try {
        //         const response = await axiosInstance.patch(`${moresaloonURL}moreclub/users/saloons/${id}/staff/${staff_id}/working-days/${openingHours.id}/`, openingHours)
        //         return response;
        //     } catch (err) {
        //         return err.response;
        //     }
            
        // } else {
            try {
                const response = await axiosInstance.patch(`${moresaloonURL}moreclub/users/saloons/${id}/staff/${staff_id}/working-days/detail/`, openingHours)
                return response;
            } catch (err) {
                return err.response;
            }
        // }
    }


  return (
      <div>
          {data && data.length > 0 &&
            //   <TimeSlotUpdateForm existingdata={data} submitFunction={updateWokingData} />
              <TimeSlotForm existingdata={data} submitFunction={updateWokingData} />
              
          }

          {data && data.length === 0 &&
              <TimeSlotForm submitFunction={logFormData} />
              
          }
      </div>
  )
}

export default WorkingdaysContent