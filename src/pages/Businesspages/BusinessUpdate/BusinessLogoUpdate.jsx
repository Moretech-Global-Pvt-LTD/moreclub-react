import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update_business_document } from "../../../redux/api/loginAPI";
import { Form } from "react-bootstrap";

const BussinessLogoUpdate = ({ business }) => {
  const dispatch = useDispatch();
  const [inputAvatar, setInputAvatar] = useState("");
  const [inputDisplayImage, setInputDisplayImage] = useState(
    `${business.businessProfile?.business_logo}`
  );
  const [avatarError, setAvatarError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (business.businessProfile.business_logo) {
      setInputDisplayImage(`${business.businessProfile.business_logo}`);
    }
  }, [business]);

  const handleAvatarSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = {
        business_logo: inputAvatar,
      };
      const res = await dispatch(update_business_document(formData));
  
      if (res.status === 200) {
        message.success("Logo Updated Successfully");
      } else {
        message.error("Failed to Update Avatar");
      }
    }catch (error) {
      message.error("Failed to Update Avatar");
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
    <div className="card col-12 col-lg-5">
      <div className="card-body p-4 p-sm-5" style={{ marginTop: "-25px" }}>
        <h4>Business Logo</h4>
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
                required
              />
              {avatarError && <p className="text-danger">{avatarError}</p>}
            </Form.Group>
          </div>
          <div className="col-12">
            <button
              className="btn btn-warning w-100 "
              type="submit"
              disabled={avatarError !== ""}
            >
              {isLoading && <span className="spinner-border spinner-border-sm"></span>}
              <i className="bi bi-sd-card-fill me-1" />
              Update Logo
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BussinessLogoUpdate;
