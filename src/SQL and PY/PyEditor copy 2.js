import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaAngleDoubleRight, FaCheckDouble } from 'react-icons/fa';
import { BarLoader, SyncLoader , BeatLoader} from 'react-spinners';
import { Modal, Button, Spinner } from 'react-bootstrap';
import './PyEditor.css'
import HeaderEditor from './HeaderEditor';
import { useNavigate } from 'react-router-dom';
import logo from '../Img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faBell, faHome,faBug, faSignOut, faGreaterThan, faLessThan, faRectangleXmark,faTicket  } from '@fortawesome/free-solid-svg-icons';
import { RiCustomerService2Fill } from "react-icons/ri";
import { Dropdown } from 'react-bootstrap';
import './Header.css';
import CryptoJS from 'crypto-js';
import Sk from 'skulpt';
import html2canvas from 'html2canvas';
import axios from 'axios';
import SessionTimeout from '../SessionTimeout';
const PyEditor = () => {
  const inputHandlerRef = useRef(null); 
  const [pythonCode, setPythonCode] = useState('');
  const [output, setOutput] = useState('');
  const [inputQueue, setInputQueue] = useState([]); 
  const [sqlQuery, setSqlQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [responseTestCase, setResponseTestCase] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [executingQuery, setExecutingQuery] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false); 
  const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);

  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);


  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); 
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); 
  
  const navigate = useNavigate();
  const [questionHistory, setQuestionHistory] = useState([]);
  const [viewedQuestions, setViewedQuestions] = useState([0]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const questionButtonsContainerRef = useRef(null);
  const [showExpectedOutput, setShowExpectedOutput] = useState(false);
  const [submissionAttempts, setSubmissionAttempts] = useState({});
  const [ConceptID, setConceptID] = useState();
  const [Qn_name, setQn_name] = useState();
  const [Ans, setAns] = useState();
  const [submissionAttempts1, setSubmissionAttempts1] = useState({});
  const [pyRun, setPyRun] = useState(false);
  
  const [question, setQuestion] = useState([]);
  const [tables, setTables] = useState([]);
  const [showAlertFinish, setShowAlertFinish] = useState(false);
  const [activeTab, setActiveTab] = useState('tables');
  const [selectedTableName, setSelectedTableName] = useState('');
  const [TestCases, setTestCases] = useState(false);
  const [runResponse, setRunResponse] = useState();
  const [testCasesResult, settestCasesResult] = useState();
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
  const [qnNumber, setQnNumber] = useState('');
  const [example, setExample] = useState();
  const [functionCall, setFunctionCall] = useState('');
  const [template, setTemplate] = useState('# Write your Python code here...');
  const [nextBtn, setNextBtn] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false); 
  const [qn_Number, setQn_Number] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPicture, setuserPicture] = useState('');
  const [StudentId, setStudentId] = useState('');
  const [day, setDay] = useState();
  const [course, setCourse] = useState();
  const [userAns, setUserAns] = useState('');
  const [userSubmited, setUserSubmited] = useState('');
  const [showBugReport, setShowBugReport] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [bugDesc, setBugDesc] = useState('');
  const [issueType, setIssueType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const issueTypes = [
    'UI related topics',
    'Functionality related topics',
    'Performance related topics',
    'Security Vulnerability related topics',
    'Other related topics',
    'Require Tutor Assistance'
];
const [ticketRaised, setTicketRaised] = useState(false)
const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
const [showConfirmModal, setShowConfirmModal] = useState(false);
const [showOutput, setShowOutput] = useState(false);
const outputRef = useRef(null);
const [responseAttempt, setResponseAttempt] = useState(0);
const [isRunClicked, setIsRunClicked] = useState(false);
const [isCheckClicked, setIsCheckClicked] = useState(false);
  const secretKey = 'gvhbfijsadfkefjnujrbghj';


  const encryptedPicture = sessionStorage.getItem('Picture');
  const decryptedPicture = CryptoJS.AES.decrypt(encryptedPicture, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedcourse = sessionStorage.getItem('course');
  const decryptedcourse = CryptoJS.AES.decrypt(encryptedcourse, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedStudentId = sessionStorage.getItem('StudentId');
  const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedEmail = sessionStorage.getItem('Email');
  const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedName = sessionStorage.getItem('Name');
  const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);
  const encryptedQnName = sessionStorage.getItem('QnName');
  const decryptedQnName = CryptoJS.AES.decrypt(encryptedQnName, secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedSelectedDay = sessionStorage.getItem('SelectedDay');// Decrypt the data
    const decryptedSelectedDay = CryptoJS.AES.decrypt(encryptedSelectedDay, secretKey).toString(CryptoJS.enc.Utf8);
  useEffect(() => {

  
    // Retrieve values from sessionStorage
    const storedQn_Number = sessionStorage.getItem('Qn_Number');
    const storedName = decryptedName;
    const storedEmail = decryptedEmail;
    const storedPicture = decryptedPicture;
    const storedStudentId = decryptedStudentId;
    const storedDay = decryptedSelectedDay;
    const storedCourse = decryptedcourse;
  
    if (storedName && storedPicture && storedEmail && storedStudentId && storedDay && storedQn_Number && storedCourse) {
      setUserName(storedName);
      setuserEmail(storedEmail);
      setuserPicture(storedPicture);
      setStudentId(storedStudentId);
      setDay(storedDay);
      setQn_Number(storedQn_Number);
      setCourse(storedCourse);
    }
  },[]);
  

  const handleHome = () => {
    navigate('/CoursePage');
  }
  const handleIndex = () => {
    navigate('/IndexPage');

  }

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
    const vhUnitChange = (dy / window.innerHeight) * 100; 
  
    setEditorHeightPercentage((prevHeight) => {
      const newHeight = Math.max(30, Math.min(70, prevHeight + vhUnitChange));
      setOutputHeightPercentage(94 - newHeight); 
      return newHeight;
    });
  
    setInitialY(e.clientY);
  };
  
  const handleVerticalMouseUp = () => {
    setIsDraggingVertically(false);
    setInitialY(null);
  };
  
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
          StudentId: decryptedStudentId,
          Course: decryptedcourse,
          Day: decryptedSelectedDay,
          Qn_name: decryptedQnName
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
        // setIsCheckClicked(false); 
        const data = await response.json();
        setData(data)
        // //console.log("data", data)
        setQuestion(data.Question);
        // //console.log("YYYYYYY :",data.Question)
        setQn_name(data.Question.Qn_name)
        setAns(data.Question.Ans)
        // setTables(data.Tables);
        // //console.log("Tables", data.Tables)
        setExpectedOutput(data.Question.ExpectedOutput);
        setTestCase(data.Question.TestCases)
        setQuestionName(data.Question.Qn)
        setQnNumber(data.Question.Qn_No)
        setExample(data.Question.Examples)
        // //console.log("Cap", data.Question.Examples)
        setFunctionCall(data.Question.FunctionCall)
        setUserAns(data.Question.UserAns || '')
        setUserSubmited(data.Question.UserSubmited);
        setTemplate(data.Question.Template || '# Write your Python code here...')
        setLoading(false);
        setIsCheckClicked(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (userAns) {
      setPythonCode(userAns);
    } else {
      setPythonCode(template + '\n' + functionCall);
    }
  }, [userAns, template, functionCall]);
  

  const handleNext = () => {
    setIsCheckClicked(false);
    setIsRunClicked(false);
    setClickCount(0) 
    const nextQnNumber = Number(sessionStorage.getItem('Qn_Number')) + 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    setNextBtn(false)
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    setRunResponseTestCases('')
    setIsNextClicked(false);
    setSuccessMessage('');  
    setAdditionalMessage('')
    setPythonCode(template + '\n' + functionCall);
    // //console.log("Execute fetchNextData");

    const fetchNextData = async () => {
      const postData = {
        StudentId: decryptedStudentId,
        Day_no: decryptedSelectedDay,
        Subject: decryptedcourse,
        Qn: Qn_name,
        NextQn:"N",
      };
    // //console.log("IPhone", postData);

    try {
      const response = await fetch("https://surgebackend.azurewebsites.net/nav/qn/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      setData(data)
      // //console.log("data", data)
      setQuestion(data.Question);
      // //console.log("YYYYYYY :",data.Question)
      setQn_name(data.Question.Qn_name)
      setAns(data.Question.Ans)
      // setTables(data.Tables);
      // //console.log("Tables", data.Tables)
      setExpectedOutput(data.Question.ExpectedOutput);
      setTestCase(data.Question.TestCases)
      setQuestionName(data.Question.Qn)
      // setQn_Number(data.Question.Qn_number)
      setQnNumber(data.Question.Qn_No)
      setExample(data.Question.Examples)
      // //console.log("Cap", data.Question.Examples) 
      setFunctionCall(data.Question.FunctionCall)
      setUserAns(data.Question.UserAns || '')
      setUserSubmited(data.Question.UserSubmited);
      setTemplate(data.Question.Template || '# Write your Python code here...')
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      setLoading(false);
    } catch (error) {
      console.error('Error executing SQL query:', error);
      navigate('/QuestionPage')
    }
  };

  fetchNextData();

  };


  const handlePrevious = () => {
    setIsRunClicked(false);
    setIsCheckClicked(false);
    setClickCount(0)
    const nextQnNumber = Number(sessionStorage.getItem('Qn_Number')) - 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    setNextBtn(false)
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    setRunResponseTestCases('')
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('')
    // //console.log("Execute fetchNextData");

    const fetchNextData = async () => {
      const postData = {
        StudentId: decryptedStudentId,
        Day_no: decryptedSelectedDay,
        Subject: decryptedcourse,
        Qn: Qn_name ,
        NextQn:"P",
      };
    // //console.log("IPhone", postData);

    try {
      const response = await fetch("https://surgebackend.azurewebsites.net/nav/qn/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      setData(data)
      // //console.log("data", data)
      setQuestion(data.Question);
      // //console.log("YYYYYYY :",data.Question)
      setQn_name(data.Question.Qn_name)
      setAns(data.Question.Ans)
      // setTables(data.Tables);
      // //console.log("Tables", data.Tables)
      setExpectedOutput(data.Question.ExpectedOutput);
      setTestCase(data.Question.TestCases)
      setQuestionName(data.Question.Qn)
      setQnNumber(data.Question.Qn_No)
      setExample(data.Question.Examples)
      // //console.log("Cap", data.Question.Examples)
      setFunctionCall(data.Question.FunctionCall)
      setUserAns(data.Question.UserAns || '')
      setUserSubmited(data.Question.UserSubmited);
      setTemplate(data.Question.Template || '# Write your Python code here...')
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      setLoading(false);
    } catch (error) {
      console.error('Error executing SQL query:', error);
      navigate('/QuestionPage')
    }
  };

  fetchNextData();

  };
  
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



  const handleRunPython = () => {
    setShowOutput(true);
    setRunResponseTestCases('');
    setPyRun(true);
    setExecutingQuery(true);
    if (submissionAttempts1[questionIndex] >= 3) {
      setShowAlert(true);
      return;
    }

    setOutput('');

    function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw "File not found: '" + x + "'";
      }
      return Sk.builtinFiles["files"][x];
    }

    Sk.TurtleGraphics = Sk.TurtleGraphics || {};
    Sk.TurtleGraphics.target = 'output';
    Sk.pre = 'output';

    Sk.configure({
      output: (text) => setOutput((prevOutput) => prevOutput + text),
      read: builtinRead,
      inputfun: (prompt) => {
        return new Promise((resolve) => {
          const input = promptInput(prompt);
          resolve(input);
        });
      },
    });

    const myPromise = Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
    });

    myPromise
      .then(
        // () => //console.log('success'),
        (err) => {
          console.error('Error executing Python code:', err);
          // setOutput((prevOutput) => prevOutput + err.toString());
        }
      )
      .catch((err) => {
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
          outputElement.removeEventListener('keydown', inputHandlerRef.current); 
          resolve(inputValue);
        } else if (event.key.length === 1) {
          inputBuffer += event.key;
          setOutput((prevOutput) => prevOutput + event.key);
        } else if (event.key === 'Backspace') {
          inputBuffer = inputBuffer.slice(0, -1);
          setOutput((prevOutput) => prevOutput.slice(0, -1));
        }
      };

      if (inputHandlerRef.current) {
        outputElement.removeEventListener('keydown', inputHandlerRef.current);
      }

      inputHandlerRef.current = inputHandler;

      outputElement.addEventListener('keydown', inputHandler);
    });
  };


