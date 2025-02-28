import React from "react";
import {  Container } from "react-bootstrap";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { baseURL } from "../../config/config";
// import UniversalErrorbox from "../Layout/UniversalErrorBox";
import { Link } from "react-router-dom";
// import PartnerSkeleton from "../Skeleton/PartnerSkeleton";

const PartnerSection = ({data}) => {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["business types"],
  //   queryFn: async () => {
  //     const response = await axios.get(`${baseURL}business/all/types/`);
  //     return response.data.data;
  //   },
  //   staleTime: 200000,
  // });

  // if (isLoading) {
  //   return (
  //     <Container className="my-4">
  //       <Row className="justify-content-center text-center">
  //         <PartnerSkeleton />
  //       </Row>
  //     </Container>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <UniversalErrorbox
  //       message="Something went wrong while fetching the Partner data"
  //       retry={["business types"]}
  //     />
  //   );
  // }

  return (
    <Container className="my-4">
      <h4 className="mt-4 mb-5 text-center">Best Deals in Town </h4>
      <div className="best-deals-container ">
        
        {data.map((partner, index) => {
          const slug = partner.name.replace(/ /g, "-");
          return (
              <Link to={`/partners/${partner.id}/${slug}`} className="best-deals-card">
                <div className="best-deal-logo">
                  <img src={`${partner.banner}`} alt="Light" />
                  <p>{partner.name}</p>
                </div>
              </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default PartnerSection;
