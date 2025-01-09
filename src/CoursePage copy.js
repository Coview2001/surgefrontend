// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClockFour, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import './CoursePage.css'
// import HeaderHome from './HeaderHome'

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [internship, setInternship] = useState('');
//   const [progressScore, setProgressScore] = useState('');
//   const [progressData, setProgressData] = useState(null);
//   const courseContainerRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.post('https://surgebackend.azurewebsites.net/get/course/', {
//           StudentId: sessionStorage.getItem('StudentId')
//         });
//         setCourses(response.data.Courses);
//         setInternship(response.data.Intenship);
//         setProgressScore(response.data.Prograss.Score);
//         setUserName(response.data.StudentName);
//         setProgressData(response.data.Prograss);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);


//   const scrollCourses = (direction) => {
//     const scrollAmount = 300;
//     if (direction === 'left') {
//       courseContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     } else {
//       courseContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const handleCourseSelection = (course) => {
//     sessionStorage.setItem('course', course);
//     navigate('/CoursePageInfo');
//   };

//   return (
//     <div className="my-5 container-fluid px-5">
//     <HeaderHome/>
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//           <Spinner animation="border" style={{ color: '#3F51B5' }} /> Loading...
//         </div>
//       ) : (
//         <div className='pt-2'>
//           <h1 >Hello {userName}</h1>
//           <h5 >Check out your Tasks and Progress</h5>
//           <h2 >Rank: N/A</h2>
//           <Row className="mt-4 ">
//             <Col md={3} className='IntershipDiv'>
//               <Card className="shadow" style={{ backgroundColor: '#E8F5E9', borderRadius: '15px' }}>
//                 <Card.Body>
//                   <Card.Title className="text-center mb-3" style={{ color: '#2E7D32' }}>Internship Program</Card.Title>
//                   <div className="d-flex justify-content-center align-items-center mb-3">
//                     <div style={{ position: 'relative', width: '150px', height: '150px' }}>
//                       <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: '50%', border: '8px solid #4CAF50', height: '100%', width: '100%', fontSize: '2rem', color: '#2E7D32' }}>
//                         {internship.Score[0]}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row text-start" style={{ fontSize: '0.9rem', margin:'8px' }}>
//                     {internship.Sub.map((subItem, index) => (
//                       <div className="col-6 mb-2" key={index}>
//                         <li>{subItem.replace('_', ' ')}</li>
//                       </div>
//                     ))}
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={9} className='iv'>
//               <div className="position-relative">
//                 <Button 
//                   variant="light"
//                   className="position-absolute" 
//                   style={{ top: '-50px', right: '50px', zIndex: 1 }} 
//                   onClick={() => scrollCourses('left')}
//                 >
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </Button>
//                 <Button 
//                   variant="light"
//                   className="position-absolute" 
//                   style={{ top: '-50px', right: '0px', zIndex: 1 }} 
//                   onClick={() => scrollCourses('right')}
//                 >
//                   <FontAwesomeIcon icon={faChevronRight} />
//                 </Button>
//                 <div
//                   className="d-flex"
//                   ref={courseContainerRef}
//                   style={{
//                     overflowX: 'auto',
//                     scrollbarWidth: 'none',
//                     msOverflowStyle: 'none',
//                   }}
//                 >
//                   {courses.map((course) => (
//                     <Card
//                       key={course.SubjectId}
//                       className="shadow mx-2 mb-3 my-2 courseCard"
//                       style={{ 
//                         width: '230px', 
//                         minWidth: '230px', 
//                         cursor: 'pointer',
//                         borderRadius: '15px',
//                       }}
//                       onClick={() => handleCourseSelection(course.SubjectName)}
//                     >
//                       <Card.Body>
//                         <Card.Title className="mb-3 text-center" style={{ fontSize: '1.2rem' }}>
//                           {course.Name}
//                         </Card.Title>
//                         <Card.Text>
//                           <div className="mb-2">
//                             <FontAwesomeIcon icon={faClockFour} className="me-2" /> {course.Duration}
//                           </div>
//                           <div className="mb-2">
//                             <strong>Progress:</strong> {course.Progress}%
//                           </div>
//                           <div>
//                             <strong>Assignments:</strong> {course.Assignment}
//                           </div>
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </Col>
//           </Row>