//   const handleCheckCode = async () => {
//     setShowOutput(true);
//     setRunResponseTestCases('');
//     setPyRun(true);
//     setExecutingQuery(true);
  
//     if (submissionAttempts1[questionIndex] >= 3) {
//       setShowAlert(true);
//       return;
//     }
  
//     setOutput('');
  
//     function builtinRead(x) {
//       if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
//         throw "File not found: '" + x + "'";
//       }
//       return Sk.builtinFiles["files"][x];
//     }
  
//     Sk.TurtleGraphics = Sk.TurtleGraphics || {};
//     Sk.TurtleGraphics.target = 'output';
//     Sk.pre = 'output';
  
//     Sk.configure({
//       output: (text) => {
//         const cleanedText = text.replace("<module '__main__' from '<stdin>.py'>", "");
//         setOutput((prevOutput) => prevOutput + cleanedText);
//       },
//       read: builtinRead,
//       inputfun: (prompt) => {
//         return new Promise((resolve) => {
//           const outputElement = document.getElementById('output');
//           if (!outputElement) {
//             console.error("Output element with ID 'output' not found");
//             return;
//           }
  
//           setOutput((prevOutput) => prevOutput + prompt);
//           outputElement.focus();
  
//           let inputBuffer = '';
  
//           const inputHandler = (event) => {
//             if (event.key === 'Enter') {
//               event.preventDefault();
//               const inputValue = inputBuffer.trim();
//               setOutput((prevOutput) => prevOutput + '\n');
//               outputElement.removeEventListener('keydown', inputHandlerRef.current);
//               resolve(inputValue);
//             } else if (event.key.length === 1) {
//               inputBuffer += event.key;
//               setOutput((prevOutput) => prevOutput + event.key);
//             } else if (event.key === 'Backspace') {
//               inputBuffer = inputBuffer.slice(0, -1);
//               setOutput((prevOutput) => prevOutput.slice(0, -1));
//             }
//           };
  
