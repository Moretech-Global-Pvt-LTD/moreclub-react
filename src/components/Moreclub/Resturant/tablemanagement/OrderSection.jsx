import React from "react";
import OrderTable from "./OrderTable";

const OrderSection = ({
  section,
  
  onChangeStatus
}) => {


 

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom:"4px" }}>
        <h4 style={{ margin: "0" }}>{section.name}</h4>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "10px",
        }}
      >
        {section.tables.map((table) => (
          <OrderTable
            key={table.id}
            table={table}
            onChangeStatus={(id) => onChangeStatus(id)}
          />
        ))}
        
      </div>
     
    </div>
  );
};

export default OrderSection;
