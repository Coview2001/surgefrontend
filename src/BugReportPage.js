// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';
// import HeaderHome from './HeaderHome';

// const BugReportPage = () => {
//   const screenshotData = sessionStorage.getItem('bugReportScreenshot');
//   const [bugdesc, setBugDesc] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null); // State to store the uploaded image
//   const navigate = useNavigate();
  
//   const issueTypes = [
//     'UI Bug',
//     'Functionality Bug',
//     'Performance Issue',
//     'Security Vulnerability'
//   ];

//   const handleDropdownChange = (event) => {
//     setIssueType(event.target.value);
//   };

//   const handleBugDesc = (event) => {
//     setBugDesc(event.target.value);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0]; // Get the uploaded file
//     if (file && file.type === 'image/png') { // Check if it is a PNG file
//       const reader = new FileReader(); // Create a FileReader instance
//       reader.onload = (e) => {
//         const screenshot = e.target.result; // Get the Base64 string of the image
//         sessionStorage.setItem('bugReportScreenshot', screenshot); // Store it in session storage
//         setImageFile(screenshot); // Update state with the screenshot
//       };
//       reader.readAsDataURL(file); // Read the file as a data URL
//     } else {
//       alert('Please upload a valid PNG image.'); // Alert if the file is not valid
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const studentId = sessionStorage.getItem('StudentId');
//     const formData = {
//       Student_id: studentId,
//       Issue_type: issueType,
//       BugDescription: bugdesc,
//       Img_path: imageFile || screenshotData, // Use the uploaded image or the screenshot from session storage
//       Resolved: null,
//       Comment: {}
//     };

//     //console.log('Form Data:', formData);

//     fetch('https://surgebackend.azurewebsites.net/internshipreport/bugs/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => {
//             throw new Error(`HTTP error! Status: ${response.status}, Text: ${text}`);
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         //console.log('Success:', data);
//         setLoading(false);
//         navigate('/Tickets');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="container-fluid" style={{ padding: '50px 20px 20px 40px' }}>
//       <HeaderHome />
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//           <Spinner animation="border mx-2" style={{ color: '#3F51B5' }} /> Loading...
//         </div>
//       ) : (
//         <div className="container mt-5 my-5">
//           <h2>Report a Bug</h2>
//           <div className="row">
//             <div className="col-md-6">
//               {screenshotData && (
//                 <div>
//                   <h5>Screenshot</h5>
//                   <img src={screenshotData} alt="Page Screenshot" className="img-fluid" />
//                 </div>
//               )}
//             </div>
//             <div className="col-md-6">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mt-3">
//                   <label className='me-2' htmlFor="issueType">Issue Type:</label>
//                   <select id="issueType" value={issueType} onChange={handleDropdownChange}>
//                     <option value="">Select</option>
//                     {issueTypes.map((type, index) => (
//                       <option key={index} value={type}>{type}</option>
//                     ))}
//                   </select>
//                   <br />
//                   <label htmlFor="bugDescription">Issue Description</label>
//                   <textarea className="form-control" onChange={handleBugDesc} id="bugDescription" rows="4" required></textarea>
                  
//                   {/* New file input for image upload */}
//                   <label htmlFor="imageUpload" className="mt-3">Upload Screenshot (PNG):</label>
//                   <input 
//                     type="file" 
//                     accept="image/png" 
//                     id="imageUpload" 
//                     onChange={handleImageUpload} 
//                     className="form-control" 
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BugReportPage;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';
// import HeaderHome from './HeaderHome';
 
// const BugReportPage = () => {
//   const screenshotData = sessionStorage.getItem('bugReportScreenshot');
//   const [bugdesc, setBugDesc] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null); // State to store the uploaded image
//   const navigate = useNavigate();
 
//   const issueTypes = [
//     'UI Bug',
//     'Functionality Bug',
//     'Performance Issue',
//     'Security Vulnerability'
//   ];
 
//   const handleDropdownChange = (event) => {
//     setIssueType(event.target.value);
//   };
 
//   const handleBugDesc = (event) => {
//     setBugDesc(event.target.value);
//   };
 
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0]; // Get the uploaded file
//     if (file && file.type === 'image/png') { // Check if it is a PNG file
//       const reader = new FileReader(); // Create a FileReader instance
//       reader.onload = (e) => {
//         const screenshot = e.target.result; // Get the Base64 string of the image
//         sessionStorage.setItem('bugReportScreenshot', screenshot); // Store it in session storage
//         setImageFile(screenshot); // Update state with the screenshot
//       };
//       reader.readAsDataURL(file); // Read the file as a data URL
//     } else {
//       alert('Please upload a valid PNG image.'); // Alert if the file is not valid
//     }
//   };
 
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const studentId = sessionStorage.getItem('StudentId');
//     const formData = {
//       Student_id: studentId,
//       Issue_type: issueType,
//       BugDescription: bugdesc,
//       Img_path: imageFile || screenshotData, // Use the uploaded image or the screenshot from session storage
//       Resolved: null,
//       Comment: {}
//     };
 
//     // //console.log('Form Data:', formData);
 
//     fetch('https://surgebackend.azurewebsites.net/internshipreport/bugs/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => {
//             throw new Error(`HTTP error! Status: ${response.status}, Text: ${text}`);
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         // //console.log('Success:', data);
//         setLoading(false);
//         navigate('/Tickets');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   };
 