//           if (inputHandlerRef.current) {
//             outputElement.removeEventListener('keydown', inputHandlerRef.current);
//           }
  
//           inputHandlerRef.current = inputHandler;
//           outputElement.addEventListener('keydown', inputHandler);
//         });
//       },
//     });
  
//     const myPromise = Sk.misceval.asyncToPromise(() => {
//       return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
//     });
  
//     myPromise
//       .then(
//         (err) => {
//           console.error('Error executing Python code:', err);
//         }
//       )
//       .catch((err) => {
//         console.error('Promise rejection error:', err);
//       });
  
//     setExecutingQuery(false);
//     setClickCount((prevCount) => prevCount + 1);
//     setActiveTab("output");
  
//     try {
//       setExecutingQuery(true);
  
//       const postData = {
//         studentId: decryptedStudentId,
//         Day_no: decryptedSelectedDay,
//         Subject: decryptedcourse,
//         Qn: question.Qn_name,
//         Code: pythonCode,
//         Result: output.trimEnd(),
//         CallFunction: "",
//         TestCases: testCase,
//         Attempt: clickCount,
//       };
  
//       const url = "https://surgebackend.azurewebsites.net/runpy12/";
//       setResponse(null);
  
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(postData),
//       });
  
//       const responseData = await response.json();
//       setRunResponse(responseData);
//       setRunResponseTable(responseData.data);
//       setRunResponseTestCases(responseData.TestCases);
//       setRunResponseExecutionTime(responseData.Time);
//       setResponseAttempt(responseData.Attempt);
//       setIsCheckClicked(true);
//       const firstTestCase = responseData.TestCases[0] ; 
//       // //console.log("First Test Case:",responseData.TestCases[0] );
  
//       // Ignore TestCase1 and Result property
//       // const filteredTestCases = (responseData.TestCases || []).slice(1).map(({ Result, ...rest }) => rest);
//       // //console.log("Filtered Test Cases:", filteredTestCases);
  
//       // Iterate over the filtered test cases and log Code and Output
//       // filteredTestCases.forEach(testCase => {
//       //   Object.entries(testCase).forEach(([key, { Code, Output }]) => {
//       //     //console.log("Test Case:", key);
//       //     //console.log("Code:", Code);
//       //     //console.log("Output:", Output);
//       //   });
//       // });
  
