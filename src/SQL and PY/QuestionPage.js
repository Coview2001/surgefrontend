// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import HeaderQuestionPage from './HeaderQuestionPage';
// import { useNavigate } from 'react-router-dom';

// const QuestionPage = () => {
//     const [questions, setQuestions] = useState([]);
//     const [dayScore, setDayScore] = useState('');
//     const [completed, setCompleted] = useState('');
//     const [loading, setLoading] = useState(true);  
//     const navigate = useNavigate();

//     useEffect(() => {
//         const postData = {
//             StudentId: sessionStorage.getItem('StudentId'),
//             Course: sessionStorage.getItem('course'),
//             Day: sessionStorage.getItem('SelectedDay')
//         };

//         fetch('https://surgebackend.azurewebsites.net/days/qns/', {
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
//         sessionStorage.setItem('Qn_name', qnName);
//         sessionStorage.setItem('Qn_Number', index + 1); 
//         //console.log("first")
    
//         if (sessionStorage.getItem('course') === 'SQL') {
//             navigate('/SQLEditor');
//         } else if (sessionStorage.getItem('course') === 'Python') {
//             navigate('/PyEditor');
//         }
//         else if (sessionStorage.getItem('course') === 'HTMLCSS') {
//             // navigate('/HTMLCSSEditor');
//             navigate('/Editor');

//         }
//         //console.log("5465465",sessionStorage.getItem('course'))

//     };
    

//     const handleNextDay = () => {
//         setLoading(true)
//         const postData = {
//             StudentId: sessionStorage.getItem('StudentId'),
//             Course: sessionStorage.getItem('course'),
//             Day_no: parseInt(sessionStorage.getItem('SelectedDay'))
//         };

//         fetch('https://surgebackend.azurewebsites.net/daycomplete/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postData)
//         })
//         .then(response => response.json())
//         .then(response => {
//             //console.log("response", response)
//             if (response.Result == 'Success'){
//                 //console.log("Atom")
//                 navigate('/IndexPage')
//             }
//             setLoading(false);  
//         })
//         .catch(error => {
//             console.error('Error fetching the data:', error);
//             setLoading(false);  
//         });
//      }

//     const getButtonText = (status) => {
//         if (status === 0) return 'Unsolved';
//         if (status === 1) return 'Attempted';
//         if (status === 2) return 'Partial';
//         if (status === 3) return 'Solved'
//     };

//     const getButtonColor = (status) => {
//         if (status === 0) return '#F5F5F5';
//         if (status === 1) return '#FEFFBE';
//         if (status === 2) return '#FFE1CC';
//         if (status === 3) return '#D7FFD1';
//     };

//     return (
//         <div className='container-fluid'>
//             <HeaderQuestionPage />
//             <div className="mx-5 mt-5 pt-3">
//             {loading ? (
//                 <div></div>
//             ): (
//                 <div className="d-flex justify-content-between align-items-center mb-3 text-dark">
//                     <h5>Day {sessionStorage.getItem('SelectedDay')}</h5>
//                     <div className='d-flex justify-content-end'>
//                         <h5 className='px-4'>Score: {dayScore}</h5>
//                         <h5 className='px-4'>Rank: 1/100</h5>
//                         <h5>Completed: {completed}</h5>
//                     </div>
//                 </div>
//             )}
//                 <div className='border rounded-pill border-dark' style={{ padding: '2px' }}></div>
//                 {loading ? (
//                     <div className="text-center mt-5">
//                         <h5>Loading...</h5>
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="list-group">
//                             {questions.map((question, index) => (
//                                 <div key={index} className="d-flex align-items-start mt-3 mb-3">
//                                     <div className="px-3 d-flex align-items-center">
//                                         <div className='border-end border-dark pe-4 py-3'>{index + 1}</div>
//                                     </div>
//                                     <div className="flex-grow-1 list-group-item d-flex justify-content-between align-items-center border border-1 border-dark rounded-3">
//                                         <div className="flex-grow-1 ms-3">
//                                             <p className="mb-1" style={{width:'60%'}}>{truncateText(question.Qn, 10)}</p>
//                                         </div>
//                                         <div className="px-5">
//                                             <small>Level {question.Level}</small>
//                                         </div>
//                                         <div className="mx-5 px-5">
//                                             <small className="">Score: {question.Score}</small>
//                                         </div>
//                                         <button className="btn btn-secondary text-dark ms-3 p-2" 
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
//                         <div className='d-flex justify-content-center mt-3 mb-2'>
//                             <button className='btn btn-outline-primary btn-sm' onClick={handleNextDay}> Go to next day</button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default QuestionPage;


