import logo from './Img/logo.png';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOut, faTicket} from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Spinner, Modal } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './HeaderStd.css';
import html2canvas from 'html2canvas';
import SessionTimeout from './SessionTimeout'
import { RiCustomerService2Fill } from "react-icons/ri";
import CryptoJS from 'crypto-js';
import axios from 'axios';
function HeaderStd() {
    const [userName, setUserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPicture, setuserPicture] = useState('');
    const [StudentId, setuserStudentId] = useState('');
    const navigate = useNavigate();
    const [showBugReport, setShowBugReport] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [bugDesc, setBugDesc] = useState('');
    const [issueType, setIssueType] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
    const [ticketRaised, setTicketRaised] = useState(false)
    const issueTypes = [
      'UI Related Topics',
      'Functionality Related Topics',
      'Performance Related Topics',
      'Security Vulnerability Related Topics',
      'Other Related Topics',
      'Require Tutor Assistance'
  ];
    const handleHome = () => {
      navigate('/CoursePage');
    }
    const secretKey = 'gvhbfijsadfkefjnujrbghj';
    const encryptedName = sessionStorage.getItem('Name');// Decrypt the data
    const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedPicture = sessionStorage.getItem('Picture');// Decrypt the data
    const decryptedPicture = CryptoJS.AES.decrypt(encryptedPicture, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedcourse = sessionStorage.getItem('course');// Decrypt the data
    const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        const storedName = decryptedName;
        const storedEmail = decryptedEmail;
        const storedPicture =decryptedPicture ;
        const storedStudentId = decryptedStudentId;

      if (storedName && storedPicture && storedEmail && storedStudentId) {
          setUserName(storedName);
          setuserEmail(storedEmail);
          setuserPicture(storedPicture);
          setuserStudentId(storedStudentId);
      }
    }, []);
  //   const handleReportBug = async () => {
  //     // Capture the entire page
  //   //   const canvas = await html2canvas(document.body);
  //   //   const screenshot = canvas.toDataURL('image/png');

  //   //   // Store the screenshot in sessionStorage
  //   //   sessionStorage.setItem('bugReportScreenshot', screenshot);
  //   // //console.log("first")
  //     // Navigate to the Bug Report page
  //     navigate('/BugReportPage');
  // };

//   const handleReportBug = async () => {
//     try {
//         const canvas = await html2canvas(document.body);
//         const screenshot = canvas.toDataURL('image/png');
//         sessionStorage.setItem('bugReportScreenshot', screenshot);
//         navigate('/BugReportPage');
//     } catch (error) {
//         console.error('Error capturing screenshot:', error);
//         navigate('/BugReportPage');
//     }
// };

const handleReportBug = async () => {
  setIsCapturingScreenshot(true);
  try {
      const canvas = await html2canvas(document.body, {
          width: window.innerWidth,
          height: window.innerHeight,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          x: window.scrollX,
          y: window.scrollY,
          scrollX: 0,
          scrollY: 0,
          useCORS: true,
          allowTaint: true,
      });
      const screenshot = canvas.toDataURL('image/png');
      setScreenshot(screenshot);
      setShowBugReport(true);
  } catch (error) {
      console.error('Error capturing screenshot:', error);
      alert('Failed to capture screenshot. You can still report the bug.');
      setShowBugReport(true);
  } finally {
      setIsCapturingScreenshot(false);
  }
};

const handleBugSubmit = (event) => {
  event.preventDefault();
  setLoading(true);
  const formData = {
      Student_id: decryptedStudentId,
      Issue_type: issueType,
      BugDescription: bugDesc,
      Img_path: screenshot,
      Resolved: null,
      Comment: {}
  };

  fetch('https://surgebackend.azurewebsites.net/internshipreport/bugs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
  })
      .then(response => {
          if (!response.ok) {
              return response.text().then(text => {
                  throw new Error(`HTTP error! Status: ${response.status}, Text: ${text}`);
              });
          }
          return response.json();
      })
      .then(data => {
        //   //console.log('Success:', data);
          setBugDesc('');
          setIssueType('');
          setScreenshot(null);
          setShowBugReport(false);
      })
      .catch((error) => {
          console.error('Error:', error);
      })
      .finally(() => {
          setLoading(false);
      });
};