//       const filteredTestCases = (responseData.TestCases || []).slice(1).map(({ Result, ...rest }) => rest);
//     //console.log("Filtered Test Cases:", filteredTestCases);
//       // Ensure the Result field is included in each test case and all test cases are processed
//       const updatedTestCases = await Promise.all(
//         filteredTestCases.map(async (testCase) => {
//           try {
//             const testCaseKey = Object.keys(testCase)[0]; // Get the key of the first test case
//             const { Code, Output } = testCase[testCaseKey];
      
//             // //console.log("TestCase:", testCase);
//             // //console.log("Code:", Code);
//             // //console.log("Output:", Output);
      
//             if (!Code) {
//               console.error("Test case has an undefined 'Code' property.");
//               return { ...testCase, Result: "Error: Code is undefined" }; // Include Result if Code is undefined
//             }
      
//             let testCaseOutput = "";
//             Sk.configure({
//               output: (text) => {
//                 testCaseOutput += text.replace("<module '__main__' from '<stdin>.py'>", "");
//               },
//               read: builtinRead,
//             });
      
//             const executePython = async () => {
//               try {
//                 await Sk.misceval.asyncToPromise(() =>
//                   Sk.importMainWithBody("<stdin>", false, Code, true)
//                 );
//                 return testCaseOutput.trim();
//               } catch (err) {
//                 console.error("Error executing Python code for TestCaseId:", testCase.TestCaseId, err);
//                 return err.toString();
//               }
//             };
      
//             const actualOutput = await executePython();
//             // //console.log("Actual Output:", actualOutput);
//             // //console.log("Expected Output:", Output);
//             // //console.log("Result:", actualOutput === Output ? "Passed" : "Failed");
//             testCase.Result = actualOutput === Output ? "Passed" : "Failed"; // Include Result after execution
//             return testCase;
//           } catch (error) {
//             console.error("Unexpected error while processing test case:", testCase, error);
//             return { ...testCase, Result: "Error: Unexpected error occurred" }; // Include Result for unexpected errors
//           }
//         })
//       );
      
//       // Now `updatedTestCases` will contain the test cases with their respective Result values (including the last one).
//       // //console.log("Updated Test Cases:", updatedTestCases);
    
      
  
      
//       const formattedTestCases = updatedTestCases.map((testCase, index) => {
//         return { [`TestCase${index + 2}`]: testCase.Result }; // Start from TestCase2
//       });
      
//       // Combine the first test case with formatted test cases
//       const newTestCases = [firstTestCase, ...formattedTestCases];
//       // //console.log("New Test Cases:", newTestCases);

// const otherTestCases = newTestCases.slice(0, -1).map(({ Result, ...rest }) => rest);

// // const resultTestCase = { Result: 'True' };


// // //console.log(formattedTestCases);  
// // //console.log("lastetestcase", otherTestCases);  


// // //console.log("Updated Test Cases:", updatedTestCases12);

// const allPassed = otherTestCases.every((testCase) => {
//   return Object.values(testCase)[0] === 'Passed';
// });
// const resultTestCase = { Result: allPassed ? "True" : "False" };
// const updatedTestCases12 = [...otherTestCases,  resultTestCase];
// // //console.log("Updated Test Cases:", updatedTestCases12);
// setRunResponseTestCases(updatedTestCases12);


// // //console.log("All Passed:", allPassed);  // Logs true or false based on whether all test cases are 'Passed'

//       if (allPassed) {
        
//         setSuccessMessage("Congratulations!");
//         setAdditionalMessage("You have passed all the test cases. Click the submit code button.");
//       } else {
//         setSuccessMessage("Wrong Answer");
//         setAdditionalMessage("You have not passed all the test cases.");
//       }
//     } catch (error) {
//       console.error("Error executing the code:", error);
//       setResponse(null);
//     } finally {
//       setExecutingQuery(false);
//     }
//   };
  
// const handleCheckCode = async () => {
//   setShowOutput(true);
//   setRunResponseTestCases('');
//   setPyRun(true);
//   setExecutingQuery(true);

//   if (submissionAttempts1[questionIndex] >= 3) {
//     setShowAlert(true);
//     return;
//   }

//   setOutput('');

//   function builtinRead(x) {
//     if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
//       throw "File not found: '" + x + "'";
//     }
//     return Sk.builtinFiles["files"][x];
//   }

//   Sk.TurtleGraphics = Sk.TurtleGraphics || {};
//   Sk.TurtleGraphics.target = 'output';
//   Sk.pre = 'output';

//   Sk.configure({
//     output: (text) => {
//       const cleanedText = text.replace("<module '__main__' from '<stdin>.py'>", "");
//       setOutput((prevOutput) => prevOutput + cleanedText);
//     },
//     read: builtinRead,
//     inputfun: (prompt) => {
//       return new Promise((resolve) => {
//         const outputElement = document.getElementById('output');
//         if (!outputElement) {
//           console.error("Output element with ID 'output' not found");
//           return;
//         }

//         setOutput((prevOutput) => prevOutput + prompt);
//         outputElement.focus();

//         let inputBuffer = '';

//         const inputHandler = (event) => {
//           if (event.key === 'Enter') {
//             event.preventDefault();
//             const inputValue = inputBuffer.trim();
//             setOutput((prevOutput) => prevOutput + '\n');
//             outputElement.removeEventListener('keydown', inputHandlerRef.current);
//             resolve(inputValue);
//           } else if (event.key.length === 1) {
//             inputBuffer += event.key;
//             setOutput((prevOutput) => prevOutput + event.key);
//           } else if (event.key === 'Backspace') {
//             inputBuffer = inputBuffer.slice(0, -1);
//             setOutput((prevOutput) => prevOutput.slice(0, -1));
//           }
//         };

