"use client";
import React from "react";
import { useEffect } from "react";
import { checkAndUpdateLocation} from "../../utills/utility";



const Locationretrive = () => {
 

  useEffect(() => {
    checkAndUpdateLocation();

    // Optionally set an interval to check at regular intervals
    const intervalId = setInterval(() => {
      checkAndUpdateLocation();
    }, 60000); // Check every 60 seconds (adjust as needed)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div></div>;
};

export default Locationretrive;
