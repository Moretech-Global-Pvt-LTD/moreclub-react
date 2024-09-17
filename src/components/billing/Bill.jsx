import React from 'react'
import { useSelector } from 'react-redux'

const Bill = (props) => {
    const {totalamount, discount, grandTotal , currency}= props

    const business = useSelector((state)=>state.businessReducer)

    
  const handlePrint = () => {
      console.log("printing");
      const content = document.getElementById("bill-receipt").innerHTML;
      const printFrame = document.createElement('iframe');
    
      printFrame.style.position = 'absolute';
      printFrame.style.top = '-10000px';
      document.body.appendChild(printFrame);
    
      const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
      const frameDocument = frameDoc.document ? frameDoc.document : frameDoc;
    
      frameDocument.open();
      frameDocument.write('<html><head><title>Print</title>');
    
      // Clone the styles from the original document
      // Array.from(document.styleSheets).forEach((styleSheet) => {
      //   try {
      //     if (styleSheet.cssRules) { // for <style> and <link> elements
      //       const newStyleEl = document.createElement('style');
    
      //       Array.from(styleSheet.cssRules).forEach((cssRule) => {
      //         newStyleEl.appendChild(document.createTextNode(cssRule.cssText));
      //       });
    
      //       frameDocument.head.appendChild(newStyleEl);
      //     }
      //   } catch (e) {
      //     console.error(e);
      //   }
      // });

    const styles = Array.from(document.styleSheets).map(styleSheet => {
      try {
        if (styleSheet.cssRules) {
          return Array.from(styleSheet.cssRules).map(cssRule => cssRule.cssText).join('\n');
        }
      } catch (e) {
        console.error("Error reading stylesheet:", e);
        return '';
      }
      return '';
    }).join('\n');

    frameDocument.write(`<style>${styles}</style>`);
    
      frameDocument.write('</head><body>');
      frameDocument.write(content);
      frameDocument.write('</body></html>');
      frameDocument.close();
    
    setTimeout(() => {
      frameDoc.focus(); // Focus on the iframe
      frameDoc.print(); // Trigger the print dialog

      // Clean up by removing the iframe after printing
      document.body.removeChild(printFrame);
    }, 100); // 100ms delay to ensure rendering is complete
  };
      // frameDoc.print();
    
      // document.body.removeChild(printFrame);
    // };

    // const handlePrint = () => {
    //     const content = document.getElementById('bill-receipt').innerHTML;
    //     const originalDocument = document.body.innerHTML;
    
    //     document.body.innerHTML = content;
    //     window.print();
    //     document.body.innerHTML = originalDocument;
    // };
  
  // const handlePrint = () => {
  //   const content = document.getElementById("bill-receipt").innerHTML;

  //   const printArea = document.createElement('div');
  //   printArea.id = 'printArea';
  //   printArea.style.display = 'none'; // Hide the div
  //   printArea.innerHTML = content;

  //   document.body.appendChild(printArea);

  //   const originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printArea.innerHTML;

  //   window.print();  // Trigger the print dialog

  //   // Revert the body content after printing
  //   document.body.innerHTML = originalContents;
  //   // document.body.removeChild(printArea);  // Clean up the print area div
  // };


  return (
    <div>
    <div id="bill-receipt" className='bg-white text-dynamic-white p-4'>  
      <h3 className='text-center mb-0'>{business.businessProfile.business_name}</h3>
      <p className='text-center mt-0 mb-0'>{business.businessProfile.business_address}</p>
      <p className='text-center mt-0 mb-3'>{business.businessProfile.business_registration_number}</p>
      <div className='border-top p-2 '>
        <div className='d-flex justify-content-between'>
            <span>Total amount</span>
            <span>{currency}&nbsp;{totalamount}</span>
        </div>
        <div className='d-flex justify-content-between'>
            <span>Discount</span>
            <span>{currency}&nbsp;{discount}</span>
        </div>
        <div className='d-flex fw-bold justify-content-between border-top mt-2 pt-2'>
            <span>Grand Total</span>
          <span>{currency}&nbsp;{grandTotal}</span>
        </div>
      </div>
    </div>
        <button className='btn btn-sm btn-info mt-4' onClick={handlePrint}>Print Bill</button>
    </div>
  )
}

export default Bill;
