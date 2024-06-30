
import React, { useState, useEffect } from "react";

import DashboardLayout from "../Layout/DashboardLayout";
import Loading from "../loading/loading";


const withDashboardLoading = (WrappedComponent, title, fetchData) => {
  return () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchDataWrapper = async () => {
        try {
          const result = await fetchData();
          setData(result);
        } catch (err) {
          console.error("Error fetching data:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDataWrapper();
    }, []);

    return (
      <DashboardLayout title={title}> 
        <WrappedComponent data={data} />
        {isLoading && <Loading />} 
      </DashboardLayout>
    );
  };
};

export default withDashboardLoading;


