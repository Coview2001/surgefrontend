import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from "react-bootstrap";
import './IntershipIndexPage.css';
import IntershipHeader from './IntershipHeader';
import { FadeLoader, PulseLoader } from 'react-spinners';
import CryptoJS from 'crypto-js';
 
function IntershipIndexPage() {
  const [data, setData] = useState(null);
  const [dataBase, setDataBase] = useState();
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
 
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
  const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
  useEffect(() => {
    const storedEmail = decryptedEmail;
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
 
    const fetchProjectList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://surgebackend.azurewebsites.net/intr/index',
          {
            method: 'GET',
            // headers: {
            //   'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({  "Index":"T" })
              }
        );
        const result = await response.json();
        // //console.log("result",result)
        // //console.log("-==-=-=-=-===-==-=-=-=-=-===", result.page)
        setDataBase(result.page)
        setData(result);
      } catch (error) {
        console.error('Error fetching project list:', error);
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchProjectList();
  }, []);
 
  useEffect ( () => {
// //console.log("_+_+", data)
  }, [])
 
 
  const handleStart = async (value) => {
    // //console.log("Current data:", data);
    // //console.log('first',value)
    const encryptedProject = CryptoJS.AES.encrypt(value, secretKey).toString();
    sessionStorage.setItem("ProjectPage ",encryptedProject)
    setIsLoading(true);
    try {
      const response = await fetch(`https://surgebackend.azurewebsites.net/intr/json/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: userEmail, Page: value}),
      });
 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
 
      const HomePageData = await response.json();
      // Assuming HomePageData contains the pages as described
      // //console.log("HomePageData keys:", Object.keys(HomePageData));
      const zeroIndexValue = data.page;
      // //console.log("0th index value:", zeroIndexValue);
 
      if (value === zeroIndexValue) {
        // //console.log("Navigating to DBFrontend");
        navigate('/DBFrontend', { state: { HomePageData } });
      } else {
        // //console.log("Navigating to Frontend");
        navigate('/Frontend', { state: { HomePageData } });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
 
 
  const handleDownload = () => {
    navigate("/InstructionPage");
  };
  const handleCertificate = () => {
    navigate("/Certificate");
    };
 
 
  return (
    <div className="HomePage">
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 9999 }}>
          <PulseLoader size={10} className='px-2' color='#67AAF1' />
          <FadeLoader color='#2E6FB3' />
          <PulseLoader size={10} color='#67AAF1' />
        </div>
      )}
      <Container className='mt-5  '>
        <IntershipHeader />
        <div className='text-center text-white p-5 rounded' style={{ backgroundColor: '#4C8768' }}>
          <h1>Welcome</h1>
          <p>Explore our features and get started easily.</p>
          <button onClick={handleDownload} className='btn btn-outline-light'>
            Download Project File
          </button>
        </div>
        <div className='displayIndex' style={{ maxHeight: '600px', overflowY: 'auto', padding: '20px', backgroundColor: '', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          {data ? (
            Object.values(data).map((value, index) => (
              <Card key={index} className='mb-2' style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}>
                <Card.Body className='d-flex justify-content-between align-items-center fw-bold' style={{ padding: '15px' }}>
                  <span>{value}</span>
                  <button className='btn btn-success btn-sm' style={{ transition: 'background-color 0.2s' }} onClick={() => handleStart(value)}>
                    Open
                  </button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h5>Loading ...</h5>
          )}
                  <div className="container d-flex justify-content-center align-items-center mt-3" >
            <button className="btn btn-primary" onClick={handleCertificate}>Get Certificate</button>
        </div>
        </div>
      </Container>
    </div>
  );
}
 
export default IntershipIndexPage;