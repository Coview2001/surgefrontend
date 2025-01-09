import React, { useState, useEffect, useCallback, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-clouds';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarLoader, SyncLoader, PulseLoader } from 'react-spinners';
import { Modal, Button, Tab, Tabs } from 'react-bootstrap';
import './SQLEditor.css'
import { useNavigate } from 'react-router-dom';
import Header from './Header';


const SQLEditor = () => {
  const [sqlQuery, setSqlQuery] = useState('/*Write a all SQl commands/ clauses in UPPERCASE*/');
  const [response, setResponse] = useState(null);
  const [responseTestCase, setResponseTestCase] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [executingQuery, setExecutingQuery] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFinish, setShowAlertFinish] = useState(false);
  const [activeTab, setActiveTab] = useState('tables');
  const [selectedTableName, setSelectedTableName] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false); 
  const [splitOffset, setSplitOffset] = useState(500);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);
  const navigate = useNavigate();
  const [submissionAttempts, setSubmissionAttempts] = useState({});
  const [Qn_name, setQn_name] = useState();
  const [Ans, setAns] = useState();
  const [sqlRun, setSqlRun] = useState(false);
  const [runResponse, setRunResponse] = useState();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState();
  const [data, setData] = useState();
  const [testCase, setTestCase] = useState([]);
  const [questionName, setQuestionName] = useState();
  const [runResponseTestCases, setRunResponseTestCases] = useState();
  const [runResponseTable, setRunResponseTable] = useState();
  const [runResponseExecutionTime, setRunResponseExecutionTime] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [show, setShow] = useState(false);



  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging ||!initialX) return;
    const dx = e.clientX - initialX;
    setSplitOffset(splitOffset + dx);
    setInitialX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setInitialX(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialX]);

  
  useEffect(() => {
    const fetchData = async () => {
      const bodyData = 
        {
          StudentId: sessionStorage.getItem('StudentId'),
          Course: sessionStorage.getItem('course'),
          Day: sessionStorage.getItem('SelectedDay'),
          Qn_name: sessionStorage.getItem('Qn_name')
        }
        // //console.log("bodyData", bodyData)
      try {
        const response = await fetch("https://surgebackend.azurewebsites.net/get/qn/data/", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyData)
            }
        );
        const data = await response.json();
        setData(data)
        // //console.log("data", data)
        setQuestion(data.Question);
        // //console.log("YYYYYYY :",data.Question)
        setQn_name(data.Question.Qn_name)
        setAns(data.Question.Query)
        setTables(data.Tables);
        // //console.log("Tables", data.Tables)
        setExpectedOutput(data.Question.ExpectedOutput);
        setTestCase(data.Question.TestCases)
        setQuestionName(data.Question.Qn)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  

  useEffect(() => {
    if (data && data.Tables.length > 0) {
      setSelectedTableName(data.Tables[0].tab_name);
    }
  }, [data]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    setShowAlertFinish(false)
  };

  const handleTableNameClick = (tableName) => {
    setSelectedTableName(tableName);
  };


  const handleRun = async () => {
    setClickCount(prevCount => prevCount + 1);
    setSqlRun(true);
    setActiveTab('output');
    // //console.log("IronMan", clickCount + 1);
  
    try {
      setActiveTab('output');
      const updatedSqlQuery = sqlQuery.trim().replace(/\n/g, ' ').replace(/;$/, '');
      const sendData = {
        studentId: sessionStorage.getItem('StudentId'),
        query: updatedSqlQuery,
        ExpectedOutput: question.ExpectedOutput,
        TestCases: question.TestCases
      };
      if (updatedSqlQuery) {
        const url = 'https://surgebackend.azurewebsites.net/runsql/';
        setResponse(null);
        setExecutingQuery(true);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        });
        const responseData = await response.json();
        setRunResponse(responseData);
        
        // Log the entire response
        // //console.log("Full Response:", responseData);
        setRunResponseTable(responseData.data)
        // //console.log("TableData", responseData.data);
        setRunResponseTestCases(responseData.TestCases);
        // //console.log("TestCases", responseData.TestCases);
        setRunResponseExecutionTime(responseData.Time);
        // //console.log("Cap",responseData.Time)
        setExecutingQuery(false);
        const resultField = responseData.TestCases.find(testCase => testCase.Result !== undefined);
        if (resultField) {
          if (resultField.Result === "True") {
            // //console.log("Batman");
            setSuccessMessage('Congratulations!');
            setAdditionalMessage('You have passed the test cases. Click the submit code button.');
          } else if (resultField.Result === "False") {
            setSuccessMessage('Wrong Answer');
            setAdditionalMessage('');
          }
        }
      } else {
        console.error('SQL query is empty');
        setResponse(null);
      }
    } catch (error) {
      console.error('Error executing SQL query:', error);
      setResponse(null);
      setExecutingQuery(false);
    }
  };
  
  const handleSubmit = async () => {
    setShow(true)
    // //console.log("first")
    setActiveTab('output');
      if (submissionAttempts[questionIndex] >= 1) {
      setShowAlert(true);
      return;
    }
  
    try {
      const updatedSqlQuery = sqlQuery.trim().replace(/;/g, '').replace(/\n/g, ' ');
      const sendData = {
        StudentId: sessionStorage.getItem('StudentId'),
        Day_no: sessionStorage.getItem('SelectedDay'),
        Subject: sessionStorage.getItem('course'),
        Qn: question.Qn_name,
        Ans:updatedSqlQuery.find('/*Write a all SQl commands/ clauses in UPPERCASE*/').replace(''),
        Result: runResponse.TestCases,
        Attempt: clickCount
      };
  
  
      // //console.log("sendData",sendData )
      if (updatedSqlQuery) {
        const url = 'https://surgebackend.azurewebsites.net/submit/';
        setResponseTestCase(null);
        setSubmittingAnswer(true);
        const responseTestCase = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        });
  
        const responseTastCase = await responseTestCase.json();
        // //console.log("Hiii", responseTastCase)
        setSubmissionSuccess(true)
        setResponseTestCase(responseTastCase.Result);
        setSubmittingAnswer(false);
        setSubmitCount(prevCount => prevCount + 1);
  

      } else {
        console.error('No testcases');
        setResponseTestCase(null);
      }
    } catch (error) {
      console.error('Error executing testcases:', error);
      setResponseTestCase(null);
      setSubmittingAnswer(false);
    }
  };


  const handleClose = () => setShow(false);

  // const remainingSubmissionsMessage = `You have ${3 - submissionAttempts[questionIndex]} submission's left`;
  const alertMessage = "You have reached the your limit.";

  // const remainingRunMessage = `You have ${3 - submissionAttempts1[questionIndex]} run's left`;

  return (
    <div className="container-fluid">
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
          <div>
            <SyncLoader color="#9ab4c9" size={10}/>
          </div>
          <div className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 className='pt-4 text-secondary'>Preparing data, Please wait...</h3>
            <BarLoader color="#9ab4c7" width={200}/>
          </div>
          <div>
            <SyncLoader color="#9ab4c9" size={10}/>
          </div>
        </div>
      ) : (
        <div className="row" style={{height: '50vh'}}>
          <div className="container-fuild">
          <Header/>


            <div className='row container-fuild d-flex justify-content-center mt-5 pt-2 px-1 ' style={{backgroundColor:'#9ECEDA', overflow:'hidden', maxHeight: '92.5vh'}}>
              <div className='col-6 leftDiv'>
                <div className='col-11' style={{width: '48.3vw'}}>
                <div className='row' style={{backgroundColor:'#FFFFFF', height:'42vh'}}>
                  <p className='fs-4'>Retrieve all information about the Students Marks who have scored at least 20 in Test1 but less than 20 in any of the other two tests.</p>
                </div>
                <div className='row' style={{backgroundColor:'#9ECEDA', height:'0.5vh'}}></div>
                <div className='row pt-2 px-1' style={{ backgroundColor: '#FFFFFF', height: '52vh' }}>
                  <Tabs className='custom-tabs' variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} style={{ fontSize: '12px' }}>
                    <Tab eventKey="tables" title="Table">
                      <div className='col DBT' style={{ height: '35vh', overflowX: 'auto' }}>
                        {data && data.Tables && (
                          <div className="d-flex flex-row">
                            {data.Tables.map(table => {
                              const isSelected = selectedTableName === table.tab_name;
                              return (
                                <div
                                  key={table.tab_name}
                                  className={`bbb m-1 d-flex justify-content-start ${isSelected ? 'text-dark font-weight-bold rounded' : 'text-dark font-weight-normal'}`}
                                  onClick={() => handleTableNameClick(table.tab_name)}
                                  style={{
                                    transform: isSelected ? 'scale(1.1)' : 'none',
                                    transition: isSelected ? 'transform 0.5s' : 'none',
                                    backgroundColor: isSelected ? '#d5c3c34f' : '',
                                    color: isSelected ? 'white' : 'black',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <div className="bbb" style={{ fontSize: '12px' }}>
                                    {table.tab_name}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {selectedTableName && (
                          <div>
                            {data.Tables.map(table => {
                              if (table.tab_name === selectedTableName) {
                                return (
                                  <div key={table.tab_name}>
                                    <table className="table table-bordered table-sm rounded" style={{ maxWidth: '100vw', width: '20vw', fontSize: '12px' }}>
                                      <thead>
                                        <tr>
                                          {Object.keys(table.data[0]).map((key, index) => (
                                            <th key={index} className='text-center' style={{ maxWidth: `${key.length * 10}px` }}>{key}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {table.data.map((item, index) => (
                                          <tr key={index}>
                                            {Object.entries(item).map(([key, value], i) => (
                                              <td key={i} className='text-center' style={{ minWidth: `${value.toString().length * 8}px` }}>{value}</td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="output" title="Expected Output">
                      {data && (
                        <div className="col expectedOutput" style={{ height: '35vh', overflowX: 'auto', fontSize: '12px' }}>
                          <div className="table-responsive">
                            <table className="table table-bordered table-sm" style={{ tableLayout: 'auto', width: 'auto' }}>
                              <thead>
                                <tr>
                                  {data.Question.ExpectedOutput.length > 0 &&
                                    Object.keys(data.Question.ExpectedOutput[0]).map((key, index) => (
                                      <th key={index} className='text-center'>{key}</th>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                {data.Question.ExpectedOutput.map((item, index) => (
                                  <tr key={index}>
                                    {Object.values(item).map((value, i) => (
                                      <td key={i} className='px-3 text-center' style={{ whiteSpace: 'nowrap', padding: '5px' }}>{value}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                </div>
                </div>
                <div className='curserDiv' onMouseDown={handleMouseDown}></div>
              </div>
              <div className='col-6 rightDiv'>
                <div className='row '>
                      <AceEditor
                        mode="sql"
                        theme="dreamweaver"
                        onChange={setSqlQuery }
                        value={sqlQuery}
                        placeholder="Write your SQL query here... "
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        highlightActiveLine={false}
                        wrapEnabled={true}
                        className="pe-3 pt-3"
                        style={{ width: '100%', height: '42vh' }}
                      />
                </div>
                <div className='row messageDiv d-flex justify-content-between' style={{ height: '8vh' }}>
                  <div className='col d-flex justify-content-start align-items-center text-wrap'>
                    {executingQuery && (
                      <h5>Processing....</h5>
                    )}
                    {!executingQuery && successMessage && (
                      <div>
                      <h5>{successMessage}</h5>
                      <p style={{fontSize:'12px'}}>{additionalMessage}</p>
                      </div>
                      )}
                  </div>
                  <div className='col d-flex justify-content-end align-items-center'>
                    <button
                      className="btn btn-dark btn-sm mx-2"
                      onClick={() => { handleRun(false); setShowTable(false); }}
                      style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                    >
                      RUN CODE
                    </button>
                    <button className="btn btn-dark btn-sm" onClick={handleSubmit}  style={{ backgroundColor: '#EEEBAD', color: '#000000' }}>
                      SUBMIT CODE
                    </button>
                  </div>
                </div>
                <div className='row mb-3' style={{ backgroundColor: '#2C2C2C', height: '44vh', backgroundColor: '#F5FAFB' }}>
                  {executingQuery ? (
                    <div className='text-center mt-5 pt-5' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Loading.....
                    </div>
                  ) : (
                    <div className="mt-3 table-responsive" style={{ height: '42vh', fontSize: '12px' }}>
                      <p style={{ fontSize: '15px' }}>Your output:</p>
                      <div className="table-responsive">
                        {runResponseTable && Array.isArray(runResponseTable) ? (
                          <div>
                            <table className="table table-bordered table-sm" style={{ maxWidth: '39vh', fontSize: '12px', tableLayout: 'auto', width: 'auto'}}>
                              <thead>
                                <tr>
                                  {Object.keys(runResponseTable[0]).map((key, index) => (
                                    <th key={index} className='text-center'>{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {runResponseTable.map((item, index) => (
                                  <tr key={index}>
                                    {Object.values(item).map((value, i) => (
                                      <td key={i} className='text-center' style={{ minWidth: `${value.toString().length * 10}px` }}>{value}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <pre>
                            {runResponseTable && Object.keys(runResponseTable).length > 0 &&
                              <table className="table table-bordered table-sm" style={{ fontSize: '10px' }}>
                                <tbody>
                                  {Object.entries(runResponseTable).map(([key, value]) => (
                                    <tr key={key}>
                                      <td>{key}</td>
                                      <td>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            }
                          </pre>
                        )}
                      </div>
                      {runResponseTestCases && (
                        <div className="col">
                          <div>
                          {runResponseTestCases.map((testCase, index) => (
                            <p key={index} className="">
                              {Object.entries(testCase).map(([key, value], i) => {
                                let textColor = 'text-dark';
                                if (value === 'Passed') {
                                  textColor = 'text-primary';
                                } else if (value === 'Failed') {
                                  textColor = 'text-danger';
                                }
                                return (
                                  <span key={i} className=' border-2 rounded-3 p-2  px-3 my-5' style={{backgroundColor:'#FFFFFF', fontSize:'12px'}}>
                                    {key}: <span className={textColor}>{value}</span>
                                  </span>
                                );
                              })}
                            </p>
                          ))}
                          </div>
                        </div>
                      )}
                      Execution_Time:{runResponseExecutionTime}
                          </div>
                        )}
                      </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={showAlert} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton  className='bg-primary text-white'>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className=' text-dark'>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleCloseAlert}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAlertFinish} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton  className='bg-warning text-white'>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        {
          sessionStorage.getItem('ButtonStatus') === 'Start' ? (
            <Modal.Body className='text-dark'>
              Do you want to complete {sessionStorage.getItem('Day_no')}? Once you click 'yes,' you cannot resubmit.
            </Modal.Body>
          ) : (
            <Modal.Body className='text-dark'>
              To see the report, click Yes.
            </Modal.Body>
          )
        }
        <Modal.Footer>
          <Button variant="outline-success" >
            Yes
          </Button>
          <Button variant="outline-danger" onClick={handleCloseAlert}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="text-center">
                    <div className="blaster">
                        <h5>Congratulations!</h5>
                        <h2>You did it!</h2>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  );
};

export default SQLEditor;
