import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update_business_document } from "../../../redux/api/loginAPI";
import { Form } from "react-bootstrap";
import { set } from "lodash";

const BusinessTaxUpdate = ({ business }) => {
  const dispatch = useDispatch();
  const [inputAvatar, setInputAvatar] = useState("");
  const [inputDisplayImage, setInputDisplayImage] = useState(
    `${business.businessProfile?.business_tax_documents}`
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (business.businessProfile.business_logo) {
      setInputDisplayImage(
        `${business.businessProfile.business_tax_documents}`
      );
    }
  }, [business]);

  const handleAvatarSubmit = (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = {
        business_tax_documents: inputAvatar,
      };
      const res = dispatch(update_business_document(formData));

      if (res) {
        message.success("Registration Document Updated Successfully");
      } else {
        message.error("Failed to Update Documents");
      }
    }catch (error) {
      message.error("Failed to Update Documents");
    }
    setIsLoading(false);
    
  };

  const AvatarhandleChange = (event) => {
    setInputDisplayImage(URL.createObjectURL(event.target.files[0]));
    setInputAvatar(event.target.files[0]);
  };

  return (
    <div className="card col-12 col-lg-5">
      <div className="card-body p-4 p-sm-5" style={{ marginTop: "-25px" }}>
        <h4>Upload Tax Document</h4>
        <div className="card-body">
          <div className="img-wrap text-center">
            <img
              src={inputDisplayImage}
              alt=""
              style={{
                width: "200px",
                borderRadius: "50px",
                border: "1px",
                borderColor: "white",
              }}
            />
          </div>
        </div>
        <Form onSubmit={handleAvatarSubmit}>
          <div className="col-12">
            <Form.Group className="mb-4">
              <Form.Control
                className="bg-transparent"
                id="formFileMultiple"
                type="file"
                onChange={AvatarhandleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <button
              className="btn btn-warning w-100"
              type="submit"
            >
              {isLoading && <span className="spinner-border spinner-border-sm" />}
              <i className="bi bi-sd-card-fill me-1" />
              Save changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BusinessTaxUpdate;
