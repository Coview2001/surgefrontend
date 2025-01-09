// import logo from '../Img/logo.png';
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome,faBug, faSignOut, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
// import { Dropdown } from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom';
// import './HeaderQuestionPage.css';


// function HeaderQuestionPage() {
//     const [userName, setUserName] = useState('');
//     const [userEmail, setuserEmail] = useState('');
//     const [userPicture, setuserPicture] = useState('');
//     const [StudentId, setStudentId] = useState('');
//     const [day, setDay] = useState();
//     const [qn_Number, setQn_Number] = useState();
//     const [course, setCourse] = useState();
//     const navigate = useNavigate();
//     const handleHome = () => {
//       navigate('/CoursePage');
//     }


//     useEffect(() => {
//       const storedName = sessionStorage.getItem('Name');
//       const storedEmail = sessionStorage.getItem('Email');
//       const storedPicture = sessionStorage.getItem('Picture');
//       const storedStudentId = sessionStorage.getItem('StudentId');
//       const storedDay= sessionStorage.getItem('SelectedDay');
//       const storedQn_Number= sessionStorage.getItem('Qn_Number');
//       const storedCourse = sessionStorage.getItem('course');


//       if (storedName && storedPicture && storedEmail && storedStudentId && storedDay && storedQn_Number && storedCourse) {
//           setUserName(storedName);
//           setuserEmail(storedEmail);
//           setuserPicture(storedPicture);
//           setStudentId(storedStudentId);
//           setDay(storedDay);
//           setQn_Number(storedQn_Number);
//           setCourse(storedCourse);
//       }
//     }, []);
  

//   return (
//     <div className='' style={{width:'100%'}}>
//         <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
//         <img src={logo}  alt="Logo" height={38} width={100} />
//         <div style={{fontSize:'15px'}}><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>{sessionStorage.getItem('course')}</span> <FontAwesomeIcon icon={faGreaterThan}  /><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/IndexPage')}> Day {sessionStorage.getItem('SelectedDay')}</span> </div>
//         <nav className="ms-auto ">
//           <Dropdown className="d-flex justify-content-center" >
//               {/* <button className='px-2 rounded-pill  custom-btn' onClick={() => navigate(-1)} title="Home">
//                 <FontAwesomeIcon icon={faLessThan} className="icons" title='Back'/>
//               </button>
//               <button className='px-2 rounded-pill  custom-btn' onClick={() => navigate(+1)} title="Home">
//                 <FontAwesomeIcon icon={faGreaterThan} className="icons" title='Forword'/>
//               </button> */}
//               <button className='px-2 rounded-pill  custom-btn' onClick={handleHome} title="Home">
//                 <FontAwesomeIcon icon={faHome} className="icons" title='Home'/>
//               </button>
//               {/* <button className='px-1 rounded-pill  custom-btn' onClick={handleHome} title="Home">
//                 <FontAwesomeIcon icon={faBug} className="icons" title='Home'/> Bug
//               </button> */}
//               <Dropdown.Toggle variant="rounded-sm rounded-circle p-1" id="dropdown-basic" title={userName} className='' style={{color:'#9CCCD7'}}>
//               <img src={userPicture} height={20} alt='' className='me-1 rounded-circle' />
//               </Dropdown.Toggle>
//               <Dropdown.Menu className='px-2 pt-5 me-5 bg-light custom-btn'>
//                 <div className="text-center">
//                 <Dropdown.Item ><img src={userPicture} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
//                 <Dropdown.Item className='fs-5 fw-bold'>{userName}</Dropdown.Item>
//                 <Dropdown.Item className=''>{userEmail}</Dropdown.Item>
//                 <Dropdown.Item className='pb-4'>{sessionStorage.getItem('StudentId')}</Dropdown.Item>
//                 </div>
//                 <Dropdown.Divider />
//                 <Dropdown.Item href="/" className='bg-secondary outline-white rounded-pill mb-2 text-white' title='Logout'><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </nav> 
//         </header>
//     </div>
//   );
// }

