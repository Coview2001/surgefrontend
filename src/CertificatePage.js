import React from 'react';
import logo from './Img/logo.png';
import Header from './SQL and PY/Header';
import { FaAward, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CryptoJS from 'crypto-js';

const CertificatePage = () => {

    const secretKey = 'gvhbfijsadfkefjnujrbghj';
    const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);


    function downloadCertificate() {
        const input = document.getElementById('CertificatePagediv');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('certificate.pdf');
        });
    }

    return (
        <div className="container-fluid mt-5 pt-5 mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>
            <Header />
  

            <div id="CertificatePagediv" className="card shadow-lg CertificatePagediv"
            style={{
                 border: '10px double #007BFF', 
                 borderRadius: '15px',
                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
             }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <img src={logo} alt="Logo" height={40} width={100} />
                    </div>
                    <h1 className="text-center mb-4" style={{ color: '#007BFF' }}>
                        <FaAward className="me-2" />
                        Certificate of Internship
                    </h1>
                    <p className="text-center" style={{ fontSize: '18px' }}>This certificate is proudly presented to</p>
                    <h3 className="text-center mb-4" style={{ color: '#00000' }}>
                        {/* <FaUser className="me-2" /> */}
                        <ins><b>{decryptedStudentId}</b></ins>
                    </h3>
                    <p className="text-center" style={{ fontSize: '18px' }}>
                        for completing the 300-hour internship from October to November of 2024
                    </p>
                    <div className='d-flex justify-content-between'>
                        <div className="text-center mt-5">
                            {/* <img src="[Image URL]" alt="Signature" style={{width: '200px'}} /> */}
                            <p style={{ fontFamily: 'Cursive' }}>__________________________________</p>
                            <b style={{ color: '#6C757D' }}>CEO</b>
                        </div>
                        <div className="text-center mt-5">
                            {/* <img src="[Image URL]" alt="Signature" style={{width: '200px'}} /> */}
                            <p style={{ fontFamily: 'Cursive' }}>__________________________________</p>
                            <b style={{ color: '#6C757D' }}>Program Manager</b>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-outline-primary" onClick={downloadCertificate}>
                    <FaDownload className="me-2" />
                    Download Certificate
                </button>
            </div>
        </div>
    );
};

export default CertificatePage;
