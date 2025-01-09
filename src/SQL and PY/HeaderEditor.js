import logo from '../Img/logo.png';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faBug, faSignOut, faGreaterThan, faLessThan, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './HeaderEditor.css';
import html2canvas from 'html2canvas';
import { PiGreaterThan, PiGreaterThanLight } from "react-icons/pi";
import axios from 'axios'

function HeaderEditor() {
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


    useEffect(() => {
      const storedName = sessionStorage.getItem('Name');
      const storedEmail = sessionStorage.getItem('Email');
      const storedPicture = sessionStorage.getItem('Picture');
      const storedStudentId = sessionStorage.getItem('StudentId');
      const storedDay= sessionStorage.getItem('SelectedDay');
      const storedQn_Number= sessionStorage.getItem('Qn_Number');
      const storedCourse = sessionStorage.getItem('course');


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
      // Capture the entire page
    //   const canvas = await html2canvas(document.body);
    //   const screenshot = canvas.toDataURL('image/png');

    //   // Store the screenshot in sessionStorage
    //   sessionStorage.setItem('bugReportScreenshot', screenshot);
    // //console.log("first")
      // Navigate to the Bug Report page
      navigate('/BugReportPage');
  };


  const handleTicket = () =>{
    navigate('/Tickets');
  }
  const handleLogOut =  async() => { 
    try {
      const response = await axios.post('https://surgebackend.azurewebsites.net/logout/', {
        StudentId: sessionStorage.getItem('StudentId')
      });
      
      navigate('/')
    } catch (error) {
        console.error('Error sending comment:', error);
        
      }
    };
  return ( 
    <div className='' style={{width:'100%'}}>
                  

        <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
        <img src={logo}  alt="Logo" height={38} width={100} />
        <div style={{fontSize:'15px'}}><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>{course}</span> <PiGreaterThanLight/><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/IndexPage')}> Day {day}</span> <PiGreaterThanLight  /><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/QuestionPage')}>Qn {qn_Number}</span></div>
        <nav className="ms-auto ">
          <Dropdown className="d-flex justify-content-center" >
              <button className='px-2 rounded-pill  custom-btn' onClick={() => navigate(-1)} title="Previous">
                <FontAwesomeIcon icon={faLessThan} className="icons" title='Back'/>
              </button>
              <button className='px-2 rounded-pill  custom-btn' onClick={() => navigate(+1)} title="Next">
                <FontAwesomeIcon icon={faGreaterThan} className="icons" title='Forword'/>
              </button>
              <button className='px-2 rounded-pill  custom-btn' onClick={handleHome} title="Home">
                <FontAwesomeIcon icon={faHome} className="icons" title='Home'/>
              </button>
              <button className='px-1 rounded-pill  custom-btn' onClick={handleReportBug} title="Support Assistance">
                <FontAwesomeIcon icon={faBug}  className="icons text-white" />
              </button>
              <button className='px-1 rounded-pill  custom-btn' onClick={handleTicket} title="Ticket">
                <FontAwesomeIcon icon={faTicket}  className="icons text-white" />
              </button>
              <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={userName} className='' style={{color:'#9CCCD7'}}>
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
                <Dropdown.Item onClick={handleLogOut} className='bg-secondary outline-white rounded-pill mb-2 text-white' title='Logout'><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </nav> 
        </header>
    </div>
  );
}

export default HeaderEditor;
