import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarLoader, SyncLoader } from 'react-spinners';
import { Modal, Button } from 'react-bootstrap';
import './PyEditor.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLessThan, faGreaterThan, } from '@fortawesome/free-solid-svg-icons';
import HeaderEditor from './HeaderEditor';
import { useNavigate } from 'react-router-dom';

import sk from 'skulpt';


const NextQuestionPage = () => {
  const inputHandlerRef = useRef(null); // Store the input handler reference
  const [pythonCode, setPythonCode] = useState('');
  const [output, setOutput] = useState('');
  const [response, setResponse] = useState(null);
  const [responseTestCase, setResponseTestCase] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [executingQuery, setExecutingQuery] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false); 
  // const [splitOffset, setSplitOffset] = useState(1000);
  const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);

  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);


  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); // in percentage (vh)
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)
  
  const navigate = useNavigate();
  const [submissionAttempts, setSubmissionAttempts] = useState({});
  const [Qn_name, setQn_name] = useState();
  const [Ans, setAns] = useState();
  const [submissionAttempts1, setSubmissionAttempts1] = useState({});
  const [pyRun, setPyRun] = useState(false);
  
  const [question, setQuestion] = useState([]);
  const [tables, setTables] = useState([]);
  const [activeTab, setActiveTab] = useState('tables');
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
  const [example, setExample] = useState();
  const [functionCall, setFunctionCall] = useState('');
  const [template, setTemplate] = useState('# Write your Python code here...');
  const [nextQuestion, setnextQuestion] = useState(false);


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


  const handleVerticalMouseDown = (e) => {
    setIsDraggingVertically(true);
    setInitialY(e.clientY);
  };
  
  const handleVerticalMouseMove = (e) => {
    if (!isDraggingVertically || !initialY) return;
  
    const dy = e.clientY - initialY;
    const vhUnitChange = (dy / window.innerHeight) * 100; // Convert px to vh
  
    setEditorHeightPercentage((prevHeight) => {
      const newHeight = Math.max(30, Math.min(70, prevHeight + vhUnitChange)); // Ensure between 30% and 70%
      setOutputHeightPercentage(94 - newHeight); // Adjust the output height to complement the editor height
      return newHeight;
    });
  
    setInitialY(e.clientY);
  };
  
  const handleVerticalMouseUp = () => {
    setIsDraggingVertically(false);
    setInitialY(null);
  };
  
  // Add event listeners for vertical dragging
  useEffect(() => {
    window.addEventListener('mousemove', handleVerticalMouseMove);
    window.addEventListener('mouseup', handleVerticalMouseUp);
  
    return () => {
      window.removeEventListener('mousemove', handleVerticalMouseMove);
      window.removeEventListener('mouseup', handleVerticalMouseUp);
    };
  }, [isDraggingVertically, initialY]);
  

  
  useEffect(() => {
    const fetchData = async () => {
      const bodyData = 
        {
            StudentId: sessionStorage.getItem('StudentId'),
            Day_no: sessionStorage.getItem('SelectedDay'),
            Subject: sessionStorage.getItem('course'),
            Qn: sessionStorage.getItem('Qn_name') 
        }
        // //console.log("bodyData", bodyData)
      try {
        const response = await fetch("https://surgebackend.azurewebsites.net/nextqn/", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyData)
            }
        );
        const responseNext = await response.json();
        // setData(responseNext)
        // //console.log("responseNext", responseNext)
        setQuestion(responseNext.NextQuestion.Qn);
        // //console.log("YYYYYYY :",responseNext.NextQuestion.Qn)
        setQn_name(responseNext.NextQuestion.Qn_name)
        setAns(responseNext.NextQuestion.Ans)
        setTables(responseNext.NextQuestion.Tables);
        // //console.log("Tables", responseNext.NextQuestion.Tables)
        setExpectedOutput(responseNext.NextQuestion.ExpectedOutput);
        setTestCase(responseNext.NextQuestion.TestCases)
        setQuestionName(responseNext.NextQuestion.Qn)
        setExample(responseNext.NextQuestion.NextQuestion.Examples)
        // //console.log("Cap", responseNext.NextQuestion.Examples)
        setFunctionCall(responseNext.NextQuestion.FunctionCall)
        setTemplate(responseNext.NextQuestion.Template || '# Write your Python code here...')
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect( () => {
    setPythonCode(template+'\n'+functionCall)
  }, [functionCall, template]);
  

  
  const handleCloseAlert = () => {
    setShowAlert(false);
  };





useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/skulpt@1.1.0/dist/skulpt.min.js";
    script.async = true;
    script.onload = () => {
      const builtinScript = document.createElement('script');
      builtinScript.src = "https://cdn.jsdelivr.net/npm/skulpt@1.1.0/dist/skulpt-stdlib.js";
      builtinScript.async = true;
      document.body.appendChild(builtinScript);
    };
    document.body.appendChild(script);
  }, []);


  // const handleRunPython = () => {
  //   setPyRun(true);
  
  //   if (submissionAttempts1[questionIndex] >= 3) {
  //     setShowAlert(true);
  //     return;
  //   }

  //   setOutput('');
  
  //   function builtinRead(x) {
  //     if (sk.builtinFiles === undefined || sk.builtinFiles["files"][x] === undefined) {
  //       throw "File not found: '" + x + "'";
  //     }
  //     return sk.builtinFiles["files"][x];
  //   }
  
  //   sk.TurtleGraphics = sk.TurtleGraphics || {};
  //   sk.TurtleGraphics.target = 'output';
  //   sk.pre = 'output';
  
  //   sk.configure({
  //     output: (text) => setOutput((prevOutput) => prevOutput + text),
  //     read: builtinRead,
  //     inputfun: (prompt) => {
  //       return new Promise((resolve) => {
  //         const input = promptInput(prompt);
  //         resolve(input);
  //       });
  //     },
  //   });
  
  //   const myPromise = sk.misceval.asyncToPromise(() => {
  //     return sk.importMainWithBody('<stdin>', false, pythonCode, true);
  //   });
  
  //   myPromise.then(
  //     () => //console.log('success'),
  //     (err) => {
  //       console.error('Error executing Python code:', err);
  //       setOutput((prevOutput) => prevOutput + err.toString());
  //     }
  //   ).catch(err => {
  //     console.error('Promise rejection error:', err);
  //   });
  // };


  const handleRunPython = () => {
    setRunResponseTestCases('')
      setPyRun(true);
      setExecutingQuery(true);
      if (submissionAttempts1[questionIndex] >= 3) {
        setShowAlert(true);
        return;
      }
  
      setOutput('');
  
      function builtinRead(x) {
        if (sk.builtinFiles === undefined || sk.builtinFiles["files"][x] === undefined) {
          throw "File not found: '" + x + "'";
        }
        return sk.builtinFiles["files"][x];
      }
  
      sk.TurtleGraphics = sk.TurtleGraphics || {};
      sk.TurtleGraphics.target = 'output';
      sk.pre = 'output';
  
      sk.configure({
        output: (text) => setOutput((prevOutput) => prevOutput + text),
        read: builtinRead,
        inputfun: (prompt) => {
          return new Promise((resolve) => {
            const input = promptInput(prompt);
            resolve(input);
          });
        },
      });
  
      const myPromise = sk.misceval.asyncToPromise(() => {
        // return sk.importMainWithBody('<stdin>', false, pythonCode + '\n'+functionCall || Ans + '\n'+functionCall, true);
        return sk.importMainWithBody('<stdin>', false, pythonCode + '\n'+functionCall , true);

      });
  
      myPromise.then(
        // () => //console.log('success'),
        (err) => {
          console.error('Error executing Python code:', err);
          setOutput((prevOutput) => prevOutput + err.toString());
        }
      ).catch(err => {
        console.error('Promise rejection error:', err);
      });
      setExecutingQuery(false);

  };
  

  
  

  const promptInput = (prompt) => {
    return new Promise((resolve) => {
      const outputElement = document.getElementById('output');
      if (!outputElement) {
        console.error("Output element with ID 'output' not found");
        return;
      }
      
      setOutput((prevOutput) => prevOutput + prompt);
      outputElement.focus();

      let inputBuffer = '';

      const inputHandler = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const inputValue = inputBuffer.trim();
          setOutput((prevOutput) => prevOutput + '\n');
          outputElement.removeEventListener('keydown', inputHandlerRef.current); // Remove current event listener
          resolve(inputValue);
        } else if (event.key.length === 1) {
          inputBuffer += event.key;
          setOutput((prevOutput) => prevOutput + event.key);
        } else if (event.key === 'Backspace') {
          inputBuffer = inputBuffer.slice(0, -1);
          setOutput((prevOutput) => prevOutput.slice(0, -1));
        }
      };

      // Remove previous listener if exists
      if (inputHandlerRef.current) {
        outputElement.removeEventListener('keydown', inputHandlerRef.current);
      }

      // Store the new input handler in the reference
      inputHandlerRef.current = inputHandler;

      // Add the new input handler
      outputElement.addEventListener('keydown', inputHandler);
    });
  };


  const handleCheckCode = async () => {
    setClickCount(prevCount => prevCount + 1);
    setActiveTab('output');
    // //console.log("IronMan", clickCount + 1);
  
    try {
      setActiveTab('output');
      const postData = {
        Code: pythonCode,
        Result: output.trimEnd(),
        CallFunction: functionCall,
        TestCases:testCase
    }
    // //console.log("IPhone", postData)
    const url = 'https://surgebackend.azurewebsites.net/runpy/';
    setResponse(null);
    setExecutingQuery(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
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
    // //console.log("$%$%$%$%$%",responseData.Time)
    setExecutingQuery(false);
    const resultField = responseData.TestCases.find(testCase => testCase.Result !== undefined);
    if (resultField) {
      if (resultField.Result === "True") {
        // //console.log("Batman");
        setSuccessMessage('Congratulations!');
        setAdditionalMessage('You have passed the test cases. Click the submit code button.');
      } else if (resultField.Result === "False") {
        setSuccessMessage('Wrong Answer');
        setAdditionalMessage('You have not passed the test cases');
      }
    }
    } catch (error) {
      console.error('Error executing SQL query:', error);
      setResponse(null);
      setExecutingQuery(false);
    }
  };


  const handleSubmit = async () => {
    setnextQuestion(true);
    setShow(true)
    // //console.log("first")
    setActiveTab('output');
      if (submissionAttempts[questionIndex] >= 1) {
      setShowAlert(true);
      return;
    }
  
    try {
      const updatedSqlQuery = pythonCode;
      const sendData = {
        StudentId: sessionStorage.getItem('StudentId'),
        Day_no: sessionStorage.getItem('SelectedDay'),
        Subject: sessionStorage.getItem('course'),
        Qn: Qn_name,
        Ans:updatedSqlQuery,
        Result: runResponseTestCases,
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
        // navigate('/QuestionPage')
  

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


const handleNext = () => { 
  navigate('./NextQuestionPage')
 }
  
  
  const remainingSubmissionsMessage = `You have ${3 - submissionAttempts[questionIndex]} submission's left`;
  const alertMessage = "You have reached your limit.";

  const remainingRunMessage = `You have ${3 - submissionAttempts1[questionIndex]} run's left`;

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
        <div className="row" style={{height: '50vh', maxHeight:'100'}}>
          <div className="container" >
          <HeaderEditor/>


            <div className='row body mt-5 pt-2 pb-3' style={{backgroundColor:'#9ECEDA', overflow:'hidden', maxHeight: '92.5vh'}}>
              <div className='qns'>
              </div>
              <div className="InputQuery  col-md-4 mx-1 " style={{ height: '100vh', overflowY: 'auto',width: splitOffset, minWidth: '20%', maxWidth: '70%' }}>
                  <div className='col result' >
                    <div className='row'>
                      <div style={{ width: '100%', height: '100vh',backgroundColor:'#F5FAFB', color:'black' }}>
                          <h6 className='mb-4'>{questionName}</h6>
                          {data.Examples.map((item, index) => (
                              <div className='p-2 mb-3  ' key={index} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'#ffffffa6', fontSize:'12px' }}>
                                  <div><span className='fw-bold'>Inputs:</span> <br/><span className='ps-5'>{item.Example.Inputs.join(', ')}</span></div>
                                  <div><span className='fw-bold'>Output:</span> <br/><span className='ps-5'>{item.Example.Output}</span></div>
                                  <div><span className='fw-bold'>Explanation:</span> <span className=''>{item.Example.Explanation}</span></div>
                              </div>
                          ))}   
                      </div>
                    </div>
                  </div>
              </div>
              <div className='curserDivPy' onMouseDown={handleMouseDown}></div>
              <div className="OutputDatabaseTables col mx-1 mb-3" style={{ height: '94vh', overflow: 'hidden', width: splitOffset }}>
                <div className="col" style={{ height: '100%' }}>
                  <div className="row top" style={{ height: `${editorHeightPercentage}vh`, overflow: 'auto' }}>
                    <AceEditor
                      mode="python"
                      theme="dreamweaver"
                      value={pythonCode}
                      onChange={(newCode) => setPythonCode(newCode)}
                      placeholder="Write your Python code here..."
                      fontSize={16}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      wrapEnabled={true}
                      className="pe-3"
                      style={{ width: '100%', height: '100%' }} 
                    />
                  </div>
                  <div className="Move" style={{ cursor: 'row-resize', height: '80px', backgroundColor: '#9ECEDA', paddingTop:'10px' }} onMouseDown={handleVerticalMouseDown}>
                  <div className='col d-flex justify-content-end align-items-center'>
                    <div className='col pt-1 d-flex justify-content-start align-items-center text-wrap'>
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
                      <button
                        className="btn btn-dark btn-sm mx-2" onClick={() => { handleRunPython(false); setShowAlert(false); }} style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                      >
                        RUN CODE
                      </button>
                      <button
                        className="btn btn-dark btn-sm mx-2" onClick={() => { handleCheckCode(false); setShowAlert(false); }} style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                      >
                        Check Test Cases
                      </button>
                      <button className="btn btn-dark btn-sm" onClick={handleSubmit}  style={{ backgroundColor: '#EEEBAD', color: '#000000' }}>
                        SUBMIT CODE
                      </button>
                      {nextQuestion && (
                        <button className="btn btn-dark btn-sm" onClick={handleNext}  style={{ backgroundColor: '##c0eead', color: '#000000' }}>
                        Next
                      </button>
                      )}
                    </div>
                  </div>
                  <div className="row down" style={{ height: `${outputHeightPercentage}vh`, overflow: 'auto' }}>
                  <div className='' style={{backgroundColor:"#F5FAFB"}}>
                      <textarea
                          style={{ width: '100%', height: '30%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
                          id="output"
                          value={output}
                          readOnly
                        />
                        <div className="pt-3" style={{   width: '100%',   height: '30.5vh',   backgroundColor: '#F5FAFB',   color: 'black',   borderColor: 'white', }}>
                          {runResponseTestCases && (
                            <div className="col">
                              {runResponseTestCases.map((testCase, index) => (
                                <p key={index}>
                                  {Object.entries(testCase).map(([key, value], i) => {
                                    let textColor = value === 'Passed' ? 'text-primary' : value === 'Failed' ? 'text-danger' : 'text-dark';
                                    return (
                                      <span
                                        key={i}
                                        className="border-2 rounded-3 p-2 px-3 my-5"
                                        style={{ backgroundColor: '#FFFFFF', fontSize: '12px' }}
                                      >
                                        {key}: <span className={textColor}>{value}</span>
                                      </span>
                                    );
                                  })}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
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
    </div>
  );
};

export default NextQuestionPage;