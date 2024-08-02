
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

export const valdateDescription = (description) => {
    if (!description) return "Description is Required";
    return "";
}


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