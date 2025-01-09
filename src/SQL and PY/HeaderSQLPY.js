import logo from '../Img/logo.png';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faIndent, faSignOut,faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './Header.css';


function HeaderSQLPY() {
    const [userName, setUserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPicture, setuserPicture] = useState('');
    const [StudentId, setStudentId] = useState('');
    const navigate = useNavigate();
    const handleHome = () => {
      navigate('/CoursePage');
    }
    const handleIndex = () => {
      navigate('/IndexPage');
    }

    useEffect(() => {
      const storedName = sessionStorage.getItem('Name');
      const storedEmail = sessionStorage.getItem('Email');
      const storedPicture = sessionStorage.getItem('Picture');
      const storedStudentId = sessionStorage.getItem('StudentId');

      if (storedName && storedPicture && storedEmail && storedStudentId) {
          setUserName(storedName);
          setuserEmail(storedEmail);
          setuserPicture(storedPicture);
          setStudentId(storedStudentId);
      }
    }, []);
  

  return (
    <div>
        <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
        

        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="backIcon fa-2x me-1 border border-secondary rounded-circle" onClick={() => navigate(-1)} title="Back"/>
        <img src={logo}  alt="Logo" height={40} width={100} style={{ marginLeft: "60px"}}/>
        <div className='d-flex justify-content-center align-items-center flex-grow-1'>
          <div>
            <strong>
              {sessionStorage.getItem('course')} {sessionStorage.getItem('Day_no')}
            </strong>          
          </div>
        </div>
        <nav className="ms-auto ">
          <Dropdown className="d-flex justify-content-center" >
              <button className='px-1 rounded-pill  custom-btn' onClick={handleHome} title="Home">
                <FontAwesomeIcon icon={faHome} className="icons" title='Home'/> Home
              </button>
              <button className='px-1 rounded-pill  mx-2 me-2  custom-btn' onClick={handleIndex} title="Index">
                <FontAwesomeIcon icon={faIndent} className="icons" title='Index'/> Index
              </button>
              <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={userName} className='custom-user-btn'>
              <img src={userPicture} height={20} alt='' className='me-1 rounded-circle' />
              </Dropdown.Toggle>
              <Dropdown.Menu className='px-2 pt-5 me-5 bg-light custom-btn'>
                <div className="text-center">
                <Dropdown.Item ><img src={userPicture} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
                <Dropdown.Item className='fs-5 fw-bold'>{userName}</Dropdown.Item>
                <Dropdown.Item className=''>{userEmail}</Dropdown.Item>
                <Dropdown.Item className='pb-4'>{sessionStorage.getItem('StudentId')}</Dropdown.Item>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item href="/" className='bg-secondary outline-white rounded-pill mb-2 text-white' title='Logout'><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </nav> 
        </header>
    </div>
  );
}

export default HeaderSQLPY;
