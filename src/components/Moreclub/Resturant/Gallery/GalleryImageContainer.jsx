// import React, { useState, useEffect } from 'react';

//  const ImageContainer = ({ src, alt }) => {
//   const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
//   const [rowSpan, setRowSpan] = useState(1);

//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => {
//       const { width, height } = img;
//       setImageSize({ width, height });
//       const aspectRatio = width / height;
//       const rowSpan = Math.ceil(aspectRatio * 2); // adjust this value to change the row span calculation
//       setRowSpan(rowSpan);
//     };
//     img.src = src;
//   }, [src]);

//   return (
//     <div className="masonry-item" style={{ gridColumn: `span ${rowSpan}` }}>
//       <img src={src} alt={alt} />
//     </div>
//   );
// };

// export default ImageContainer;


import React from 'react'

const ImageContainer = ({ item, onClick }) => {
  const widthHeightRatio = item.height / item.width
  const galleryHeight = Math.ceil(150 * widthHeightRatio)
  const photoSpans = Math.ceil(galleryHeight / 18) + 1
  return (
    <div className="masonry-image-container" style={{ gridRow: `span ${photoSpans}` }}>
      <div style={{ display: "grid", placeContent: "center" }}>
        <div
          style={{ overflow: "hidden" }}
          onClick={onClick}
        >
          <img
            src={item.url}
            alt={item.name}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageContainer;