// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Section from "../../../../components/Moreclub/Resturant/tablemanagement/section";
// import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
// import { useParams } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";
// import SectionAddingform from "../../../../components/Moreclub/Resturant/tablemanagement/SectionAddingform";
// import { message } from "antd";
// import { useSelector } from "react-redux";

// const TablemanagementContent = () => {
//   const { res_id } = useParams();

//   const sections = useSelector((state) => state.table.sections);
//   // const [sections, setSections] = useState(sectionsdata || []);


//   const [addSection, setAddSection] = useState(false);


//   const handleAddSection = async (data) => {
//     try {
//       const res = await morefoodAuthenticatedAxios.post(
//         `moreclub/restaurant/${res_id}/section/`,
//         data
//       );
//       const newSection = {
//         id: res.data.data.id,
//         name: res.data.data.name,
//         code: res.data.data.code,
//         tables: [],
//       };
//       setSections([...sections, newSection]);
//       return res;
//     } catch (e) {
//       return e.response;
//     }
//   };

//   const handledeleteSection = async (data) => {
//     try {
//       const res = await morefoodAuthenticatedAxios.delete(
//         `moreclub/restaurant/${res_id}/${data.id}/section/`
//       );
//       const filteredSections = sections.filter(
//         (section) => section.id !== data.id
//       );
//       setSections(filteredSections);
//       return res;
//     } catch (e) {
//       console.log(e);
//       return e.response;
//     }
//   };

//   const handleEditSectionName = async (data) => {
//     try {
//       const res = await morefoodAuthenticatedAxios.post(
//         `moreclub/restaurant/${res_id}/section/`,
//         data
//       );
//       const newSection = {
//         id: res.data.data.id,
//         name: res.data.data.name,
//         code: res.data.data.code,
//         tables: res.data.data.tables,
//       };
//       setSections(
//         sections.map((section) =>
//           section.id === data.id ? newSection : section
//         )
//       );
//       return res;
//     } catch (e) {
//       console.log(e);
//       return e.response;
//     }
//     // console.log("edited table", id, newName);
//     // setSections(
//     //   sections.map((section) =>
//     //     section.id === id ? { ...section, name: newName } : section
//     //   )
//     // );
//   };

//   const handleAddTable = async (sec) => {
//     try {
//       const res = await morefoodAuthenticatedAxios.post(
//         `moreclub/restaurant/${res_id}/add/tables/`,
//         {
//           section: sec.id,
//           name: `Table-${sec.tables.length + 1}`,
//           capacity: 4,
//         }
//       );
//       setSections(
//         sections.map((section) =>
//           section.id === sec.id
//             ? {
//                 ...section,
//                 tables: [
//                   ...section.tables,
//                   {
//                     id: res.data.data.id,
//                     name: res.data.data.name,
//                     capacity: res.data.data.capacity,
//                     qr_code: res.data.data.qr_code,
//                     called: false,
//                     waiter_called: false,
//                     billed_called: false,
//                   },
//                 ],
//               }
//             : section
//         )
//       );
//       message.success("Table added successfully");
//     } catch (e) {
//       console.log(e);
//       message.error(e.response.data.message);
//     }
//   };

//   const handleEditTable = async (sectionId, tableId, newName, newChairs) => {
//     try {
//       const res = await morefoodAuthenticatedAxios.patch(
//         `moreclub/restaurant/${res_id}/${tableId}/update/tables/`,
//         {
//           name: newName,
//           capacity: newChairs,
//         }
//       );
//       setSections(
//         sections.map((section) =>
//           section.id === sectionId
//             ? {
//                 ...section,
//                 tables: section.tables.map((table) =>
//                   table.id === tableId
//                     ? { ...table, name: newName, chairs: newChairs }
//                     : table
//                 ),
//               }
//             : section
//         )
//       );
//       message.success("Table updated successfully");
//       return res;
//     } catch (e) {
//       console.log(e);
//       message.error(e.response.data.message);
//       return e.response;
//     }
//   };

//   const handleDeleteTable = async (sectionId, tableId) => {
//     try {
//       const res = await morefoodAuthenticatedAxios.delete(
//         `moreclub/restaurant/${res_id}/${tableId}/update/tables/`
//       );
//       setSections(
//         sections.map((section) =>
//           section.id === sectionId
//             ? {
//                 ...section,
//                 tables: section.tables.filter((table) => table.id !== tableId),
//               }
//             : section
//         )
//       );
//       message.success("Table updated successfully");
//       return res;
//     } catch (e) {
//       console.log(e);
//       message.error(e.response.data.message);
//       return e.response;
//     }
//   };

//   async function hideAddSection() {
//     setAddSection(false);
//   }

//   return (
//     <>
//       <audio ref={audioRef} src="/path/to/notification.mp3" preload="auto" />
//       <div style={{ padding: "20px", fontFamily: "Arial" }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <h2>Table Management</h2>
//           <Button
//             className="btn btn-warning btn-sm"
//             onClick={() => {
//               setAddSection(true);

