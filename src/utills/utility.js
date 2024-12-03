import Cookies from "js-cookie";
import { marketPlaceadminhostURL, marketPlacehostURL, morefoodhostNepalURL, morefoodhostURL, moresaloonhostURL } from "../config/config";

export function GetURL(props) {
  // Get the country code from cookies; default to "default"
  const countryCode = Cookies.get("countryCode") || "default";

  console.log("countryCode", marketPlaceadminhostURL);
  // Define URLs based on props and country codes
  const urls = {
    morefood: {
      NP: morefoodhostNepalURL,
      SE: morefoodhostURL,
      default: morefoodhostURL,
    },
    moresaloon: moresaloonhostURL,
    moreliving: "https:moreliving.com",
    marketplace: marketPlacehostURL,
    marketplaceadmin: marketPlaceadminhostURL,
    hotel: "https:morehotel.com",
  };

  // Fallback URL in case props or country-specific URLs are not found
  const fallbackURL = "https://moredealsclub.com";

  // Fetch the config for the provided props
  const urlConfig = urls[props];
 
    console.log("urlConfig", urlConfig);

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
