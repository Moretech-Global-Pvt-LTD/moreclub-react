"use client";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"


 export const getDomainSuffix = () => {
   const hostname = window.location.hostname;
   const parts = hostname.split(".");

   if (parts.length > 1) {
     const suffix = parts.slice(-1)[0]; // Get the last part of the domain (TLD)
    //  console.log(`Domain suffix: .${suffix}`);
     return suffix;
   }
   return null;
 };



// import axios from "axios";

export const fetchLiveLocation = async () => {
    try {
        const res = await axios.get(
            `https://pro.ip-api.com/json/?key=F6UL4cER6af4oPb`
        );
        if (typeof window !== "undefined") {
            const countryCode = res.data.countryCode;
            Cookies.set("countryCode", countryCode, {
                expires: 30 / 1440, // 30 minutes expiration
                secure: true, // Only sent over HTTPS
                sameSite: "Strict", // Protect from CSRF

            });
        }
        return res.data;
    } catch (error) {
        console.error("Error in Live Location", error);
        
        return error.res.data;
    }
};


const Locationretrive = () => {
 
    const checkAndUpdateLocation = async() => {     
      const suffix = await getDomainSuffix();
        if (suffix && suffix !== "com") {
            const countryCode = suffix.toUpperCase();
            Cookies.set("countryCode", countryCode, {
                expires: 30 / 1440, // 30 minutes expiration
                secure: true, // Only sent over HTTPS
                sameSite: "Strict", // Protect from CSRF

            });
      } else {
            const countryCode = Cookies.get("countryCode");;
        if (!countryCode) {
          // Cookie doesn't exist, fetch and set it
          // console.log("Cookie expired or not found, fetching location...");
          const code = fetchLiveLocation();
        } else {
          // Cookie is valid, no need to fetch
          // console.log("Cookie is still valid, no need to fetch.");
        }
      }
    
    };

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
