import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessTypesCard = ({ id, logo, name, banner }) => {

    const slug = name.replace(" ", "-");

    return (
        <>
        
       
        {/* // <Link to={`/partners/${id}/${slug}`} className="d-flex flex-column" style={{ height: "100%", backgroundImage: `url(${banner ?? ""})` }}>
        //     <Card className="nearby-offers-card flex-grow-1  " style={{
        //         height: "100%", width: "100%", backgroundImage: `url(${banner ?? ""})`, backgroundSize: "cover", backgroundPosition: "center",
        //         backgroundRepeat: "no-repeat", border:"1px solid transparent"
        //     }}>
        //         <div className="mx-auto mt-2 mb-0">
        //             {!banner ? (
        //                 <div
        //                     className="partner-logo-wrapper ms-0 me-0 mb-3 d-flex justify-content-center align-items-center text-uppercase"
        //                     style={{
        //                         width: "60px",
        //                         height: "60px",
        //                         objectFit: "contain",
        //                         backgroundColor: `${banner ? "gray" : "white"}`,
        //                     }}
        //                 >
        //                     {name[0]}
        //                 </div>
        //             ) : (
        //                 // <img
        //                 //     src={logo}
        //                 //     style={{
        //                 //         width: "60px",
        //                 //         height: "60px",
        //                 //         objectFit: "contain",
        //                 //         backgroundColor: `${banner ? "#ffc106" : "white"}`,
        //                 //     }}
        //                 //     alt="logo"
        //                 //     className="img-fluid rounded-circle mb-3  profile-image"
        //                     // />
        //                     null
        //             )}
        //         </div>
        //         <Card.Body className="pt-0">
               
        //         </Card.Body>
        //         <Card.Footer className="pt-0 p-0 mb-0 " style={{backgroundColor:"#0c153b"}}>
        //             <p className={`text-white text-center fw-bold line `}>
        //                 {name}
        //             </p>
        //         </Card.Footer>
        //     </Card>
        // </Link> */}

        <Link href={`/partners/${id}/${slug}`} class="business-card-link">
                <div className={`business-card ${!banner ? "business-card-background" : ""}` } style={{ backgroundImage: `url('${banner ?? ""}` }}>
            <div className="business-card-logo">
                {!banner ? <div class="business-card-initial-logo">{name[0]}</div> : <div className="business-card-logo-replacer"></div>}
            </div>
            <div className="business-card-footer">
                <p className="business-card-name">{name}</p>
            </div>
        </div>
        </Link >
        </>

    );
};

export default BusinessTypesCard;
