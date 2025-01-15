// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import HeaderQuestionPageFrontend from './HeaderQuestionPageFrontend';
// import { useNavigate } from 'react-router-dom';
// import { Button ,Spinner} from 'react-bootstrap';
// import './QuestionPageFrontend.css'

// const QuestionPageFrontend = () => {
//     const [questions, setQuestions] = useState([]);
//     const [dayScore, setDayScore] = useState('');
//     const [completed, setCompleted] = useState('');
//     const [loading, setLoading] = useState(true);  
//     const navigate = useNavigate();
//     const secretKey = 'gvhbfijsadfkefjnujrbghj';
//     const encryptedcourse = sessionStorage.getItem('course');// Decrypt the data
//     const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);
//     //console.log("",decryptedcourse);
//     const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
//     const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
//     //console.log("",decryptedStudentId)

    
//     useEffect(() => {
//         const postData = {
//             StudentId: decryptedStudentId,
//             Subject: decryptedcourse,
//         };

//         fetch('https://surgebackend.azurewebsites.net/frontend/qns/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             setQuestions(data.Qnslist);
//             setDayScore(data.Day_Score);
//             setCompleted(data.Completed);
//             setLoading(false);  
//         })
//         .catch(error => {
//             console.error('Error fetching the data:', error);
//             setLoading(false);  
//         });
//     }, []);

//     const truncateText = (text, wordLimit) => {
//         const words = text.split(' ');
//         if (words.length > wordLimit) {
//             return words.slice(0, wordLimit).join(' ') + '...';
//         }
//         return text;
//     };

//     const handleClick = (qnName, index) => {


//         sessionStorage.setItem('QnName', qnName);
//         sessionStorage.setItem('Qn_Number', index + 1); 

//         if (decryptedcourse === 'SQL') {
//             navigate('/SQLEditor');
//         } else if (decryptedcourse === 'Python') {
//             navigate('/PyEditor');
//         }
//         else if (decryptedcourse === 'HTMLCSS') {
//             navigate('/Editor');
//         }
//         else if (decryptedcourse === 'Java_Script') {
//             navigate('/JSEditor');
//         }
//     };

//     // const handleNextDay = () => {
//     //     const postData = {
//     //         StudentId: sessionStorage.getItem('StudentId'),
//     //         Course: sessionStorage.getItem('course'),
//     //         Day_no: parseInt(sessionStorage.getItem('SelectedDay'))
//     //     };

