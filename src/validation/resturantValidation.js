
export const validateResturantName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return "";
};
export const validateMin_order = (min_order) => {
  if (!min_order) return "Min_order is required";
  return "";
};

export const validateCountry = (country) => {
      if (!country) return "Country is required";
      return "";
};
export const validateCurrency = (country) => {
  if (!country) return "Currency is required";
  return "";
};

export const validateAnemeties = (animities) => {
  if (animities.length === 0) return "animities is required";
  return "";
};

export const validateAddress = (address, lat, lng) => {
    if (!address) return "Address is Required";
    if(lat === 0 || lng === 0) return "Select Valid Address from the list"
    return "";
}

export const valdateShortDescription = (description) => {
  if (!description) return "Short Description is Required";
  // const wordCount = description.trim().split(/\s+/).length;
  // // const wordCount = description.trim().split(/\s+/).length;
  // if (wordCount < 20) return "Short Description must be at least 20 words";
  // if (wordCount > 60) return "Short Description must be less than 60 words ";
  return "";
};


export const valdateShortDescriptionCharater = (description) => {
  if (!description) return "Short Description is Required";
  if (description.length < 5) {
    return `Short Description must contain at least 5 to 255 characters long.`;
  }
  if (description.length > 255) {
    return `Short Description must contain at most 255 characters long.`;
  }
  return "";
};
// Long Description Validation with Word Count Check
export const validateLongDescription = (description) => {
  if (!description) return "Long Description is Required";
  // const wordCount = description.trim().split(/\s+/).length;
  // if (wordCount < 30) return "Long Description must be at least 30 words";
  //  if (wordCount > 500) return "Short Description must be less than 500 words ";
  return "";
};


 export const validateContactNumber = (phoneNumber) => {
   const phoneRegex = /^\+[1-9]\d{7,14}$/; 
   if (!phoneNumber) return "Phone number is required with Country code";
   if (!phoneRegex.test(phoneNumber)) return "Please write valid phone number with Country code";
   return "";
 };

export const validateEmail = (email) => {
 
  const emailRegex = /^[^\s@]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email address";
  return "";
};

export const Validatebanner = (banner) => {
    if (!banner) return "Banner is required";
    return "";
}
export const Validatelogo = (logo) => {
  if (!logo) return "Banner is required";
  return "";
};

export const validateFacebookURL = (url) => {
  if (!url) return ""; // Optional field, so no error if empty
  const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.\-_]+\/?$/;
  if (!facebookRegex.test(url)) return "Invalid Facebook URL";
  return "";
};

export const validateWebsiteURL = (url) => {
  if (!url) return ""; // Optional field, so no error if empty
  const websiteRegex =    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
  if (!websiteRegex.test(url)) return "Invalid Website URL";
  return "";
};

export const validateTimeZone = (timezone) => {
  if (!timezone) return "Timezone is required";
  return "";
};

export const validateInstagramURL = (url) => {
  if (!url) return ""; // Optional field, so no error if empty
  const instagramRegex =/^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/;
  if (!instagramRegex.test(url)) return "Invalid Instagram URL";
  return "";
};

export const ValidationStationNoofPackedItem = (value) => {
  if (!value) return ""; // Optional field, so no error if empty
  
  if (parseInt(value) <= 0) return "Invalid number";
  return "";
};

export const validateFeatureType = (value) => {
  if (!value) {
    return "Feature Type is required.";
  }
  return "";
};

export const validatePriceRange = (value) => {
  if (!value || isNaN(value)) {
    return "Price range must be a valid number.";
  }
  return "";
};

export const validateCuisineType = (value) => {
  if (!value.trim()) {
    return "Cuisine Type is required.";
  }
  return "";
};

export const validateMeal = (value) => {
  if (!value.trim()) {
    return "Meal is required.";
  }
  return "";
};

export const validateProperties = (value) => {
  if (!value.trim()) {
    return "Properties are required.";
  }
  return "";
};


// export const validateRequiredField = (value, fieldName = "Field") => {
//   if (!value || !value.trim()) {
//     return `${fieldName} is required.`;
//   }
//   return "";
// };


export const validateCuisineField = (value) => {
  if (!value || value.length === 0) {
    return "Cuisine is required.";
  }
  return "";
};

export const validateMenuImage = (banner) => {
  if (!banner) {
    return "Menu image is required.";
  }

  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

  if (!validImageTypes.includes(banner.type)) {
    return "Invalid image type. Only JPEG, PNG, and GIF are allowed.";
  }

  if (banner.size > maxSizeInBytes) {
    return "Image size must be less than 10 MB.";
  }

  return ""; // Valid image
};


export const validatePriceAndOfferPrice = (price, offerPrice) => {
  let errors = {};

    if(!price) {
      errors.price = "Price is required.";
    }

    const Price = Number(price);
      // If variation is false, price is required
    if (Price <= 0) {
      errors.price = "Price is required and must be greater than zero.";
    } else {
      errors.price = "";
    }

    if(!offerPrice) {
      errors.offerPrice = "";
    }
    const OfferPrice = Number(offerPrice);

    if (OfferPrice <= 0) {
      errors.offerPrice = "Offer price cannot be negative.";
    }
    if(OfferPrice >= Price) {
      errors.offerPrice = "Offer price must be less than the price.";
    }else{
      errors.offerPrice = "";
    }


  return errors;
};


export const validateRequiredField = (value, fieldName = "Field") => {
  console.log("value", value);
  if (!value || value.trim() === "") {
    return `${fieldName} is required.`;
  }
  return "";
};

export const validateRequiredDateField = (value, fieldName = "Field") => {
 
  if (!value) {
    return `${fieldName} is required.`;
  }
  return "";
};


export const validateServiceField = (value) => {
  if (!value || value.length === 0) {
    return "Services is required.";
  }
  return "";
};


export const validateDates = (start_date , end_date , checking ,status) => {
  const errors = {};

  if (start_date) {
    const startDate = new Date(start_date);
    const today = new Date();
   

    if (!start_date) {
      errors.start_date = "Start Date is required.";
    } else if (startDate < today) {
      errors.start_date = "Start Date cannot be in the past.";
    }
    else{
      errors.start_date = "";
    }
  }

  if(checking === "end_date"){
    if (!start_date) {
      errors.start_date = "Start Date is required.";
    }
    if(!end_date) {
      errors.end_date = "End Date is required.";
    }
  }

  if (end_date) {
    const endDate = new Date(end_date);
    const startDate = new Date(start_date);

    if (!end_date) {
      errors.end_date = "End Date is required.";
    } else if (start_date && endDate <= startDate) {
      errors.end_date = "End Date must be greater than the Start Date.";
    }
  }

  if(status === "update"){
    if(errors.start_date === "Start Date cannot be in the past."){
      errors.start_date = "";
    }
  }


  return errors;
};


