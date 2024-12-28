import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { update_business_document } from "../../../redux/api/loginAPI";
import { Form } from "react-bootstrap";
import { update_business_document } from "../../redux/api/loginAPI";
import BussinessLogoUpdate from "./BusinessLogoUpdate";
import BusinessTaxUpdate from "./BusinessTaxDocumentUpdate";
// import BusinessTaxUpdate from "./BusinessTaxDocumentPage";

// import BussinessLogoUpdate from "./BusinessLogoUpdate";

const BusinessDocumentUpdate = ({ business }) => {
  const dispatch = useDispatch();
  const [inputAvatar, setInputAvatar] = useState("");
  const [inputDisplayImage, setInputDisplayImage] = useState(
    `${business.businessProfile?.business_documents}`
  );
  const [avatarError, setAvatarError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const businessverification = useSelector((state) => state.businessReducer);

  useEffect(() => {
    if (business.businessProfile.business_logo) {
      setInputDisplayImage(`${business.businessProfile.business_documents}`);
    }
  }, [business]);

  const handleAvatarSubmit = (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = {
        business_documents: inputAvatar,
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
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputDisplayImage(URL.createObjectURL(event.target.files[0]));
      setInputAvatar(event.target.files[0]);
      setAvatarError("");
    } else {
      setAvatarError("Please upload images only");
    }
  };

  return (
    <div className="row gap-2">
      <BussinessLogoUpdate business={business} />
      <div className="card col-12 col-lg-5">
        <div className="card-body p-4 p-sm-5" style={{ marginTop: "-25px" }}>
          <h4>Business Registration </h4>
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
                  accept="image/*"
                  onChange={AvatarhandleChange}
                  disabled={businessverification.businessProfile.is_verified}
                  required
                />
                {avatarError && <p className="text-danger">{avatarError}</p>}
              </Form.Group>
            </div>
            <div className="col-12">
              <button
                className="btn btn-warning w-100"
                type="submit"
              >
                {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                <i className="bi bi-sd-card-fill me-1" />
                Update Registration
              </button>
            </div>
          </Form>
        </div>
      </div>
      <BusinessTaxUpdate business={business} />
    </div>
  );
};

export default BusinessDocumentUpdate;
