// import logo from '../Img/logo.png';
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faBug, faSignOut, faEnvelope, faBell, faTicket } from '@fortawesome/free-solid-svg-icons';
// import { Dropdown, Modal, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './HeaderQuestionPage.css';
// import html2canvas from 'html2canvas';
// import axios from 'axios';
// import SessionTimeout from '../SessionTimeout';
// import { RiCustomerService2Fill } from "react-icons/ri";

// function HeaderQuestionPageFrontend() {
//     const [userName, setUserName] = useState('');
//     const [userEmail, setuserEmail] = useState('');
//     const [userPicture, setuserPicture] = useState('');
//     const [StudentId, setStudentId] = useState('');
//     const [day, setDay] = useState();
//     const [qn_Number, setQn_Number] = useState();
//     const [course, setCourse] = useState();
//     const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
//     const navigate = useNavigate();
//     const [ticketRaised, setTicketRaised] = useState(false)

//     // Bug report modal states
//     const [showBugReport, setShowBugReport] = useState(false);
//     const [screenshot, setScreenshot] = useState(null);
//     const [bugDesc, setBugDesc] = useState('');
//     const [issueType, setIssueType] = useState('');
//     const [loading, setLoading] = useState(false);

//     const issueTypes = [
//         'UI Related Topics',
//         'Functionality Related Topics',
//         'Performance Related Topics',
//         'Security Vulnerability Related Topics',
//         'Other Related Topics',
//         'Require Tutor Assistance'
//     ];
//     const secretKey = 'gvhbfijsadfkefjnujrbghj';
//     const encryptedcourse = sessionStorage.getItem('course');// Decrypt the data
//     const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);
//     const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
//     const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
//     const encryptedPicture = sessionStorage.getItem('Picture');// Decrypt the data
//     const decryptedPicture = CryptoJS.AES.decrypt(encryptedPicture, secretKey).toString(CryptoJS.enc.Utf8);
//     const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
//     const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
//     const encryptedName = sessionStorage.getItem('Name');// Decrypt the data
//     const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);
//     // const encryptedSelectedDay = sessionStorage.getItem('SelectedDay');// Decrypt the data
//     // const decryptedSelectedDay = CryptoJS.AES.decrypt(encryptedSelectedDay, secretKey).toString(CryptoJS.enc.Utf8);    
//     const encryptedQn_Number = sessionStorage.getItem('Qn_Number');// Decrypt the data
//     const decryptedQn_Number = CryptoJS.AES.decrypt(encryptedQn_Number, secretKey).toString(CryptoJS.enc.Utf8);    

    

//     useEffect(() => {       
//         const storedName = decryptedName;
//         const storedEmail = decryptedEmail;
//         const storedPicture = decryptedPicture;
//         const storedStudentId = decryptedStudentId;
//         // const storedDay = decryptedSelectedDay;
//         const storedQn_Number = decryptedQn_Number;
//         const storedCourse = decryptedcourse;


//         if (storedName && storedPicture && storedEmail && storedStudentId  && storedQn_Number && storedCourse) {
//             setUserName(storedName);
//             setuserEmail(storedEmail);
//             setuserPicture(storedPicture);
//             setStudentId(storedStudentId);
//             // setDay(storedDay);
//             setQn_Number(storedQn_Number);
//             setCourse(storedCourse);
//         }
//     }, []);

//     const handleHome = () => {
//         navigate('/CoursePage');
//     };

//     const handleReportBug = async () => {
//         setIsCapturingScreenshot(true);
//         try {
//             const canvas = await html2canvas(document.body, {
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//                 windowWidth: window.innerWidth,
//                 windowHeight: window.innerHeight,
//                 x: window.scrollX,
//                 y: window.scrollY,
//                 scrollX: 0,
//                 scrollY: 0,
//                 useCORS: true,
//                 allowTaint: true,
//             });
//             const screenshot = canvas.toDataURL('image/png');
//             setScreenshot(screenshot);
//             setShowBugReport(true);
//         } catch (error) {
//             console.error('Error capturing screenshot:', error);
//             alert('Failed to capture screenshot. You can still report the bug.');
//             setShowBugReport(true);
//         } finally {
//             setIsCapturingScreenshot(false);
//         }
//     };

