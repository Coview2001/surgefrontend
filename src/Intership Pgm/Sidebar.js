// import React from 'react';
// import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

// const Sidebar = ({ isOpen }) => {
//   const sidebarStyle = {
//     height: '100vh',
//     width: isOpen ? '200px' : '60px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     backgroundColor: '#faf6fe',
//     color: '#000',
//     transition: 'width 0.3s ease',
//     overflow: 'hidden',
//     cursor: 'pointer',
//     boxShadow: '0 4px 8px rgba(115,53,183,0.3)',
//   };

//   const linkStyle = {
//     color: '#000',
//     textDecoration: 'none',
//     padding: '10px 15px',
//     display: 'block',
//     fontSize: '22px',
//     cursor: 'pointer'
//   };

//   const iconButtonStyle = {
//     backgroundColor: 'transparent',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '32px',
//   };

//   const toggleSidebar = () => {
//     toggleSidebar(!isOpen);
//   };

//   return (
//     <div style={sidebarStyle} onClick={toggleSidebar}>
//       <div className="p-3">
//         <h3>Internship Project</h3>
//         <p>{data.Internship_Project.Project_Name}</p>
//         <p>Skills Required:</p>
//         <ul>
//           {data.Internship_Project.Skills_Required.map((skill, index) => (
//             <li key={index}>{skill}</li>
//           ))}
//         </ul>
//         <p>Framework: {data.Internship_Project.FrameWork.join(', ')}</p>
//         <p>IDE: {data.Internship_Project.IDE.join(', ')}</p>
//         <p>Description: {data.Internship_Project.Project_Description}</p>
//         <a href={data.Internship_Project.Project_Video} target="_blank" rel="noopener noreferrer">View Project Video</a>
//         <a href={data.Internship_Project.Project_UI_UX} target="_blank" rel="noopener noreferrer">View Project UI/UX</a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
