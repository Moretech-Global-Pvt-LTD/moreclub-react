// import { useEffect, useRef, useState } from "react";

// // Styles
// import "./QRStyles.css";

// // Qr Scanner
// import QrScanner from "qr-scanner";
// import QrFrame from "./qr-frame.svg";
// import { message } from "antd";

// const MembershipCodeReader = ({onScanSuccess}) => {
//   // QR States
//   const scanner = useRef();
//   const videoEl = useRef(null);
//   const qrBoxEl = useRef(null);
//   const [qrOn, setQrOn] = useState(true);

//   // Result

//   // Success
// //   const onScanSuccess = (result) => {
// //     // 🖨 Print the "result" to browser console.
// //     console.log(result?.data);

// //     // let url;
// //     // try {
// //     //   const parsed_json = JSON.parse(result.data);
// //     //   console.log("parsed json ", parsed_json);

// //     //   if (typeof parsed_json === "object") {
// //     //     if (parsed_json?.billing) {
// //     //       const user_name = parsed_json?.billing?.user_name;
// //     //       const grand_total = parsed_json?.billing?.grand_total;
// //     //       if (user.isAuthenticated === true) {
// //     //         url = `${hostURL}/points/send?user_name=${user_name}&amount=${grand_total}`;
// //     //       } else {
// //     //         url = `${hostURL}/login`;
// //     //       }
// //     //     }
// //     //   } else {
// //     //     console.log("else condition");
// //     //     if (parsed_json?.includes("referral")) {
// //     //       url = parsed_json;
// //     //     } else if(parsed_json?.includes("bpms")) {
// //     //       url = parsed_json;
// //     //     }
// //     //   }
// //     //   window.location.href= url;
// //     // } catch (error) {
// //     //   console.log("error",error);
// //     //   window.location.href = result;
// //     // }
// //   };

//   useEffect(() => {
//     if (videoEl?.current && !scanner.current) {
//       // 👉 Instantiate the QR Scanner
//       scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
//         // onDecodeError: onScanFail,
//         // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
//         preferredCamera: "environment",
//         // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
//         highlightScanRegion: true,
//         // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
//         highlightCodeOutline: true,
//         // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
//         overlay: qrBoxEl?.current || undefined,
//       });

//       // 🚀 Start QR Scanner
//       scanner?.current
//         ?.start()
//         .then(() => setQrOn(true))
//         .catch((err) => {
//           if (err) setQrOn(false);
//         });
//     }

//     // 🧹 Clean up on unmount.
//     // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
//     return () => {
//       if (!videoEl?.current) {
//         scanner?.current?.stop();
//       }
//     };
//   }, []);

//   // ❌ If "camera" is not allowed in browser permissions, show an alert.
//   useEffect(() => {
//     if (!qrOn)
//       message.error(
//         "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
//       );
//   }, [qrOn]);

//   return (
//     <div className="qr-reader">
//       {/* QR */}
//       <video ref={videoEl}></video>
//       <div ref={qrBoxEl} className="qr-box">
//         <img
//           src={QrFrame}
//           alt="Qr Frame"
//           width={256}
//           height={256}
//           className="qr-frame"
//         />
//       </div>
//     </div>
//   );
// };

// export default MembershipCodeReader;

import { useEffect, useRef, useState } from "react";

// Styles
import "./QRStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import { message } from "antd";

const MembershipCodeReader = ({ onScansSuccess }) => {
  // Accepting onScanSuccess as a prop
  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.

    scanner.current.stop();
    console.log("rsult", result);

    onScansSuccess(result);
  };

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
  }, [onScanSuccess]); // Added onScanSuccess to dependency array

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
    </div>
  );
};

export default MembershipCodeReader;
