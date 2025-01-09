import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { Modal, Button, Spinner } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css';
import GoogleLogo from './Img/search.png';
import Loginpic from './Img/img9.png';
import CryptoJS from 'crypto-js';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [, setUserName] = useState('');
    const [email, setuserEmail] = useState('');
    const [, setuserpicture] = useState('');
    const [, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 
    const secretKey = 'gvhbfijsadfkefjnujrbghj';

    const handleCloseAlert = () => setShowAlert(false); 

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => {
            console.error('Login Failed:', error);
            setAlertMessage('Login Failed'); 
            setShowAlert(true); 
        }
    });

    useEffect(() => {
        if (!user) return;

        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`);
                const { name, email, picture } = data;

                const encryptedName = CryptoJS.AES.encrypt(name, secretKey).toString();
                const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
                const encryptedPicture = CryptoJS.AES.encrypt(picture, secretKey).toString();

                sessionStorage.setItem('Name', encryptedName);
                sessionStorage.setItem('Email', encryptedEmail);
                sessionStorage.setItem('Picture', encryptedPicture);

                setUserName(name);
                setuserEmail(email);
                setuserpicture(picture);

                const sentData = { Email: email, Name: name };
                const response = await fetch('https://surgebackend.azurewebsites.net/fetch/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sentData),
                });

                const result = await response.json();
                const encryptedStudentId = CryptoJS.AES.encrypt(result.StudentId, secretKey).toString();
                // const encryptedkeystudentid = CryptoJS.AES.encrypt("StudentId", secretKey).toString();
                sessionStorage.setItem('StudentId', encryptedStudentId);

                setLoading(false);
                navigate(result.Overview ? '/ExskilenceInternshipCard' : '/CoursePage');
            } catch (error) {
                setLoading(false);
                if (error.response?.status === 504) {
                    navigate('/Error504');  
                } else {
                    setAlertMessage(`User not found with this Email "${email}". Please try again with another email.`); 
                    setShowAlert(true);
                    console.error('Error:', error);
                }
            }
        };

        fetchUserProfile();
    }, [user, navigate]);

    return (
        <div className='login'>
            <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
                <div className="row w-100">
                    <div className="col-12 col-md-12 col-lg-7 d-flex align-items-center justify-content-center">
                        <div className="p-4 text-center" style={{ borderRadius: '15px', color: '#003e80', backgroundColor: 'transparent' }}>
                            <h2 className="font-weight-bold  mb-4">Welcome to Exskilence Upskilling Program</h2>
                            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', textAlign:'justify' }}>
            Upskilling refers to the process of acquiring new skills or enhancing existing ones to stay relevant in the ever-evolving job market. As industries rapidly change due to technological advancements and shifting economic landscapes, continuous learning has become essential for career growth and adaptability. By engaging in upskilling, individuals can improve their expertise, increase job opportunities, and remain competitive in their field. For organizations, investing in employee upskilling fosters innovation, boosts productivity, and helps retain top talent, ensuring that the workforce remains agile and future-ready.
        </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-10 col-lg-4 mt-5 d-flex flex-column justify-content-center align-items-center p-4">
                        <div className="loginCard glow card">
                            <div className="loginCardBody card-body d-flex flex-column align-items-center">
                                <h3 className="card-title text-center pb-3 mx-1">Login with your Google account</h3>
                                <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={Loginpic} alt="Login" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="text-center">
                                    {loading ? (
                                        <div className="d-flex justify-content-center text-center align-items-center">
                                            <Spinner color="#0d6efd" size={70} className='me-2' /> Signing in...
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={handleLogin} 
                                            className="btn d-flex justify-content-center align-items-center" 
                                            style={{ 
                                                color: 'white', 
                                                fontWeight: 'bold', 
                                                borderRadius: '100%', 
                                                cursor: 'pointer', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                padding: '10px',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ 
                                                    backgroundColor: '#6f42c1', 
                                                    color: 'white', 
                                                    padding: '20px', 
                                                    textAlign: 'center', 
                                                    borderRadius: '20px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '250px' 
                                                }}>
                                                    <img className='me-3' src={GoogleLogo} alt="Google Logo" height={32} width={32} style={{backgroundColor:'white',borderRadius:'0px',padding:"5px"}} />
                                                    Sign in with Google
                                                </span>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showAlert} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>{alertMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleCloseAlert}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