//         if (inputHandlerRef.current) {
//           outputElement.removeEventListener('keydown', inputHandlerRef.current);
//         }

//         inputHandlerRef.current = inputHandler;
//         outputElement.addEventListener('keydown', inputHandler);
//       });
//     },
//   });

//   const startTime = performance.now(); // Start time for measuring execution
//   const myPromise = Sk.misceval.asyncToPromise(() => {
//     return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
//   });

//   myPromise
//     .then(
//       (err) => {
//         console.error('Error executing Python code:', err);
//       }
//     )
//     .catch((err) => {
//       console.error('Promise rejection error:', err);
//     })
//     .finally(() => {
//       const endTime = performance.now(); // End time for measuring execution
//       const executionTime = endTime - startTime;
//       //console.log(`Time Complexity (Execution Time): ${executionTime.toFixed(2)} ms`);
//     });

//   setExecutingQuery(false);
//   setClickCount((prevCount) => prevCount + 1);
//   setActiveTab("output");

//   try {
//     setExecutingQuery(true);

//     const postData = {
//       studentId: decryptedStudentId,
//       Day_no: decryptedSelectedDay,
//       Subject: decryptedcourse,
//       Qn: question.Qn_name,
//       Code: pythonCode,
//       Result: output.trimEnd(),
//       CallFunction: "",
//       TestCases: testCase,
//       Attempt: clickCount,
//     };

//     const url = "https://surgebackend.azurewebsites.net/runpy12/";
//     setResponse(null);

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(postData),
//     });

//     const responseData = await response.json();
//     setRunResponse(responseData);
//     setRunResponseTable(responseData.data);
//     setRunResponseTestCases(responseData.TestCases);
//     setRunResponseExecutionTime(responseData.Time);
//     setResponseAttempt(responseData.Attempt);
//     setIsCheckClicked(true);