//     const handleBugSubmit = (event) => {
//         event.preventDefault();
//         setLoading(true);
//         const formData = {
//             Student_id: decryptedStudentId,
//             Issue_type: issueType,
//             BugDescription: bugDesc,
//             Img_path: screenshot,
//             Resolved: null,
//             Comment: {}
//         };

//         fetch('https://surgebackend.azurewebsites.net/internshipreport/bugs/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => {
//                         throw new Error(`HTTP error! Status: ${response.status}, Text: ${text}`);
//                     });
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 //console.log('Success:', data);
//                 // Reset form and close modal
//                 setBugDesc('');
//                 setIssueType('');
//                 setScreenshot(null);
//                 setShowBugReport(false);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 // Optionally show an error message to the user here
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const handleTicket = () => {
//         navigate('/Tickets')
//     };

//     const handleLogOut = async () => {
//         try {
//             const response = await axios.post('https://surgebackend.azurewebsites.net/logout/', {
//                 StudentId: decryptedStudentId
//             });
//             navigate('/')
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     };

//     return (
//         <div className='' style={{ width: '100%' }}>
//             <SessionTimeout/>
//             <header className="head fixed-top d-flex justify-content-between align-items-center px-8 p-1 border-bottom border-dark-subtle">
//                 <img src={logo} className='ms-3' alt="Logo" height={42} width={120} />
//                 <div style={{ fontSize: '15px', color: 'white' }}>
//                     <span className='px-1' style={{ cursor: 'pointer' }} onClick={() => navigate('/CoursePage')}>
//                         {sessionStorage.getItem('course').replace('_', ' ')}
//                     </span>
//                 </div>
//                 <nav className="ms-auto">
//                     <Dropdown className="d-flex justify-content-center">
//                         <span className='px-2 custom-btnEditor' title="Support Assistance">
//                             <RiCustomerService2Fill onClick={handleReportBug} className="icons text-white" style={{fontSize:'20px'}}/>
//                         </span>
//                         <span className='px-2 custom-btnEditor' onClick={handleTicket} title="Ticket">
//                             <FontAwesomeIcon icon={faTicket} className="icons text-white" />
//                         </span>
//                         <span className='px-2 custom-btnEditor' onClick={handleHome} title="Home">
//                             <FontAwesomeIcon icon={faHome} className="icons text-white" />
//                         </span>
//                         <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={decryptedName} style={{color:'#7335B7'}}>
//                             <img src={decryptedPicture} height={20} alt="" className="me-1 rounded-circle" />
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu className="px-2 pt-5 me-5 bg-light">
//                             <div className="text-center">
//                                 <Dropdown.Item><img src={decryptedPicture} height={100} alt="username" className="mx-5 rounded-circle"/></Dropdown.Item>
//                                 <Dropdown.Item className="fs-5 fw-bold">{decryptedName}</Dropdown.Item>
//                                 <Dropdown.Item>{decryptedEmail}</Dropdown.Item>
//                                 <Dropdown.Item className="pb-4">{decryptedStudentId}</Dropdown.Item>
//                             </div>
//                             <Dropdown.Divider />
//                             <Dropdown.Item onClick={handleLogOut} className='outline-white rounded-pill mb-2 text-white Logout' title='Logout'>
//                                 <FontAwesomeIcon icon={faSignOut} className="me-1" />Logout
//                             </Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </nav>
//             </header>

