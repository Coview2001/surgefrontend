import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../Img/logo.png';
import IntershipHeader from './IntershipHeader';
import CryptoJS from 'crypto-js';
const Certificate = ({}) => {
  const certificateRef = useRef(null);
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
  const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedName = sessionStorage.getItem('Name');// Decrypt the data
  const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);

  const downloadAsPDF = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 4, useCORS: true, logging: false, letterRendering: true })
      .then((canvas) => {
        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, '', 'FAST');
        pdf.save(`${decryptedName.replace(' ', '_')}_certificate.pdf`);
      });
  };
  const downloadAsImage = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 4, useCORS: true, logging: false, letterRendering: true })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${decryptedName.replace(' ', '_')}_certificate.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      });
  };

  return (
    <div className="container my-5 py-4">
      <IntershipHeader />
      <div 
        ref={certificateRef} 
        className="position-relative bg-white"
        style={{
          width: '1000px',
          height: '700px',
          margin: '0 auto',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          border: '20px solid #fff',
          backgroundImage: 'linear-gradient(45deg, rgba(151,204,220,0.05) 25%, transparent 25%, transparent 50%, rgba(151,204,220,0.05) 50%, rgba(151,204,220,0.05) 75%, transparent 75%, transparent 100%)',
          backgroundSize: '100px 100px',
        }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ border: '2px solid #90C8D9' }}></div>

        <div className="position-absolute top-0 end-0" style={{ width: '200px', height: '200px', background: 'linear-gradient(45deg, #FFF, #90C8D9)', borderBottomLeftRadius: '100%' }}></div>
        <div className="position-absolute bottom-0 start-0" style={{ width: '200px', height: '200px', background: 'linear-gradient(45deg, #90C8D9, #FFF)', borderTopRightRadius: '100%' }}></div>

        <div className="p-5 text-center position-relative" style={{ zIndex: 2 }}>
          <div className="mb-4 position-relative">

        <div className="position-absolute top-0 end-0">
        <p className="mt-3 fw-blod" style={{ fontSize: '12px', color: '#666' }}>Certificate ID: {decryptedStudentId}</p>
        </div>
        <div className="position-absolute top-0 start-0">
          <img src={logo} alt="Logo" height="70" width="140" />
        </div>
<br/><br/><br/>
          <h1 className="mb-2" style={{ fontSize: '30px', fontStyle: 'italic' }}>CERTIFICATE OF INTERNSHIP </h1>
          <p className="mb-4">This certificate is proudly presented to</p>
          <h3 className="text-center mb-4" style={{ color: '#00000' ,fontSize: '30px'}}>
                        {/* <FaUser className="me-2" /> */}
                        <ins><b>{decryptedName}</b></ins>
                    </h3>
                    <p className="text-center" style={{ fontSize: '20px' }}>
                        for completing the 
                        <br/><span className='fw-bold' style={{ fontSize: '20px', fontStyle: 'italic' }}>300-hour internship </span><br/>from October to November of 2024
                    </p>
<br/><br/><br/>
            <div className='d-flex justify-content-between my-3'>
                          <div className="text-center mt-5">
                              <p style={{ fontFamily: 'Cursive' }}>__________________________________</p>
                              <b style={{ color: '#6C757D' }}>CEO</b>
                          </div>
                          <div className="text-center mt-5">
                              <p style={{ fontFamily: 'Cursive' }}>__________________________________</p>
                              <b style={{ color: '#6C757D' }}>Program Manager</b>
                          </div>
                      </div>
          </div>
        </div>
        </div>
      
      <div className="mt-4 d-flex justify-content-center">
        <button className="btn btn-primary me-3" onClick={downloadAsPDF}>Download as PDF</button>
        <button className="btn btn-secondary" onClick={downloadAsImage}>Download as Image</button>
      </div>
    </div>
  );
};

export default Certificate;