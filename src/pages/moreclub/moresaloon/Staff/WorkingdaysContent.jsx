import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { RestaurantItemskeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import TimeSlotForm from '../../../../components/Moreclub/Saloon/Staff/TimeSlot';
import Workingdays from '../../../../components/Moreclub/Saloon/Staff/TimeSlotUpdate';
import { moresalonAuthenticatedAxios } from '../../../../utills/axios/moresalonaxios';

const WorkingdaysContent = () => {

    const { id,  staff_id } = useParams();
    const [edit, setEdit] = useState(false);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Saloon Staff Working days ${staff_id}`],
        queryFn: async () => {
            const response = await moresalonAuthenticatedAxios.get(
                `moreclub/users/saloons/${id}/staff/${staff_id}/working-days/`
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
            const response = await moresalonAuthenticatedAxios.post(`moreclub/users/saloons/${id}/staff/${staff_id}/working-days/`, openingHours)
            queryClient.invalidateQueries({
                queryKey: [`Saloon Staff Working days ${staff_id}`],
            });
            setEdit(false)
            return response;
        } catch (err) {
            return err.response;
        }
    }

    async function updateWokingData(openingHours) {
            try {
                const response = await moresalonAuthenticatedAxios.patch(`moreclub/users/saloons/${id}/staff/${staff_id}/working-days/detail/`, openingHours)
                queryClient.invalidateQueries({
                    queryKey: [`Saloon Staff Working days ${staff_id}`],
                });
                setEdit(false)
                return response;
            } catch (err) {
                return err.response;
            }
    }

    const openEdit = () => {
        setEdit(true);
    }

  return (
      <>
          {data && data.length > 0 &&
              <>
              {edit ? <TimeSlotForm existingdata={data} submitFunction={updateWokingData} /> :
              <Workingdays existingdata={data} edit={openEdit} />
              }              
              </>
          }

          {data && data.length === 0 &&
              <TimeSlotForm submitFunction={logFormData} />
          }
      </>
  )
}

export default WorkingdaysContent