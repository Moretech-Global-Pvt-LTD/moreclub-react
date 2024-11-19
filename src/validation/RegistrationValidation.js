

export const validateBusinessName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return "";
  };

  export const validateBusinessRegistration = (name) => {
    if (!name) return "Registration number is Required";
    return "";
  };

  export const validateEmail = (email) => {
 
    const emailRegex = /^[^\s@]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email address";
    return "";
  };

  export const validateBusinessaddress = (address, lat , lng) => {
    if (!address) return "address is Required";
    if (lat === 0 || lng === 0) return "Select Valid Address from the list or map"
    return "";
  };

  export const validateBusinessPhonenumber = (address, lat , lng) => {
    if (!address) return "address is Required";
    if (lat === 0 || lng === 0) return "Select Valid Address from the list or map"
    return "";
  };

  export const validateDiscount = (value) => {
    if (!value) return "Discount is Required";
    return "";

  }
  export const validateBusinessTyes = (value) => {
    if (!value) return "Choose Business Type";
    if (value.trim() === "") return "Choose Business Type";
    return "";

  }