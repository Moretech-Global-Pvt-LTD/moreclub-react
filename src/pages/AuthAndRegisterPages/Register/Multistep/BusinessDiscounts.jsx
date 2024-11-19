import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import {
  currentBusinessStep,
  updateFormData,
} from "../../../../redux/slices/RegisterSlice";
import Select from "react-select";
import { businessType } from "../../../../redux/api/userDetailAPI";

const BusinessDiscountsForm = ({ handleSubmit, loading }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registerReducer.formData);

  const [selectedBusinessType, setSelectedBusinessType] = useState([]);
  const [selectedBusinessDiscounts, setSelectedBusinessDiscounts] = useState(
    []
  );

  const [options, setOptions] = useState([]);
 
  // setting options for the BusinessTypes
  const bt = useSelector((state) => state.businessReducer);
  useEffect(() => {
    dispatch(businessType());
  }, [dispatch]);

  useEffect(() => {
    if (bt.businessTypeList && bt.businessTypeList.length > 0) {
      const formattedOptions = bt.businessTypeList.map((option) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(formattedOptions);
    }
  }, [bt.businessTypeList]);

  useEffect(() => {
    const businessType = selectedBusinessType.map((type) => type.value);
    dispatch(updateFormData({ business_types: businessType }));
  }, [selectedBusinessType]);

  useEffect(() => {
    const businessDiscounts = selectedBusinessDiscounts.map((discount) => ({
      business_type: discount.business_type,
      discount: discount.discount,
    }));
    console.log(businessDiscounts);
    dispatch(updateFormData({ business_discount: businessDiscounts }));
  }, [selectedBusinessDiscounts]);

  const handleBusinessTypeChange = async (selectedOptions) => {
    console.log("selected option",selectedOptions)
    if(selectedOptions){
      setSelectedBusinessType(selectedOptions);
      console.log("selected option",selectedOptions)
    }else{
      setSelectedBusinessType([]);
      console.log("selected option",selectedOptions)
    }
  };
  const handleNextStep = (value) => {
    dispatch(currentBusinessStep(value));
  };

  return (
    <>
      <span
        className={`register-form-container  register-form-wrapper register-headings pe-2 ps-2`}
      >
        <h1 className="text-center">What discounts are you offering Members</h1>
        <button
          className="btn btn-link btn-sm "
          onClick={() => handleNextStep(1)}
        >
          Back
        </button>
      </span>
      <Form.Group className="mb-4">
        <Form.Label className="mb-2 fz-16">Business Types</Form.Label>
        <Select
          className="mb-4 form-control"
          styles={{ background: "transparent" }}
          value={selectedBusinessType}
          onChange={handleBusinessTypeChange}
          options={options}
          isMulti={true}
          required
        />
      </Form.Group>
      {selectedBusinessType.map((type) => (
        <div key={type.value} className="mb-4 d-flex  align-items-center">
          <label>{type.label}</label>
          <div className=" ms-2 discount-container">
          <input
            type="number"
            step={0.01}
            className="w-full"
            placeholder="Discount in percentge"
            value={
              selectedBusinessDiscounts.find(
                (d) => d.business_type === type.value
              )?.discount || ""
            }
            onChange={(e) => {
              const updatedDiscounts = [...selectedBusinessDiscounts];
              const index = updatedDiscounts.findIndex(
                (d) => d.business_type === type.value
              );
              if (index !== -1) {
                updatedDiscounts[index] = {
                  ...updatedDiscounts[index],
                  discount: e.target.value,
                };
              } else {
                updatedDiscounts.push({
                  business_type: type.value,
                  discount: e.target.value,
                });
              }
              setSelectedBusinessDiscounts(updatedDiscounts);
            }}
          />
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary m-4 "
        disabled={loading || selectedBusinessType.length===0 }
        type="submit"
        onClick={handleSubmit}
      >
        {loading ? (
          <span
            class="spinner-border spinner-border-sm text-danger"
            role="status"
          ></span>
        ) : (
          "Add Business Discounts"
        )}
      </button>
    </>
  );
};

export default BusinessDiscountsForm;
