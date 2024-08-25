import React, { useState } from "react";
import QrReader from "../../../components/QR/qrscanner";
import QRcontent from "./QRcontent";
import { Drawer } from "antd";
import { Button } from "react-bootstrap";

const ScannarContent = (props) => {
  const { title } = props;

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("bottom");
  const showDrawer = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="Scanner-wrapper">
        <div className="Scanner-container">
          <h1 className="text-center">{title}</h1>
          <div
            style={{ width: "300px", height: "300px", position: "relative" }}
          >
            <QrReader />
          </div>
          <div className="d-flex justify-content-center ">
            <div className="d-block d-lg-none">
            <Button type="primary" className="mt-4" onClick={()=>showDrawer("bottom")}>
             Share your QR 
            </Button>
            </div>
            <div className="d-none d-lg-block">
              <Button type="primary" className="mt-4" onClick={() => showDrawer("right")}>
                Share your QR
              </Button>
            </div>
            </div>
        </div>
        
        <div>
        
        </div>
        <Drawer title="Qr Code" placement={placement} height={500} width={500} onClose={onClose} open={open} >  
          <QRcontent />
        </Drawer>
     
       
       
      </div>
    </div>
  );
};

export default ScannarContent;
