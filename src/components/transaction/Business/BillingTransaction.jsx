import BillingCard from "../Users/Billing";
import WithMembershipCard from "../Users/WithMembership";
import WithCouponCard from "../Users/WithCoupon";

import React, { useEffect, useState} from "react";

import { Placeholder } from "react-bootstrap";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import moment from "moment";

const BillingTransaction = () => {
  const location = useLocation();
  let activeTab
  const [starting, setStarting] = useState('');
  const [ending, setEnding] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get('starting');
    const end = urlParams.get('ending');
    activeTab = urlParams.get('active')
    if(activeTab === 'alltransaction'){
      if (start) setStarting(start);
      if (end) setEnding(end);
    }
  }, [location.search]);
 
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["all business transactions",activeTab, starting,ending],
      queryFn: async ({ pageParam = 1 }) => {
        if(starting || ending){
          const response = await axiosInstance.get(
            `${baseURL}billings/business/transaction/list/?start_date=${encodeURIComponent(starting)}&end_date=${encodeURIComponent(ending)}&page=${pageParam}`
          );
          return response.data;
        }else{
          const response = await axiosInstance.get(
            `${baseURL}billings/business/transaction/list/?page=${pageParam}`
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
         {data.pages.map((data)=>(
          <>
          {data.data.map((row)=>(
            <>
             <h6 className="mt-2 mb-1">{moment(row.day).format("dddd DD MMM, YY")}</h6>
             {row.transactions.map((row)=>(
              <>
              {row.coupon === null && row.membership === null ? (
              <BillingCard
                transactiontime={row.created_at}
                Paid={row.paid_amount}
                BillTotal={row.total_amount}
               
              />
            ) : (
              <>
                {row.coupon !== null && row.membership === null ? (
                  <WithCouponCard
                    // receiver={`${row.membership.user.first_name} ${row.membership.user.last_name}`}
                    dated={row.created_at}
                    total={row.total_amount}
                    discount={row.discount}
                    paid={row.paid_amount}
                    currencyCode={row.currency.code}
                  />
                ) : (
                  <WithMembershipCard
                    receiver={`${row.membership.user.first_name} ${row.membership.user.last_name}`}
                    dated={row.created_at}
                    total={row.total_amount}
                    discount={row.discount}
                    paid={row.paid_amount}
                    currencyCode={row.currency.code}
                  />
                )}
              </>
            )}
              </>
             ))}
            
          </>
          ))}
          </>

         )) 
      }
      <div
        ref={(node) => {
          bottomRef.current = node;
        }}
      />
      </>
    </div>
  );
};

export default BillingTransaction;

