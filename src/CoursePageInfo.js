// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CoursePageInfo.css'
// import { useNavigate } from 'react-router-dom';
// import HeaderStd from './HeaderStd';
// import { PuffLoader, ScaleLoader } from 'react-spinners';
// import { Dropdown, Spinner } from 'react-bootstrap';


// function CoursePageInfo() {
//   const [courseData, setCourseData] = useState(null);
//   const navigate = useNavigate();
//   const secretKey = 'gvhbfijsadfkefjnujrbghj';
//   const encryptedPrograss = sessionStorage.getItem('Prograss');// Decrypt the data
//   const decryptedPrograss = CryptoJS.AES.decrypt(encryptedPrograss, secretKey).toString(CryptoJS.enc.Utf8);
//   const encryptedAssignment = sessionStorage.getItem('Assignment');// Decrypt the data
//   const decryptedAssignment = CryptoJS.AES.decrypt(encryptedAssignment, secretKey).toString(CryptoJS.enc.Utf8);
//   const encryptedcourse = sessionStorage.getItem('course');// Decrypt the data
//   const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);
//   const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
//   const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
//   const encryptedDuration = sessionStorage.getItem('Duration');// Decrypt the data
//   const decryptedDuration = CryptoJS.AES.decrypt(encryptedDuration, secretKey).toString(CryptoJS.enc.Utf8);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const CourseName = decryptedcourse;
//         const response = await axios.post('https://surgebackend.azurewebsites.net/courseInfo/', { CourseName });
//         setCourseData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleStart = () => {
//     const formattedCourseName = decryptedcourse;
//     // //console.log(formattedCourseName);
  
//     if (formattedCourseName === 'internshipprogram') {
//       navigate('/IntershipIndexPage');
//     } else if (formattedCourseName === 'aptitudetest') {
//       navigate('/TestPage');
//     } else if (formattedCourseName === "SQL" || formattedCourseName === "Python") {
//       navigate('/IndexPage');
//     } else if (formattedCourseName === 'HTMLCSS' || formattedCourseName === 'Java_Script') {
//       // //console.log("-=-=-=-=", formattedCourseName);
//       navigate('/QuestionPageFrontend');
//     }
//   };

//   if (!courseData) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
//   </div>
//     );
//   }

//   const duration = decryptedDuration;
//   const progress = decryptedPrograss;
//   const assignment = decryptedAssignment;

//   return (
//     <div className="CoursePageInfo pt-1" style={{minHeight:'100%', height: '100vh', fontFamily:'"Segoe UI", Arial, sans-serif'}}>
//       <HeaderStd />
//       <div className="container-fuild mt-5 pt-4 px-5">
//         <h1 className="">{courseData.courseTitle}</h1>
//         <div className="row mt-2">
//           <div className="col-md-8">
//             <h3 className="text-primary">Description</h3>
//             <p className=''>{courseData.description}</p>

//             <h3 className="text-primary mt-2">Key Highlights</h3>
//             <ul>
//               {courseData.keyHighlights.map((highlight, index) => (
//                 <li key={index} className=''>{highlight}</li>
//               ))}
//             </ul>

//             <h3 className="text-primary mt-4">What You Will Learn</h3>
//             <ul>
//               {courseData.whatYouWillLearn.map((item, index) => (
//                 <li key={index} className=''>{item}</li>
//               ))}
//             </ul>
//           </div>
          
//           <div className="col-md-4 mt-5">
//             <div className="card" style={{ backgroundColor: '#7335b724', width:'70%' }}>
//               <div className="card-body">
//                 <h5 className="card-title text-bold">Course: {courseData.courseTitle}</h5>
//                 <p className="card-text">Prerequisites: {courseData.prerequisites}</p>
//                 <div className='border border-top'></div>
                
//                 <h5 className="mt-3">Level: {courseData.level}</h5>                
//                 <p>Duration: {decryptedDuration}</p>
                
//                 <div className='text-center'>
//                   <button className='btn btn-lg text-white' style={{backgroundColor:'#7335B7'}} onClick={handleStart}>Start Course</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CoursePageInfo;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursePageInfo.css';
import { useNavigate } from 'react-router-dom';
import HeaderStd from './HeaderStd';
import { Spinner } from 'react-bootstrap';
import CryptoJS from 'crypto-js'; // Make sure CryptoJS is imported

function CoursePageInfo() {
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();
  const secretKey = 'gvhbfijsadfkefjnujrbghj';

  // Helper function to decrypt data safely
  const decryptData = (encryptedData) => {
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return null; // Return null or default value if the data is not available
  };

  const decryptedPrograss = decryptData(sessionStorage.getItem('Prograss'));
  const decryptedAssignment = decryptData(sessionStorage.getItem('Assignment'));
  const decryptedcourse = decryptData(sessionStorage.getItem('course'));
  const decryptedStudentId = decryptData(sessionStorage.getItem('StudentId'));
  const decryptedDuration = decryptData(sessionStorage.getItem('Duration'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CourseName = decryptedcourse;
        if (CourseName) {
          const response = await axios.post('https://surgebackend.azurewebsites.net/courseInfo/', { CourseName });
          setCourseData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [decryptedcourse]);

  const handleStart = () => {
    const formattedCourseName = decryptedcourse;

    if (formattedCourseName === 'internshipprogram') {
      navigate('/IntershipIndexPage');
    } else if (formattedCourseName === 'aptitudetest') {
      navigate('/TestPage');
    } else if (formattedCourseName === "SQL" || formattedCourseName === "Python") {
      navigate('/IndexPage');
    } else if (formattedCourseName === 'HTMLCSS' || formattedCourseName === 'Java_Script') {
      navigate('/QuestionPageFrontend');
    }
  };

  if (!courseData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" style={{ color: '#3F51B5' }} /> Loading...
      </div>
    );
  }

  return (
    <div className="CoursePageInfo pt-1" style={{ minHeight: '100%', height: '100vh', fontFamily: '"Segoe UI", Arial, sans-serif' }}>
      <HeaderStd />
      <div className="container-fluid mt-5 pt-4 px-5">
        <h1>{courseData.courseTitle}</h1>
        <div className="row mt-2">
          <div className="col-md-8">
            <h3 className="text-primary">Description</h3>
            <p>{courseData.description}</p>

            <h3 className="text-primary mt-2">Key Highlights</h3>
            <ul>
              {courseData.keyHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <h3 className="text-primary mt-4">What You Will Learn</h3>
            <ul>
              {courseData.whatYouWillLearn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="col-md-4 mt-5">
            <div className="card" style={{ backgroundColor: '#7335b724', width: '70%' }}>
              <div className="card-body">
                <h5 className="card-title">Course: {courseData.courseTitle}</h5>
                <p className="card-text">Prerequisites: {courseData.prerequisites}</p>
                <div className="border border-top"></div>

                <h5 className="mt-3">Level: {courseData.level}</h5>
                <p>Duration: {decryptedDuration || 'N/A'}</p>

                <div className="text-center">
                  <button className="btn btn-lg text-white" style={{ backgroundColor: '#7335B7' }} onClick={handleStart}>
                    Start Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePageInfo;
