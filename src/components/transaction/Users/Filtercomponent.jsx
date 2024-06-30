import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {useNavigate } from "react-router-dom";

const Filtercomponent = ({activeTab}) => {
  const [starting, setStarting] = useState();
  const [ending, setEnding] = useState();
  const navigate = useNavigate();

  const handleFiltering =(e)=>{
    e.preventDefault();
    const currentURL = window.location.href.split('?')[0];
    const url = `?active=${encodeURIComponent(activeTab)}&starting=${encodeURIComponent(starting)}&ending=${encodeURIComponent(ending)}`;
    navigate(url)
    // window.location.href = url;
  }

  return (
    <div className="content-inside-wrapper card p-2">
      <h6>Filter</h6>
      <div className="row">
        <Form onSubmit={handleFiltering} className="d-flex flex-wrap gap-2 justify-content-start">
          <Form.Group>
          <Form.Label>Start</Form.Label>
          <Form.Control
            type="date"
            value={starting}
            onChange={(e) => setStarting(e.target.value)}
            className="filter-input"
            required
          /> 
            </Form.Group>  
          <Form.Group>
          <Form.Label>End</Form.Label>
          <Form.Control
            type="date"
            value={ending}
            onChange={(e) => setEnding(e.target.value)}
            className="filter-input"
            required
          />
          </Form.Group>
          <div className="align-self-end mt-2">

          <button type="submit" className="btn btn-sm btn-warning mb-1 px-1" style={{minWidth:"4rem"}}>
            Filter
          </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Filtercomponent;
