
export const validateResturantName = (name) => {
  if (!name) return "Resturant name is required";
  if (name.length < 3) return "Resturant name must be at least 3 characters";
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

export const validateAddress = (address, lat, lng) => {
    if (!address) return "Address is Required";
    if(lat === 0 || lng === 0) return "Select Valid Address from the list"
    return "";
}

export const valdateShortDescription = (description) => {
  if (!description) return "Short Description is Required";
  const wordCount = description.trim().split(/\s+/).length;
  if (wordCount < 5) return "Short Description must be at least 5 words";
  return "";
};

// Long Description Validation with Word Count Check
export const validateLongDescription = (description) => {
  if (!description) return "Long Description is Required";
  const wordCount = description.trim().split(/\s+/).length;
  if (wordCount < 30) return "Long Description must be at least 20 words";
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
  const facebookRegex =
    /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9\.\-_]+\/?$/;
  if (!facebookRegex.test(url)) return "Invalid Facebook URL";
  return "";
};

export const validateWebsiteURL = (url) => {
  if (!url) return ""; // Optional field, so no error if empty
  const websiteRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!websiteRegex.test(url)) return "Invalid Website URL";
  return "";
};

export const validateInstagramURL = (url) => {
  if (!url) return ""; // Optional field, so no error if empty
  const instagramRegex =
    /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9\._-]+\/?$/;
  if (!instagramRegex.test(url)) return "Invalid Instagram URL";
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


