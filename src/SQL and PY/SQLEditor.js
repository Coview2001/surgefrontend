import React, { useState, useEffect, useRef } from 'react';
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
import { Modal, Button, Tab, Tabs, Spinner } from 'react-bootstrap';
import './SQLEditor.css'
import { useNavigate } from 'react-router-dom';
// import { Border } from 'react-bootstrap-icons';
// import HeaderEditor from './HeaderEditor';
import logo from '../Img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome,faTicket, faSignOut, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import './Header.css';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import SessionTimeout from '../SessionTimeout';
import { RiCustomerService2Fill } from "react-icons/ri";
import html2canvas from 'html2canvas';


const SQLEditor = () => {
  const [sqlQuery, setSqlQuery] = useState('/*Write a all SQl commands/clauses in UPPERCASE*/');
  const [response, setResponse] = useState(null);
  const [responseTestCase, setResponseTestCase] = useState(null);
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
  const navigate = useNavigate();
  const [submissionAttempts, setSubmissionAttempts] = useState({});
  const [Qn_name, setQn_name] = useState();
  const [Ans, setAns] = useState();
  const [sqlRun, setSqlRun] = useState(false);
  const [TestCases, setTestCases] = useState(false);
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
  const [qnNumber, setQnNumber] = useState();
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseAttempt, setResponseAttempt] = useState(0);

  const [showBugReport, setShowBugReport] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [bugDesc, setBugDesc] = useState('');
  const [issueType, setIssueType] = useState('');
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
  const [isRunClicked, setIsRunClicked] = useState(false);


  useEffect(() => {


    const storedQn_Number= sessionStorage.getItem('Qn_Number');
    const storedName = decryptedName;
    const storedEmail = decryptedEmail;
    const storedPicture = decryptedPicture;
    const storedStudentId = decryptedStudentId;
    const storedDay= decryptedSelectedDay;
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
  }, []);

  const handleHome = () => {
    navigate('/CoursePage');
  }
  const handleIndex = () => {
    navigate('/IndexPage');
  }
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
  }


  const handleSubmitClick = () => {
    // setDOMTRUE(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    handleCloseConfirmModal();
    handleSubmit();
  };
  const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);

  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);


  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); // in percentage (vh)
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)

  const [isDraggingVerticallyLeft, setIsDraggingVerticallyLeft] = useState(false);
  const [initialYLeft, setInitialYLeft] = useState(null);
  const [leftTopHeightPercentage, setLeftTopHeightPercentage] = useState(45); // initial percentage (vh)
  const [leftDownHeightPercentage, setLeftDownHeightPercentage] = useState(49); // initial percentage (vh)
  

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



  const handleVerticalMouseDownLeft = (e) => {
    setIsDraggingVerticallyLeft(true);
    setInitialYLeft(e.clientY);
  };
  
  const handleVerticalMouseMoveLeft = (e) => {
    if (!isDraggingVerticallyLeft || !initialYLeft) return;
  
    const dy = e.clientY - initialYLeft;
    const vhUnitChange = (dy / window.innerHeight) * 100; // Convert px to vh
  
    setLeftTopHeightPercentage((prevHeight) => {
      const newHeight = Math.max(30, Math.min(70, prevHeight + vhUnitChange)); // between 30% and 70%
      setLeftDownHeightPercentage(94 - newHeight); // Complementing height for the bottom section
      return newHeight;
    });
  
    setInitialYLeft(e.clientY);
  };
  
  const handleVerticalMouseUpLeft = () => {
    setIsDraggingVerticallyLeft(false);
    setInitialYLeft(null);
  };
  
  // Add event listeners for vertical dragging
  useEffect(() => {
    window.addEventListener('mousemove', handleVerticalMouseMoveLeft);
    window.addEventListener('mouseup', handleVerticalMouseUpLeft);
  
    return () => {
      window.removeEventListener('mousemove', handleVerticalMouseMoveLeft);
      window.removeEventListener('mouseup', handleVerticalMouseUpLeft);
    };
  }, [isDraggingVerticallyLeft, initialYLeft]);
  
  useEffect(() => {
    const fetchData = async () => {
      const bodyData = 
        {
          StudentId: decryptedStudentId,
          Course: decryptedcourse,
          Day: decryptedSelectedDay,
          Qn_name: decryptedQnName
        }
        // //console.log("bodyData", b dyData)
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
        // //console.log("data", d ta)
        setQuestion(data.Question);
        // //console.log("YYYYYYY : ,data.Question)
        setQn_name(data.Question.Qn_name)
        // //console.log("Car", d ta.Question.Qn_name)
        setAns(data.Question.Query)
        setTables(data.Tables);
        // //console.log("Tables", d ta.Tables)
        setExpectedOutput(data.Question.ExpectedOutput);
        setTestCase(data.Question.TestCases)
        setQuestionName(data.Question.Qn)
        setQnNumber(data.Question.Qn_No)
        setUserAns(data.Question.UserAns || '')
        setUserSubmited(data.Question.UserSubmited)
        // //console.log("$$$$$$", d ta.Question.UserSubmited)
        setLoading(false);
        setSqlQuery('/*Write a all SQl commands/clauses in UPPERCASE*/')
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  useEffect( () => {
    if(userAns){
      setSqlQuery(userAns)
    }
    else{
      setSqlQuery('/*Write a all SQl commands/clauses in UPPERCASE*/')
    }
  }, [userAns])
  

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
    setRunResponseTestCases('')
    setRunResponseTable('')
    setClickCount(prevCount => prevCount + 1);
    localStorage.setItem('runCodeClickCount', clickCount);
    setSqlRun(true);
    setActiveTab('output');
    // //console.log("IronMan", cickCount + 1 );
  
    try {
      setActiveTab('output');
      const updatedSqlQuery = sqlQuery.trim().replace(/\n/g,' ').replace(/;$/, '');
      const sendData = {
        studentId: decryptedStudentId,
        course:decryptedcourse,
        Day_no: decryptedSelectedDay,
        Subject: decryptedcourse,
        Qn: question.Qn_name,
        Ans:updatedSqlQuery.replace('/*Write a all SQl commands/clauses in UPPERCASE*/', ''),
        Result: question.TestCases,
        Attempt: clickCount,
        query: updatedSqlQuery.replace('/*Write a all SQl commands/clauses in UPPERCASE*/', ''),
        ExpectedOutput: question.ExpectedOutput,
        TestCases: question.TestCases
      };
      // //console.log("Varun", ) 
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
        // //console.log("Full R sponse:", responseData);
        setRunResponseTable(responseData.data)
        // //console.log("TableData", responseData.data);
        setRunResponseTestCases(responseData.TestCases);
        // //console.log("TestCases", responseData.TestCases);
        setRunResponseExecutionTime(responseData.Time);
        setResponseAttempt(responseData.Attempt);
        // //console.log("Cap",responseData.Time);
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
    setNextBtn(true);
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
        StudentId: decryptedStudentId,
        Day_no: decryptedSelectedDay,
        Subject: decryptedcourse,
        Qn: question.Qn_name,
        Ans:updatedSqlQuery.replace('/*Write a all SQl commands/clauses in UPPERCASE*/', ''),
        Result: runResponse.TestCases,
        Attempt: responseAttempt
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
        // setResponseTestCase(responseTastCase.Result);
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


    const handleNext = () => {
      setClickCount(0)
      setActiveTab('tables')
    const nextQnNumber = Number(sessionStorage.getItem('Qn_Number')) + 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    setNextBtn(false)
    setIsNextClicked(true)
    setLoading(true)
    setSqlQuery('/*Write a all SQl commands/clauses in UPPERCASE*/')
    setRunResponseTestCases('')
    setRunResponseTable('')
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('')
    // //console.log("Execute f tchNextData");

    const fetchNextData = async () => {
      const bodyData = 
        {
          StudentId: decryptedStudentId,
          Subject: decryptedcourse,
          Day_no: decryptedSelectedDay,
          Qn: Qn_name,
          NextQn: 'N'
        }
        // //console.log("bodyData", bodyData)
      try {
        const response = await fetch("https://surgebackend.azurewebsites.net/nav/qn/", 
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
        // //console.log("YYYYYYY : ",data.Question)
        setQn_name(data.Question.Qn_name)
      // //console.log("Qn_nmae", data.Question.Qn_No)
        setAns(data.Question.Query)
        setTables(data.Tables);
        // //console.log("Tables", data.Tables)
        setExpectedOutput(data.Question.ExpectedOutput);
        setTestCase(data.Question.TestCases)
        setQuestionName(data.Question.Qn)
        setQnNumber(data.Question.Qn_No)
        setUserAns(data.Question.UserAns || '')
        setUserSubmited(data.Question.UserSubmited)
        const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      navigate('/QuestionPage')

      }
    };

  fetchNextData();

  };
  const handlePrevious = () => {
    setClickCount(0)
    setActiveTab('tables')
  const nextQnNumber = Number(sessionStorage.getItem('Qn_Number')) - 1;
  sessionStorage.setItem('Qn_Number', nextQnNumber);
  setNextBtn(false)
  setIsNextClicked(true)
  setLoading(true)
  setSqlQuery('/*Write a all SQl commands/clauses in UPPERCASE*/')
  setRunResponseTestCases('')
  setRunResponseTable('')
  setIsNextClicked(false);
  setSuccessMessage('');
  setAdditionalMessage('')
  // //console.log("Execute f tchPreviousData");

  const fetchNextData = async () => {
    const bodyData = 
      {
        StudentId: decryptedStudentId,
        Subject: decryptedcourse,
        Day_no: decryptedSelectedDay,
        Qn: Qn_name,
        NextQn: 'P'
      }
      // //console.log("bodyData", b dyData)
    try {
      const response = await fetch("https://surgebackend.azurewebsites.net/nav/qn/", 
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
      // //console.log("YYYYYYY : ",data.Question)
      setQn_name(data.Question.Qn_name)
      // //console.log("Qn_nmae", data.Question.Qn_No)
      setAns(data.Question.Query)
      setTables(data.Tables);
      // //console.log("Tables", data.Tables)
      setExpectedOutput(data.Question.ExpectedOutput);
      setTestCase(data.Question.TestCases)
      setQuestionName(data.Question.Qn)
      setQnNumber(data.Question.Qn_No)
      setUserAns(data.Question.UserAns || '')
      setUserSubmited(data.Question.UserSubmited)
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    navigate('/QuestionPage')

    }
  };

fetchNextData();

};

  const handleClose = () => setShow(false);

  // const remainingSubmissionsMessage = `You have ${3 - submissionAttempts[questionIndex]} submission's left`;
  const alertMessage = "You have reached the your limit.";

  // const remainingRunMessage = `You have ${3 - submissionAttempts1[questionIndex]} run's left`;
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
  return (
    <div className="container-fluid"style={{fontFamily:'"Segoe UI", Arial, sans-serif'}}>
    <div className="row" id="captureElement" style={{height: '50vh', maxHeight:'100vh', }}>
      <div className="container" >
      <SessionTimeout/>
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
                    </div>
      ) : (
        <div className="row mt-2" style={{height: '50vh', maxHeight:'100'}}>
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
                        <Dropdown.Item onClick={handleLogOut} className='rounded-pill outline-white mb-2 text-white' title='Logout' style={{ backgroundColor:'#7335B7'}}><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </nav> 
                </header>
            </div>
            <div className='row body mt-5 pt-2 pb-3' style={{backgroundColor:'#E2F2FF', overflow:'hidden', maxHeight: '92.5vh'}}>
              <div className='qns'>
              </div>
              <div className="InputQuery col-md-4 mx-1" style={{ height: '100vh', overflow: 'hidden', width: splitOffset, minWidth: '30%', maxWidth: '60%' }}>
                <div className="col result" style={{ height: '100%' }}>
                    <div className="row leftTop" style={{ height: `${leftTopHeightPercentage}vh`, overflow: 'auto' }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', color: 'black' }}>
                            <h6 className="mb-4">{questionName}</h6>
                        </div>
                    </div>
                    <div
                    className="MoveUPDown"
                    onMouseDown={handleVerticalMouseDownLeft}
                    ></div>
                    <div className="row leftDown" style={{ height: `${leftDownHeightPercentage}vh`, overflow: 'auto' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', color: 'black' }}>
                        <Tabs className='custom-tabs mt-1  mb-2' variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} style={{ fontSize: '12px' }}>
                            <Tab eventKey="tables" title="Table">
                                <div className='col DBT' style={{ height: '40vh', overflowX: 'auto' }}>
                                {data && data.Tables && (
                                    <div className="d-flex flex-row">
                                    {data.Tables.map(table => {
                                        const isSelected = selectedTableName === table.tab_name;
                                        return (
                                          <div
                                          key={table.tab_name}
                                          className={`mt-2 mx-1 d-flex justify-content-start ${isSelected ? 'text-dark font-weight-bold rounded' : 'text-dark font-weight-normal'}`}
                                          onClick={() => handleTableNameClick(table.tab_name)}
                                          style={{
                                              transform: isSelected ? 'scale(1.1)' : 'none',
                                              transition: isSelected ? 'transform 0.5s' : 'none',
                                              borderLeft: isSelected ? '1px solid #000' : 'none',
                                              borderRight: isSelected ? '1px solid #000' : 'none',
                                              borderTop: isSelected ? '1px solid #000' : 'none',
                                              color: isSelected ? 'white' : 'black',
                                              backgroundColor:'#b8e4ff',
                                              cursor: 'pointer',
                                              
                                          }}
                                      >
                                            <div className="p-2" style={{ fontSize: '12px',   borderTopLeftRadius:'16.5px', borderTopRightRadius:'11.5px', backgroundColor:'#b8e4ff', }}>
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
                                                    <th key={index} className='text-center' style={{ maxWidth: `${key.length * 12}px` }}>{key}</th>
                                                    ))}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {table.data.map((item, index) => (
                                                    <tr key={index}>
                                                    {Object.entries(item).map(([key, value], i) => (
                                                        <td key={i} className='text-center' style={{  whiteSpace: 'nowrap', padding: '5px',}}>{value}</td>
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
                                <div className="col expectedOutput" style={{ height: '40vh', overflowX: 'auto', fontSize: '12px', backgroundColor:'#FFFFFF' }}>
                                    <div className="table-responsive" style={{height:'100%'}}>
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
                                                <td key={i} className='px-3 text-center' style={{ whiteSpace: 'nowrap', padding: '5px', }}>{value}</td>
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
                </div>
                </div>
              <div className='curserDivPy' onMouseDown={handleMouseDown}></div>
              <div className="OutputDatabaseTables col mx-1 mb-3" style={{ height: '94vh', overflow: 'hidden', width: splitOffset, minWidth: '30%' }}>
                <div className="col" style={{ height: '100%' }}>
                  <div className="row top" style={{ height: `${editorHeightPercentage}vh`, overflow: 'auto' }}>
                    <AceEditor
                      mode="sql"
                      theme="dreamweaver"
                      onChange={setSqlQuery }
                      value={sqlQuery}
                      fontSize={14}
                      showPrintMargin={false}
                      showGutter={false}
                      highlightActiveLine={false}
                      wrapEnabled={true}
                      className="pe-3"
                      style={{ width: '100%', height: '100%' }} 
                    />
                  </div>
                  <div className="Move" style={{ cursor: 'row-resize', height: '70px', backgroundColor: '#E2F2FF' }} onMouseDown={handleVerticalMouseDown}>
                  {/* <div className='col d-flex justify-content-end align-items-center' style={{marginTop:'15px'}}>
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
                  <div className=''>
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
                      {nextBtn && (
                        <button className="btn btn-dark btn-sm ms-2" onClick={handleNext}  style={{ backgroundColor: '#c0eead', color: '#000000' }}>
                        Next
                      </button>
                      )}
                  </div>
                    </div> */}
                    <div className="Move" style={{ cursor: 'row-resize', height: '60px', backgroundColor: '#E2F2FF' }} onMouseDown={handleVerticalMouseDown}>
                      <div className='row' >
                          <div className='col-12 d-flex justify-content-between align-items-center' style={{marginBottom:'-80px'}}>
                            <div className='MessageDiv d-flex justify-content-start align-items-center col-6 pe-5 text-wrap'>
                              {executingQuery && (
                                <h5>Processing....</h5>
                              )}
                              {!executingQuery && successMessage && (
                                <div>
                                  <h5>{successMessage}</h5>
                                  <p style={{ fontSize: '10px' }}>{additionalMessage}</p>
                                </div>
                              )}
                            </div>
                            <div className='BtnDiv d-flex justify-content-end align-items-center col-6 '>
                            <button 
                                className="btn btn-sm me-1" 
                                onClick={() => { 
                                  handleRun(false); 
                                  setIsRunClicked(true); // Set `isRunClicked` to true when RUN CODE is clicked
                                }} 
                                style={{ backgroundColor: '#FFFFFF', color: '#000000', whiteSpace: 'nowrap', minWidth: '100px', boxShadow: '1px 2px 1px #888888' }}
                              >
                                RUN CODE
                              </button>

                              {(nextBtn || userSubmited === 'Yes') ? (
                                <button 
                                  className="btn btn-sm" 
                                  onClick={handleNext} 
                                  style={{ backgroundColor: '#c0eead', color: '#000000', whiteSpace: 'nowrap', minWidth: '100px', boxShadow: '1px 2px 1px #888888' }}
                                >
                                  NEXT
                                </button>
                              ) : (
                                isRunClicked && ( // Only show "SUBMIT CODE" if RUN CODE has been clicked
                                  <button 
                                    className="btn btn-sm me-1" 
                                    onClick={handleSubmitClick} 
                                    style={{ backgroundColor: '#EEEBAD', color: '#000000', whiteSpace: 'nowrap', minWidth: '110px', boxShadow: '1px 2px 1px #888888' }}
                                  >
                                    SUBMIT CODE
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="row down mb-5" style={{ height: `${outputHeightPercentage}vh`, overflow: 'auto',paddingBottom:'50px', background:'#F5FAFB' }}>
                  <div className='' style={{backgroundColor:"#FFFFFF"}}>
                        <div className="pt-3 new-style" style={{   width: '100%', height: '100%', fontSize: '12px',  backgroundColor: '#FFFFFF',   color: 'black',   borderColor: 'white'}}>
                            <p style={{ fontSize: '15px' }}>Your output:</p>
                            <div className="table-responsive">
                            {runResponseTable && Array.isArray(runResponseTable) ? (
                                <div>
                                <table className="table table-bordered table-sm" style={{ tableLayout: 'auto', height:'50%', width:'50%' }}>
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
                                            <td key={i} className='px-3 text-center' style={{ whiteSpace: 'nowrap', padding: '5px',}}>{value}</td>
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
                            <div className="col mt-3">
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
      </div>
      </div>
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
      {/* <Modal show={showAlertFinish} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
      </Modal> */}

      <Modal show={showConfirmModal} size='lg' onHide={handleCloseConfirmModal} centered>
        <Modal.Body className='text-center'>
          Are you sure you want to submit SQL assignment question?
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


        {/* <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="text-center">
                <div className="blaster">
                    <h5>Congratulations!</h5>
                    <h2>You did it!</h2>
                </div>
            </Modal.Body>
        </Modal> */}

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

export default SQLEditor;