const handleTicket = () => {
  navigate('/Tickets');
};

const handleLogOut = async () => {
  try {
      await axios.post('https://surgebackend.azurewebsites.net/logout/', {
          StudentId: decryptedStudentId
      });
      
      navigate('/');
  } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
  }
};
  return (
    <div className='' style={{width:'100%'}}>
      <SessionTimeout/>
      
    <header className=" head fixed-top d-flex justify-content-between align-items-center  px-8 p-1 border-bottom border-dark-subtle">
    <img src={logo} className='ms-3'  alt="Logo" height={42} width={120} />
    <div style={{fontSize:'15px', color:'white'}}><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>{decryptedcourse.replace('_', ' ')}</span> </div>
    <nav className="ms-auto ">
      <Dropdown className="d-flex justify-content-center" >
          <span className='px-2   custom-btnEditor'  title="Support Assistance">
          <RiCustomerService2Fill onClick={handleReportBug} className="icons text-white" style={{fontSize:'20px'}}/>

          </span>
          {/* <span className='px-2   custom-btnEditor'  title="Notification">
            <FontAwesomeIcon icon={faBell} className="icons text-white" />
          </span>
          <span className='px-2   custom-btnEditor'  title="Messages">
            <FontAwesomeIcon icon={faEnvelope} className="icons text-white" /> */}
          {/* </span> */}
          <span className='px-2   custom-btnEditor' onClick={handleTicket} title="Ticket">
            <FontAwesomeIcon icon={faTicket} className="icons text-white" />
          </span>
          <span className='px-2   custom-btnEditor' onClick={handleHome} title="Home">
            <FontAwesomeIcon icon={faHome} className="icons text-white" />
          </span>
          {/* <button className='px-1   custom-btnEditor' onClick={handleHome} title="Support Assistance">
            <FontAwesomeIcon icon={faBug} className="icons" /> Bug
          </button> */}
          <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={decryptedName} style={{color:'#7335B7'}}>
              <img src={decryptedPicture} height={20} alt="" className="me-1 rounded-circle" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="px-2 pt-5 me-5 bg-light">
              <div className="text-center">
                  <Dropdown.Item><img src={decryptedPicture} height={100} alt="username" className="mx-5 rounded-circle"/></Dropdown.Item>
                  <Dropdown.Item className="fs-5 fw-bold">{decryptedName}</Dropdown.Item>
                  <Dropdown.Item>{decryptedEmail}</Dropdown.Item>
                  <Dropdown.Item className="pb-4">{decryptedStudentId}</Dropdown.Item>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item className="rounded-pill outline-white mb-2 text-white Logout" onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav> 
    </header>
    <Modal show={showBugReport} onHide={() => setShowBugReport(false)} size="lg" centered>
                <Modal.Header closeButton style={{ backgroundColor: '#7335B7', color: 'white' }}>
                    <Modal.Title>Support Assistance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <Spinner animation="border mx-3" style={{ color: '#7335B7' }} /> Loading...
                    </div>
                ) : ticketRaised ? ( // Check if the ticket is raised
                    <div className="container text-center">
                        <h5>Your ticket has been successfully raised!</h5>
                        <p>Thank you for your report. Our support team will look into it shortly.</p>
                    </div>
                ) : (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {screenshot && (
                                    <div>
                                        <h5>Screenshot</h5>
                                        <img src={screenshot} alt="Bug Screenshot" className="img-fluid" />
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={handleBugSubmit}>
                                    <div className="form-group mt-3">
                                        <label className='me-2' htmlFor="issueType">Support Type:</label>
                                        <select 
                                            id="issueType" 
                                            value={issueType} 
                                            onChange={(e) => setIssueType(e.target.value)} 
                                            required
                                            className="form-control"
                                        >
                                            <option value="">Select</option>
                                            {issueTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="bugDescription">Description</label>
                                        <textarea 
                                            className="form-control" 
                                            value={bugDesc}
                                            onChange={(e) => setBugDesc(e.target.value)} 
                                            id="bugDescription" 
                                            rows="4" 
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: '#7335B7', borderColor: '#7335B7' }}>
                                        Raise Ticket
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            </Modal>
</div> 
  );
}

export default HeaderStd;
