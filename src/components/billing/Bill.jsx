// import React from 'react'
// import { useSelector } from 'react-redux'

// const Bill = (props) => {
//     const {totalamount, discount, grandTotal , currency}= props

//     const business = useSelector((state)=>state.businessReducer)

    
//   const handlePrint = () => {
//       console.log("printing");
//       const content = document.getElementById("bill-receipt").innerHTML;
//       const printFrame = document.createElement('iframe');
    
//       printFrame.style.position = 'absolute';
//       printFrame.style.top = '-10000px';
//       document.body.appendChild(printFrame);
    
//       const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
//       const frameDocument = frameDoc.document ? frameDoc.document : frameDoc;
    
//       frameDocument.open();
//       frameDocument.write('<html><head><title>Print</title>');
    
//       // Clone the styles from the original document
//       // Array.from(document.styleSheets).forEach((styleSheet) => {
//       //   try {
//       //     if (styleSheet.cssRules) { // for <style> and <link> elements
//       //       const newStyleEl = document.createElement('style');
    
//       //       Array.from(styleSheet.cssRules).forEach((cssRule) => {
//       //         newStyleEl.appendChild(document.createTextNode(cssRule.cssText));
//       //       });
    
//       //       frameDocument.head.appendChild(newStyleEl);
//       //     }
//       //   } catch (e) {
//       //     console.error(e);
//       //   }
//       // });

//     const styles = Array.from(document.styleSheets).map(styleSheet => {
//       try {
//         if (styleSheet.cssRules) {
//           return Array.from(styleSheet.cssRules).map(cssRule => cssRule.cssText).join('\n');
//         }
//       } catch (e) {
//         console.error("Error reading stylesheet:", e);
//         return '';
//       }
//       return '';
//     }).join('\n');

//     frameDocument.write(`<style>${styles}</style>`);
    
//       frameDocument.write('</head><body>');
//       frameDocument.write(content);
//       frameDocument.write('</body></html>');
//       frameDocument.close();
    
//     setTimeout(() => {
//       frameDoc.focus(); // Focus on the iframe
//       frameDoc.print(); // Trigger the print dialog

//       // Clean up by removing the iframe after printing
//       document.body.removeChild(printFrame);
//     }, 100); // 100ms delay to ensure rendering is complete
//   };
//       // frameDoc.print();
    
//       // document.body.removeChild(printFrame);
//     // };

//     // const handlePrint = () => {
//     //     const content = document.getElementById('bill-receipt').innerHTML;
//     //     const originalDocument = document.body.innerHTML;
    
//     //     document.body.innerHTML = content;
//     //     window.print();
//     //     document.body.innerHTML = originalDocument;
//     // };
  
//   // const handlePrint = () => {
//   //   const content = document.getElementById("bill-receipt").innerHTML;

//   //   const printArea = document.createElement('div');
//   //   printArea.id = 'printArea';
//   //   printArea.style.display = 'none'; // Hide the div
//   //   printArea.innerHTML = content;

//   //   document.body.appendChild(printArea);

//   //   const originalContents = document.body.innerHTML;
//   //   document.body.innerHTML = printArea.innerHTML;

//   //   window.print();  // Trigger the print dialog

//   //   // Revert the body content after printing
//   //   document.body.innerHTML = originalContents;
//   //   // document.body.removeChild(printArea);  // Clean up the print area div
//   // };


//   return (
//     <div>
//     <div id="bill-receipt" className='bg-white text-dynamic-white p-4'>  
//       <h3 className='text-center mb-0'>{business.businessProfile.business_name}</h3>
//       <p className='text-center mt-0 mb-0'>{business.businessProfile.business_address}</p>
//       <p className='text-center mt-0 mb-3'>{business.businessProfile.business_registration_number}</p>
//       <div className='border-top p-2 '>
//         <div className='d-flex justify-content-between'>
//             <span>Total amount</span>
//             <span>{currency}&nbsp;{totalamount}</span>
//         </div>
//         <div className='d-flex justify-content-between'>
//             <span>Discount</span>
//             <span>{currency}&nbsp;{discount}</span>
//         </div>
//         <div className='d-flex fw-bold justify-content-between border-top mt-2 pt-2'>
//             <span>Grand Total</span>
//           <span>{currency}&nbsp;{grandTotal}</span>
//         </div>
//       </div>
//     </div>
//         <button className='btn btn-sm btn-info mt-4' onClick={handlePrint}>Print Bill</button>
//     </div>
//   )
// }

// export default Bill;

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

const Bill = (props) => {
  const { totalamount, discount, grandTotal, currency } = props;
  const business = useSelector((state) => state.businessReducer);
  const billRef = useRef();

  const handlePrint = () => {
    console.log("printing");
    // const content = document.getElementById("bill-receipt").innerHTML;
    const content = billRef.current.innerHTML;
    const printFrame = document.createElement('iframe');

    printFrame.style.position = 'absolute';
    printFrame.style.top = '-10000px';
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
    const frameDocument = frameDoc.document ? frameDoc.document : frameDoc;

    frameDocument.open();
    frameDocument.write('<html><head><title>Print</title>');

    // Inline styles for print media
    const printStyles = `
    <style>
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          margin: 0;
        }
        .bill-container {
          background-color: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .bill-header {
          text-align: center;
          margin-bottom: 10px;
        }
        .bill-title {
          font-size: 1.5em;
          margin-bottom: 4px;
        }
        .bill-address, .bill-code {
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .bill-items {
          display: flex;
          flex-direction: column;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          padding: 4px;
          margin-bottom: 4px;
        }
        .bill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }
        .bill-item-name {
          font-size: 14px;
          font-weight: bold;
        }
        .bill-item-price {
          font-size: 14px;
        }
        .bill-print {
          display: none; /* Hide the print button during printing */
        }
      }
    </style>
  `;

    frameDocument.write(printStyles);
    frameDocument.write('</head><body>');
    frameDocument.write(content);
    frameDocument.write('</body></html>');
    frameDocument.close();

    setTimeout(() => {
      frameDoc.focus(); // Focus on the iframe
      frameDoc.print(); // Trigger the print dialog

      // Clean up by removing the iframe after printing
      document.body.removeChild(printFrame);
    }, 100); // Delay to ensure rendering is complete
  };

  return (
    <div>
      <div id="bill-receipt" className="bill-container" ref={billRef}>
        <div className="bill-header">
          <h1 className="bill-title">{business.businessProfile.business_name}</h1>
          <p className="bill-address">{business.businessProfile.business_address}</p>
          <p className="bill-code">{business.businessProfile.business_registration_number}</p>
        </div>
        <div className="bill-items">
          <div className="bill-item">
            <p className="bill-item-name">Total amount</p>
            <p className="bill-item-price">{currency}&nbsp;{totalamount}</p>
          </div>
          <div className="bill-item">
            <p className="bill-item-name">Discount</p>
            <p className="bill-item-price">{currency}&nbsp;{discount}</p>
          </div>
          
        </div>
        <div className="bill-item">
            <p className="bill-item-name">Grand Total</p>
          <p className="bill-item-price">{currency}&nbsp;{grandTotal}</p>
        </div>
       
      </div>
    <button className="bill-print" onClick={handlePrint}>Print Bill</button>
    </div>
  );
};

export default Bill;