//             {/* Bug Report Modal */}
//             <Modal show={showBugReport} onHide={() => setShowBugReport(false)} size="lg" centered>
//                 <Modal.Header closeButton style={{ backgroundColor: '#7335B7', color: 'white' }}>
//                     <Modal.Title>Support Assistance</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 {loading ? (
//                     <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//                         <Spinner animation="border mx-3" style={{ color: '#7335B7' }} /> Loading...
//                     </div>
//                 ) : ticketRaised ? ( // Check if the ticket is raised
//                     <div className="container text-center">
//                         <h5>Your ticket has been successfully raised!</h5>
//                         <p>Thank you for your report. Our support team will look into it shortly.</p>
//                     </div>
//                 ) : (
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-md-6">
//                                 {screenshot && (
//                                     <div>
//                                         <h5>Screenshot</h5>
//                                         <img src={screenshot} alt="Bug Screenshot" className="img-fluid" />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="col-md-6">
//                                 <form onSubmit={handleBugSubmit}>
//                                     <div className="form-group mt-3">
//                                         <label className='me-2' htmlFor="issueType">Support Type:</label>
//                                         <select 
//                                             id="issueType" 
//                                             value={issueType} 
//                                             onChange={(e) => setIssueType(e.target.value)} 
//                                             required
//                                             className="form-control"
//                                         >
//                                             <option value="">Select</option>
//                                             {issueTypes.map((type, index) => (
//                                                 <option key={index} value={type}>{type}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="form-group mt-3">
//                                         <label htmlFor="bugDescription">Description</label>
//                                         <textarea 
//                                             className="form-control" 
//                                             value={bugDesc}
//                                             onChange={(e) => setBugDesc(e.target.value)} 
//                                             id="bugDescription" 
//                                             rows="4" 
//                                             required
//                                         ></textarea>
//                                     </div>
//                                     <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: '#7335B7', borderColor: '#7335B7' }}>
//                                         Raise Ticket
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </Modal.Body>
//             </Modal>
//         </div>
//     );
// }

// export default HeaderQuestionPageFrontend;



import logo from '../Img/logo.png';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOut, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import axios from 'axios';
import SessionTimeout from '../SessionTimeout';
import { RiCustomerService2Fill } from "react-icons/ri";
import CryptoJS from 'crypto-js';  // Add this if you're using encryption/decryption

