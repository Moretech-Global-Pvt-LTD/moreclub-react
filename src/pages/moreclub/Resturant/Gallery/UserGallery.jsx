import React, { useState } from "react";
import AcceptedImagelist from "./AcceptedImagelist";
import PendingImagelist from "./PendingImageList";

const UserGalleryContent = () => {

    const [activeTab, setActiveTab] = useState("Accepted");

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

  


  
   
    return (
        <div>

            <div className="row">
                <div className="tabs">
                    <button
                        className={`${activeTab === "Accepted" ? "tablinks active" : "tablinks"
                            } rounded-pills`}
                        onClick={() => openTab("Accepted")}
                    >
                        Accepted
                    </button>
                    <button
                        className={`${activeTab === "Pending" ? "tablinks active" : "tablinks"
                            } `}
                        onClick={() => openTab("Pending")}
                    >
                        Pending
                    </button>
                </div>

                <div className="d-flex flex-column-reverse flex-lg-row w-100">
                    <div className="content-outside-wrapper w-lg-75">
                        <div
                            id="Accepted"
                            className={`
                ${activeTab === "Accepted"
                                    ? "tabcontent active"
                                    : "tabcontent"
                                } `}
                        >
                           <AcceptedImagelist/>
                        </div>
                        <div
                            id="Pending"
                            className={
                                activeTab === "Pending" ? "tabcontent active" : "tabcontent"
                            }
                        >
                         <PendingImagelist/>
                        </div>
                    </div>
                   
                </div>
            </div>
            
            
        </div>
    );
};

export default UserGalleryContent;

