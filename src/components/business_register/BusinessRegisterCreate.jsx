import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { businessProfile, businessType } from "../../redux/api/userDetailAPI";

import $ from "jquery";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const BusinessRegisterCreate = () => {
  const [inputBusinessName, setInputBusinessName] = useState("");
  const [inputBusinessAddress, setInputBusinessAddress] = useState("");
  const [inputBusinessEmail, setInputBusinessEmail] = useState("");
  const [inputBusinessPhone, setInputBusinessPhone] = useState("");
  const [inputBusinessRegistration, setInputBusinessRegistration] =
    useState("");
  const [inputBusinessDocument, setInputBusinessDocument] = useState("");
  const [inputBusinessImage, setInputBusinessImage] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const business = useSelector((state) => state.businessReducer);

  useEffect(() => {
    dispatch(businessType());
  }, [dispatch]);

  useEffect(() => {
    if (business.businessTypeList && business.businessTypeList.length > 0) {
      const formattedOptions = business.businessTypeList.map((option) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(formattedOptions);
    }
  }, [business.businessTypeList]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      business_name: inputBusinessName,
      business_address: inputBusinessAddress,
      business_email: inputBusinessEmail,
      business_phone: inputBusinessPhone,
      business_registration_number: inputBusinessRegistration,
      business_document: inputBusinessImage,
      business_types: selectedBusinessType.map((type) => type.value),
    };
    const res = dispatch(businessProfile(formData));
  };

  const ImagehandleChange = (event) => {
    setInputBusinessDocument(URL.createObjectURL(event.target.files[0]));
    setInputBusinessImage(event.target.files[0]);
  };

  return (
    <div className="create-new-wrapper">
      <div className="container">
        <div className="row g-5 justify-content-center">
          <div className="col-12 col-lg-8">
            {/* Create New Form */}
            <div className="create-new-form border shadow-sm p-4 p-sm-5">
              <Form onSubmit={handleSubmit}>
                <div className="row align-items-center">
                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Business Name
                      </Form.Label>
                      <Form.Control
                        id="title"
                        type="text"
                        value={inputBusinessName}
                        onChange={(e) => setInputBusinessName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Business Address
                      </Form.Label>
                      <Form.Control
                        id="title"
                        type="text"
                        value={inputBusinessAddress}
                        onChange={(e) =>
                          setInputBusinessAddress(e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Business Email
                      </Form.Label>
                      <Form.Control
                        id="title"
                        type="email"
                        value={inputBusinessEmail}
                        onChange={(e) => setInputBusinessEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Business Phone
                      </Form.Label>
                      <Form.Control
                        id="title"
                        type="tel"
                        value={inputBusinessPhone}
                        onChange={(e) => setInputBusinessPhone(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Business Registration
                      </Form.Label>
                      <Form.Control
                        id="title"
                        type="text"
                        value={inputBusinessRegistration}
                        onChange={(e) =>
                          setInputBusinessRegistration(e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Business Types
                      </Form.Label>
                      <Select
                        className="mb-4 form-control"
                        styles={{
                          background: "transparent",
                        }}
                        defaultValue={selectedBusinessType}
                        onChange={setSelectedBusinessType}
                        options={options}
                        isMulti={true}
                        required
                      />
                    </Form.Group>
                  </div>

                  <div className="col-12">
                    <Form.Group className="mb-4">
                      <Form.Label className="mb-2 fz-16">
                        Upload Files
                      </Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        id="formFileMultiple"
                        type="file"
                        multiple
                        onChange={ImagehandleChange}
                        required
                      />
                    </Form.Group>
                  </div>

                  <div className="col-12 col-md-4">
                    <button
                      className="btn btn-primary rounded-pill w-100"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-12 col-sm-8 col-lg-4">
            {/* Preview Card */}
            <div className="nft-card card shadow-sm">
              <div className="card-body">
                <div className="img-wrap">
                  <img src={inputBusinessDocument} alt="" />

                  {/* Badge */}
                  <div className="badge bg-dark position-absolute">
                    <img src="img/core-img/fire.png" alt="" />
                    Featured
                  </div>
                </div>

                <div className="row gx-2 align-items-center mt-2">
                  <div className="col-8">
                    <div className="name-info d-flex align-items-center">
                      <div className="author-img position-relative">
                        <img
                          className="shadow"
                          src="img/bg-img/u1.jpg"
                          alt=""
                        />
                        <i className="bi bi-check position-absolute bg-success" />
                      </div>
                      <div className="name-author">
                        <Link
                          className="name d-block hover-primary text-truncate fz-20"
                          to="#"
                        >
                          {inputBusinessName}
                        </Link>
                        <Link
                          className="author d-block fz-12 hover-primary text-truncate"
                          to="#"
                        >
                          <i className="bi bi-map"></i> {inputBusinessAddress}
                        </Link>
                        <Link
                          className="author d-block fz-12 hover-primary text-truncate"
                          to="#"
                        >
                          <i className="bi bi-envelope-fill"></i>{" "}
                          {inputBusinessEmail}
                        </Link>
                        <Link
                          className="author d-block fz-12 hover-primary text-truncate"
                          to="#"
                        >
                          <i className="bi bi-telephone-fill"></i>{" "}
                          {inputBusinessPhone}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="row gx-2 align-items-center mt-3">
                  <div className="col-12 text-end">
                    <Link
                      className="btn btn-minimal btn-sm hover-primary"
                      to="#"
                    >
                      <i className="bi bi-newspaper me-1" />
                      {inputBusinessRegistration}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="mb-0 mt-3 text-center">
              <i className="bi bi-eye me-1" />
              Live Preview
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegisterCreate;
