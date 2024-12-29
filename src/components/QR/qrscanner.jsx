import { useEffect, useRef, useState } from "react";

// Styles
import "./QRStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import { message } from "antd";
import { hostURL } from "../../config/config";
import { useSelector } from "react-redux";

const QrReader = () => {
  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const user = useSelector(state=>state.userReducer);

  // Result
  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
   
    scanner.current.stop();

    let url;
    try {
      const parsed_json = JSON.parse(result.data);
      
     
      if (typeof parsed_json === "object") {
        if (parsed_json?.billing) {
          const user_name = parsed_json?.billing?.user_name;
          const grand_total = parsed_json?.billing?.grand_total;
          if (user.isAuthenticated === true) {
            url = `${hostURL}/points/send?user_name=${user_name}&amount=${grand_total}`;
          } else {
            url = `${hostURL}/login`;
          }
        }
        else if (parsed_json?.username) {
          const user_name = parsed_json?.username;
          const bpms = parsed_json?.bpms;
          if(bpms){
            sessionStorage.setItem("bpms", bpms);            
          }
          if (user.isAuthenticated === true) {
            url = `${hostURL}/points/send?user_name=${user_name}`;
          } else {
            url = `${hostURL}/login`;
          }
        }
      }else {
          if (parsed_json?.includes("referral")) {
            url = parsed_json;
          } else if(parsed_json?.includes("bpms")) {
            url = parsed_json;
          }
        }
      window.location.href= url;
    } catch (error) {
      console.log("error",error);
      window.location.href = result;
    }finally{
      scanner.current.start();
    }    
  };

  // Fail
  // const onScanFail = (err) => {
  //   // 🖨 Print the "err" to browser console.
  //   // message.error("Error scanning QR code")
  //   // console.log(err);
  // };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        // onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      message.error(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {/* Show Data Result if scan is success */}
      {/* {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )} */}
    </div>
  );
};

export default QrReader;