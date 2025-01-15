import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { PiVideoConference } from "react-icons/pi";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const sidebarStyle = {
    height: '100vh',
    width: isOpen ? '250px' : '60px', // Width changes based on state
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#7335B7',
    color: '#fff',
    transition: 'width 0.3s', // Smooth transition
    overflow: 'hidden',
    PointerIcon:'cursor'
  };
 
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    display: 'block',
    fontSize:'24px'
  };
 
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <div className='mt-5'onClick={toggleSidebar} style={sidebarStyle}>
      <div onClick={toggleSidebar} style={{ cursor: 'pointer', padding: '10px' }}>
        {isOpen ? (
          <FontAwesomeIcon icon={faBars} style={{ width: '30px', height: '30px' }} /> // React logo when expanded
        ) : (
          <FontAwesomeIcon icon={faBars} style={{ width: '30px', height: '30px' }} /> // Smaller React logo when collapsed
        )}
      </div>
      {isOpen ? (
        <nav>
          <a href="#internship" style={linkStyle}><PiVideoConference/> Internship</a>
          <a href="#live-session" style={linkStyle}><PiVideoConference/> Live Session</a>
        </nav>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',fontSize:'32px' }}><PiVideoConference/></button>
          <button style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',fontSize:'32px' }}><PiVideoConference/></button>
        </div>
      )}
    </div>
  );
};
 
export default Sidebar;