import React, { useState, useEffect } from 'react';
import './SessionsPage.css';
import HeaderHome from './HeaderHome';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockFour, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import { PiStudent } from "react-icons/pi";
import { SiGooglemeet } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const SessionsTable = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
    // const decryptedStudentId = "24EWIT0008"


  const sidebarStyle = {
    height: '100vh',
    width: isOpen ? '250px' : '60px',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#faf6fe',
    transition: 'width 0.3s',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(115,53,183,0.3)',
    cursor: 'pointer',
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 15px',
    display: 'block',
    fontSize: '22px',
    cursor: 'pointer',
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
    const fetchSessions = async () => {
      try {
        const response = await fetch('https://surgemeet.azurewebsites.net/session/fetch-student-attendance/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: decryptedStudentId,
            // student_id: '24EWIT0007',
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSessions(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch sessions');
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const getStatus = (session) => {
    const sessionDate = new Date(session.date + 'T' + session.start_time);
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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Yet to start':
        return 'bg-warning text-dark';
      case 'On going':
        return 'bg-success text-white';
      case 'Completed':
        return 'bg-secondary text-white';
      default:
        return 'bg-light text-dark';
    }
  };

  const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleWatchVideo = (videoLink) => {
    window.open(videoLink, '_blank');
  };

  const handleIntership = () => { 
    navigate('/CoursePage');
  }
  const handleSessions = () => { 
    navigate('/SessionsPage')
  }

  return (
    <div style={{ padding: '0 20px 20px 60px' }}>
      <HeaderHome />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
        </div>
      ) : (
        <div className='d-flex'>
          {/* Sidebar */}


          <div className={`mt-4 d-flex justify-content-start sidebar12 ${isOpen ? 'sidebar-open' : ''}`} style={{ position: 'relative', width: isOpen ? '200px' : '50px', transition: 'width 0.3s' }}>
            <div className='mt-5' onClick={toggleSidebar} style={sidebarStyle}>
              <div onClick={toggleSidebar} style={{ cursor: 'pointer', padding: '10px' }}>
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
              <h1 className="mb-4">Sessions Details</h1>
              {sessions.length === 0 ? (
                <p>No sessions found for this student.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead style={{ backgroundColor: '#7335B7', color: 'white' }}>
                      <tr>
                        <th className='tablehead'>Title</th>
                        <th className='tablehead'>Date</th>
                        <th className='tablehead'>Time</th>
                        <th className='tablehead'>Meet link</th>
                        <th className='tablehead'>Status</th>
                        <th className='tablehead'>Attendance</th>
                        <th className='tablehead'>Session Video</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((session) => {
                        const status = getStatus(session);
                        const isCompleted = status === 'Completed';
                        return (
                          <tr key={session.session_id} style={isCompleted ? { backgroundColor: '#e0e0e0' } : {}}>
                            <td>{session.session_topic}</td>
                            <td>{session.date}</td>
                            <td>{formatTime(session.start_time)}</td>
                            <td>
                              <a
                                href={isCompleted ? undefined : session.meet_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn btn-primary btn-sm ${isCompleted ? 'disabled' : ''}`}
                                onClick={isCompleted ? (e) => e.preventDefault() : null}
                              >
                                {isCompleted ? 'Expired' : 'Join'}
                              </a>
                            </td>
                            <td>
                              <span className={`badge ${getStatusClass(status)}`}>
                                {status}
                              </span>
                            </td>
                            <td className={session.attendance.attendance_percentage < 50 ? 'text-danger' : 'text-success'} style={{fontWeight:'bold'}}>
                              {session.attendance.attendance_percentage}%
                            </td>
                            <td>
                              {isCompleted && session.video_link ? (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => handleWatchVideo(session.video_link)}
                                >
                                  Watch Video
                                </button>
                              ) : (
                                'N/A'
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsTable;