//     //     fetch('https://surgebackend.azurewebsites.net/daycomplete/', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(postData)
//     //     })
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         if (data === 'Done'){
//     //             navigate('/IndexPage')
//     //         }
//     //         setLoading(false);  
//     //     })
//     //     .catch(error => {
//     //         console.error('Error fetching the data:', error);
//     //         setLoading(false);  
//     //     });
//     //  }

//     const getButtonText = (status) => {
//         if (status === 0) return 'Unsolved';
//         if (status === 1) return 'Attempted';
//         if (status === 2) return 'Partial';
//         if (status === 3) return 'Solved';
//     };

//     const getButtonColor = (status) => {
//         if (status === 0) return '#F5F5F5';
//         if (status === 1) return '#FEFFBE';
//         if (status === 2) return '#FFE1CC';
//         if (status === 3) return '#D7FFD1';
//     };

//     return (
//         <div className='container-fluid'>
//             <HeaderQuestionPageFrontend />
//             <div className="mx-5 mt-5 pt-3">
//                 {loading ? (
//                     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//                         <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="d-flex justify-content-between align-items-center mb-3 text-dark">
//                             <h5></h5>
//                             <div className='d-flex justify-content-end'>
//                                 <h5 className='px-4'>Score: {dayScore}</h5>
//                                 <h5 className='px-4 '>Rank: N/A</h5>
//                                 <h5 className=''>Completed: {completed}</h5>
//                             </div>
//                         </div>
//                         <div className='border rounded-pill border-dark' style={{ padding: '2px' }}></div>
//                         <div className="list-group mt-4">
//                             {questions.map((question, index) => (
//                                 <div key={index} className="d-flex align-items-start mt-3 mb-3 ">
//                                     <div className="px-3 d-flex align-items-center">
//                                         <div className='border-end border-dark pe-4 py-4'>{index + 1}</div>
//                                     </div>
//                                     <div className="flex-grow-1 list-group-item d-flex justify-content-between align-items-center border border-1 border-dark rounded-3 questionCard" onClick={() => handleClick(question.Qn_name, index)}>
//                                         <div className="flex-grow-1 ms-3">
//                                             <p className="mb-1" style={{width:'60%'}}>{truncateText(question.Qn, 10)}</p>
//                                         </div>
//                                         <div className="px-5">
//                                             <small className="text-muted">Level {question.Level}</small>
//                                         </div>
//                                         <div className="mx-5 px-5">
//                                             <small className="text-muted">Score: {question.Score}</small>
//                                         </div>
//                                         <button className="btn text-dark ms-3 p-2" 
//                                             onClick={() => handleClick(question.Qn_name, index)} 
//                                             style={{ backgroundColor: getButtonColor(question.Status), width: '100px' }}>
//                                             {getButtonText(question.Status) === 'Solved' ? 
//                                                 (<><FontAwesomeIcon icon={faCheck} className="px-1" />Solved</>) : 
//                                                 (<small className='px-1'>{getButtonText(question.Status)}</small>)
//                                             }
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default QuestionPageFrontend;



import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import HeaderQuestionPageFrontend from './HeaderQuestionPageFrontend';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './QuestionPageFrontend.css';
import CryptoJS from 'crypto-js'; // Assuming you're using CryptoJS library

const QuestionPageFrontend = () => {
    const [questions, setQuestions] = useState([]);
    const [dayScore, setDayScore] = useState('');
    const [completed, setCompleted] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [rank, setrank] = useState();

    const secretKey = 'gvhbfijsadfkefjnujrbghj';

    // Fetch session data and decrypt it
    const encryptedCourse = sessionStorage.getItem('course');
    const encryptedStudentId = sessionStorage.getItem('StudentId');

    const decryptedCourse = CryptoJS.AES.decrypt(encryptedCourse, secretKey).toString(CryptoJS.enc.Utf8)
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8)

    // Fetch questions data
    useEffect(() => {
        if (!decryptedStudentId || !decryptedCourse) {
            console.error("Session data is missing or corrupted.");
            setLoading(false);
            return;
        }

        const postData = {
            StudentId: decryptedStudentId,
            Subject: decryptedCourse,
        };

        fetch('https://surgebackend.azurewebsites.net/frontend/qns/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(data => {
                setQuestions(data.Qnslist);
                setDayScore(data.Day_Score);
                setCompleted(data.Completed);
                setrank(data.Rank);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                setLoading(false);
            });
    }, [decryptedStudentId, decryptedCourse]);

    // Utility to truncate text
    const truncateText = (text, wordLimit) => text.split(' ').slice(0, wordLimit).join(' ') + (text.split(' ').length > wordLimit ? '...' : '');

    // Handle question click and navigate to corresponding editor
    const handleClick = (qnName, index) => {

        const encryptedQnName = CryptoJS.AES.encrypt(qnName, secretKey).toString();
        sessionStorage.setItem('QnName', encryptedQnName);
        // const encryptedQn_Number = CryptoJS.AES.encrypt(index + 1, secretKey).toString();
        // sessionStorage.setItem('Qn_Number', encryptedQn_Number);
        
        
        // sessionStorage.setItem('QnName', qnName);
        sessionStorage.setItem('Qn_Number', index + 1);

        switch (decryptedCourse) {
            case 'SQL':
                navigate('/SQLEditor');
                break;
            case 'Python':
                navigate('/PyEditor');
                break;
            case 'HTMLCSS':
                navigate('/Editor');
                break;
            case 'Java_Script':
                navigate('/JSEditor');
                break;
            default:
                console.error("Unknown course.");
        }
    };

    // Utility to get button text based on status
    const getButtonText = (status) => ['Unsolved', 'Attempted', 'Partial', 'Solved'][status] || 'Unsolved';

    // Utility to get button color based on status
    const getButtonColor = (status) => ['#F5F5F5', '#FEFFBE', '#FFE1CC', '#D7FFD1'][status] || '#F5F5F5';

    return (
        <div className='container-fluid'>
            <HeaderQuestionPageFrontend />
            <div className="mx-5 mt-5 pt-3">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
                    </div>
                ) : (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3 text-dark">
                            <h5></h5>
                            <div className='d-flex justify-content-end'>
                  
                                <h5 className='px-4'>Score: {dayScore}</h5>
                        {/* <h5 className='px-4'>Rank: N/A</h5> */}
                        <h5 className='px-4'>Rank: {rank}</h5>
                                <h5>Completed: {completed}</h5>
                            </div>
                        </div>
                        <div className='border rounded-pill border-dark' style={{ padding: '2px' }}></div>
                        <div className="list-group mt-4">
                            {questions.map((question, index) => (
                                <div key={index} className="d-flex align-items-start mt-3 mb-3 ">
                                    <div className="px-3 d-flex align-items-center">
                                        <div className='border-end border-dark pe-4 py-4'>{index + 1}</div>
                                    </div>
                                    <div
                                        className="flex-grow-1 list-group-item d-flex justify-content-between align-items-center border border-1 border-dark rounded-3 questionCard"
                                        onClick={() => handleClick(question.Qn_name, index)}
                                    >
                                        <div className="flex-grow-1 ms-3">
                                            <p className="mb-1" style={{ width: '60%' }}>
                                                {truncateText(question.Qn, 10)}
                                            </p>
                                        </div>
                                        <div className="px-5">
                                            <small className="text-muted">Level {question.Level}</small>
                                        </div>
                                        <div className="mx-5 px-5">
                                            <small className="text-muted">Score: {question.Score}</small>
                                        </div>
                                        <button
                                            className="btn btn-dark text-dark ms-3 p-2"
                                            style={{ backgroundColor: getButtonColor(question.Status), width: '100px' }}
                                        >
                                            {getButtonText(question.Status) === 'Solved' ? (
                                                <>
                                                    <FontAwesomeIcon icon={faCheck} className="px-1" /> Solved
                                                </>
                                            ) : (
                                                <small className='px-1'>{getButtonText(question.Status)}</small>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionPageFrontend;
