import React from "react";

const InfoDescription = ({ item }) => {
  return (
    <div className="about-content">
      {/* <h2>{item.title}</h2>
      <p>{item.description}</p> */}
      {item.heading && <h2 className="mb-4">{item.heading}</h2>}
      {item.subheadings &&
        item.subheadings.map((sub, subIndex) => (
          <div key={subIndex} className="">
            <h5 className="my-3">{sub.title}</h5>
            <p className="fs-5 font-weight-normal my-3" style={{wordSpacing:"0.25rem", lineHeight:"1.75rem"}}>{sub.description}</p>
          </div>
        ))}
      {item.testimonial && (
        <div className="testimonial-box bg-primary p-2 rounded text-white">
          <div className="d-flex">
            <img
              src={item.testimonial.image}
              alt={item.testimonial.author}
              className="testimonial-img"
            />
            <div>
              <p style={{ fontSize: "12px", lineHeight: "14px" }}>
                "{item.testimonial.text}"
              </p>
              <p style={{ fontSize: "12px" }} className="mt-1 mb-0">
                <strong>{item.testimonial.author}</strong>
              </p>
              <p style={{ fontSize: "12px" }} className="my-0">
                {item.testimonial.position}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoDescription;
