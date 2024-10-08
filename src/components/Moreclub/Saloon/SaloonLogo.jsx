import { message } from "antd";
import React, {  useState } from "react";
import { useDispatch } from "react-redux";

import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { moresaloonURL } from "../../../config/config";
import { axiosInstance } from "../../..";

const SaloonLogo = ({ data }) => {
    const { id } = useParams();
    const [inputBanner, setInputBanner] = useState("");
    const [inputDisplayImage, setInputDisplayImage] = useState(
        `${data}`
    );
    const [bannerError, setBannerError] = useState("");
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
   

    const handleAvatarSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                logo: inputBanner,
            };
            const res = await await axiosInstance.patch(
                `${moresaloonURL}moreclub/users/saloon/${id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
    
    
            if (res.status === 200) {
                message.success("Logo Updated Successfully");
                queryClient.invalidateQueries([`Saloon List ${id}`]);
            } else {
                message.error("Failed to Upload Logo");
            }
            
        } catch (error) { 
            message.error("Failed to Upload Logo");
        } finally {
            setIsLoading(false);
        }
    };

    const bannerhandleChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setInputDisplayImage(URL.createObjectURL(event.target.files[0]));
            setInputBanner(event.target.files[0]);
            setBannerError("");
        } else {
            setBannerError("Please upload images only");
        }
    };

    return (
        <div className="col-12 col-md-8 col-lg-6 ">
            <h4>Salon Logo</h4>
            <div className=" card ">
                <div className="card-body p-4 p-sm-5" style={{ marginTop: "-25px" }}>
                    <div className=" card-body">
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
                                    onChange={bannerhandleChange}
                                    required
                                />
                                {bannerError && <p className="text-danger">{bannerError}</p>}
                            </Form.Group>
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-primary w-100 rounded-pill"
                                type="submit"
                                disabled={bannerError !== ""}
                            >
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}

                                <i className="bi bi-sd-card-fill me-1" />
                                Upload
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SaloonLogo;
