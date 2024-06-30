import WithMembershipCard from '../Users/WithMembership';



import React, { useEffect, useState } from "react";
import { Placeholder } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import moment from 'moment';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from 'react-router-dom';

const BusinessMembershipTransactions = () => {

  const location = useLocation();
  const [starting, setStarting] = useState('');
  const [ending, setEnding] = useState('');
  let active

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get('starting');
    const end = urlParams.get('ending');
    active= urlParams.get('active')
    if(active=== "Membership"){
      if (start) setStarting(start);
      if (end) setEnding(end);
    }
  }, [location.search]);


  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["membership billing" , starting, ending],
      queryFn: async ({ pageParam = 1 }) => {

        if(starting || ending){
          const response = await axiosInstance.get(
            `${baseURL}billings/business/transaction/list/?types=membership&start_date=${encodeURIComponent(starting)}&end_date=${encodeURIComponent(ending)}`
          );
          return response.data;
        }else{
          const response = await axiosInstance.get(
            `${baseURL}billings/business/transaction/list/?types=membership&page=${pageParam}`
          );
          return response.data;
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.links.next) {
          return lastPage.meta.page_number + 1;
        }
        return undefined;
      },
    });

  const bottomRef = React.createRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      },
      { threshold: 1.0 }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
  }, [hasNextPage, fetchNextPage, bottomRef.current]); // Add bottomRef.current to the dependency array

  if (isLoading) {
    return (
      <div
        className="content-inside-wrapper nft-card card p-4"
        style={{ maxWidth: "640px" }}
      >
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }

  return (
    <div
      className="content-inside-wrapper nft-card card p-4"
      style={{ maxWidth: "640px" }}
    >
      <>
        {data.pages.map((data) => (
          <>
            {data.data.map((row,index) => (
             <>
             <h6 className="mt-2 mb-1">{moment(row.day).format("dddd DD MMM, YY")}</h6>
             {row.transactions.map((trans)=>(
               <WithMembershipCard
               receiver={`${trans.membership?.user?.first_name} ${trans.membership?.user?.last_name}`}
               dated={trans.created_at}
               total={trans.total_amount}
               discount={trans.discount}
               paid={trans.paid_amount}
               currencyCode={trans.currency.code}
           />
             ))}
             </>
            
             
            ))}
          </>
        ))}
        <div
          ref={(node) => {
            bottomRef.current = node;
          }}
        />
      </>
    </div>
  );
};

export default BusinessMembershipTransactions;

