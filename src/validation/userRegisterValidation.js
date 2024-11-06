export const validateFirstName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return "";
};

export const validateLastName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return "";
};

export const validatePassword = (name) => {
  if (!name) return "password is required";
  if (name.length < 7) return "Password must be at least 8 characters";
  return "";
};

export const validateGender = (name) => {
  if (!name) return "Gender is required";
  return "";
};

export const validateUserEmail = (email) => {
  const emailRegex = /^[^\s@]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;
  if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email address";
    // try {
    //     const res = await axios.post(`${baseURL}auth/check/username/`, {
    //       username: `${email}`,
    //     });
    //     if (res.status === 200) {
    //         return "";
    //     }
    //   } catch (error) {
    //     return error.response?.data?.errors?.username[0];
    //   }
  return "";
};


export const validateUserPhone = (phoneNumber) => {
  if (phoneNumber !== "") {
    // try {
    //   const res = await axios.post(`${baseURL}auth/check/username/`, {
    //     username: `${phoneNumber}`,
    //   });
    //   if (res.status === 200) {
    //     return "";
    //   }
    // } catch (error) {
    //   return error.response.data?.errors?.username[0];
    // }
  } else {
    return "Phone number is required";
  }
};

