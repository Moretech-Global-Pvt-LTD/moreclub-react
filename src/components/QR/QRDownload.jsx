import React from 'react'

const QRDownload = ({ imageUrl, name }) => {


  const handleDownload = async () => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download =name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};

  return (
    <>
      <button className='btn  btn-primary btn-sm' onClick={handleDownload}>Download QR</button>
    </>
  );
};



export default QRDownload
