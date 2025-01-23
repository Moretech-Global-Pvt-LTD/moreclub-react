import Cookies from "js-cookie";
import { marketPlaceadminhostURL, marketPlacehostURL, morefoodhostNepalURL, morefoodhostURL, moresaloonhostURL } from "../config/config";
import axios from "axios";

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

export const checkAndUpdateLocation = async () => {
  let countryCode = Cookies.get("countryCode");
  if (!countryCode) {
    const code = fetchLiveLocation();
    if (typeof window !== "undefined") {
      countryCode = code.countryCode;
      Cookies.set("countryCode", countryCode, {
        expires: 30 / 1440, // 30 minutes expiration
        secure: true, // Only sent over HTTPS
        sameSite: "Strict", // Protect from CSRF
      });
    }
  }

  return countryCode;
};





export function GetURL(props) {
  // Get the country code from cookies; default to "default"
  const countryCode = Cookies.get("countryCode") || "default";
  // Define URLs based on props and country codes
  const urls = {
    morefood: {
      NP: morefoodhostNepalURL,
      SE: morefoodhostURL,
      default: morefoodhostURL,
    },
    moresaloon: moresaloonhostURL,
    moreliving: "https://moreliving.vercel.app",
    marketplace: marketPlacehostURL,
    marketplaceadmin: marketPlaceadminhostURL,
    hotel: "https:morehotel.com",
  };

  // Fallback URL in case props or country-specific URLs are not found
  const fallbackURL = "https://moredealsclub.com";

  // Fetch the config for the provided props
  const urlConfig = urls[props];
 

  if (!urlConfig) {
    // Return fallback if props is invalid
    return fallbackURL;
  }

  // If the config is an object, return the country-specific or default URL
  if (typeof urlConfig === "object") {
    return urlConfig[countryCode] || urlConfig.default;
  }

  // For simple string configs, return the URL directly
  return urlConfig;
}

export function parseMembershipData(data, additionalLinks = []) {
    // Map over the relevant discounts and referral data
    const features = Object.entries(data || {})
      .filter(
        ([key, value]) =>
          (key.endsWith("_discount") || key.endsWith("_precentage")) && value !== 0
      )
      .map(([key, value]) => {
        let formattedKey = key.replace(/_/g, " ");
        if (key === "business_discount") {
          formattedKey = "MoreFood Discount";
        } else if (key === "referral_precentage") {
          formattedKey = "MoreFood Referral";
        } else {
          formattedKey = formattedKey
            .replace(/discount/, "Discount")
            .replace(/precentage/, "")
            .replace(/business/, "")
            .replace(/referral/, "Referral");
        }
  
        // Get the respective URL for each type of discount
        const websiteUrl = GetURL(
          key === "business_discount"
            ? "morefood":
            key ==="referral_precentage"
            ? "morefood"
            : key.includes("salon")
            ? "moresaloon"
            : key.includes("living")
            ? "moreliving"
            : key.includes("marketplace")
            ? "marketplace"
            : key.includes("hotel")
            ? "hotel": ""
        );
  
        return {
          discounts: `${formattedKey.trim()}: ${value}%`,
          websiteUrl,
        };
      });
  
    // Add additional links if any
    additionalLinks.forEach((link) => {
      features.push({
        discounts: `Website: ${link}`,
        websiteUrl: link,
      });
    });
  
    return features;
  }



  export const getApiUrl = ()=> {
    if (typeof window === "undefined") {
      return process.env.REACT_APP_MORE_FOOD_BASE_URL ?? 'https://api.morefood.se/api/'
    }
  
    // Define the mapping of host to API URLs
    const apiUrlMapping = {
      "SE": process.env.REACT_APP_MORE_FOOD_BASE_URL ?? 'https://api.morefood.se/api/',
      "NP": process.env.REACT_APP_MORE_FOOD_BASE_URL_NEPAL ?? 'https://api.nepalbites.com/api/',
    };
  
    // Get the current host from the browser
    const currentCountry = Cookies.get("countryCode"); // Remove "www." if present
  
    // Get the API URL for the current host
    const apiUrl = apiUrlMapping[currentCountry];
  
    if (!apiUrl) {
      return process.env.REACT_APP_MORE_FOOD_BASE_URL ?? 'http://192.168.1.74:8000/api/';
    }
  
    return apiUrl;
  };



  export const getplatformName = (title) => {
    switch (title) {
        case "Restaurant":
            return {name:"morefood" , paths:"restaurant", type:"slug"};
        case "Salons":
            return {name:"moresaloon" , paths:"saloon", type:"id"};
        case "Marketplace":
            return {name:"marketplace" , paths:"store", type:"id"};
        case "Hotel":
            return {name:"moreliving" , paths:"hotel", type:"id"};
        default:
            return {name:"#" , paths:"#", type:"#"};
    }
};


export const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const truncateText = (text, maxLength) => {
  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

  