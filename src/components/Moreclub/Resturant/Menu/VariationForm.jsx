import React, { useState } from "react";
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { message } from "antd";
import {Form, Button } from "react-bootstrap";
import { addVariationType } from "../../../../redux/slices/MenuSlice";
import { useDispatch } from "react-redux";

const VariationForm = ({ res_id, onFinish }) => {
  const dispatch = useDispatch();
    const [variationFormData, setVariationFormData] = useState({
    name: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVariationFormData({ ...variationFormData, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", variationFormData.name);

    axiosInstance
      .post(`${morefoodURL}moreclub/user/variation/types/${res_id}/`, formData)
      .then((response) => {
        message.success("Variation Added Successfully");
        setVariationFormData({ name: "", image: null });
        const variationType = response.data.data;
        dispatch(addVariationType({ variationType }));
        onFinish();
      })
      .catch((error) => {
        message.error("error creating Variation ");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formItemName">
        <Form.Label>Variation type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter variation type"
          name="name"
          value={variationFormData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onFinish} className="my-3">
          Cancel
        </Button>
        <Button variant="success" type="submit" className="my-3">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}{" "}
          Add Variation
        </Button>
      </div>
    </Form>
  );
};

export default VariationForm;