//           <Row className="mt-4 ProgressDiv">
//             <Col md={3}>
//               <Card className="shadow" style={{ backgroundColor: '#E3F2FD', borderRadius: '15px' }}>
//                 <Card.Body>
//                   <Card.Title className="text-center mb-3" style={{ color: '#1565C0' }}>Progress Track</Card.Title>
//                   <div className="d-flex justify-content-evenly mb-2">
//                     <div className="text-muted">Start Date</div>
//                     <div className="text-muted">End Date</div>
//                   </div>
//                   <div className="text-center mb-3">
//                     <span className="px-2 py-1" style={{ backgroundColor: '#BBDEFB', borderRadius: '20px 0 0 20px', color: '#1565C0' }}>
//                       {progressData.Start_date}
//                     </span>
//                     <span className="px-2 py-1" style={{ backgroundColor: '#90CAF9', borderRadius: '0 20px 20px 0', color: '#1565C0' }}>
//                       {progressData.End_date}
//                     </span>
//                   </div>
//                   <div className="d-flex justify-content-center align-items-center">
//                     <div style={{ position: 'relative', width: '120px', height: '120px' }}>
//                       <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: '50%', border: '8px solid #2196F3', height: '100%', width: '100%', backgroundColor: '#FFF' }}>
//                         <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1565C0' }}>{progressScore}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursePage;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClockFour, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import './CoursePage.css'
// import HeaderHome from './HeaderHome'

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [internship, setInternship] = useState('');
//   const [progressScore, setProgressScore] = useState('');
//   const [progressData, setProgressData] = useState(null);
//   const courseContainerRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.post('https://surgebackend.azurewebsites.net/get/course/', {
//           StudentId: sessionStorage.getItem('StudentId')
//         });
//         setCourses(response.data.Courses);
//         setInternship(response.data.Intenship);
//         setProgressScore(response.data.Prograss.Score);
//         setUserName(response.data.StudentName);
//         setProgressData(response.data.Prograss);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const scrollCourses = (direction) => {
//     const scrollAmount = 300;
//     if (direction === 'left') {
//       courseContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     } else {
//       courseContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const handleCourseSelection = (course) => {
//     sessionStorage.setItem('course', course);
//     navigate('/CoursePageInfo');
//   };

//   return (
//     <div className="my-5 container-fluid px-5">
//       <HeaderHome/>
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//           <Spinner animation="border" className='mx-3' style={{ color: '#3F51B5' }} /> Loading...
//         </div>
//       ) : (
//         <div className='pt-2'>
//           <h1>Hello {userName}</h1>
//           <h5>Check out your Tasks and Progress</h5>
//           <h2>Rank: N/A</h2>
//           <Row className="mt-4">
//             <Col xs={12} md={3} className='order-md-1 order-2 mb-4 mb-md-0'>
//               <Card className="shadow" style={{ backgroundColor: '#E8F5E9', borderRadius: '15px' }}>
//                 <Card.Body>
//                   <Card.Title className="text-center mb-3" style={{ color: '#2E7D32' }}>Internship Program</Card.Title>
//                   <div className="d-flex justify-content-center align-items-center mb-3">
//                     <div style={{ position: 'relative', width: '150px', height: '150px' }}>
//                       <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: '50%', border: '8px solid #4CAF50', height: '100%', width: '100%', fontSize: '2rem', color: '#2E7D32' }}>
//                         {internship.Score[0]}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row text-start" style={{ fontSize: '0.9rem', margin:'8px' }}>
//                     {internship.Sub.map((subItem, index) => (
//                       <div className="col-6 mb-2" key={index}>
//                         <li>{subItem.replace('_', ' ')}</li>
//                       </div>
//                     ))}
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col xs={12} md={9} className='order-md-2 order-1 mb-4 mb-md-0'>
//               <div className="position-relative">
//                 <Button 
//                   variant="light"
//                   className="position-absolute d-none d-md-block" 
//                   style={{ top: '-50px', right: '50px', zIndex: 1 }} 
//                   onClick={() => scrollCourses('left')}
//                 >
//                   <FontAwesomeIcon icon={faChevronLeft} />
//                 </Button>
//                 <Button 
//                   variant="light"
//                   className="position-absolute d-none d-md-block" 
//                   style={{ top: '-50px', right: '0px', zIndex: 1 }} 
//                   onClick={() => scrollCourses('right')}
//                 >
//                   <FontAwesomeIcon icon={faChevronRight} />
//                 </Button>
//                 <div
//                   className="d-flex flex-wrap flex-md-nowrap"
//                   ref={courseContainerRef}
//                   style={{
//                     overflowX: 'auto',
//                     scrollbarWidth: 'none',
//                     msOverflowStyle: 'none',
//                   }}
//                 >
//                   {courses.map((course) => (
//                     <Card
//                       key={course.SubjectId}
//                       className="shadow mx-2 mb-3 my-2 courseCard"
//                       style={{ 
//                         width: '100%',
//                         maxWidth: '230px', 
//                         minWidth: '230px', 
//                         cursor: 'pointer',
//                         borderRadius: '15px',
//                       }}
//                       onClick={() => handleCourseSelection(course.SubjectName)}
//                     >
//                       <Card.Body>
//                         <Card.Title className="mb-3 text-center" style={{ fontSize: '1.2rem', height:'8vh' }}>
//                           {course.Name}
//                         </Card.Title>
//                         <Card.Text>
//                           <div className="mb-2">
//                             <FontAwesomeIcon icon={faClockFour} className="me-2" /> {course.Duration}
//                           </div>
//                           <div className="mb-2">
//                             <strong>Progress:</strong> {course.Progress}%
//                           </div>
//                           <div>
//                             <strong>Assignments:</strong> {course.Assignment}
//                           </div>
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </Col>
//           </Row>

