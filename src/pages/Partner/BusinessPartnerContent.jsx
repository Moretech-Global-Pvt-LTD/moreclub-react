import React, { useEffect } from "react";
import { Row } from "react-bootstrap";

import { baseURL } from "../../config/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import Divider from "../../components/divider/Divider";
import { useParams } from "react-router-dom";
import { BestDealsinTownSkeleton } from "../../components/Skeleton/SmallCardSkeleton";
import BusinessListCard from "../../components/dashboard/BusinessListCard";
import { getplatformName } from "../../utills/utility";
import Cookies from "js-cookie";
import axios from "axios";

const BusinessPartnerContent = ({ partnerId }) => {
  const { partnerName } = useParams();
  const title = partnerName.replace(/-/g, " ");

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`partners data ${partnerId}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${baseURL}business/partners/${partnerId}/list/?page=${pageParam}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-country-code": Cookies.get("countryCode"),
          },
        }
      );
      return response.data.data;
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


  if (isLoading && partnerName !== "Hotel") {
    return (
      <div className="d-flex gap-2">
        <BestDealsinTownSkeleton />
      </div>
    );
  }

  if (isError && partnerName !== "Hotel") {
    <div className="text-dynamic white">Error getting data</div>;
  }

  if(partnerName === "Hotel"){
    return (
      <>
      <Divider />
      <p className="text-center">Partner not Registered yet in Hotel </p>
      <Divider />
      </>
    )}else{

 
  return (
    <div className="mt-4">
      <Row xs={2} sm={2} md={2} lg={3} xl={4} xxl={5} className=" px-2">
        {data && data.pages[0].data.length === 0 ? (
          <>
          <Divider />
          <p className="text-center">Partner not Registered yet in {title} </p>
          <Divider />
        </>
        ) : (
          <>
            {data.pages.map((data) => (
              <>
                {data.data.map((item) => {
                  const platformdetail = getplatformName(partnerName);
                  return (
                    <>
                      <BusinessListCard
                        key={item.id}
                        type={platformdetail.name}
                        banner={item.banner}
                        name={item.name}
                        address={item.address}
                        path={`/${platformdetail.paths}/${
                          item[platformdetail.type]
                        }`}
                      />
                    </>
                  );
                })}
              </>
            ))}
          </>
        )}

      </Row>
      
      <div
        ref={(node) => {
          bottomRef.current = node;
        }}
      />
      {isFetchingNextPage && <BestDealsinTownSkeleton />}
    </div>
  );
}
};

export default BusinessPartnerContent;
