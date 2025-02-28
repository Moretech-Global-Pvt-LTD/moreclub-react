import React from 'react'
import Footer from '../../components/footer/Footer'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../config/config';
import Navbar from '../../components/header/Navbar';
import PartnerSkeleton from '../../components/Skeleton/PartnerSkeleton';
import OfferContent from './OfferContent';

const OfferPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["business types"],
        queryFn: async () => {
          const response = await axios.get(`${baseURL}business/all/types/`);
          return response.data.data;
        },
        staleTime: 200000,
      });



  return (
    <div className="layout-wrapper">
    <Navbar />
    {/* <Hero /> */}
    {isLoading && <PartnerSkeleton />}
    {!isLoading && !isError && data &&  <OfferContent data={data}/>}

    
   
    {/* <Divider/> */}

    <Footer />
  </div>
  )
}

export default OfferPage