function HeaderQuestionPageFrontend() {
    const [userName, setUserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPicture, setuserPicture] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [qn_Number, setQn_Number] = useState('');
    const [course, setCourse] = useState('');
    const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
    const [ticketRaised, setTicketRaised] = useState(false);

    const [showBugReport, setShowBugReport] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [bugDesc, setBugDesc] = useState('');
    const [issueType, setIssueType] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const issueTypes = [
        'UI Related Topics',
        'Functionality Related Topics',
        'Performance Related Topics',
        'Security Vulnerability Related Topics',
        'Other Related Topics',
        'Require Tutor Assistance'
    ];

    const secretKey = 'gvhbfijsadfkefjnujrbghj';  // This should be stored securely, e.g., in env variables

    // const decryptSessionData = (encryptedData) => {
    //     try {
    //         const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    //         return bytes.toString(CryptoJS.enc.Utf8);
    //     } catch (error) {
    //         console.error("Decryption error:", error);
    //         return null;
    //     }
    // };
    const encryptedName = sessionStorage.getItem('Name');
    const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8)
    const encryptedEmail = sessionStorage.getItem('Email');
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8)
    const encryptedPicture = sessionStorage.getItem('Picture');
    const decryptedPicture = CryptoJS.AES.decrypt(encryptedPicture, secretKey).toString(CryptoJS.enc.Utf8)
    const encryptedStudentId = sessionStorage.getItem('StudentId');
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8)
    const encryptedCourse = sessionStorage.getItem('course');
    const decryptedCourse = CryptoJS.AES.decrypt(encryptedCourse, secretKey).toString(CryptoJS.enc.Utf8)
        const encryptedprojectpage = sessionStorage.getItem("ProjectPage ");
        const decryptedprojectpage = CryptoJS.AES.decrypt(encryptedprojectpage,secretKey).toString(CryptoJS.enc.Utf8);
    useEffect(() => {
        const storedName = decryptedName;
        const storedEmail = decryptedEmail;
        const storedPicture = decryptedPicture;
        const storedStudentId = decryptedStudentId;
        // const storedQn_Number = decryptSessionData(sessionStorage.getItem('Qn_Number'));
        const storedCourse = decryptedCourse;

        if (storedName && storedPicture && storedEmail && storedStudentId  && storedCourse) {
            setUserName(storedName);
            setuserEmail(storedEmail);
            setuserPicture(storedPicture);
            setStudentId(storedStudentId);
            // setQn_Number(storedQn_Number);
            setCourse(storedCourse);
        }
    }, []);

    const handleHome = () => {
        navigate('/CoursePage');
    };

    const handleReportBug = async () => {
        setIsCapturingScreenshot(true);
        try {
            const canvas = await html2canvas(document.body, {
                width: window.innerWidth,
                height: window.innerHeight,
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
            Student_id: StudentId,
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
                setBugDesc('');
                setIssueType('');
                setScreenshot(null);
                setShowBugReport(false);
                setTicketRaised(true);
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
                StudentId: StudentId
            });
            
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    // const handleEnvelope = () => { 
    //     navigate('/ChatApp');
    //  }
    return (
        <div className='' style={{ width: '100%' }}>
            <SessionTimeout />
  

            <header className="head fixed-top d-flex justify-content-between align-items-center px-8 p-1 border-bottom border-dark-subtle">
                <img src={logo} className='ms-3' alt="Logo" height={42} width={120} />
                <div style={{ fontSize: '15px', color: 'white' }}>
                    <span className='px-1' style={{ cursor: 'pointer' }} onClick={() => navigate('/InternshipDashboard')}>
                    Project &gt;</span> <span>{decryptedprojectpage === 'Database_setup' ? "Database Setup" : (decryptedprojectpage.replace('_', ' ') + " page")} 
                    </span>
                </div>
                <nav className="ms-auto">
                    <Dropdown className="d-flex justify-content-center">
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
                        <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={decryptedName} style={{ color: '#7335B7' }}>
                            <img src={decryptedPicture} height={20} alt="" className="me-1 rounded-circle" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="px-2 pt-5 me-5 bg-light">
                            <div className="text-center">
                                <Dropdown.Item><img src={decryptedPicture} height={100} alt="username" className="mx-5 rounded-circle" /></Dropdown.Item>
                                <Dropdown.Item className="fs-5 fw-bold">{decryptedName}</Dropdown.Item>
                                <Dropdown.Item>{decryptedEmail}</Dropdown.Item>
                                <Dropdown.Item className="pb-4">{decryptedStudentId}</Dropdown.Item>
                            </div>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut} className='outline-white rounded-pill mb-2 text-white Logout' title='Logout'>
                                <FontAwesomeIcon icon={faSignOut} className="me-1" />Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </nav>
            </header>

            {/* Bug Report Modal */}
            <Modal show={showBugReport} onHide={() => setShowBugReport(false)} size="lg" centered>
                <Modal.Header closeButton style={{ backgroundColor: '#7335B7', color: 'white' }}>
                    <Modal.Title>Support Assistance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <Spinner animation="border mx-3" style={{ color: "#7335B7" }} />
                            <span>Submitting bug report...</span>
                        </div>
                    ) : (
                        <form onSubmit={handleBugSubmit}>
                            <div className="mb-3">
                                <label htmlFor="issueType" className="form-label">Issue Type:</label>
                                <select
                                    id="issueType"
                                    className="form-select"
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Issue Type</option>
                                    {issueTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bugDesc" className="form-label">Bug Description:</label>
                                <textarea
                                    id="bugDesc"
                                    className="form-control"
                                    rows="5"
                                    value={bugDesc}
                                    onChange={(e) => setBugDesc(e.target.value)}
                                    required
                                />
                            </div>
                            {screenshot && (
                                <div className="mb-3">
                                    <label>Screenshot:</label>
                                    <div className="text-center">
                                        <img src={screenshot} alt="Screenshot" className="img-fluid border p-1" style={{ maxHeight: '200px' }} />
                                    </div>
                                </div>
                            )}
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    Submit Bug Report
                                </button>
                            </div>
                        </form>
                    )}
                </Modal.Body>
            </Modal>

            {/* Notification */}
            <Modal show={ticketRaised} onHide={() => setTicketRaised(false)} size="lg" centered>
                <Modal.Header closeButton style={{ backgroundColor: '#7335B7', color: 'white' }}>
                    <Modal.Title>Ticket Raised</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your ticket has been successfully raised! We will get back to you soon.</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default HeaderQuestionPageFrontend;
