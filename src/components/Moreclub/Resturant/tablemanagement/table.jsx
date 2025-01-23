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
import { Button, Form } from "react-bootstrap";

const Table = ({ table, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(table.name);
  const [newChairs, setNewChairs] = useState(table.capacity);
  const [backgroundColorClass, setBackgroundColorClass] =
    useState("bg-default");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // useEffect(() => {
  //   const socket = new WebSocket("wss://your-websocket-server");

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === "updateBackgroundColor") {
  //       // Assume `data.colorClass` contains a CSS class name, like "bg-blue" or "bg-red"
  //       setBackgroundColorClass(data.colorClass);
  //     }
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

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

  return (
    <div className={`editable-table ${backgroundColorClass}`}>
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
          <p className="text-black">{table.name}</p>
          <p className="text-black">Chairs: {table.capacity}</p>
          <div className="controls">
            <Button size="sm" onClick={() => setIsEditing(true)}>
              ✎
            </Button>
            <Button
              size="sm"
              className="btn-danger"
              onClick={() => handleDeleteing()}
            >
              {deleting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <i className="bi bi-trash"></i>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
