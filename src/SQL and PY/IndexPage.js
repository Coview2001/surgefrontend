// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import HeaderIndex from './HeaderIndex'

// const IndexPage = () => {
//     const [data, setData] = useState(null);
//     const [remainingDay, setRemainingDay] = useState();
//     const [currentDay, setCurrentDay] = useState();
//     const navigate = useNavigate()


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post(
//                     'https://surgebackend.azurewebsites.net/getdays/',
//                     { "StudentId": sessionStorage.getItem('StudentId'), "Course": sessionStorage.getItem('course')}
//                 );
//                 setData(response.data);
//                 setRemainingDay(response.data.Days_left);
//                 setCurrentDay(response.data.Day_User_on);
//             } catch (error) {
//                 console.error("Error fetching data", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const getStatusButton = ( dayNo, daystatus) => {
//         const btnClass = "btn border border-dark p-1"; 
    
//         if (daystatus === 'Done') {
//             return <button className={`${btnClass}`} style={{backgroundColor:'#BCEFBE', width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
//         }
//         if (daystatus === 'Start') {
//             return <button className={`${btnClass}`} style={{width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
//         }
//         if (daystatus === 'In Progress') {
//             return <button className={`${btnClass}`} style={{width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
//         }
//         if (daystatus === 'Attempted') {
//             return <button className={`${btnClass}`} style={{backgroundColor:'#FEFFBE', width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
//         }
//         return ;
//     };

//     const handleBtn = (dayNo) => {
//         const dayNumber = dayNo.split('-')[1];
//         sessionStorage.setItem('SelectedDay', dayNumber);
//         navigate('/QuestionPage');
//     };


//     return (
//       <div className="container-fuild mt-5">
//             <HeaderIndex />
//             {data ? (
//                 <div className="d-flex justify-content-between align-items-center mb-3 text-dark  mx-5  mt-5 pt-3">
//                     <h5> Day {currentDay  + 1} {sessionStorage.getItem('course')}</h5>
//                     <h5>No. of days left :{remainingDay}</h5>
//                 </div>
//             ):(
//                 <div></div>
//             )}
//             <div className=" mx-5  mt-4">
//               {data ? (
//                 <div className="days-list">
//                     {data.Days.map((day, index) => (
//                         <div key={index} className="day-item row align-items-center border rounded p-1 mb-3 shadow-sm">
//                             <div className="col-1">
//                                 <span className='pe-3 border-end border-dark'>{index + 1}</span>
//                             </div>
//                             <div className="col-2">
//                                 <span>{day.Day_no}</span>
//                             </div>
//                             <div className="col-3">
//                                 <span>Due Date: {day.Due_date}</span>
//                             </div>
//                             <div className="col-2">
//                                 <span>Score: {data.ScoreList[index].Score}</span>
//                             </div>
//                             <div className="col-2">
//                                 <span>No of Questions: {data.ScoreList[index].Qn_Ans}</span>
//                             </div>
//                             <div className="col-2 text-end">
//                                 {getStatusButton( day.Day_no, day.Status)}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//               ) : (
//                 <div className="text-center mt-5 pt-5">
//                         <h5>Loading...</h5>
//                     </div>
//               )}
//           </div>
//       </div>
//     );
// };

// export default IndexPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import HeaderIndex from './HeaderIndex'
import { Spinner} from 'react-bootstrap';
import CryptoJS from 'crypto-js';
const IndexPage = () => {
    const [data, setData] = useState(null);
    const [remainingDay, setRemainingDay] = useState();
    const [currentDay, setCurrentDay] = useState();
    const [Total_Days, setTotal_Days]= useState();
    const navigate = useNavigate()
    const secretKey = 'gvhbfijsadfkefjnujrbghj';
    const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedcourse = sessionStorage.getItem('course');// Decrypt the data
    const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://surgebackend.azurewebsites.net/getdays/',
                    { "StudentId": decryptedStudentId, 
                        "Course": decryptedcourse}
                );
                setData(response.data);
                setRemainingDay(response.data.Days_left);
                setCurrentDay(response.data.Day_User_on);
                setTotal_Days(response.data.Total_Days);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const getStatusButton = ( dayNo, daystatus) => {
        const btnClass = "btn border border-dark p-1"; 
    
        if (daystatus === 'Done') {
            return <button className={`${btnClass}`} style={{backgroundColor:'#BCEFBE', width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
        }
        if (daystatus === 'Start') {
            return <button className={`${btnClass}`} style={{width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
        }
        if (daystatus === 'In Progress') {
            return <button className={`${btnClass}`} style={{width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
        }
        if (daystatus === 'Attempted') {
            return <button className={`${btnClass}`} style={{backgroundColor:'#FEFFBE', width:'100px'}} onClick={() => handleBtn(dayNo)}>{daystatus}</button>;
        }
        return ;
    };

    const handleBtn = (dayNo) => {
        const dayNumber = dayNo.split('-')[1];
        const encryptedSelectedDay = CryptoJS.AES.encrypt(dayNumber, secretKey).toString();
        sessionStorage.setItem('SelectedDay', encryptedSelectedDay);
        // const decryptedSelectedDay = CryptoJS.AES.decrypt(encryptedSelectedDay, secretKey).toString(CryptoJS.enc.Utf8);

        // sessionStorage.setItem('SelectedDay', dayNumber);
        // decryptedSelectedDay
        navigate('/QuestionPage');
    };

    // const encryptedSelectedDay = sessionStorage.getItem('SelectedDay');// Decrypt the data
    // const decryptedSelectedDay = CryptoJS.AES.decrypt(encryptedSelectedDay, secretKey).toString(CryptoJS.enc.Utf8);
    return (
      <div className="container-fuild mt-5">
            <HeaderIndex />
            {data ? (
                <div className="d-flex justify-content-between align-items-center mb-3 text-dark  mx-5  mt-5 pt-3">
                    <h5> Day {currentDay + 1 == Total_Days ? currentDay : currentDay + 1} {decryptedcourse}</h5>

                    <h5>No. of days left :{remainingDay}</h5>
                </div>
            ):(
                <div></div>
            )}
            <div className=" mx-5  mt-4">
              {data ? (
                <div className="days-list">
            
                    {data.Days.map((day, index) => (
                        <div key={index} className="day-item row align-items-center border rounded p-1 mb-3 shadow-sm">
                            <div className="col-1">
                                <span className='pe-3 border-end border-dark'>{index + 1}</span>
                            </div>
                            <div className="col-2">
                                <span>{day.Day_no}</span>
                            </div>
                            <div className="col-3">
                                <span>Due Date: {day.Due_date}</span>
                            </div>
                            <div className="col-2">
                                <span>Score: {data.ScoreList[index].Score}</span>
                            </div>
                            <div className="col-2">
                                <span>No of Questions: {data.ScoreList[index].Qn_Ans}</span>
                            </div>
                            <div className="col-2 text-end">
                                {getStatusButton( day.Day_no, day.Status)}
                            </div>
                        </div>
                    ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
                    </div>
              )}
          </div>
      </div>
    );
};

export default IndexPage;