//           <Row className="mt-4 ProgressDiv">
//             <Col md={3}>
//               <Card className="shadow" style={{ backgroundColor: '#E3F2FD', borderRadius: '15px' }}>
//                 <Card.Body>
//                   <Card.Title className="text-center mb-3" style={{ color: '#1565C0' }}>Progress Track</Card.Title>
//                   <div className="d-flex justify-content-evenly mb-2">
//                     <div className="text-muted">Start Date</div>
//                     <div className="text-muted">End Date</div>
//                   </div>
//                   <div className="text-center mb-3">
//                     <span className="px-2 py-1" style={{ backgroundColor: '#BBDEFB', borderRadius: '20px 0 0 20px', color: '#1565C0' }}>
//                       {progressData.Start_date}
//                     </span>
//                     <span className="px-2 py-1" style={{ backgroundColor: '#90CAF9', borderRadius: '0 20px 20px 0', color: '#1565C0' }}>
//                       {progressData.End_date}
//                     </span>
//                   </div>
//                   <div className="d-flex justify-content-center align-items-center">
//                     <div style={{ position: 'relative', width: '120px', height: '120px' }}>
//                       <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: '50%', border: '8px solid #2196F3', height: '100%', width: '100%', backgroundColor: '#FFF' }}>
//                         <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1565C0' }}>{progressScore}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursePage;


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockFour, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CoursePage.css'
import CoursePageHeaderHome from './CoursePageHeaderHome'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { PiStudent  } from "react-icons/pi";
import { SiGooglemeet  } from "react-icons/si";
import CryptoJS from 'crypto-js';





