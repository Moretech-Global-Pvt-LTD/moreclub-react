import React from 'react'
import { Placeholder } from 'react-bootstrap'
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import OfferForm from '../../../../components/Moreclub/Resturant/Offer/AddOffer';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const UpdateOffer = () => {
    const { res_id , offer_id} = useParams();

    const { data, isLoading, isError } = useQuery({
      queryKey: [`Resturant offer detail ${offer_id}`],
      queryFn: async () => {
        const response = await morefoodAuthenticatedAxios.get(
          `moreclub/user/offers/${res_id}/${offer_id}/`
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 60000,
    });
  
    if (isLoading) {
      return (
        <RestaurantLayout>
          <div className=" card row gap-2">
            <Placeholder as="p" animation="glow" className="rounded w-50 me-2">
              <Placeholder xs={12} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
              <Placeholder xs={12} style={{ height: "4rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-100">
              <Placeholder xs={12} style={{ height: "4rem" }} />
            </Placeholder>
          </div>
        </RestaurantLayout>
      );
    }
  
    if (isError) {
      return <RestaurantLayout className="text-dynamic-white">Error: retriving</RestaurantLayout>;
    }



    const convertTimeStringToLocalDate = (timeString) => {
      if (!timeString) return null; // Handle empty strings or undefined values
      const [hours, minutes] = timeString.split(":").map(Number); // Parse hours and minutes
      const date = new Date(); // Use the current date
      date.setHours(hours, minutes, 0, 0); // Set the local time
      return date; // Return the adjusted Date object
    };

    const datas = {
      id: data.id,
      offerName: data.name,
      description: data.description || "",
      price: data.price || "",
      selectedCategory: "",
      selectedItems: data.food_item.map((item) => item.id),
      selectedItemsName: data.food_item,
      bannerImage: null,
      previewImage: data.banner || null,
      isEveryDay: data.is_every_day,
      startDate: data.start_offer ? new Date(data.start_offer) : null, // Convert start_offer to Date
      endDate: data.end_offer ? new Date(data.end_offer) : null, // Convert end_offer to Date
      ...(data.is_every_day === false && {
        customDays: {
          Monday: { start_time: "", end_time: "" },
          Tuesday: { start_time: "", end_time: "" },
          Wednesday: { start_time: "", end_time: "" },
          Thursday: { start_time: "", end_time: "" },
          Friday: { start_time: "", end_time: "" },
          Saturday: { start_time: "", end_time: "" },
          Sunday: { start_time: "", end_time: "" },
          ...Object.entries(data.applicable_days || {}).reduce(
            (acc, [day, times]) => ({
              ...acc,
              [day]: {
                start_time: times.start_time ||"",
                end_time: times.end_time || "",
              },
            }),
            {}
          ),
        },
      }),
      ...(data.is_every_day === true && {
        customDays: {
          Monday: { start_time: "", end_time: "" },
          Tuesday: { start_time: "", end_time: "" },
          Wednesday: { start_time: "", end_time: "" },
          Thursday: { start_time: "", end_time: "" },
          Friday: { start_time: "", end_time: "" },
          Saturday: { start_time: "", end_time: "" },
          Sunday: { start_time: "", end_time: "" },
        },
      }),
    };
    

    console.log("datas",datas);

  return (
    <RestaurantLayout>
      <div>

       <OfferForm mode = "update" initialData = {datas} />
        
      </div>
    </RestaurantLayout>
  )
}

export default UpdateOffer
