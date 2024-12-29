import React, { useState } from "react";
import { Form } from "react-bootstrap";
import BusinessRegistration1 from "./BusinessRegistration1";
import BusinessRegistration2 from "./BusinessRegistration2";
import BusinessRegistration3 from "./BusinessRegistration3";
import Logos from "../../../components/header/Logos";
import ThemeToggler from "../../../components/header/themeToggler";
import Navbutton from "../../../components/header/Navbutton";
import Divider from "../../../components/divider/Divider";

const MultiStepRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessLocation: "",
    businessDiscount: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (

    <div className="postion-relative w-100">
    {" "}
    <nav className="navbar navbar-header position-absolute w-100">
      <div className="container">
        <div className="w-100 d-flex justify-content-between border-0">
          <div className="d-flex align-items-center">
            <Logos link="/" />
          </div>
          <div className="header-meta d-flex align-items-center">
            <ThemeToggler />
            <Navbutton register={true} />
          </div>
        </div>
      </div>
    </nav>
    <div className="multi-step-register-containers ">
      <Divider />
      <div className="divider-mobile" />
      <div className="multi-step-registration">
         
         <div className="form-container">
         <div className="form-layout">
         {step === 1 && (
           <div className="">
           <h2>Setup your Business information </h2>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam debitis, soluta nobis, autem impedit temporibus commodi dolore amet labore minus consequatur accusantium sed recusandae.</p>
                
         </div>
           )}
           {step === 2 && (
             <div>
             <h2>Your Business Location</h2>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam debitis, soluta nobis, autem impedit temporibus commodi dolore amet labore minus consequatur accusantium sed recusandae.</p>
                   
             </div>
           )}
           {step === 3 && (
             <div>
             <h2>Business Discounts for our customers</h2>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam debitis, soluta nobis, autem impedit temporibus commodi dolore amet labore minus consequatur accusantium sed recusandae.</p>
                   
             </div>
           )}
             
 
 
 <>
         <Form onSubmit={handleSubmit}>
           {step === 1 && (
           <BusinessRegistration1 onNext={handleNext}/>
           )}
           {step === 2 && (
             <BusinessRegistration2 onNext={handleNext} onBack={handleBack}/>
           )}
           {step === 3 && (
              <BusinessRegistration3 onNext={handleNext} onBack={handleBack}/>
           )}
         </Form>
 
 </>
 
         </div>
       </div>
       
       
     </div>
     <div className="divider-mobile" />
    </div>
  </div>
   
  );
};

export default MultiStepRegistration;
