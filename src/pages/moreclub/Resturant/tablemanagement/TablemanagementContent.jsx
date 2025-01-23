import React, { useState } from "react";
import Section from "../../../../components/Moreclub/Resturant/tablemanagement/section";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import SectionAddingform from "../../../../components/Moreclub/Resturant/tablemanagement/SectionAddingform";
import { message } from "antd";

const TablemanagementContent = ({ sectionsdata }) => {
  const { res_id } = useParams();
  const [sections, setSections] = useState(
    sectionsdata || []
  );
  const [addSection, setAddSection] = useState(false);

  const handleAddSection = async (data) => {
    try {
      const res = await morefoodAuthenticatedAxios.post(
        `moreclub/restaurant/${res_id}/section/`, data
      );
      const newSection = {
        id: res.data.data.id,
        name: res.data.data.name,
        code: res.data.data.code,
        tables: [],
      };
      setSections([...sections, newSection]);
      return res;
    } catch (e) {
      return e.response;
    }
  };

  const handledeleteSection = async(data) => {
    try {
      const res = await morefoodAuthenticatedAxios.delete(
        `moreclub/restaurant/${res_id}/${data.id}/section/`
      );
      const filteredSections = sections.filter(
        (section) => section.id !== data.id
      );
      setSections(filteredSections);
      return res;
    } catch (e) {
      console.log(e);
      return e.response;
    }
  };

  const handleEditSectionName = async(data) => {
    try {
      const res = await morefoodAuthenticatedAxios.post(
        `moreclub/restaurant/${res_id}/section/`, data
      );
      const newSection = {
        id: res.data.data.id,
        name: res.data.data.name,
        code: res.data.data.code,
        tables: res.data.data.tables,
      };
      setSections(
        sections.map((section) =>
          section.id === data.id ? newSection : section
        )
      );
      return res;
    } catch (e) {
      console.log(e);
      return e.response;
    }
    // console.log("edited table", id, newName);
    // setSections(
    //   sections.map((section) =>
    //     section.id === id ? { ...section, name: newName } : section
    //   )
    // );
  };

  const handleAddTable = async (sec) => {
    try {
      const res = await morefoodAuthenticatedAxios.post(
        `moreclub/restaurant/${res_id}/add/tables/` , {
          section: sec.id,
          name: `Table-${sec.tables.length + 1}`,
          capacity: 4
        }
      );
      setSections(
        sections.map((section) =>
          section.id === sec.id
            ? {
                ...section,
                tables: [
                  ...section.tables,
                  {
                    id: res.data.data.id,
                    name: res.data.data.name,
                    capacity: res.data.data.capacity,
                    qr_code: res.data.data.qr_code,
                  },
                ],
              }
            : section
        )
      );
      message.success("Table added successfully");
    } catch (e) {
      console.log(e);
      message.error(e.response.data.message);
    }

   
  };

  const handleEditTable = async (sectionId, tableId, newName, newChairs) => {
    try {
      const res = await morefoodAuthenticatedAxios.patch(
        `moreclub/restaurant/${res_id}/${tableId}/update/tables/`,{
          name: newName,
          capacity: newChairs
        }
      );
      setSections(
        sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                tables: section.tables.map((table) =>
                  table.id === tableId
                    ? { ...table, name: newName, chairs: newChairs }
                    : table
                ),
              }
            : section
        )
      );
      message.success("Table updated successfully");
      return res;
    } catch (e) {
      console.log(e);
      message.error(e.response.data.message);
      return e.response;
    }

    
  };


  const handleDeleteTable = async (sectionId, tableId) => {
    try {
      const res = await morefoodAuthenticatedAxios.delete(
        `moreclub/restaurant/${res_id}/${tableId}/update/tables/`
      );
      setSections(
        sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                tables: section.tables.filter((table) =>
                  table.id === tableId),
              }
            : section
        )
      );
      message.success("Table updated successfully");
      return res;
    } catch (e) {
      console.log(e);
      message.error(e.response.data.message);
      return e.response;
    }

    
  };

  async function hideAddSection() {
    setAddSection(false);
  }

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>Table Management</h2>
          <Button
            className="btn btn-warning btn-sm"
            onClick={() => setAddSection(true)}
          >
            Add Section
          </Button>
        </div>
        <div>
          {sections && sections.length > 0 && sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              onEditSectionName={handleEditSectionName}
              onAddTable={handleAddTable}
              onEditTable={handleEditTable}
              ondeleteSection={handledeleteSection}
              onDeleteTable={handleDeleteTable}
            />
          ))}
          {sections && sections.length === 0 &&(
            <div className="text-center w-100 text-dynamic-white">
              You have not set Table in your Restaurant
            </div>
          ) }
        </div>
        <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="sm"
        centered
        show={addSection}
        onHide={hideAddSection}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Add Sections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SectionAddingform
            onSubmit={handleAddSection}
            onCancel={hideAddSection}
          />
        </Modal.Body>
        </Modal>
      </div>
      
    </>
  );
};

export default TablemanagementContent;
