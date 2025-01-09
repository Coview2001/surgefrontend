// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaCaretRight, FaCaretDown, FaBars } from 'react-icons/fa';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// const JsonTreeComponent = () => {
//   const [jsonData, setJsonData] = useState(null);
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const secretKey = 'gvhbfijsadfkefjnujrbghj';
//   const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
//   const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
//   const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
//   const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
//   useEffect(() => {
//     axios.post('https://surgebackend.azurewebsites.net/intrernship/', { "StudentId":decryptedStudentId })
//       .then(response => {
//         setJsonData(response.data.Sidebar);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const TreeNode = ({ node, nodeName }) => {
//     const [expanded, setExpanded] = useState(false);

//     const hasChildren = typeof node === 'object' && node !== null;

//     return (
//       <div style={{ marginLeft: 20 }}>
//         <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
//           {hasChildren ? (
//             <div className='fs-5 fw-bold'>
//               {expanded ? <FaCaretDown className="me-2" /> : <FaCaretRight className="me-2" />}
//               {nodeName}
//             </div>
//           ) : (
//             `${nodeName}: ${node}`
//           )}
//         </div>
//         {expanded && hasChildren && (
//           <div className='mt-1'>
//             {Object.keys(node).map((key) => (
//               <TreeNode key={key} nodeName={key} node={node[key]} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const handleCloseOffcanvas = () => setShowOffcanvas(false);

//   return (
//     <div>
//       <button className='btn btn-outline-light text-dark' onClick={() => setShowOffcanvas(true)}><FaBars/></button>
//       <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Intership Project</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {jsonData && Object.keys(jsonData).map((key) => (
//             <TreeNode key={key} nodeName={key} node={jsonData[key]} />
//           ))}
//         </Offcanvas.Body>
//       </Offcanvas>
//     </div>
//   );
// };

// export default JsonTreeComponent;
