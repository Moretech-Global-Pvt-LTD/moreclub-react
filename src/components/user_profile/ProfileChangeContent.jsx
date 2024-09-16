import { useState } from "react";
import Form from "react-bootstrap/Form";

import $ from "jquery";
import {
  update_profile,
  update_profile_picture,
} from "../../redux/api/loginAPI";
import { useDispatch } from "react-redux";
import { message } from "antd";
import AutoCompleteInput from "../Googlemap/AutofillInput";
import AddressForm from "./UserAddress";

window.jQuery = window.$ = $;
require("jquery-nice-select");

const ProfileChangeContent = ({ user }) => {
  const [inputFullName, setInputFullName] = useState(
    `${user.user?.first_name} ${user.user?.last_name}`
  );
  const [inputPhoneNumber, setInputPhoneNumber] = useState(
    user.user.user_profile?.secondary_phone_number
  );
  const [primaryEmail, setPrimaryEmail] = useState(user.user?.email);
  const [primaryPhone, setPrimaryPhone] = useState(user.user?.phone_number);
  const [inputEmail, setInputEmail] = useState(
    user.user?.user_profile?.secondary_email
  );
  const [inputDateOfBirth, setInputDateOfBirth] = useState(
    user.user?.user_profile?.date_of_birth
  );
  const [inputGender, setInputGender] = useState(
    user.user?.user_profile?.gender
  );
  const [inputUserType, setInputUserType] = useState(user.user?.user_type);

  const [inputState, setInputState] = useState(user.user?.user_profile?.street);
  const [inputCity, setInputCity] = useState(user.user?.user_profile?.city);
  const [inputAddress, setInputAddress] = useState(
    user.user?.user_profile?.address
  );
  const [inputZipCode, setInputZipCode] = useState(
    user.user?.user_profile?.zip_code
  );
  const [inputHouseNumber, setInputHouseNumber] = useState(
    user.user?.user_profile?.house_no
  );

  const [inputAvatar, setInputAvatar] = useState("");
  const [inputDisplayImage, setInputDisplayImage] = useState(
    `${user.user.user_profile?.display_picture}`
  );
  const [avatarError, setAvatarError] = useState("");

  const [activeTab, setActiveTab] = useState("General");

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const dispatch = useDispatch();

  const handleGeneralSubmit = async (event) => {
    event.preventDefault();
    const fullNameParts = inputFullName.split(" ");
    const firstName = fullNameParts[0];
    const lastName = fullNameParts.slice(1).join(" ");

    const userProfileData = {
      secondary_phone_number: inputPhoneNumber,
      secondary_email: inputEmail,
      date_of_birth: inputDateOfBirth,
      gender: inputGender,
    };

    const formData = {
      first_name: firstName,
      last_name: lastName,
      user_type: inputUserType,
      user_profile: userProfileData,
    };

    const res = await dispatch(update_profile(formData));

    if (res.success) {
      message.success("Information Updated Successfully");
    } else {
      message.error("Failed to Update Information");
    }
  };

  const handleAddressSubmit = async (event) => {
    event.preventDefault();

    const userProfileData = {
      street: inputState,
      city: inputCity,
      address: inputAddress,
      zip_code: inputZipCode,
      house_no: inputHouseNumber,
    };

    const formData = {
      user_profile: userProfileData,
    };
    const res = await dispatch(update_profile(formData));

    if (res.success) {
      message.success("Address Updated Successfully");
    } else {
      message.error("Failed to Update Address");
    }
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

  const handleAvatarSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      display_picture: inputAvatar,
    };
    const res = await dispatch(update_profile_picture(formData));
    if (res) {
      message.success("Avatar Updated Successfully");
    } else {
      message.error("Failed to Update Avatar");
    }
  };

  // const [address, setAddress] = useState({
  //   place: "",
  //   region: "",
  //   postcode: "",
  //   houseno:"",
  //   latitude: "",
  //   longitude: "",
  // });

  // const handleAddressSubmit = (event) => {
  //   event.preventDefault();
  //     console.log("Selected address:", address);
  // };
  

  return (
    <div className="row justify-content-start">
      <div className="row">
        <div className="tabs">
          <button
            className={`${
              activeTab === "General" ? "tablinks active" : "tablinks"
            } rounded-pills`}
            onClick={() => openTab("General")}
          >
            General
          </button>
          <button
            className={`${
              activeTab === "Address" ? "tablinks active" : "tablinks"
            } rounded-pills`}
            onClick={() => openTab("Address")}
          >
            Address
          </button>
          <button
            className={`${
              activeTab === "Avatar" ? "tablinks active" : "tablinks"
            } `}
            onClick={() => openTab("Avatar")}
          >
            Avatar
          </button>
        </div>
        <div className="content-outside-wrapper">
          <div className="col-12 col-lg-8 col-xl-8 col-xxl-8 mt-1">
            <div
              id="General"
              className={`
                ${
                  activeTab === "General" ? "tabcontent active" : "tabcontent"
                } `}
            >
              <div className="card">
                <div
                  className="card-body p-4 p-sm-5"
                  style={{ marginTop: "-25px" }}
                >
                  <h4>Update Basic Information</h4>
                  <Form onSubmit={handleGeneralSubmit}>
                    <div className="row g-4">
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">
                            Primary Phone Number
                          </Form.Label>
                          <Form.Control
                            id="primary_phone_number"
                            type="text"
                            value={primaryPhone}
                            onChange={(e) => setPrimaryPhone(e.target.value)}
                            placeholder="Primary number with country code"
                            style={{ backgroundColor: "transparent" }}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">
                            Primary Email
                          </Form.Label>
                          <Form.Control
                            id="primary_email"
                            type="email"
                            value={primaryEmail}
                            onChange={(e) => setPrimaryEmail(e.target.value)}
                            placeholder="Primary Email"
                            style={{ backgroundColor: "transparent" }}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">Full name</Form.Label>
                          <Form.Control
                            id="fullName"
                            type="text"
                            value={inputFullName}
                            onChange={(e) => setInputFullName(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">
                            Secondary Phone Number
                          </Form.Label>
                          <Form.Control
                            id="secondary_phone_number"
                            type="text"
                            value={inputPhoneNumber}
                            onChange={(e) =>
                              setInputPhoneNumber(e.target.value)
                            }
                            placeholder="Secondary number with country code"
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">
                            Secondary Email
                          </Form.Label>
                          <Form.Control
                            id="secondary_email"
                            type="email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                            placeholder="Secondary Email"
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12 col-lg-6">
                        <Form.Group>
                          <Form.Label className="fz-16 ">
                            Date of Birth
                          </Form.Label>
                          <Form.Control
                            id="dob"
                            type="date"
                            value={inputDateOfBirth}
                            onChange={(e) =>
                              setInputDateOfBirth(e.target.value)
                            }
                            className="text-dynamic-white "
                            required
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12 col-lg-6">
                        <Form.Group>
                          <Form.Label>Gender</Form.Label>
                          <br />
                          <Form.Check
                            inline
                            type="radio"
                            id="male"
                            label="Male"
                            name="gender"
                            value="MALE"
                            checked={inputGender === "MALE"}
                            onChange={(e) => setInputGender(e.target.value)}
                            required
                          />
                          <Form.Check
                            inline
                            type="radio"
                            id="female"
                            label="Female"
                            name="gender"
                            value="FEMALE"
                            checked={inputGender === "FEMALE"}
                            onChange={(e) => setInputGender(e.target.value)}
                            required
                          />
                          <Form.Check
                            inline
                            type="radio"
                            id="other"
                            label="Other"
                            name="gender"
                            value="OTHER"
                            checked={inputGender === "OTHER"}
                            onChange={(e) => setInputGender(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Label className="mb-2 fz-16">
                          User Type
                        </Form.Label>
                        <select
                          name="userType"
                          className="bg-transparent form-control w-100"
                          onChange={(e) => setInputUserType(e.target.value)}
                          disabled={true}
                        >
                          <option value="">Select User Type</option>
                          <option
                            value="NORMAL"
                            selected={
                              inputUserType === "NORMAL" ? "selected" : ""
                            }
                          >
                            Normal
                          </option>
                          <option
                            value="BUSINESS"
                            selected={
                              inputUserType === "BUSINESS" ? "selected" : ""
                            }
                          >
                            Business
                          </option>
                        </select>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit"
                        >
                          <i className="bi bi-sd-card-fill me-1" />
                          Save changes
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>

            <div
              id="Address"
              className={
                activeTab === "Address" ? "tabcontent active" : "tabcontent"
              }
            >
              <div className="card">
                <div
                  className="card-body p-4 p-sm-5"
                  style={{ marginTop: "-25px" }}
                >
                  <h4>Update Address</h4>
                  <Form onSubmit={handleAddressSubmit}>
                    <div className="row g-4">
                      
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">State</Form.Label>
                          <Form.Control
                            id="street"
                            type="text"
                            value={inputState}
                            onChange={(e) => setInputState(e.target.value)}
                            placeholder="Your State"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">City</Form.Label>
                          <Form.Control
                            id="city"
                            type="text"
                            value={inputCity}
                            onChange={(e) => setInputCity(e.target.value)}
                            placeholder="Your City"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">Address</Form.Label>
                          <Form.Control
                            id="address"
                            type="text"
                            value={inputAddress}
                            onChange={(e) => setInputAddress(e.target.value)}
                            placeholder="Your full address"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">Zip Code</Form.Label>
                          <Form.Control
                            id="zip_code"
                            type="text"
                            value={inputZipCode}
                            onChange={(e) => setInputZipCode(e.target.value)}
                            placeholder="Your zip code"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group>
                          <Form.Label className="fz-16 ">House No</Form.Label>
                          <Form.Control
                            id="house_no"
                            type="text"
                            value={inputHouseNumber}
                            onChange={(e) =>
                              setInputHouseNumber(e.target.value)
                            }
                            placeholder="Your house number (Optional)"
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit"
                        >
                          <i className="bi bi-sd-card-fill me-1" />
                          Save changes
                        </button>
                      </div>
                    </div>

                  </Form>
                  {/* <AddressForm
                    onSubmit={handleAddressSubmit}
                    address={address}
                    setAddress={setAddress}
                  /> */}
                </div>
              </div>
            </div>

            <div
              id="Avatar"
              className={
                activeTab === "Avatar" ? "tabcontent active" : "tabcontent"
              }
            >
              <div className="card">
                <div
                  className="card-body p-4 p-sm-5"
                  style={{ marginTop: "-25px" }}
                >
                  <h4>Update Avatar</h4>
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
                        {avatarError && (
                          <p className="text-danger">{avatarError}</p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 rounded-pill"
                        type="submit"
                        disabled={avatarError !== ""}
                      >
                        <i className="bi bi-sd-card-fill me-1" />
                        Save changes
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileChangeContent;
