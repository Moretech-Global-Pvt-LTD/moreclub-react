// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";

// const Table = ({ table, onEdit, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newName, setNewName] = useState(table.name);
//   const [newChairs, setNewChairs] = useState(table.capacity);
//   const [loading, setLoading] = useState(false);

//   const handleDeleteing = async () => {
//     setLoading(true);
//     await onDelete(table.id);
//     setLoading(false);
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     if (newName.trim() && newChairs > 0) {
//       await onEdit(table.id, newName, newChairs);
//       setIsEditing(false);
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "10px",
//         textAlign: "center",
//         position: "relative",
//       }}
//     >
//       {isEditing ? (
//         <div>
//           {/* Name Input */}
//           <Form.Control
//             type="text"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//             placeholder="Table Name"
//             style={{
//               marginBottom: "5px",
//               padding: "5px",
//               fontSize: "14px",
//               width: "100%",
//             }}
//           />
//           {/* Chairs Input */}
//           <Form.Control
//             type="number"
//             value={newChairs}
//             onChange={(e) => setNewChairs(Number(e.target.value))}
//             placeholder="capacity"
//             style={{
//               marginBottom: "5px",
//               padding: "5px",
//               fontSize: "14px",
//               width: "100%",
//             }}
//           />
//           {/* Save and Cancel Buttons */}
//           <div className="d-flex w-full gap-2">
//             <Button onClick={handleSave} className="btn btn-primary btn-sm">
//               {loading ? "Saving..." : "Save"}
//             </Button>
//             <Button
//               onClick={() => setIsEditing(false)}
//               className="btn btn-secondary btn-sm"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p style={{ margin: "5px 0" }}>{table.name}</p>
//           <p style={{ margin: "5px 0" }}>Chairs: {table.capacity}</p>
//           <div style={{ display: "flex", gap:"2px", position: "absolute", top: "5px", right: "5px" }}>
//           <Button
//             size="sm"
//             onClick={() => setIsEditing(true)}
//           >
//             ✎
//           </Button>
//           <Button
//             size="sm"
//             className="btn-danger"
//             onClick={handleDeleteing}
//           >
//             <i class="bi bi-trash"></i>
//           </Button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

import React, { useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";

const Table = ({ table, onEdit, onDelete ,onChangeStatus}) => {
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

  const tableStatus = table.billed_called ? "billed_called" : table.called ? "called" : table.waiter_called ?"waiter_called": "";

  return (
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
         {tableStatus !=="" &&  <div className="table-pulse-dot"></div>}
          <p className={`text-black`}>{table.name}</p>
          <p className={`text-black`}>Chairs: {table.capacity}</p>
          <p className={``}>
            {table.billed_called && 
            <Badge className="bg-danger">{"Want to Checkout"}</Badge>
            }
            {table.called && 
            <Badge className="bg-warning text-black">{"Calling"}</Badge>
            }
            {table.waiter_called && 
            <Badge className="bg-success">{"Calling Waiter"}</Badge>
            }
        </p>
          {tableStatus !=="" && <span className="bg-secondary btn btn-sm" onClick={() => handleStatusChange(table.id)}> Accept</span>}
          <div className="controls">
            <div className="bg-primary text-white rounded" style={{ cursor: "pointer",  padding:"2px"}} onClick={() => setIsEditing(true)}>
              ✎
            </div>
            <div
              className="bg-danger text-white rounded"
              style={{ cursor: "pointer",  padding:"2px"}}
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
  );
};

export default Table;