//   return (
//     <div className="container-fluid" style={{ padding: '50px 20px 20px 40px' }}>
//      <HeaderHome/>
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//            <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
//         </div>
//       ) : (
//         <div className="container mt-5 my-5">
//           <h2>Report a Bug</h2>
//           <div className="row">
//             <div className="col-md-6">
//               {screenshotData && (
//                 <div>
//                   <h5>Screenshot</h5>
//                   <img src={screenshotData} alt="Page Screenshot" className="img-fluid" />
//                 </div>
//               )}
//             </div>
//             <div className="col-md-6">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mt-3">
//                   <label className='me-2' htmlFor="issueType" required>Issue Type:</label>
//                   <select id="issueType" value={issueType} onChange={handleDropdownChange} required>
//                     <option value="">Select</option>
//                     {issueTypes.map((type, index) => (
//                       <option key={index} value={type}>{type}</option>
//                     ))}
//                   </select>
//                   <br />
//                   <label htmlFor="bugDescription">Issue Description</label>
//                   <textarea className="form-control" onChange={handleBugDesc} id="bugDescription" rows="4" required></textarea>
                 
//                   {/* New file input for image upload */}
//                   <label htmlFor="imageUpload" className="mt-3" required>Upload Screenshot (PNG):</label>
//                   <input
//                     type="file"
//                     accept="image/png"
//                     id="imageUpload"
//                     onChange={handleImageUpload}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default BugReportPage;
 
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';
// import HeaderHome from './HeaderHome';
// import CoursePageHeaderHome from './CoursePageHeaderHome';

// const BugReportPage = () => {
//   const [bugdesc, setBugDesc] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [screenshot, setScreenshot] = useState(null);
//   const navigate = useNavigate();

//   const issueTypes = [
//     'UI Bug',
//     'Functionality Bug',
//     'Performance Issue',
//     'Security Vulnerability'
//   ];

//   useEffect(() => {
//     const storedScreenshot = sessionStorage.getItem('bugReportScreenshot');
//     if (storedScreenshot) {
//       setScreenshot(storedScreenshot);
//     }
//   }, []);

//   const handleDropdownChange = (event) => {
//     setIssueType(event.target.value);
//   };

//   const handleBugDesc = (event) => {
//     setBugDesc(event.target.value);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === 'image/png') {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setScreenshot(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert('Please upload a valid PNG image.');
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const studentId = sessionStorage.getItem('StudentId');
//     const formData = {
//       Student_id: studentId,
//       Issue_type: issueType,
//       BugDescription: bugdesc,
//       Img_path: screenshot,
//       Resolved: null,
//       Comment: {}
//     };

//     fetch('https://surgebackend.azurewebsites.net/internshipreport/bugs/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => {
//             throw new Error(`HTTP error! Status: ${response.status}, Text: ${text}`);
//           });
//         }
//         return response.json();
//       })
//       .then(data => {
//         //console.log('Success:', data);
//         setLoading(false);
//         navigate('/Tickets');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="container-fluid" style={{ padding: '50px 20px 20px 40px' }}>
//       <HeaderHome />
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//           <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
//         </div>
//       ) : (
//         <div className="container mt-5 my-5">
//           <h2>Report a Bug</h2>
//           <div className="row">
//             <div className="col-md-6">
//               {screenshot && (
//                 <div>
//                   <h5>Screenshot</h5>
//                   <img src={screenshot} alt="Bug Screenshot" className="img-fluid" />
//                 </div>
//               )}
//             </div>
//             <div className="col-md-6">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mt-3">
//                   <label className='me-2' htmlFor="issueType">Issue Type:</label>
//                   <select id="issueType" value={issueType} onChange={handleDropdownChange} required>
//                     <option value="">Select</option>
//                     {issueTypes.map((type, index) => (
//                       <option key={index} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group mt-3">
//                   <label htmlFor="bugDescription">Issue Description</label>
//                   <textarea 
//                     className="form-control" 
//                     onChange={handleBugDesc} 
//                     id="bugDescription" 
//                     rows="4" 
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="form-group mt-3">
//                   {/* <label htmlFor="imageUpload">Upload Screenshot (PNG):</label>
//                   <input
//                     type="file"
//                     accept="image/png"
//                     id="imageUpload"
//                     onChange={handleImageUpload}
//                     className="form-control"
//                   /> */}
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BugReportPage;

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

const BugReportPage = ({ show, onHide, screenshot }) => {
  const [bugdesc, setBugDesc] = useState('');
  const [issueType, setIssueType] = useState('');
  const [loading, setLoading] = useState(false);

  const issueTypes = [
    'UI Bug',
    'Functionality Bug',
    'Performance Issue',
    'Security Vulnerability'
  ];

  useEffect(() => {
    if (screenshot) {
      sessionStorage.setItem('bugReportScreenshot', screenshot);
    }
  }, [screenshot]);

  const handleDropdownChange = (event) => {
    setIssueType(event.target.value);
  };

  const handleBugDesc = (event) => {
    setBugDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const studentId = sessionStorage.getItem('StudentId');
    const formData = {
      Student_id: sessionStorage.getItem('StudentId'),
      Issue_type: issueType,
      BugDescription: bugdesc,
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
        setLoading(false);
        onHide();
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="bug-report-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="bug-report-modal">
        Support Assistance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <label className='me-2' htmlFor="issueType">Issue Type:</label>
                    <select 
                      id="issueType" 
                      value={issueType} 
                      onChange={handleDropdownChange} 
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
                    <label htmlFor="bugDescription">Issue Description</label>
                    <textarea 
                      className="form-control" 
                      onChange={handleBugDesc} 
                      id="bugDescription" 
                      rows="4" 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Raise Ticket</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BugReportPage;