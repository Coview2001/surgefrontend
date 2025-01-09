import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const SessionTimeout = () => {
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [modalTimer, setModalTimer] = useState(null);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const timeoutDuration = 5 * 60 * 1000;
  const warningDuration = 4 * 60 * 1000;
  const modalTimeoutDuration = 60 * 1000;
  const navigate = useNavigate();

  const resetTimer = () => {
    setLastActivityTime(Date.now());
    setIsActive(true);
    setShowModal(false);
    setModalMessage("");
    clearTimeout(modalTimer);
  };

  const handleLogout = async () => {
    // If the user has already logged out, prevent further execution
    if (hasLoggedOut) return;
  
    setIsActive(false); // Set user status to inactive
    setHasLoggedOut(true); // Mark the user as logged out
    setModalMessage("You have been logged out due to inactivity.");
  
    // Immediately send the logout request and redirect
    try {
      await axios.post('https://surgebackend.azurewebsites.net/logout/', {
        StudentId: sessionStorage.getItem('StudentId')
      });
      
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error); // Handle any errors during logout
    }
  };
  

  const displayModal = () => {
    setModalMessage("Your session is about to expire due to inactivity. You will be logged out in 1 minute.");
    setShowModal(true);

    const timer = setTimeout(() => {
      handleLogout();
    }, modalTimeoutDuration);

    setModalTimer(timer);
  };

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    const interval = setInterval(() => {
      const timeElapsed = Date.now() - lastActivityTime;

      if (timeElapsed > timeoutDuration) {
        handleLogout();
      } else if (timeElapsed > warningDuration && !showModal) {
        displayModal();
      }
    }, 1000);

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      clearInterval(interval);
      clearTimeout(modalTimer);
    };
  }, [lastActivityTime, showModal, modalTimer]);

  const handleContinue = () => {
    resetTimer();
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleLogout} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Session Timeout Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
      </Modal>

      {/* {isActive ? (
        <p>You are active. You will be logged out if you're idle for 5 minutes.</p>
      ) : (
        <p>Logging out...</p>
      )} */}
    </div>
  );
};

export default SessionTimeout;