const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState('');
  const [progressScore, setProgressScore] = useState('');
  const [progressData, setProgressData] = useState(null);
  const courseContainerRef = useRef(null);
  const navigate = useNavigate();
  const [selectedSubIndex, setSelectedSubIndex] = useState(-1);
  const [selectedDate, setSelectedDate] = useState();
  const [hoursSpent, setHoursSpent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartInput, setShowStartInput] = useState(false);
  const [showEndInput, setShowEndInput] = useState(false);
  const [duration, setDuration] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [ranks, setRanks] = useState();
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
// My code
const [sessions, setSessions] = useState([]);
useEffect(() => {
  const fetchSessions = async () => {
    try {
      const response = await fetch('https://surgemeet.azurewebsites.net/session/sessions/all/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Get the StudentId from sessionStorage
      const studentId = decryptedStudentId;

      if (studentId) {
        // Filter the sessions where the StudentId is in the studentsinvited array
        const filteredSessions = data.filter(session => session.studentsinvited.includes(studentId));
        setSessions(filteredSessions);
      } else {
        setSessions([]);
      }

      // setLoading(false);
    } catch (error) {
      setError('Failed to fetch sessions');
      // setLoading(false);
    }
  };

  fetchSessions();
}, []);

//My code
const sidebarStyle = {
  height: '100vh',
  width: isOpen ? '200px' : '60px',  // Adjusts width based on isOpen state
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor:'#faf6fe',
  color: '#000',
  transition: 'width 0.3s ease',  // Added 'ease' for smoother transition effect
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(115,53,183,0.3)',  // Improved box-shadow for better visual effect
};

 
  const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    padding: '10px 15px',
    display: 'block',
    fontSize: '22px',
    cursor: 'pointer'
  };
  const iconButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '32px',
  };
  const iconButtonStyle1 = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '26px',
  };
 
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
    
  useEffect(() => {
    
    const fetchCourses = async () => {
      try {
        const response = await axios.post('https://surgebackend.azurewebsites.net/get/course/', {
          StudentId: decryptedStudentId
        });
        // //console.log("iron", response)
        setCourses(response.data.Courses);
        setInternship(response.data.Intenship);
        setProgressScore(response.data.Prograss.Score);
        setUserName(response.data.StudentName);
        setProgressData(response.data.Prograss);
        setStatus(response.data.Status);
        setRanks(response.data.Rank);
        setLoading(false);
        setHoursSpent((parseFloat(response.data.Prograss.Duration) / 3600).toFixed(2));
        // //console.log("first", response.data.Prograss.Duration)
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);


  const handleSubClick = (index) => {
    setSelectedSubIndex(index);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setShowStartInput(false); // Hide input after selection
    sendDataToBackend(date, endDate); // Send data to backend
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setShowEndInput(false); // Hide input after selection
    sendDataToBackend(startDate, date); // Send data to backend
  };
  
  // Function to format date to "YYYY-MM-DD"
  const formatDateToISO = (date) => {
    if (!date) return 0;
    return date.toISOString().split('T')[0]; // Formats to "YYYY-MM-DD"
  };
  
  const sendDataToBackend = async (start, end) => {
    if (start || end) {
      try {
        // Format the dates as "YYYY-MM-DD"
        const formattedStart = formatDateToISO(start);
        const formattedEnd = formatDateToISO(end);
  
        const response = await axios.post('https://surgebackend.azurewebsites.net/duration/', {
          StudentId: decryptedStudentId,
          Start: formattedStart,
          End: formattedEnd,
        }); 
        setHoursSpent((parseFloat(response.data.Duration) / 3600).toFixed(2)); 
        // //console.log('Data sent to backend:', response.data);
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    }
  };

  const scrollCourses = (direction) => {
    const scrollAmount = 300;
    if (direction === 'left') {
      courseContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      courseContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCourseSelection = (course, Duration, Prograss, Assignment, CourseInfo) => {

    

    const encryptedcourse = CryptoJS.AES.encrypt(course, secretKey).toString();
    sessionStorage.setItem('course', encryptedcourse);

    const encryptedDuration = CryptoJS.AES.encrypt(Duration, secretKey).toString();
    sessionStorage.setItem('Duration', encryptedDuration);
    const encryptedPrograss = CryptoJS.AES.encrypt(Prograss, secretKey).toString();
    sessionStorage.setItem('Progress', encryptedPrograss);
    const encryptedAssignment = CryptoJS.AES.encrypt(Assignment, secretKey).toString();
    sessionStorage.setItem('Assignment', encryptedAssignment);
    // const encryptedcourse1 = sessionStorage.getItem('Course');// Decrypt the data
    const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);
    // sessionStorage.setItem('course', course);
    // sessionStorage.setItem('Duration', Duration);
    // sessionStorage.setItem('Prograss', Prograss);
    // sessionStorage.setItem('Assignment', Assignment);
    
    if(CourseInfo== true){
      navigate('/CoursePageInfo');
    }
    else{
      if (decryptedcourse=='HTMLCSS' || decryptedcourse=='Java_Script'){
      navigate('/QuestionPageFrontend');
      }
      if(decryptedcourse == 'Python' || decryptedcourse == 'SQL'){
        navigate('/IndexPage');
      }
      if(decryptedcourse=='Internship_Program'){
        navigate('/IntershipIndexPage');
      }

    }
  };

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11) and pad with 0
    const year = date.getFullYear(); // Get year
    return `${day}-${month}-${year}`; // Return formatted date
  };

 const handleIntership = () => { 
  navigate('/CoursePage');
  }
  const handleSessions = () => { 
    navigate('/SessionsPage')
   }

  //  My code
   const getStatus = (session) => {
    const sessionDate = new Date(session.Date + 'T' + session.Start_Time);
    const now = new Date();

    if (sessionDate > now) {
      return 'Yet to start';
    } else if (sessionDate.toDateString() === now.toDateString() &&
               now < new Date(sessionDate.getTime() + 2 * 60 * 60 * 1000)) {
      return 'On going';
    } else {
      return 'Completed';
    }
  };

  const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };



  // My code
   
  return (
    <div className=" container-fluid " >
      <CoursePageHeaderHome/>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border mx-2" style={{ color: '#3F51B5' }} /> Loading...
        </div>
      ) : (
<div className='d-flex'>
  {/* Sidebar */}
  <div className={`mt-4 d-flex justify-content-start sidebar12 ${isOpen ? 'sidebar-open' : ''}`} style={{ position: 'relative', width: isOpen ? '250px' : '50px', transition: 'width 0.3s' }}>
            <div className='mt-5' onClick={toggleSidebar} style={sidebarStyle}>
              <div onClick={toggleSidebar} style={{ cursor: 'pointer', padding: '10px' }}>
                {/* <FontAwesomeIcon icon={faBars} style={{ width: '30px', height: '30px' }} /> */}
              </div>
              {isOpen ? (
                <nav>
                  <span onClick={handleIntership} style={linkStyle}><PiStudent /> Internship</span>
                  <span onClick={handleSessions} style={linkStyle}><SiGooglemeet /> Live Session</span>
                </nav>
              ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button onClick={handleIntership} style={iconButtonStyle}><PiStudent /></button>
                  <button onClick={handleSessions} style={iconButtonStyle1}><SiGooglemeet /></button>
                </div>
              )}
            </div>
          </div>

  {/* Main Content */}

  <div className="container-fluid mt-5 ms-3">
  

            <div className={`pt-2 ${isOpen ? 'content-shifted' : ''}`}>
    <h3>Hello {userName}</h3>
    <h6>Check out your Tasks and Progress</h6>
    <h5 className='border border-2 border-secondary rounded-pill shadow-lg p-2 mb-2 bg-light' style={{ width: 'fit-content' }}>
      Rank: {ranks.HTMLCSS}
    </h5>
    <Row className="mt-4">
      <Col xs={12} md={9} className="order-md-2 mb-4 mb-md-0">
        <div className="position-relative">
          <Button 
            variant="light"
            className="position-absolute d-none d-md-block" 
            style={{ top: '-50px', right: '50px', zIndex: 1 }} 
            onClick={() => scrollCourses('left')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button 
            variant="light"
            className="position-absolute d-none d-md-block" 
            style={{ top: '-50px', right: '0px', zIndex: 1 }} 
            onClick={() => scrollCourses('right')}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
          <div
            className="d-flex flex-nowrap"
            ref={courseContainerRef}
            style={{
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
           {courses.map((course) => (
            <Card
              key={course.SubjectId}
              className={`shadow mx-2 mb-3 my-2 courseCard ${course.Status === 'Closed' ? 'Closed' : 'Opened'}`}
              style={{
                width: '230px',
                minWidth: '230px',
                cursor: course.Status === 'Closed' ? 'not-allowed' : 'pointer',
                pointerEvents: course.Status === 'Closed' ? 'none' : '',
                borderRadius: '15px',
                opacity: course.Status === 'Closed' ? 0.5 : 1, // Visual indication for locked courses
              }}
              onClick={() => {
                if (course.Status !== 'Closed') {
                  handleCourseSelection(course.SubjectName, course.Duration, course.Progress, course.Assignment, course.CourseInfo);
                } else {
                  // Optionally, show an alert or message for locked courses
                  alert('This course is locked. Please complete the prerequisite courses to unlock it.');
                }
              }}
            >
              <Card.Body>
                <Card.Title className="mb-1 text-start" style={{ fontSize: '1.2rem', height: '10vh' }}>
                  {course.Name}
                </Card.Title>
                <Card.Text>
                  <div className="mb-1">
                    <FontAwesomeIcon icon={faClockFour} className="me-2" /> {course.Duration}
                  </div>
                  <div className="mb-1">
                    <strong>Progress:</strong> {course.Progress}
                  </div>
                  <div>
                    <strong>Assignments:</strong> {course.Assignment}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))} 
          </div>
        </div>
      </Col>
      <Col xs={12} md={3} className="order-md-1">
        <Card className="shadow mb-2" style={{ backgroundColor: '#E8F5E9', borderRadius: '15px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-1" style={{ color: '#2E7D32' }}>Internship Program</Card.Title>
            {/* Circle displaying the score, default to main Score if no sub is selected */}
            <div className="d-flex justify-content-center align-items-center mb-1">
  <div style={{ position: 'relative', width: '150px', height: '150px' }}>
    <div className="d-flex justify-content-center align-items-center text-center"
      style={{ borderRadius: '50%', border: '10px solid #4CAF50', height: '100%', width: '100%', fontSize: '1.2rem', color: '#2E7D32', padding: '30px 30px', fontWeight: 'bold', wordWrap: 'break-word' }}>
      {/* Display the selected SubScore or the default Score */}
      {selectedSubIndex === -1 ? internship.Score[0] : internship.SubScore[selectedSubIndex]}
    </div>
  </div>
</div>

            {/* List of subjects with onClick handler */}
            <div className="row text-start" style={{ fontSize: '0.9rem', margin: '8px' }}>
              {internship.Sub.map((subItem, index) => (
                <div className="col-6 mb-2" key={index}>
                  <li style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleSubClick(index)}>
                    {subItem.replace('_', ' ')}
                  </li>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* Move the Progress Track Row here */}
    <Row className="mt-3">
      <Col xs={12} md={3}>
        <Card className="shadow" style={{ backgroundColor: '#E3F2FD', borderRadius: '15px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-3" style={{ color: '#1565C0' }}>Progress Track</Card.Title>
            <div className="d-flex justify-content-evenly mb-2">
              <div className="text-muted">Start Date</div>
              <div className="text-muted">End Date</div>
            </div>
            <div className="text-center mb-2">
  <span
    className="px-2 py-1"
    style={{
      backgroundColor: '#BBDEFB',
      borderRadius: '20px 0 0 20px',
      color: '#1565C0',
      cursor: 'pointer',
    }}
    onClick={() => setShowStartInput(!showStartInput)} // Toggle start date input
  >
    {startDate ? formatDateToDDMMYYYY(startDate) : progressData.Start_date}
  </span>
  {showStartInput && (
    <div className="datepicker-container">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange} // Updated to use the new function
        onClickOutside={() => setShowStartInput(false)} // Hide on clicking outside
        inline
      />
    </div>
  )}

  <span
    className="px-2 py-1"
    style={{
      backgroundColor: '#90CAF9',
      borderRadius: '0 20px 20px 0',
      color: '#1565C0',
      cursor: 'pointer',
    }}
    onClick={() => setShowEndInput(!showEndInput)} // Toggle end date input
  >
    {endDate ? formatDateToDDMMYYYY(endDate) : progressData.End_date}
  </span>
  {showEndInput && (
    <div className="datepicker-container">
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange} // Updated to use the new function
        onClickOutside={() => setShowEndInput(false)} // Hide on clicking outside
        inline
      />
    </div>
  )}
</div>
            <div className="d-flex justify-content-center align-items-center">
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    borderRadius: '50%',
                    border: '8px solid #2196F3',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#FFF'
                  }}
                >
                  {/* Conditionally render hours spent or a fallback message */}
                  <span className='text-center' style={{ fontSize: '1rem', color: '#2196F3', fontWeight: 'bold' }}>
                    {hoursSpent || '0'} hr
                  </span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {/* My code */}
      <Col xs={12} md={4}>
     Table for Delay 
      </Col>
      <Col xs={12} md={5}>
      <div className="table-responsive">
        <p className='text-center fs-5'>Upcoming Live Group sessions</p>
        <table className="table table-striped table-hover">
          <thead style={{ backgroundColor: '#7335B7', color: 'white' }}>
            <tr>
            <th>Date</th>
              <th>Title</th>
              <th>Time</th>
              <th>Meet link</th>
            </tr>
          </thead>
          <tbody>
            {sessions
                .filter(session => getStatus(session) !== 'Completed') // Filter out completed sessions
                .map(session => {
                const status = getStatus(session);
              const isCompleted = status === 'Completed';
              return (
                <tr key={session.id} style={isCompleted ? { backgroundColor: '#e0e0e0' } : {}}>
                  <td>{session.Date}</td>
                  <td>{session.Session_Topic}</td>
                  <td>{formatTime(session.Start_Time)}</td>
                  <td>
                    <a
                      href={isCompleted ? undefined : session.meetlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-primary btn-sm ${isCompleted ? 'disabled' : ''}`}
                      onClick={isCompleted ? (e) => e.preventDefault() : null}
                    >
                      {isCompleted ? 'Expired' : 'Join'}
                    </a>
                  </td>
             
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </Col>

      {/* My code */}

    </Row>
  </div>
</div>
</div>
    
      )}
    </div>
  );
};

export default CoursePage;