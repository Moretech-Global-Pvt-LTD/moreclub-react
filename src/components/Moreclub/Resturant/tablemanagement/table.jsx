import React, { useState } from "react";
import { Badge, Button, Form, Image, Modal } from "react-bootstrap";
import QRDownload from "../../../QR/QRDownload";

const Table = ({ table, onEdit, onDelete, onChangeStatus }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(table.name);
  const [newChairs, setNewChairs] = useState(table.capacity);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteing = async () => {
    setDeleting(true);
    await onDelete(table.id);
    setDeleting(false);
  };

  const handleSave = async () => {
    setLoading(true);
    if (newName.trim() && newChairs > 0) {
      await onEdit(table.id, newName, newChairs);
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id) => {
    await onChangeStatus(id);
    // await onEdit(id, newName, newChairs, status);
  };

  const getBgColor = (status) => {
    switch (status) {
      case "billed_called":
        return "bg-danger text-white"; // Success color class
      case "called":
        return "bg-warning text-black"; // Warning color class
      case "waiter_called":
        return "bg-success text-white"; // Light color class
      default:
        return "editable-table-default text-black"; // Default class
    }
  };

  const tableStatus = table.billed_called
    ? "billed_called"
    : table.called
    ? "called"
    : table.waiter_called
    ? "waiter_called"
    : "";

  return (
    <>
      <div className={`editable-table editable-table-default`}>
        {isEditing ? (
          <div>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Table Name"
              className="form-control"
            />
            <Form.Control
              type="number"
              value={newChairs}
              onChange={(e) => setNewChairs(Number(e.target.value))}
              placeholder="Capacity"
              className="form-control"
            />
            <div className="buttons">
              <Button
                onClick={handleSave}
                className="btn btn-primary btn-sm"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {tableStatus !== "" && <div className="table-pulse-dot"></div>}
            <p className={`text-black`}>{table.name}</p>
            <p className={`text-black`}>Chairs: {table.capacity}</p>
            <p className={``}>
              {table.billed_called && (
                <Badge className="bg-danger">{"Want to Checkout"}</Badge>
              )}
              {table.called && (
                <Badge className="bg-warning text-black">{"Calling"}</Badge>
              )}
              {table.waiter_called && (
                <Badge className="bg-success">{"Calling Waiter"}</Badge>
              )}
            </p>
            
              <span
                className="bg-primary btn btn-sm"
                onClick={() => setModalShow(true)}
              >
                {" "}
                View QR
              </span>
            
            <div className="controls">
              <div
                className="bg-primary text-white rounded"
                style={{ cursor: "pointer", padding: "2px" }}
                onClick={() => setIsEditing(true)}
              >
                ✎
              </div>
              <div
                className="bg-danger text-white rounded"
                style={{ cursor: "pointer", padding: "2px" }}
                onClick={() => handleDeleteing()}
              >
                {deleting ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="bi bi-trash"></i>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title
            closeButton
            id="contained-modal-title-vcenter "
            className="w-100"
          >
            <div className="d-flex justify-content-between w-100 text-dynamic-white ">
              {table.name} QR
              <Button
                variant="outline"
                className="text-dynamic-white"
                onClick={() => setModalShow(false)}
              >
                X
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
          <Image
            src={`${table.qr_code}`}
            alt={`Qr Code for ${table.name}`}
            style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          />
          <div className="d-flex justify-content-center mt-3">
            <QRDownload
              imageUrl={`${table.qr_code}`}
              name={`MenuOrder-qr_${table.name}}`}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Table;