// export default HeaderQuestionPage;


import logo from '../Img/logo.png';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faBug, faSignOut, faGreaterThan, faLessThan, faEnvelope, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './HeaderQuestionPage.css';
import axios from 'axios'
import SessionTimeout from '../SessionTimeout';
import { RiCustomerService2Fill } from "react-icons/ri";
import { Modal, Button, Spinner } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import CryptoJS from 'crypto-js';

function HeaderQuestionPage() {
    const [userName, setUserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPicture, setuserPicture] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [day, setDay] = useState();
    const [qn_Number, setQn_Number] = useState();
    const [course, setCourse] = useState();
    const navigate = useNavigate();
    const handleHome = () => {
      navigate('/CoursePage');
    }
    const [showBugReport, setShowBugReport] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [bugDesc, setBugDesc] = useState('');
    const [issueType, setIssueType] = useState('');
    const issueTypes = [
      'UI related topics',
      'Functionality related topics',
      'Performance related topics',
      'Security Vulnerability related topics',
      'Other related topics',
      'Require Tutor Assistance'
  ];
  const [loading, setLoading] = useState(true);
  const [ticketRaised, setTicketRaised] = useState(false)
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);

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
    const encryptedSelectedDay = sessionStorage.getItem('SelectedDay');// Decrypt the data
    const decryptedSelectedDay = CryptoJS.AES.decrypt(encryptedSelectedDay, secretKey).toString(CryptoJS.enc.Utf8);
    useEffect(() => {
        const storedName = decryptedName;
        const storedEmail = decryptedEmail;
        const storedPicture =decryptedPicture ;
        const storedStudentId = decryptedStudentId;
      const storedDay= decryptedSelectedDay;
      const storedQn_Number= sessionStorage.getItem('Qn_Number');
      const storedCourse = decryptedcourse;


      if (storedName && storedPicture && storedEmail && storedStudentId && storedDay && storedQn_Number && storedCourse) {
          setUserName(storedName);
          setuserEmail(storedEmail);
          setuserPicture(storedPicture);
          setStudentId(storedStudentId);
          setDay(storedDay);
          setQn_Number(storedQn_Number);
          setCourse(storedCourse);
      }
    }, []);
    const handleReportBug = async () => {
      setLoading(false);
      setIsCapturingScreenshot(true);
      try {
        // Function to capture full page content
        const captureFullPage = async () => {
          const body = document.body;
          const html = document.documentElement;
          
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          
          return await html2canvas(document.body, {
            width: window.innerWidth,
            height: height,
            windowWidth: window.innerWidth,
            windowHeight: height,
            x: window.scrollX,
            y: window.scrollY,
            scrollX: 0,
            scrollY: 0,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#E2F2FF', // Match your background color
          });
        };
    
        // Capture the full page content
        const mainCanvas = await captureFullPage();
        
        // Get the iframe
        const iframe = document.querySelector('iframe');
        if (iframe) {
          // Calculate iframe position relative to the page
          const iframeRect = iframe.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Capture iframe content
          const iframeCanvas = await html2canvas(iframe.contentDocument.body, {
            width: iframe.clientWidth,
            height: iframe.clientHeight,
            windowWidth: iframe.clientWidth,
            windowHeight: iframe.clientHeight,
            useCORS: true,
            allowTaint: true,
          });
          
          // Create a new canvas to combine both screenshots
          const finalCanvas = document.createElement('canvas');
          finalCanvas.width = mainCanvas.width;
          finalCanvas.height = mainCanvas.height;
          
          const ctx = finalCanvas.getContext('2d');
          
          // Draw the main page screenshot
          ctx.drawImage(mainCanvas, 0, 0);
          
          // Draw the iframe screenshot at the correct position
          ctx.drawImage(
            iframeCanvas,
            iframeRect.left,
            iframeRect.top + scrollTop,
            iframe.clientWidth,
            iframe.clientHeight
          );
          
          const screenshot = finalCanvas.toDataURL('image/png');
          setScreenshot(screenshot);
        } else {
          const screenshot = mainCanvas.toDataURL('image/png');
          setScreenshot(screenshot);
        }
        
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
              // //console.log('Success:', data);
              // Reset form and close modal
              setBugDesc('');
              setIssueType('');
              setScreenshot(null);
              setShowBugReport(false);
              setLoading(false);
          })
          .catch((error) => {
              console.error('Error:', error);
              // Optionally show an error message to the user here
          })
          .finally(() => {
              setLoading(false);
          });
    };
    
    
    
    const handleTicket = async() =>
      {
        navigate('/Tickets')
      }
      const handleLogOut =  async() => { 
        try {
          const response = await axios.post('https://surgebackend.azurewebsites.net/logout/', {
            StudentId: decryptedStudentId
          });
          
          navigate('/')
        } catch (error) {
            console.error('Error sending comment:', error);
            
          }
        };
    
      //   const handleEnvelope = () => { 
      //     navigate('/ChatApp');
      //  }
    
  return (
    <div className='' style={{width:'100%'}}>
      <SessionTimeout/>
      

        <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
        <img src={logo}  alt="Logo" height={38} width={100} />
        <div style={{fontSize:'15px', color:'white'}}><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>{decryptedcourse}</span> <FontAwesomeIcon icon={faGreaterThan}  /><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/IndexPage')}> Day {decryptedSelectedDay}</span> </div>
        <nav className="ms-auto ">
          <Dropdown className="d-flex justify-content-center" >
              {/* <button className='px-2 rounded-pill  custom-btn' onClick={() => navigate(-1)} title="Home">
                <FontAwesomeIcon icon={faLessThan} className="icons" title='Back'/>
              </button>
              <button className='px-2 rounded-pill  custom-btn' onClick={() => navigate(+1)} title="Home">
                <FontAwesomeIcon icon={faGreaterThan} className="icons" title='Forword'/>
              </button> */}
                        <span className='px-2 custom-btnEditor' title="Support Assistance">
                            <RiCustomerService2Fill onClick={handleReportBug} className="icons text-white" style={{ fontSize: '20px' }} />
                        </span>
                        <span className='px-2 custom-btnEditor' onClick={handleTicket} title="Ticket">
                            <FontAwesomeIcon icon={faTicket} className="icons text-white" />
                        </span>
                        {/* <span className="px-2 custom-btnEditor" onClick={handleEnvelope} title="Message">
                            <FontAwesomeIcon icon={faEnvelope} className="icons text-white" />
                        </span> */}
                        <span className='px-2 custom-btnEditor' onClick={handleHome} title="Home">
                            <FontAwesomeIcon icon={faHome} className="icons text-white" />
                        </span>
              <Dropdown.Toggle variant="rounded-sm rounded-circle p-1" id="dropdown-basic" title={decryptedName} className='' style={{color:'#7335B7'}}>
              <img src={decryptedPicture} height={20} alt='' className='me-1 rounded-circle' />
              </Dropdown.Toggle>
              <Dropdown.Menu className='px-2 pt-5 me-5 bg-light custom-btn'>
                <div className="text-center">
                <Dropdown.Item ><img src={decryptedPicture} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
                <Dropdown.Item className='fs-5 fw-bold'>{decryptedName}</Dropdown.Item>
                <Dropdown.Item className=''>{decryptedEmail}</Dropdown.Item>
                <Dropdown.Item className='pb-4'>{decryptedStudentId}</Dropdown.Item>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogOut} className=' outline-white rounded-pill mb-2 text-white' title='Logout' style={{ backgroundColor:'#7335B7'}}><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
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

export default HeaderQuestionPage;





