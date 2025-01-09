import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import IntershipHeader from './IntershipHeader';
import { FadeLoader, PulseLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import CodeMirror from "@uiw/react-codemirror";
import './DBPage_report.css'
import CryptoJS from 'crypto-js';

function DBPage_report() {
  const navigate = useNavigate();
  const location = useLocation();
  const [Data, setData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [modalBgClass, setModalBgClass] = useState('');
  const [codeToDisplay, setCodeToDisplay] = useState('');

  const handleGo = () => {
    navigate('/InternshipDashboard');
  };
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
  const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedStudentId = sessionStorage.getItem('StudentId');
  const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedName = sessionStorage.getItem('Name');
  const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedprojectname = sessionStorage.getItem("ProjectName ");
  const decryptedprojectname = CryptoJS.AES.decrypt(encryptedprojectname,secretKey).toString(CryptoJS.enc.Utf8)?.replace("_", " ");
  const handleCopyCode = (code, key) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        // //console.log('Code copied to clipboard');
        // Update the state of Data to mark the code as copied
        setData(prevData => ({
          ...prevData,
          [`${key}_copied`]: true
        }));
        // Set a timeout to reset the copied state after 10 seconds
        setTimeout(() => {
          setData(prevData => ({
            ...prevData,
            [`${key}_copied`]: false
          }));
        }, 10000); // 10 seconds
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
  };
  

  const handleViewCode = (code) => {
    setCodeToDisplay(code);
    setShowAlert(true);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
    setCodeToDisplay('');
  };

  useEffect(() => {
    const { Page_Name } = location.state || {};

    if (!Page_Name) {
      console.error("Page_Name is not available in location.state");
      return;
    }
    // //console.log("first", Page_Name);

    const url = 'https://surgebackend.azurewebsites.net/internship/score/';
    const data = {
      "StudentId": decryptedStudentId,
      "Page_name": Page_Name,
     "ProjectName":decryptedprojectname
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // //console.log(data);
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [location.state]);

  return (
    <div className='reportDiv'>
      <IntershipHeader />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {Data ? (
              <div className="card mt-5">
                <div className="card-header text-white text-center" style={{backgroundColor:'teal'}}>
                  <h2>Page Report</h2>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Page Name: {Data.Page_name}</h4>
                  <h5 className="card-text">Overall Score: {Data.Score}</h5>
                  <div className="mt-1">
                    <h5>Details:</h5>
                    <ul className="list-group" >
                      {Data.Table1_Score && (
                        <li className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div><strong>Table1 Score: </strong>{Data.Table1_Score}</div>
                            <div>
                            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleViewCode(Data.Table1)}>View Code</button>
                              <button className="btn btn-outline-secondary btn-sm " onClick={() => handleCopyCode(Data.Table1, 'HTML')}>{Data.Table1_copied ? 'Copied' : 'Copy Code'}</button>
                            </div>
                          </div>
                        </li>
                      )}
                      {Data.Table2_Score && (
                        <li className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div><strong>Table2 Score: </strong>{Data.Table2_Score}</div>
                            <div>
                            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleViewCode(Data.Table2)}>View Code</button>
                              <button className="btn btn-outline-secondary btn-sm" onClick={() => handleCopyCode(Data.Table2, 'CSS')}>{Data.Table2_copied ? 'Copied' : 'Copy Code'}</button>
                            </div>
                          </div>
                        </li>
                      )}
                      {Data.Table3_Score && (
                        <li className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div><strong>Table3 Score: </strong>{Data.Table3_Score}</div>
                            <div>
                            <button className="btn btn-outline-primary btn-sm  me-2" onClick={() => handleViewCode(Data.Table3)}>View Code</button>
                              <button className="btn btn-outline-secondary btn-sm" onClick={() => handleCopyCode(Data.Table3, 'JS')}>{Data.Table3_copied ? 'Copied' : 'Copy Code'}</button>
                            </div>
                          </div>
                        </li>
                      )}
                      {Data.Table4_Score && (
                        <li className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div><strong>Table4 Score: </strong>{Data.Table4_Score}</div>
                            <div>
                            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleViewCode(Data.Table4)}>View Code</button>
                              <button className="btn btn-outline-secondary btn-sm " onClick={() => handleCopyCode(Data.Table4, 'Python')}>{Data.Table4_copied ? 'Copied' : 'Copy Code'}</button>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <button className='btn btn-success' onClick={handleGo}>Click here....</button>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 9999 }}>
                <PulseLoader size={10} className='px-2' />
                <FadeLoader />
                <PulseLoader size={10} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={showAlert} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className={modalBgClass} closeButton>
          <Modal.Title>View Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CodeMirror
            className="text-xl text-start border-gray-700 border"
            value={codeToDisplay}
            height="700px"
            theme="dark"
            // extensions={[html()]}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DBPage_report;