import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import HeaderQuestionPage from './HeaderQuestionPage';
import { useNavigate } from 'react-router-dom';
import { Button ,Spinner} from 'react-bootstrap';
import CryptoJS from 'crypto-js';


const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [dayScore, setDayScore] = useState('');
    const [completed, setCompleted] = useState('');
    const [rank, setrank] = useState();
    const [loading, setLoading] = useState(true);  
    const navigate = useNavigate();
    const secretKey = 'gvhbfijsadfkefjnujrbghj';
    const encryptedName = sessionStorage.getItem('Name');// Decrypt the data
    const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedPicture = sessionStorage.getItem('Picture');// Decrypt the data
    const decryptedPicture = CryptoJS.AES.decrypt(encryptedPicture, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedcourse = sessionStorage.getItem('course');// Decrypt the data
    const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);
        const encryptedSelectedDay = sessionStorage.getItem('SelectedDay');// Decrypt the data
    const decryptedSelectedDay = CryptoJS.AES.decrypt(encryptedSelectedDay, secretKey).toString(CryptoJS.enc.Utf8);
    useEffect(() => {
        const postData = {
            StudentId: decryptedStudentId,
            Course: decryptedcourse,
            Day: decryptedSelectedDay
        };

        fetch('https://surgebackend.azurewebsites.net/days/qns/', {
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
            setrank(data.Rank);
            setCompleted(data.Completed);
            setLoading(false);  
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            setLoading(false);  
        });
    }, []);

    const truncateText = (text, letterLimit) => {
        if (text.length > letterLimit) {
            const truncated = text.slice(0, letterLimit);
            const lastSpaceIndex = truncated.lastIndexOf(' ');
    
            // If there's a space, truncate at the last space
            return lastSpaceIndex > 0 
                ? truncated.slice(0, lastSpaceIndex) + '...'
                : truncated + '...';
        }
        return text;
    };
    
    

    const handleClick = (qnName, index) => {
        const encryptedQnName = CryptoJS.AES.encrypt(qnName, secretKey).toString();
        sessionStorage.setItem('QnName', encryptedQnName);
        sessionStorage.setItem('Qn_Number', index + 1); 
        // //console.log("first")
    
        if (decryptedcourse === 'SQL') {
            navigate('/SQLEditor');
        } else if (decryptedcourse === 'Python') {
            navigate('/PyEditor');
        }
        else if (decryptedcourse === 'HTMLCSS') {
            navigate('/Editor');

        }
        // //console.log("5465465",sessionStorage.getItem('course'))

    };
    

    // const handleNextDay = () => {
    //     setLoading(true)
    //     const postData = {
    //         StudentId: sessionStorage.getItem('StudentId'),
    //         Course: sessionStorage.getItem('course'),
    //         Day_no: parseInt(sessionStorage.getItem('SelectedDay'))
    //     };

    //     fetch('https://surgebackend.azurewebsites.net/daycomplete/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(postData)
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         //console.log("response", response)
    //         if (response.Result == 'Success'){
    //             //console.log("Atom")
    //             navigate('/IndexPage')
    //         }
    //         setLoading(false);  
    //     })
    //     .catch(error => {
    //         console.error('Error fetching the data:', error);
    //         setLoading(false);  
    //     });
    //  }


    const handleNextDay = () => {
        // //console.log("Varun")
        setLoading(true);
        if (decryptedcourse === 'Python' || 'SQL') {
        const postData = {
            StudentId: decryptedStudentId,
            Course: decryptedcourse,
            Day_no: parseInt(decryptedSelectedDay)
        };
        // //console.log("Varun1")

        fetch('https://surgebackend.azurewebsites.net/daycomplete/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(response => {
            // //console.log("response", response);
            if (response.Result === 'Success') {
                const nextday = parseInt(decryptedSelectedDay) + 1;
                // sessionStorage.setItem('SelectedDay', nextday.toString());
                const encryptedSelectedDay = CryptoJS.AES.encrypt(nextday.toString(), secretKey).toString();
                sessionStorage.setItem('SelectedDay', encryptedSelectedDay);

                // {
                //     nextday <= 10 ? (
                //       // Logic inside the conditional block
                //       (() => {
                //         const postData = {
                //           StudentId: decryptedStudentId,
                //           Course: decryptedcourse,
                //           Day: nextday
                //         };
                  
                //         fetch('https://surgebackend.azurewebsites.net/days/qns/', {
                //           method: 'POST',
                //           headers: {
                //             'Content-Type': 'application/json'
                //           },
                //           body: JSON.stringify(postData)
                //         })
                //         .then(response => response.json())
                //         .then(data => {
                //           if (data.Qnslist.length === 0) { 
                //             sessionStorage.setItem("QnName","")
                //             navigate('/IndexPage');
                //           } else {
                //             setQuestions(data.Qnslist);
                //             setDayScore(data.Day_Score);
                //             setCompleted(data.Completed);
                //           }
                //           setLoading(false);
                //         })
                //         .catch(error => {
                //           console.error('Error fetching the data:', error);
                //           setLoading(false);
                //         });
                //       })()
                //     ) : (
                //         (() => {
                //       sessionStorage.setItem("QnName","");
                //       navigate('/IndexPage')
                //     })()
                //     )
                //   }
                navigate('/IndexPage');
                  
            }
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            setLoading(false);
        });
    }
    else{
        navigate('/IndexPage');
    }
    }
    


    const getButtonText = (status) => {
        if (status === 0) return 'Unsolved';
        if (status === 1) return 'Attempted';
        if (status === 2) return 'Partial';
        if (status === 3) return 'Solved'
    };

    const getButtonColor = (status) => {
        if (status === 0) return '#F5F5F5';
        if (status === 1) return '#FEFFBE';
        if (status === 2) return '#FFE1CC';
        if (status === 3) return '#D7FFD1';
    };

    return (
        <div className='container-fluid'>
            <HeaderQuestionPage />
            <div className="mx-5 mt-5 pt-3">
            {loading ? (
                <div></div>
            ): (
                <div className="d-flex justify-content-between align-items-center mb-3 text-dark">
                    <h5>Day {decryptedSelectedDay}</h5>
                    <div className='d-flex justify-content-end'>
                        <h5 className='px-4'>Score: {dayScore}</h5>
                        <h5 className='px-4'>Rank: {rank}</h5>
                        {/* <h5 className='px-4'>Rank: N/A</h5> */}
                        <h5>Completed: {completed}</h5>
                    </div>
                </div>
            )}
                <div className='border rounded-pill border-dark' style={{ padding: '2px' }}></div>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
                    </div>
                ) : (
                    <div>
                        <div className="list-group">
              
    {questions.map((question, index) => (
        <div key={index} className="d-flex align-items-start mt-3 mb-3">
            <div className=" d-flex align-items-end">

            <div className=' py-3 d-flex flex-end' style={{ width: '30px', textAlign: 'center' }}>
                    {index + 1}
                </div>
            </div>
            <div className='flex-grow-1 d-flex justify-content-between align-items-center border-start border-dark ps-2'>
            <div className="flex-grow-1 ms-2 list-group-item d-flex justify-content-between align-items-center border border-1 border-dark rounded-3">
                <div className="flex-grow-1 ms-3">
                    <p className="mb-1" style={{ width: '60%' }}>{truncateText(question.Qn, 48)}</p>
                </div>
                <div className="d-flex flex-column align-items-end px-5" style={{ minWidth: '100px' }}>
                    <small>Level {question.Level}</small>
                </div>
                <div className="d-flex flex-column align-items-end px-5" style={{ minWidth: '250px' }}>
                    <small>Score: {question.Score}</small>
                </div>
                <button className="btn btn-secondary text-dark ms-3 p-2" 
                    onClick={() => handleClick(question.Qn_name, index)} 
                    style={{ backgroundColor: getButtonColor(question.Status), width: '100px' }}>
                    {getButtonText(question.Status) === 'Solved' ? 
                        (<><FontAwesomeIcon icon={faCheck} className="px-1" />Solved</>) : 
                        (<small className='px-1'>{getButtonText(question.Status)}</small>)
                    }
                </button>
            </div>
            </div>
        </div>
    ))}
</div>

                        <div className='d-flex justify-content-center mt-1 mb-5'>
                            <button className='btn btn-outline-primary btn-sm mb-5' onClick={handleNextDay}> Go to next day</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default QuestionPage;


