import React, { useState } from "react";
import Table from "./table";
import { Button, Modal } from "react-bootstrap";
import SectionEditingform from "./SectionEdditingForm";

const Section = ({
  section,
  onEditSectionName,
  onAddTable,
  onEditTable,
  ondeleteSection,
  onDeleteTable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [adding, setadding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSaveSectionName = async (data) => {
    const res = onEditSectionName(data);
    return res;
  };

  const handleCancelEditSectionName = () => {
    setIsEditing(false);
  };

  const handleAddTable = async (sec) => {
    setadding(true);
    await onAddTable(sec);
    setadding(false);
  };

  const handledeleteSection = async (data) => {
    setDeleting(true);
    await ondeleteSection(data);
    setDeleting(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom:"4px" }}>
        <h4 style={{ margin: "0" }}>{section.name}</h4>
        <Button
          className="btn btn-primary btn-sm"
          onClick={() => setIsEditing(true)}
        >
          ✎
        </Button>
        <Button
          className="btn btn-danger btn-sm"
          onClick={() => handledeleteSection(section)}
        >
          {deleting ?  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:<i class="bi bi-trash"></i>}
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "10px",
        }}
      >
        {section.tables.map((table) => (
          <Table
            key={table.id}
            table={table}
            onEdit={(tableId, newName, newChairs) =>
              onEditTable(section.id, tableId, newName, newChairs)
            }
            onDelete={(tableId) => onDeleteTable(section.id, tableId)}
          />
        ))}
        <button
          onClick={() => handleAddTable(section)}
          style={{
            border: "1px dashed #ccc",
            padding: "10px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {adding ? "Adding..." : " + Add Table"}
        </button>
      </div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="sm"
        centered
        show={isEditing}
        onHide={handleCancelEditSectionName}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Update Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SectionEditingform
            onSubmit={handleSaveSectionName}
            onCancel={handleCancelEditSectionName}
            initialValues={section}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Section;
