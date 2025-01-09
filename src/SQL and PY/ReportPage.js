// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Header from './Header';
// import { BarLoader, SyncLoader,PulseLoader } from 'react-spinners';

// const ReportPage = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [questions, setQuestions] = useState([]);
//   const [doneLoading, setDoneLoading] = useState(false); // State for loading after clicking Done
//   const [totalScore, settotalScore] = useState();
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const { questions: questionsData } = location.state || {};
//       setQuestions(questionsData || []);

//       if (!questionsData) {
//         return;
//       }

//       try {
//         const response = await fetch('https://surgebackend.azurewebsites.net/sql/getreport/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             Student_id: '24MRIT0002',
//             Course: 'SQL',
//             Day_no: parseInt(sessionStorage.getItem('Day_no').split('-')[1])
//           })
//         });

//         const result = await response.json();
//         setData(result(0));
//         settotalScore(result(-1))
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [location.state]);

//   const handleDone = async () => {
//     setDoneLoading(true); // Start loading when Done button is clicked
//     try {
//       const sendData = {
//         StudentId: sessionStorage.getItem("StudentId"),
//         Course: sessionStorage.getItem('course'),
//         Day_no: parseInt(sessionStorage.getItem('Day_no').split('-')[1])
//       }

//       const response = await fetch('https://surgebackend.azurewebsites.net/sql/complete/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(sendData),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       navigate('/IndexPage');
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//     } finally {
//       setDoneLoading(false); // Stop loading after navigation or error
//     }
//   };

//   if (loading) {
//     return (
//       <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
//         <div>
//           <SyncLoader color="#9ab4c9" size={10} />
//         </div>
//         <div className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <h3 className='pt-4 text-secondary'>Preparing data, Please wait...</h3>
//           <BarLoader color="#9ab4c7" width={200} />
//         </div>
//         <div>
//           <SyncLoader color="#9ab4c9" size={10} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fuild mt-5 mx-5">
//       <Header />
//       <h1 className="mb-4 text-center">SQL Report</h1>
//       <h3>Total Score: {totalScore}</h3>
//       <table className="table table-striped">
//         <thead>
//           <tr className='text-center'>
//             <th>Question Number</th>
//             <th>Question</th>
//             <th>Attempts</th>
//             <th>Ans</th>
//             <th>Score</th>
//             <th>Result</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(item => {
//             const questionData = questions.find(q => q.Qn_name === item.Qn) || {};
//             return (
//               <tr key={item.Index}>
//                 <td className='text-center'>{item.Index + 1}</td>
//                 <td>
//                   <div>{questionData.Qn || "No question found"}</div>
//                 </td>
//                 <td className='text-center'>{item.Attempts}</td>
//                 <td>{item.Ans}</td>
//                 <td>{item.Score}</td>
//                 <td>
//                   <div>
//                     <span className={`badge ${item.Result.Result === 'True' ? 'bg-success' : 'bg-danger'}`}>
//                       {item.Result.Result === 'True' ? 'Correct' : 'Incorrect'}
//                     </span>
//                     <div>
//                       <div>Testcase1: {item.Result.Testcase1}</div>
//                       <div>Testcase2: {item.Result.Testcase2}</div>
//                       <div>Testcase3: {item.Result.Testcase3}</div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className='d-flex justify-content-center'>
//         {doneLoading ? (
//           <div className="d-flex align-items-center">
//             <span className="ml-2 text-center">Please wait...<BarLoader  color="#9ab4c9" size={5} /></span>
//           </div>
//         ) : (
//           <button className='btn btn-outline-primary text-center' onClick={handleDone}>Done</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReportPage;


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { BarLoader, SyncLoader } from 'react-spinners';

const ReportPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const [totalScore, setTotalScore] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { questions: questionsData } = location.state || {};
      setQuestions(questionsData || []);
      // //console.log("Hii")

      if (!questionsData) {
        return;
      }

      try {
        const response = await fetch('https://surgebackend.azurewebsites.net/sql/getreport/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Student_id: sessionStorage.getItem('StudentId'),
            Course: sessionStorage.getItem('course'),
            Day_no: parseInt(sessionStorage.getItem('Day_no').split('-')[1])
          })
        });

        const result = await response.json();

        const lastItem = result[result.length - 1];
        setTotalScore(lastItem.Score);

        const reportData = result.slice(0, -1);
        setData(reportData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDone = async () => {
    setDoneLoading(true);
    navigate('/IndexPage');

  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
        <div>
          <SyncLoader color="#9ab4c9" size={10} />
        </div>
        <div className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className='pt-4 text-secondary'>Preparing data, Please wait...</h3>
          <BarLoader color="#9ab4c7" width={200} />
        </div>
        <div>
          <SyncLoader color="#9ab4c9" size={10} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fuild mt-5 mx-2">
      <Header />
      

      <div>
        <div className="d-flex justify-content-between align-items-center">
        <h1 className="pt-2 pb-2 m-0 text-center flex-grow-1">
          SQL {sessionStorage.getItem('Day_no')} Report
        </h1>
        <p className="m-1 text-end">
          <strong>Total Score</strong>: {totalScore}
        </p>
        </div>
        <div style={{height: '80vh', overflow: 'auto'}}>
        <table className="table table-striped table-bordered border-dark">
        <thead>
          <tr className='text-center table-primary'>
            <th>Qn No:</th>
            <th>Question</th>
            <th>Attempts</th>
            <th>Ans</th>
            <th>Score</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const questionData = questions.find(q => q.Qn_name === item.Qn) || {};
            return (
              <tr key={index}>
                <td className='text-center' style={{width: '100px'}}>{item.Index + 1}</td>
                <td style={{width: '800px'}}>
                  <div >{questionData.Qn || "No question found"}</div>
                </td>
                <td className='text-center' style={{width: '40px'}}>{item.Attempts || 'N/A'}</td>
                <td style={{width: '400px'}} className='text-start'>{item.Ans}</td>
                <td style={{width: '10px'}}>{item.Score}</td>
                <td style={{width: '200px'}}>
                  <div className='text-center'>
                  <span className={`badge ${item.Result.Result === 'True' ? 'bg-success' : item.Result.Result === 'False' ? 'bg-danger' : 'bg-warning'}`}>
                    {item.Result.Result === 'True' ? 'Correct' : item.Result.Result === 'False' ? 'Incorrect' : 'skipped'}
                  </span>
                    <div className='text-start' >
                      <div>Testcase1: {item.Result.Testcase1}</div>
                      <div>Testcase2: {item.Result.Testcase2}</div>
                      <div>Testcase3: {item.Result.Testcase3}</div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        {doneLoading ? (
          <div className="d-flex align-items-center">
            <span className="ml-2 text-center">Please wait...<BarLoader  color="#9ab4c9" size={5} /></span>
          </div>
        ) : (
          <button className='btn btn-outline-primary text-center' onClick={handleDone}>Done</button>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
