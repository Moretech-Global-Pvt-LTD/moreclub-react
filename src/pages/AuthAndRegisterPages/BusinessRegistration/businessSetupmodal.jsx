import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import BusinessRegistration1 from "./BusinessRegistration1";
import BusinessRegistration2 from "./BusinessRegistration2";
import BusinessRegistration4 from "./BusinessRegistration4";
import { axiosInstance } from "../../..";
import { baseURL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { logout } from "../../../redux/api/loginAPI";

const BusinessSetupmodal = () => {
  const [showForm, setShowForm] = useState(
    localStorage.getItem("business_exists") === "false"
  );
  const [loading, setLoading] = useState(false);
  const formData = useSelector((state) => state.registerReducer.formData);
  const dispatch = useDispatch();

  const logOut = async() => {
    dispatch(logout());
  };

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("disable-scroll");
      document.documentElement.classList.add("disable-scroll"); // Also for <html>
    } else {
      document.body.classList.remove("disable-scroll");
      document.documentElement.classList.remove("disable-scroll");
    }
  }, [showForm]);

  const [step, setStep] = useState(1);

  const handleNext = async (e) => {
    if (step < 3) setStep(step + 1);
    if (step === 3) {
      await handleSubmit(e);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
   
    const data = {
      business_name: formData.companyName,
      business_address: formData.address,
      lng: formData.lng,
      lat: formData.lat,
      business_email: formData.business_email,
      business_phone: formData.business_phone,
      business_registration_number: formData.registrationNumber,
    };

    try {
      const res = await axiosInstance.post(
        `${baseURL}auth/add/business/`,
        data
      );

      if (res.data.success) {
        message.success("Business Details updated Successfully");
        localStorage.setItem("business_exists", true);
        window.location.reload();
        setShowForm(false);
      }
    } catch (err) {
      message.error(
        err.response.data.message || "Error adding business discounts"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="multistep-form-container">
      <div className="register-backdrop" />
      <div
        className="position-absolute"
        style={{ top: "0", right: "0", zIndex: "1000" }}
      >
        <div className="multi-step-registration">
          <div className="form-container">
            <div className="form-layout">
              {step === 1 && (
                <div>
                  <h2>Setup Your Business Information</h2>
                  <p>
                    Setting up your business information is the first step in
                    creating a robust profile. Begin by entering the name of
                    your business and registration Number. Remember, this
                    information will be the Check to verified your business, so
                    make it as comprehensive and accurate as possible.
                  </p>
                  <button
                      className="btn btn-warning btn-sm rounded-pill cursor-pointer"
                      onClick={() => logOut()}
                    >
                      <i
                        className={`me-2 bi bi-box-arrow-right`}
                      
                      />
                      {"Log out"}
                    </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2>Business Contact</h2>
                  <p>
                    Providing accurate and up-to-date contact details is crucial
                    for establishing trust and making it easy for customers to
                    connect with your business.This step is about ensuring that
                    customers have multiple avenues to reach out to you, whether
                    they want to make inquiries, seek support, or provide
                    feedback.
                  </p>
                  <button
                      className="btn btn-warning btn-sm rounded-pill cursor-pointer"
                      onClick={() => logOut()}
                    >
                      <i
                        className={`me-2 bi bi-box-arrow-right`}
                      
                      />
                      {"Log out"}
                    </button>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2>Your Business Location</h2>
                  <p>
                    The location of your business plays a significant role in
                    attracting customers.Provide your complete address
                    highlighting your proximity to get personalized discounts
                    and offers. Accurate location benifits can make your
                    business more appealing to customers. Accurate location
                    details also improve your visibility in local search
                    results, which is essential for driving foot traffic.
                  </p>
                  <button
                      className="btn btn-warning btn-sm rounded-pill cursor-pointer"
                      onClick={() => logOut()}
                    >
                      <i
                        className={`me-2 bi bi-box-arrow-right`}
                      
                      />
                      {"Log out"}
                    </button>
                </div>
              )}
              {/* {step === 4 && (
  <div>
    <h2>Business Discounts for Our Customers</h2>
    <p>
      Offering discounts and special deals is an effective way to attract new customers and retain existing ones. Use this section to highlight the exclusive offers your business provides for MoredealClub Members. Discounts not only help in driving sales but also create a positive impression of your business as customer-focused. 
    </p>
  </div>
)} */}

              <>
                <Form onSubmit={handleSubmit}>
                  {step === 1 && <BusinessRegistration1 onNext={handleNext} />}
                  {step === 2 && (
                    <BusinessRegistration4
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  )}
                  {step === 3 && (
                    <BusinessRegistration2
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {/* {step === 4 && (
                    <BusinessRegistration3
                      onNext={handleNext}
                      onBack={handleBack}
                      loading={loading}
                    />
                  )} */}
                </Form>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSetupmodal;