//     // Further processing...
//   } catch (error) {
//     console.error("Error executing the code:", error);
//     setResponse(null);
//   } finally {
//     setExecutingQuery(false);
//   }
// };

  
  
    const handleCheckCode = async () => {
      setShowOutput(true);
      setRunResponseTestCases('');
      setPyRun(true);
      setExecutingQuery(true);
    
      if (submissionAttempts1[questionIndex] >= 3) {
        setShowAlert(true);
        return;
      }
    
      setOutput('');
    
      function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
          throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
      }
    
      Sk.TurtleGraphics = Sk.TurtleGraphics || {};
      Sk.TurtleGraphics.target = 'output';
      Sk.pre = 'output';
    
      Sk.configure({
        output: (text) => {
          const cleanedText = text.replace("<module '__main__' from '<stdin>.py'>", "");
          setOutput((prevOutput) => prevOutput + cleanedText);
        },
        read: builtinRead,
        inputfun: (prompt) => {
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
                outputElement.removeEventListener('keydown', inputHandlerRef.current);
                resolve(inputValue);
              } else if (event.key.length === 1) {
                inputBuffer += event.key;
                setOutput((prevOutput) => prevOutput + event.key);
              } else if (event.key === 'Backspace') {
                inputBuffer = inputBuffer.slice(0, -1);
                setOutput((prevOutput) => prevOutput.slice(0, -1));
              }
            };
    
            if (inputHandlerRef.current) {
              outputElement.removeEventListener('keydown', inputHandlerRef.current);
            }
    
            inputHandlerRef.current = inputHandler;
            outputElement.addEventListener('keydown', inputHandler);
          });
        },
      });
    
      const startTime = performance.now(); // Start time for measuring execution
      const initialMemory = performance.memory.usedJSHeapSize; // Initial memory usage
    
      const myPromise = Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
      });
    
      myPromise
        .then(
          (err) => {
            console.error('Error executing Python code:', err);
          }
        )
        .catch((err) => {
          console.error('Promise rejection error:', err);
        })
        .finally(() => {
          const endTime = performance.now(); // End time for measuring execution
          const executionTime = endTime - startTime;
    
          const finalMemory = performance.memory.usedJSHeapSize; // Final memory usage
          const memoryUsage = (finalMemory - initialMemory) / (1024 * 1024); // Memory in MB
    
          //console.log(`Time Complexity (Execution Time): ${executionTime.toFixed(2)} ms`);
          //console.log(`Space Complexity (Memory Usage): ${memoryUsage.toFixed(2)} MB`);
        });
    
      setExecutingQuery(false);
      setClickCount((prevCount) => prevCount + 1);
      setActiveTab("output");
    
      try {
        setExecutingQuery(true);
    
        const postData = {
          studentId: decryptedStudentId,
          Day_no: decryptedSelectedDay,
          Subject: decryptedcourse,
          Qn: question.Qn_name,
          Code: pythonCode,
          Result: output.trimEnd(),
          CallFunction: "",
          TestCases: testCase,
          Attempt: clickCount,
        };
    
        const url = "https://surgebackend.azurewebsites.net/runpy12/";
        setResponse(null);
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
    
        const responseData = await response.json();
        setRunResponse(responseData);
        setRunResponseTable(responseData.data);
        setRunResponseTestCases(responseData.TestCases);
        setRunResponseExecutionTime(responseData.Time);
        setResponseAttempt(responseData.Attempt);
        setIsCheckClicked(true);
    
        // Further processing...
      } catch (error) {
        console.error("Error executing the code:", error);
        setResponse(null);
      } finally {
        setExecutingQuery(false);
      }
    };


  const handleSubmit = async () => {
    // setNextBtn(true);
    // //console.log("first")
    setIsSubmitting(true);
    setActiveTab('output');
      if (submissionAttempts[questionIndex] >= 1) {
      setShowAlert(true);
      return;
    }
  
    try {
      const updatedSqlQuery = pythonCode;
      const sendData = {
        StudentId: decryptedStudentId,
        Day_no: decryptedSelectedDay,
        Subject: decryptedcourse,
        Qn: Qn_name,
        Ans:updatedSqlQuery,
        Result: runResponseTestCases,
        Attempt: responseAttempt,
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
        // //console.log("Hiii", responseTastCase)
        setSubmissionSuccess(true)
        setSubmittingAnswer(false);
        setSubmitCount(prevCount => prevCount + 1);
        setIsSubmitting(false);
        setNextBtn(true);
        
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
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
  }


  const handleSubmitClick = () => {
    setIsRunClicked(false);
    // setDOMTRUE(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    handleCloseConfirmModal();
    handleSubmit();
  };

  const handleReportBug = async () => {
    setIsCapturingScreenshot(true);
    try {
      // Function to capture full page content
      const captureFullPage = async () => {
        const body = document.body;
        const html = document.documentElement;
        
        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        
        return await html2canvas(document.body, {
          width: window.innerWidth,
          height: height,
          windowWidth: window.innerWidth,
          windowHeight: height,
          x: window.scrollX,
          y: window.scrollY,
          scrollX: 0,
          scrollY: 0,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#E2F2FF', // Match your background color
        });
      };
  
      // Capture the full page content
      const mainCanvas = await captureFullPage();
      
      // Get the iframe
      const iframe = document.querySelector('iframe');
      if (iframe) {
        // Calculate iframe position relative to the page
        const iframeRect = iframe.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Capture iframe content
        const iframeCanvas = await html2canvas(iframe.contentDocument.body, {
          width: iframe.clientWidth,
          height: iframe.clientHeight,
          windowWidth: iframe.clientWidth,
          windowHeight: iframe.clientHeight,
          useCORS: true,
          allowTaint: true,
        });
        
        // Create a new canvas to combine both screenshots
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = mainCanvas.width;
        finalCanvas.height = mainCanvas.height;
        
        const ctx = finalCanvas.getContext('2d');
        
        // Draw the main page screenshot
        ctx.drawImage(mainCanvas, 0, 0);
        
        // Draw the iframe screenshot at the correct position
        ctx.drawImage(
          iframeCanvas,
          iframeRect.left,
          iframeRect.top + scrollTop,
          iframe.clientWidth,
          iframe.clientHeight
        );
        
        const screenshot = finalCanvas.toDataURL('image/png');
        setScreenshot(screenshot);
      } else {
        const screenshot = mainCanvas.toDataURL('image/png');
        setScreenshot(screenshot);
      }
      
      setShowBugReport(true);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      alert('Failed to capture screenshot. You can still report the bug.');
      setShowBugReport(true);
    } finally {
        setIsCapturingScreenshot(false);
    }
  };
  
  const handleBugSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
        Student_id: decryptedStudentId,
        Issue_type: issueType,
        BugDescription: bugDesc,
        Img_path: screenshot,
        Resolved: null,
        Comment: {}
    };
  
    fetch('https://surgebackend.azurewebsites.net/internshipreport/bugs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! Status: ${response.status}, Text: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // //console.log('Success:', data);
            // Reset form and close modal
            setBugDesc('');
            setIssueType('');
            setScreenshot(null);
            setShowBugReport(false);
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally show an error message to the user here
        })
        .finally(() => {
            setLoading(false);
        });
  };
  
  
  
  const handleTicket = async() =>
    {
      navigate('/Tickets')
    }
    const handleLogOut =  async() => { 
      try {
        const response = await axios.post('https://surgebackend.azurewebsites.net/logout/', {
          StudentId: decryptedStudentId
        });
        
        navigate('/')
      } catch (error) {
          console.error('Error sending comment:', error);
          
        }
      };
    //   const handleEnvelope = () => { 
    //     navigate('/ChatApp');
    //  }
  
  // const remainingSubmissionsMessage = `You have ${3 - submissionAttempts[questionIndex]} submission's left`;
  const alertMessage = "You have reached your limit.";

  // const remainingRunMessage = `You have ${3 - submissionAttempts1[questionIndex]} run's left`;

  return (
    <div className="container-fluid">
          <SessionTimeout/>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
                    </div>
      ) : (
        <div className="row" style={{height: '50vh', maxHeight:'100'}}>
          <div className="container" >
                <div className='' style={{width:'100%'}}>
                  <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
                  <img src={logo}  alt="Logo" height={38} width={100} />
                  <div style={{fontSize:'15px', color:'white'}}><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>{decryptedcourse}</span> <FontAwesomeIcon icon={faGreaterThan}  /><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/IndexPage')}>Day {decryptedSelectedDay}</span><FontAwesomeIcon icon={faGreaterThan}  /><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/QuestionPage')}>Question </span><FontAwesomeIcon icon={faGreaterThan}  /><span className='px-1'>{qnNumber}</span></div>
                  <nav className="ms-auto ">
                    <Dropdown className="d-flex justify-content-center" >
                    <span className='px-2    custom-btnEditor' onClick={handlePrevious} title='Previous Question'>
                        <FontAwesomeIcon icon={faLessThan}  className="icons text-white" />
                      </span>
                      <span className='px-2   custom-btnEditor' onClick={handleNext}  title='Next Question'>
                        <FontAwesomeIcon icon={faGreaterThan}  className="icons text-white" />
                      </span>
                      <span className='px-2   custom-btnEditor'  title="Support Assistance">
                      <RiCustomerService2Fill onClick={handleReportBug} className="icons text-white" style={{fontSize:'20px'}}/>

                      </span>
                      {/* <span className='px-2   custom-btnEditor'  title="Notification">
                        <FontAwesomeIcon icon={faBell} className="icons" />
                      </span> */}
                      <span className='px-2   custom-btnEditor' onClick={handleTicket} title="Ticket">
                        <FontAwesomeIcon icon={faTicket} className="icons text-white" />
                      </span>
                        {/* <span className="px-2 custom-btnEditor" onClick={handleEnvelope} title="Message">
                            <FontAwesomeIcon icon={faEnvelope} className="icons text-white" />
                        </span> */}
                      <span className='px-2   custom-btnEditor' onClick={handleHome} title="Home">
                        <FontAwesomeIcon icon={faHome} className="icons text-white" />
                      </span>
                        {/* <button className='px-1   custom-btnEditor' onClick={handleHome} title="Support Assistance">
                          <FontAwesomeIcon icon={faBug} className="icons" /> Bug
                        </button> */}
                        <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={decryptedName} className='' style={{color:'#7335B7'}}>
                        <img src={decryptedPicture} height={20} alt='' className='me-1 rounded-circle' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='px-2 pt-5 me-5 bg-light '>
                          <div className="text-center">
                            <Dropdown.Item ><img src={decryptedPicture} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
                            <Dropdown.Item className='fs-5 fw-bold'>{decryptedName}</Dropdown.Item>
                            <Dropdown.Item className=''>{decryptedEmail}</Dropdown.Item>
                            <Dropdown.Item className='pb-4'>{decryptedStudentId}</Dropdown.Item>
                          </div>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleLogOut} className=' outline-white  mb-2 text-white Logout' title='Logout' style={{ backgroundColor:'#7335B7'}}><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </nav> 
                  </header>
              </div> 
              <div className='row body mt-5 pt-2 ' style={{backgroundColor:'#E2F2FF', overflow:'hidden', maxHeight: '93.5vh'}}>
              <div className='qns'>
              </div>
              <div className="InputQuery  col-md-4  " style={{ height: '93vh', overflowY: 'auto',width: splitOffset, minWidth: '30%', maxWidth: '65%',backgroundColor:'#ffffff', }}>
                  <div className='col result mb-5' >
                    <div className='row'>
                      <div className=' mt-3' style={{ width: '100%', height: '100%',backgroundColor:'#FFFFFF', color:'black' }}>
                        <span className='ms-3' style={{fontSize:'20px', fontWeight:'bold'}}>Question:</span>
                          <pre className='ms-3' style={{textWrap:"wrap", fontSize:'18px'}}><span className=''>{questionName}</span></pre>
                          {data.Question.Examples.map((item, index) => (
                              <div className='p-2 mb-3 ms-3' key={index} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'#ffffff', }}>
                                  <div><span className='fw-bold'  style={{fontSize:'18px'}}>Inputs:</span> <br/><pre className='ps-5' style={{fontSize:'16px', textWrap:'wrap'}}>{item.Example.Inputs.join(', ')}</pre></div>
                                  <div><span className='fw-bold'  style={{fontSize:'18px'}}>Output:</span> <br/><pre className='ps-5' style={{fontSize:'16px', textWrap:'wrap'}}>{item.Example.Output}</pre></div>
                                  <div><span className='fw-bold'  style={{fontSize:'18px'}}>Explanation:</span> <pre className='ps-5' style={{fontSize:'16px', textWrap:'wrap'}}>{item.Example.Explanation}</pre></div>
                              </div>
                          ))}   
                      </div>
                    </div>
                  </div>
              </div>
              <div className='curserDivPy' onMouseDown={handleMouseDown}></div>
              <div className="OutputDatabaseTables col mx-1 mb-3" style={{ height: '94vh', overflow: 'hidden', width: splitOffset }}>
                <div className="col" style={{ height: '100%' ,}}>
                  <div className="row top" style={{ height: `${editorHeightPercentage}vh`, overflow: 'auto', backgroundColor:'#ffffff', }}>
                  <AceEditor
                      mode="python"
                      theme="dreamweaver"
                      value={pythonCode}
                      onChange={(newCode) => {
                        setPythonCode(newCode); // Update Python code
                        setIsRunClicked(false);
                        setIsCheckClicked(false);  // Reset isRunClicked to false
                      }}
                      fontSize={16}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      wrapEnabled={true}
                      className="mt-3 pe-4"
                      style={{ width: '100%', height: '90%' }}
                    />
                  </div>
                  <div className="Move py-1" style={{  backgroundColor: '#E2F2FF', marginRight:'-50px', cursor:'row-resize' }} onMouseDown={handleVerticalMouseDown}>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-between align-items-center'>
                          <div className='MessageDiv d-flex justify-content-start align-items-start col-4 pe-5 text-wrap'>
                          {executingQuery && (
                              <h5 className="d-flex align-items-center">
                                Processing <span className="ms-2"><BeatLoader size={3} /></span>
                              </h5>
                            )}
                            {!executingQuery && successMessage && (
                              <div>
                                <h5>{successMessage}</h5>
                                <span style={{ fontSize: '12px' }}>{additionalMessage}</span>
                              </div>
                            )}
                          </div>
                          <div className='BtnDiv d-flex justify-content-end align-items-center col-6 py-1 me-5'>
                            {/* RUN CODE button */}
      <button
        className="btn btn-dark btn-sm me-1"
        onClick={() => {
          handleRunPython(false);
          setShowAlert(false);
          setIsRunClicked(true); // Enable CHECK TEST CASES button
          setIsCheckClicked(false); // Reset SUBMIT CODE visibility
        }}
        style={{ backgroundColor: '#FFFFFF', color: '#000000', whiteSpace: 'nowrap', minWidth: '100px' }}
      >
        RUN CODE
      </button>

      {/* Conditionally render CHECK TEST CASES button */}
      {isRunClicked && (
  <button
    className="btn btn-dark btn-sm me-1"
    onClick={() => {
      handleCheckCode(false);
      setShowAlert(false);
    }}
    style={{
      backgroundColor: executingQuery ? '#d3d3d3' : '#FFFFFF',
      color: executingQuery ? '#888888' : '#000000',
      whiteSpace: 'nowrap',
      minWidth: '150px',
      cursor: executingQuery ? 'not-allowed' : 'pointer',
    }}
    disabled={executingQuery} // Disable the button when executingQuery is true
  >
    {executingQuery ? 'Executing...' : 'CHECK TEST CASES'}
  </button>
)}

      {/* Conditionally render SUBMIT CODE or NEXT button */}
      {(nextBtn || userSubmited === 'Yes') ? (
        <button
          className="btn btn-dark btn-sm"
          onClick={handleNext}
          style={{ backgroundColor: '#c0eead', color: '#000000', whiteSpace: 'nowrap', width: '60px' }}
        >
          NEXT
        </button>
      ) : (
        isCheckClicked && (
          <button
            className="btn btn-dark btn-sm me-1"
            onClick={handleSubmitClick}
            style={{ backgroundColor: '#EEEBAD', color: '#000000', whiteSpace: 'nowrap', width: '105px' }}
            disabled={isSubmitting}
          >
            <span className="d-flex align-items-center">
                {isSubmitting ? (
                    <>
                        Submitting <BeatLoader size={2}className='pt-1' />
                    </>
                ) : (
                    <>
                        SUBMIT CODE 
                    </>
                )}
            </span>
          </button>
        )
      )}
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="row down mb-5" style={{ height: `${outputHeightPercentage}vh`,overflowY: 'auto' ,paddingBottom:'90px'}}>
                  <div className='' style={{minHeight: '1em', width: '100%', backgroundColor:'#ffffff',}}>
                  <div className="pt-3 new-style" style={{    fontSize: '12px',   color: 'black'}}>
                  <div className='output responsive'>
                  <div>
                  {showOutput && (
        <div
          id="output"
          className="p-2 px-3 ms-3"
          style={{
            width: '100%',
            color: 'black',
            border: '1px solid white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            padding: '10px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            backgroundColor: '#FFFFFF',
            maxHeight: 'auto',
            minHeight: '1em', // Minimum height for one line
          }}
        >
          {output}
        </div>
      )}
      </div>
