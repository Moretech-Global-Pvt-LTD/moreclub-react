import React from 'react'

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => ( 
  <g>
     <defs>
      <filter id="drop-shadow">
        <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <rect
      width="118"
      height="40"
      x="-56"
      style={{
         fill: "white",
        stroke: "none",
        borderRadius: "4px",
        filter: "url(#drop-shadow)",
      }}
    />
    <text
      fill="black"
      strokeWidth="1"
      x="0"
      y="25"
      dominantBaseline="middle"
      textAnchor="middle"
    >
      {nodeDatum.name}
    </text>
  </g>
);

const Tree = () => {
  return (
    <div>
      tree
    </div>
  )
}

export default Tree;
