export const validateAccountName = (name) => {
    if (!name) return "Account name is required";
    if (name.length < 3) return "Account name must be at least 3 characters";
    return "";
  };
  
 export  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/;
    if (!number) return "Card number is required";
    if (!regex.test(number)) return "Card number must be 16 digits";
    return "";
  };
  
 export  const validateCVC = (cvc) => {
    const regex = /^\d{3,4}$/;
    if (!cvc) return "CVC is required";
    if (!regex.test(cvc)) return "CVC must be 3 or 4 digits";
    return "";
  };
  
 export  const validateExpiry = (expiry) => {
    if (!expiry) return "Expiry date is required";
    const now = new Date();
    const expDate = new Date(expiry);
    if (expDate < now) return "Expiry date must be in the future";
    return "";
  };


  export const validateEmail = (email)=>{
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^[^\s@]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email address";
    return "";
  }

  export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[1-9]\d{7,14}$/; // Allow between 8 and 15 digits total  checks for country code and varying lengths of phone numbers
    if (!phoneNumber) return "Phone number is required";
    if (!phoneRegex.test(phoneNumber)) return "Invalid phone number";
    return "";
};
  