</div>


{runResponseTestCases && (
  <div className="col mt-3 mb-5">
    {runResponseTestCases.map((testCase, index) => (
      <div className="mt-4" key={index}>
        {Object.entries(testCase).map(([key, value], i) => {
          let textColor =
            value === 'Passed'
              ? 'text-primary'
              : value === 'Failed'
              ? 'text-danger'
              : 'text-dark';

          return (
            <span
              key={i}
              className="border-2 rounded-3 p-2 px-3 my-5 ms-3"
              style={{
                backgroundColor: '#FFFFFF',
                fontSize: '14px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              {key}: <span className={textColor} style={{ paddingBottom: '15%' }}>{String(value)}</span>
            </span>
          );
        })}
      </div>
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

      <Modal show={showConfirmModal} size='lg' onHide={handleCloseConfirmModal} centered>
        <Modal.Body className='text-center'>
          Are you sure you want to submit Python assignment question?
        </Modal.Body>
        <div className='text-center d-flex justify-content-center mb-3'>
        <Button variant="" className='btn btn-success mx-3'  onClick={handleConfirmSubmit}>
            Yes
          </Button>
          <Button variant="" className='btn btn-danger' onClick={handleCloseConfirmModal}>
            No
          </Button>
        </div>
      </Modal>

      <Modal show={showBugReport} onHide={() => setShowBugReport(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#7335B7', color: 'white' }}>
        <Modal.Title>Support Assistance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <Spinner animation="border mx-3" style={{ color: '#7335B7' }} /> Loading...
        </div>
    ) : ticketRaised ? ( // Check if the ticket is raised
        <div className="container text-center">
            <h5>Your ticket has been successfully raised!</h5>
            <p>Thank you for your report. Our support team will look into it shortly.</p>
        </div>
    ) : (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {screenshot && (
                        <div>
                            <h5>Screenshot</h5>
                            <img src={screenshot} alt="Bug Screenshot" className="img-fluid" />
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleBugSubmit}>
                        <div className="form-group mt-3">
                            <label className='me-2' htmlFor="issueType">Support Type:</label>
                            <select 
                                id="issueType" 
                                value={issueType} 
                                onChange={(e) => setIssueType(e.target.value)} 
                                required
                                className="form-control"
                            >
                                <option value="">Select</option>
                                {issueTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="bugDescription">Description</label>
                            <textarea 
                                className="form-control" 
                                value={bugDesc}
                                onChange={(e) => setBugDesc(e.target.value)} 
                                id="bugDescription" 
                                rows="4" 
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: '#7335B7', borderColor: '#7335B7' }}>
                            Raise Ticket
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )}
</Modal.Body>

      </Modal>
    </div>
  );
};

export default PyEditor;