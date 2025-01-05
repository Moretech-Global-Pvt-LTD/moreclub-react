import React from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import StationOrderDetailContent from './StationOrderDetailContent'
import { Placeholder } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const StationOrderDetailPage = () => {
    const { ord_id, id, name } = useParams();
    const slug = name.replace(/-/g, " ");

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Resturant Station order detail ${ord_id}`],
        queryFn: async () => {
            const response = await morefoodAuthenticatedAxios.get(
                `moreclub/station/restro/${id}/orders/${ord_id}/details/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10000,
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="row gap-2">
                    <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
                        <Placeholder xs={12} lg={6} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded  w-25">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
                        <Placeholder xs={12} style={{ height: "10rem" }} />
                    </Placeholder>
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout className="text-dynamic-white">
                Error: retriving
            </DashboardLayout>
        );
    }

  return (
      <DashboardLayout title={`${slug} #${data.order.order_id}`}><StationOrderDetailContent item={data}/></DashboardLayout>
  )
}

export default StationOrderDetailPage;