//               if (audioRef.current) {
//                 audioRef.current
//                   .play()
//                   .catch((err) => console.error("Audio error:", err));
//               }
//             }}
//           >
//             Add Section
//           </Button>
//         </div>
//         <div>
//           {sections &&
//             sections.length > 0 &&
//             sections.map((section) => (
//               <Section
//                 key={section.id}
//                 section={section}
//                 onEditSectionName={handleEditSectionName}
//                 onAddTable={handleAddTable}
//                 onEditTable={handleEditTable}
//                 ondeleteSection={handledeleteSection}
//                 onDeleteTable={handleDeleteTable}
//                 onChangeStatus={handleStatusChange}
//               />
//             ))}
//           {sections && sections.length === 0 && (
//             <div className="text-center w-100 text-dynamic-white">
//               You have not set Table in your Restaurant
//             </div>
//           )}
//         </div>
//         <Modal
//           aria-labelledby="contained-modal-title-vcenter"
//           size="sm"
//           centered
//           show={addSection}
//           onHide={hideAddSection}
//         >
//           <Modal.Header>
//             <Modal.Title
//               id="contained-modal-title-vcenter text-center"
//               className="text-dynamic-white"
//             >
//               Add Sections
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <SectionAddingform
//               onSubmit={handleAddSection}
//               onCancel={hideAddSection}
//             />
//           </Modal.Body>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default TablemanagementContent;


import React, { useState, useRef } from "react";
import Section from "../../../../components/Moreclub/Resturant/tablemanagement/section";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import SectionAddingform from "../../../../components/Moreclub/Resturant/tablemanagement/SectionAddingform";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addSection,
  deleteSection,
  updateSection,
  addTable,
  updateTable,
  deleteTable,

} from "../../../../redux/slices/tableSlice";

const TablemanagementContent = () => {
  const { res_id } = useParams();
  const sections = useSelector((state) => state.table.sections);
  const dispatch = useDispatch();
  const audioRef = useRef();

  const [addSectionModal, setAddSectionModal] = useState(false);

  // Add a new section
  const handleAddSection = async (data) => {
    try {
      const res = await morefoodAuthenticatedAxios.post(
        `moreclub/restaurant/${res_id}/section/`,
        data
      );
      const newSection = {
        id: res.data.data.id,
        name: res.data.data.name,
        code: res.data.data.code,
        tables: [],
      };
      dispatch(addSection(newSection)); // Dispatch Redux action
      message.success("Section added successfully");
      return res;
    } catch (e) {
      message.error("Error adding section");
      return e.response;
    }
  };

  // Delete a section
  const handledeleteSection = async (data) => {
    try {
      await morefoodAuthenticatedAxios.delete(
        `moreclub/restaurant/${res_id}/${data.id}/section/`
      );
      dispatch(deleteSection(data.id)); // Dispatch Redux action
      message.success("Section deleted successfully");
    } catch (e) {
      console.log(e);
      message.error("Error deleting section");
    }
  };

  // Edit a section name
  const handleEditSectionName = async (data) => {
    try {
      const res = await morefoodAuthenticatedAxios.patch(
        `moreclub/restaurant/${res_id}/${data.id}/section/`,
        data
      );
      dispatch(updateSection({ id: data.id, ...res.data.data })); // Dispatch Redux action
      message.success("Section updated successfully");
      return res;
    } catch (e) {
      message.error("Error updating section");
      return e.response;
    }
  };

  // Add a table to a section
  const handleAddTable = async (sec) => {
    try {
      const res = await morefoodAuthenticatedAxios.post(
        `moreclub/restaurant/${res_id}/add/tables/`,
        {
          section: sec.id,
          name: `Table-${sec.tables.length + 1}`,
          capacity: 4,
        }
      );
      
      const newTable = { ...res.data.data}
      console.log(newTable);
      dispatch(addTable({ sectionId: sec.id, table: newTable })); // Dispatch Redux action
      message.success("Table added successfully");
    } catch (e) {
      console.log(e);
      message.error("Error adding table");
    }
  };

  // Edit a table's details
  const handleEditTable = async (sectionId, tableId, newName, newChairs) => {
    try {
      await morefoodAuthenticatedAxios.patch(
        `moreclub/restaurant/${res_id}/${tableId}/update/tables/`,
        {
          name: newName,
          capacity: newChairs,
        }
      );
      dispatch(updateTable({ sectionId, table: { id: tableId, name: newName, capacity: newChairs } })); // Dispatch Redux action
      message.success("Table updated successfully");
    } catch (e) {
      message.error("Error updating table");
    }
  };

  // Delete a table from a section
  const handleDeleteTable = async (sectionId, tableId) => {
    try {
      await morefoodAuthenticatedAxios.delete(
        `moreclub/restaurant/${res_id}/${tableId}/update/tables/`
      );
      dispatch(deleteTable({ sectionId, tableId })); // Dispatch Redux action
      message.success("Table deleted successfully");
    } catch (e) {
      message.error("Error deleting table");
    }
  };

  const hideAddSection = () => {
    setAddSectionModal(false);
  };


  return (
    <>
      <audio ref={audioRef} src="/path/to/notification.mp3" preload="auto" />
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>Table Management</h2>
          <Button
            className="btn btn-warning btn-sm"
            onClick={() => {
              setAddSectionModal(true);
              audioRef.current?.play().catch((err) => console.error("Audio error:", err));
            }}
          >
            Add Section
          </Button>
        </div>
        <div>
          {sections.length > 0 ? (
            sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                onEditSectionName={handleEditSectionName}
                onAddTable={handleAddTable}
                onEditTable={handleEditTable}
                ondeleteSection={handledeleteSection}
                onDeleteTable={handleDeleteTable}
              />
            ))
          ) : (
            <div className="text-center w-100 text-dynamic-white">
              You have not set Table in your Restaurant
            </div>
          )}
        </div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          size="sm"
          centered
          show={addSectionModal}
          onHide={hideAddSection}
        >
          <Modal.Header>
            <Modal.Title className="text-dynamic-white">
              Add Sections
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SectionAddingform onSubmit={handleAddSection} onCancel={hideAddSection} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default TablemanagementContent;

