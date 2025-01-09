import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CodeMirror from "@uiw/react-codemirror";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

import { javascript } from '@codemirror/lang-javascript';
// import { FaPhoenixFramework } from 'react-icons/fa';
import './HTMLCSSEditor.css'
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle,faCircleXmark,faExpand, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import TableComponent from './TableComponent';
import CSSComponent from './CSSComponent';
import logo from '../Img/logo.png';
import { faHome,faSignOut, faGreaterThan, faLessThan  } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Spinner } from 'react-bootstrap';
import './Editor.css';
import html2canvas from 'html2canvas';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import SessionTimeout from '../SessionTimeout';
import { RiCustomerService2Fill } from "react-icons/ri";


const JSEditor = () => {
  const inputHandlerRef = useRef(null); // Store the input handler reference
  // const [pythonCode, setPythonCode] = useState('');
  const [output, setOutput] = useState('');
  const [responseTestCase, setResponseTestCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  // const [splitOffset, setSplitOffset] = useState(1000);
  const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);


  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);

  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); // in percentage (vh)
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)
  
  const navigate = useNavigate();
  const [Qn_name, setQn_name] = useState();
  const [submitStatus, setSubmitStatus] = useState('');
  
  const [question, setQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState('js');
  const [clickCount, setClickCount] = useState(0);
  const [data, setData] = useState();
  const [questionName, setQuestionName] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [nextBtn, setNextBtn] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false); 
  const [qn_Number, setQn_Number] = useState();
  const [jsfile, setJSFile] = useState('');
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [Sample_img, setSample_img] = useState('');
  const [Preview_img, setPreview_img] = useState('');
  const [userAnsJs, setUserAnsJs] = useState();
  const [htmlEdit, setHtmlEdit] = useState('');
  const [cssEdit, setCssEdit] = useState('');
  const [jsEdit, setJsEdit] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [imageView, setImageView] = useState(false);
  const [displ, setdispl] = useState('');
  const [course, setCourse] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPicture, setuserPicture] = useState('');
  const [StudentId, setStudentId] = useState('');
  const [day, setDay] = useState();
  const [qnNumber, setQnNumber] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ticketRaised, setTicketRaised] = useState(false)
const [jsresponse, setJSResponse] = useState('');
const [KeysLength,setKeysLength] = useState(0);
const [usercodelength, setUsercodeLength] = useState(0);
      // Bug report modal states
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
    


  useEffect(() => {

    const storedQn_Number= sessionStorage.getItem('Qn_Number');
    const storedName = decryptedName;
    const storedEmail = decryptedEmail;
    const storedPicture = decryptedPicture;
    const storedStudentId = decryptedStudentId;
    const storedCourse = decryptedcourse;


    if (storedName && storedPicture && storedEmail && storedStudentId  && storedQn_Number && storedCourse) {
        setUserName(storedName);
        setuserEmail(storedEmail);
        setuserPicture(storedPicture);
        setStudentId(storedStudentId);
        setQn_Number(storedQn_Number);
        setCourse(storedCourse);
    }
  }, []);

  
  // const handleTab = (selectedKey) => {
  //   setShowSubmitButton(false)
  //   setActiveTab(selectedKey);
  //   const lastTabKey = tabKeys[tabs[tabs.length - 1]];
  //   //console.log("=======================",lastTabKey)

  // };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const cleanedHtmlEdit = htmlEdit.replace('</body>', '').replace('</html>', '');

  const srcCode = `
    ${cleanedHtmlEdit.replace('</title>', `</title><style>${cssEdit}</style>`)}
    <script>${jsEdit}</script>
    </body>
    </html>
  `;


  const tabKeys = {
    "HTML": "html",
    "CSS": "css",
    "JS": "js",
  };


  const onChangeHtml = useCallback((value, viewUpdate) => {
    setHtmlEdit(value);
    handleCheckCode();
    // //console.log("Cap") 

  
    // Check if the "Enter" key was pressed
    if (viewUpdate.state.doc.toString().endsWith('\n')) {
      handleCheckCode(); // Call the handleCheckCode function
    }
  }, [htmlEdit]);
  

  const onChangeCss = useCallback((value, viewUpdate) => {
    setCssEdit(value);
    handleCheckCode();
    // //console.log("Iron")

    if (viewUpdate.state.doc.toString().endsWith('\n')) {

    // if (viewUpdate.transactions.some(tr => tr.isUserEvent('input') && tr.newDoc.toString().endsWith('\n'))) {
      handleCheckCode();
    }
  }, [cssEdit]);


  const onChangeJavaScript = useCallback((value, viewUpdate) => {
    setJsEdit(value);
    handleCheckCode();

    // Check if the last character is a newline character
    if (viewUpdate.state.doc.toString().endsWith('\n')) {
        // If no code is present, reset validation status
        if (value.trim() === '') {
            setValidationStatus(prevStatus => ({
                ...prevStatus,
                js: {
                    ...prevStatus.js,
                    closures: undefined,
                    brackets: undefined,
                    // Add any other validation keys you want to reset
                },
            }));
        } else {
            handleCheckCode();
        }
    }
}, [jsEdit]);




  useEffect(() => {

    const storedQn_Number= sessionStorage.getItem('Qn_Number');


    if ( storedQn_Number ) {
        setQn_Number(storedQn_Number);

    }
  }, []);

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

  const handleImgView = () => {
    setImageView(true);
    setdispl('image');
    setShowAlert(true);
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

  const handleSubmit = () => {
    // //console.log("data submitted");
    setLoading(true);
    // sendDataToBackend('html', htmlEdit);
    // sendDataToBackend('css', cssEdit);
    sendDataToBackend('js', jsEdit);
    setNextBtn(true);
  };

  const sendDataToBackend = (type, code) => {
    const subjectType = type.toUpperCase();
    const url = `https://surgebackend.azurewebsites.net/${type}/`;
    const data = {
      StudentId: decryptedStudentId,
      Subject: decryptedcourse,
      Score: (usercodelength + '/' + KeysLength).toString(), // Invoke toString() correctly
      Qn: Qn_name,
      KEYS: jsfile,
      Ans: code || ' ', // Fallback to a space if code is undefined or null
    };    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setJSResponse(data.JSStatuses);
      // //console.log("Panther", data);
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      setLoading(false);
    });

    const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    if (activeTab === lastTabKey) {
      // setFormSubmitted(true);
      // setShowNextButton(true);
    } else {
      // setFormSubmitted(false);
      // setShowNextButton(false);
    }
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
          StudentId: decryptedStudentId,
          Course: decryptedcourse,
          Qn_name: decryptedQnName
          // Course: "HTMLCSS",
          // Day: 1,
          // Qn_name: "QHC2408010000AAXXMM16",
          // StudentId: "24MRIT0002"
        }
        // //console.log("bodyData", bodyData)
      try {
        const response = await fetch("https://surgebackend.azurewebsites.net/frontend/qns/data/", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyData)
            }
        );
        const data = await response.json();
        setJsEdit('')
        setData(data)
        // //console.log("data", data)
        setQuestion(data.Question);
        // //console.log("YYYYYYY :",data.Question)
        setQn_name(data.Question.Qn_name)
        setSubmitStatus(data.Question.UserSubmited)
        setQuestionName(data.Question.Qn)
        setSample_img(data.Question.Sample_img )
        setQnNumber(data.Question.Qn_No)
        setHtmlEdit(data.Question.html_file)
        setCssEdit(data.Question.css_file)
        setTabs(data.Question.Tabs)
        setJSFile(data.Question.js_file);
        setUserAnsJs(data.Question.UserAns || '')
        setValidationStatus({})
        if(data.Question == 'None'){
          navigate('/QuestionPageFrontend')
        }
        setLoading(false);
        if (data.Question.UserAns) {
          onChangeJavaScript(data.Question.UserAns);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };


  // useEffect(() => {
  //   if (userAnsHTML || userAnsCSS) {
  //     setHtmlEdit(userAnsHTML);
  //   } else {
  //     setHtmlEdit(template);
  //   }
  // }, [userAnsHTML, userAnsCSS, template]);


  const handleNext = () => {
    setSubmitStatus('')
    setJSResponse('')
    setValidationStatus({})
    const nextQnNumber = Number(qn_Number) + 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    setNextBtn(false)
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('')
    // //console.log("Execute fetchNextData");

    const fetchNextData = async () => {
        const postData = {
            StudentId: decryptedStudentId,
            // Day_no: 1,
            Subject: decryptedcourse,
            Qn: Qn_name ,
            NextQn:"N",
          };
    // //console.log("IPhone", postData);

    try {
      const response = await fetch("https://surgebackend.azurewebsites.net/frontend/nav/qn/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      setJsEdit('')
      setData(data)
      // //console.log("data", data)
      setQuestion(data.Question);
      // //console.log("YYYYYYY :",data.Question)
      setQn_name(data.Question.Qn_name)
      setSubmitStatus(data.Question.UserSubmited)
      // //console.log("Tables", data.Tables)
      setQnNumber(data.Question.Qn_No)
      setQuestionName(data.Question.Qn)
      setHtmlEdit(data.Question.html_file)
      setCssEdit(data.Question.css_file)
      setJSFile(data.Question.js_file);
      setUserAnsJs(data.Question.UserAns || '')
      setTabs(data.Question.Tabs)
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      if(data.Question == 'None'){
        navigate('/QuestionPageFrontend')
      }
      setLoading(false);
      if (data.Question.UserAns) {
        onChangeJavaScript(data.Question.UserAns);
      }
    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  };

  fetchNextData();

  };
  

  const handlePrevious = () => {
    setNextBtn(false)
    setSubmitStatus('')
    setValidationStatus({})
    setJSResponse('')

    setClickCount('')
    const nextQnNumber = Number(qn_Number) + 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    // setNextBtn(false)
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    setResponseTestCase('')
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('')
    // //console.log("Execute fetchNextData");
  
    const fetchNextData = async () => {
      const postData = {
        StudentId: decryptedStudentId,
        // Day_no: sessionStorage.getItem('SelectedDay'),
        Subject: decryptedcourse,
        Qn: Qn_name ,
        NextQn:"P",
      };
    // //console.log("IPhone", postData);
  
    try {
      const response = await fetch("https://surgebackend.azurewebsites.net/frontend/nav/qn/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
  
      const data = await response.json();
      setJsEdit('')
      setData(data)
      // //console.log("data", data)
      setQuestion(data.Question);
      // //console.log("YYYYYYY :",data.Question)
      setQn_name(data.Question.Qn_name)
        setTabs(data.Question.Tabs)
        setSubmitStatus(data.Question.UserSubmited)
      // setAns(data.Question.Ans)
      // setTabs(data.Tables);
      // //console.log("Tables", data.Tables)
      // setExpectedOutput(data.Question.ExpectedOutput);
      // setTestCase(data.Question.TestCases)
      setQuestionName(data.Question.Qn)
      setQnNumber(data.Question.Qn_No)
      // //console.log("jhjhfdhjhfgdhhdfghdgdjfhg",data.Question.Qn_No)
      // setExample(data.Question.Examples)
      // //console.log("Cap", data.Question.Examples)
      // setFunctionCall(data.Question.FunctionCall)
      setHtmlEdit(data.Question.html_file)
      setCssEdit(data.Question.css_file)
      setJSFile(data.Question.js_file);
      setUserAnsJs(data.Question.UserAns || '')
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      // sessionStorage.setItem('QnName',data.Question.Qn_name)
      if(data.Question == 'None'){
        navigate('/QuestionPageFrontend')
      }
      setLoading(false);

      if (data.Question.UserAns) {
        onChangeJavaScript(data.Question.UserAns);
      }
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // navigate('/QuestionPageFrontend')
    }
  };
  
  fetchNextData();
  
  };


  const handleCloseAlert = () => {
    setShowAlert(false);
    setImageView(false);
  };


  const handleCheckCode = () => {
    
    setShowSubmitButton(true)
    let codeToTest;
    switch (activeTab) {
      case 'html':
        codeToTest = htmlEdit;
        break;
      case 'css':
        codeToTest = cssEdit;
        break;
      case 'js':
        codeToTest = jsEdit;
        break;
      default:
        codeToTest = '';
        break;
    }

    sendDataToCheck(activeTab, codeToTest);
  };



const sendDataToCheck = (type, code) => {
  const userCode = typeof code === 'string' ? code.split("\n") : code;
  const expectedCode = Array.isArray(jsfile) ? jsfile : jsfile.split("\n");
  setKeysLength(expectedCode.length);
  const standardizeCode = (line) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '}' || trimmedLine === ']' || trimmedLine === ')' || trimmedLine === '' || trimmedLine === '};' || trimmedLine === '];' || trimmedLine === ');') {
      return '';
    }
    return trimmedLine
      .replace(/\n/g, "")         // Remove newlines
      .replace(/"/g, "'")         // Replace double quotes with single quotes
      .replace(/\s+/g, '')        // Remove extra spaces
      .trim();                    // Trim the line
  };

  const standardizedUserCode = userCode.map(standardizeCode).filter(line => line !== '');
  const standardizedExpectedCode = expectedCode.map(standardizeCode).filter(line => line !== '');

  let newValidationStatus = {};

  // Check if userCode is empty
  if (standardizedUserCode.length === 0) {
    // Reset validation status to initial state
    setValidationStatus(prevStatus => ({
      ...prevStatus,
      js: {
        correct: 0,
        incorrect: 0,
        closures: 'pending',
        brackets: 'pending',
      }
    }));
    return; // Exit the function early
  }

  let satisfiedRequirementsCount = 0; // Variable to store the count of common satisfied lines

  // Line-by-line comparison
  standardizedUserCode.forEach((userLine, index) => {
    if (userLine === '' || typeof standardizedExpectedCode[index] === 'undefined') return;
    const expectedLine = standardizedExpectedCode[index];
    const isMatch = userLine === expectedLine;

    if (isMatch) {
      satisfiedRequirementsCount++; // Increment count for every match
    }

    newValidationStatus[index] = isMatch ? 'correct' : 'incorrect';
  });

  // Validate closures
  const validateClosures = (codeArray) => {
    const openingBraces = ['{', '[', '('];
    const closingBraces = ['}', ']', ')'];
    let stack = [];
  
    for (let line of codeArray) {
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
  
        // Check for opening braces
        if (openingBraces.includes(char)) {
          stack.push(char);
        }
  
        // Check for closing braces
        else if (closingBraces.includes(char)) {
          const lastBrace = stack.pop();
  
          // Validate if it's a correct closure for the current character
          if (closingBraces.indexOf(char) !== openingBraces.indexOf(lastBrace)) {
            return false;
          }
  
          // Special case for '})' combination
          if (char === '}' && i > 0 && line[i - 1] === ')') {
            // Ensure last closed parenthesis matches
            const secondLastBrace = stack.pop();
            if (secondLastBrace !== '(') {
              return false;
            }
          }
        }
      }
    }
  
    // Ensure no unclosed braces remain
    return stack.length === 0;
  };
  

  const userClosuresValid = validateClosures(userCode);
  const expectedClosuresValid = validateClosures(standardizedExpectedCode);

  newValidationStatus.closures = (userClosuresValid && expectedClosuresValid) ? 'correct' : 'incorrect';

  // Validate brackets
  const countBrackets = (codeArray) => {
    let openingCount = 0, closingCount = 0;
    codeArray.forEach(line => {
      openingCount += (line.match(/{/g) || []).length;
      closingCount += (line.match(/}/g) || []).length;
    });
    return { openingCount, closingCount };
  };

  const userBrackets = countBrackets(userCode);
  newValidationStatus.brackets = (userBrackets.openingCount === userBrackets.closingCount) ? 'correct' : 'incorrect';

  // Set the length of common satisfied requirements
  setUsercodeLength(satisfiedRequirementsCount);

  // Final setValidationStatus update in one line
  setValidationStatus(prevStatus => ({
    ...prevStatus,
    js: { ...prevStatus.js, ...newValidationStatus }
  }));
};

  
  const Handlepreview = () => {
    setShowAlert(true);
    setdispl('output');
  }
 
  const handleshow = () => { 
    setdispl('')
    setShowAlert(true);
}


const handleHome = () => {
  navigate('/CoursePage');
}
const handleIndex = () => {
  navigate('/IndexPage');

}



const renderEditor = () => {
  switch (activeTab) {
    case 'html':
      return (
        <CodeMirror
          className="text-xl mt-5 mb-3 text-start custom-codemirror"
          value={htmlEdit}
          height="100%"
          theme="light"
          extensions={[html()]}
          onChange={onChangeHtml}
          readOnly={true}
          style={{height: `calc(${editorHeightPercentage}vh - 5vh)`, overflowY:'auto', paddingBottom:'20px'}}
          contentEditable={false}
        />
      );
    case 'css':
      return (
        <CodeMirror
          className="text-xl mt-5 mb-3 text-start  custom-codemirror"
          value={cssEdit}
          height="100%"
          theme="light"
          extensions={[css()]}
          onChange={onChangeCss}
          readOnly={true}
          style={{height: `calc(${editorHeightPercentage}vh - 5vh)`, overflowY:'auto', paddingBottom:'20px'}}
          contentEditable={false}
        />
      );
    case 'js':
      return (
        <CodeMirror
          className="text-xl mt-5 mb-3 text-start custom-codemirror"
          value={jsEdit || userAnsJs}
          height="100%"
          theme="light"
          extensions={[javascript()]}
          onBeforeChange={(value) => {
            setJsEdit(value);
          }}
          onChange={(value) => {
            onChangeJavaScript(value); } }
          style={{height: `calc(${editorHeightPercentage}vh - 5vh)`, overflowY:'auto', paddingBottom:'20px'}}
        />
      );
    default:
      return null;
  }
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

  return (
    <div className="container-fluid" style={{fontFamily:'"Segoe UI", Arial, sans-serif'}}>
      
        <div className="row" id="captureElement" style={{height: '50vh', maxHeight:'100vh', }}>
          <div className="container" >
          <SessionTimeout/>
          {loading ? (
                <div className='' style={{width:'100%'}}>
                          <div 
    className="d-flex justify-content-center align-items-center" 
    style={{ 
        height: '100vh', 
        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
    }}
>
    <Spinner animation="border me-2" style={{ color: '#3F51B5' }} /> 
    Loading...
</div>
              <header className=" head text-white fixed-top d-flex justify-content-between align-items-center  px-8 p-1 border-bottom border-dark-subtle">
                <img src={logo} className='ms-3'  alt="Logo" height={42} width={120} />
                <div style={{fontSize:'15px'}}>
                  <span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>
                    {decryptedcourse.replace('_', ' ')}
                  </span> 
                  <FontAwesomeIcon icon={faGreaterThan} style={{fontSize: '10px'}} />
                  <span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/QuestionPageFrontend')}>
                    Question 
                  </span>
                  <FontAwesomeIcon icon={faGreaterThan} style={{fontSize: '10px'}} />
                  <span className='px-1'>{qnNumber}</span>
                </div>
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
                      <Dropdown.Menu className='px-2 pt-5 me-5 bg-light'>
                        <div className="text-center">
                          <Dropdown.Item ><img src={decryptedPicture} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
                          <Dropdown.Item className='fs-5 fw-bold'>{decryptedName}</Dropdown.Item>
                          <Dropdown.Item className=''>{decryptedEmail}</Dropdown.Item>
                          <Dropdown.Item className='pb-4'>{decryptedStudentId}</Dropdown.Item>
                        </div>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogOut} className=' outline-white rounded-pill  mb-2 text-white Logout' title='Logout' ><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </nav> 
                </header>
            </div> 
          ):(<>
            <div className='' style={{width:'100%'}}>
            <header className=" head text-white fixed-top d-flex justify-content-between align-items-center  px-8 p-1 border-bottom border-dark-subtle">
            <img src={logo} className='ms-3'  alt="Logo" height={42} width={120} />
            <div style={{fontSize:'15px'}}>
              <span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>
                {decryptedcourse.replace('_', ' ')}
              </span> 
              <FontAwesomeIcon icon={faGreaterThan} style={{fontSize: '10px'}} />
              <span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/QuestionPageFrontend')}>
                Question 
              </span>
              <FontAwesomeIcon icon={faGreaterThan} style={{fontSize: '10px'}} />
              <span className='px-1'>{qnNumber}</span>
            </div>
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
                  <span className='px-2   custom-btnEditor' onClick={handleTicket} title="Ticket">
                    <FontAwesomeIcon icon={faTicket} className="icons text-white" />
                  </span>
                  <span className='px-2   custom-btnEditor' onClick={handleHome} title="Home">
                    <FontAwesomeIcon icon={faHome} className="icons text-white" />
                  </span>
                  <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={decryptedName} className='' style={{color:'#7335B7'}}>
                  <img src={decryptedPicture} height={20} alt='' className='me-1 rounded-circle' />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='px-2 pt-5 me-5 bg-light'>
                    <div className="text-center">
                      <Dropdown.Item ><img src={decryptedPicture} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
                      <Dropdown.Item className='fs-5 fw-bold'>{decryptedName}</Dropdown.Item>
                      <Dropdown.Item className=''>{decryptedEmail}</Dropdown.Item>
                      <Dropdown.Item className='pb-4'>{decryptedStudentId}</Dropdown.Item>
                    </div>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogOut} className=' outline-white rounded-pill  mb-2 text-white Logout' title='Logout' ><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </nav> 
            </header>
        </div> 
            <div className='row body mt-4 pt-4 pb-3' style={{backgroundColor:'#E2F2FF', overflow:'hidden', maxHeight: '92.5vh'}}>
            <div className='qns'>
            </div>
            <div className="InputQuery  col-md-4 mx-1 p-4" style={{ height: '100vh', overflowY: 'auto',width: splitOffset, minWidth: '30%', maxWidth: '65%', backgroundColor:'#FFFFFF' }}>
                <div className='col result' >
                  <div className='row'>
                    <div style={{ width: '100%', height: '100vh', color:'black' }}>
                    <h3>Question:</h3>
                    <span className='mb-4 ' style={{fontFamily:'"Segoe UI", Arial, sans-serif'}}>{questionName}</span>
                      <div className='d-flex justify-content-start mt-3'>
                      <div className=" mb-3" style={{ backgroundColor: '', color: 'black' }}>
                          <h4>Requirements</h4> 
                      </div>
                      </div>
                      <div className=' text-start' style={{fontSize:'16px', paddingBottom:'100px',overflow:'hidden'}}>
                      {question && question.JS_Messages && question.JS_Messages.map((message, index) => (
                                  <div key={index} className="p-1">
                                      {validationStatus.js && validationStatus.js[index] === 'correct' ? (
                                          <FontAwesomeIcon icon={faCheckCircle} className="mx-1 text-success" />
                                      ) : (
                                          <FontAwesomeIcon icon={faCircleXmark} className="mx-1 text-danger" />
                                      )}
                                      <span className='pb-1' style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}>{message}</span>
                                  </div>
                              ))}

                              {validationStatus.js && validationStatus.js.brackets === 'correct' ? (
                                  <div className="p-1 ">
                                      <FontAwesomeIcon icon={faCheckCircle} className="mx-1 text-success" />
                                      <span>Brackets are correctly matched!</span>
                                  </div>
                              ) : (
                                  <div className="p-1 ">
                                      <FontAwesomeIcon icon={faCircleXmark} className="mx-1 text-danger" />
                                      <span>Mismatch in opening/closing brackets!</span>
                                  </div>
                              )}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className='curserDivHC' onMouseDown={handleMouseDown}></div>
            <div className="OutputDatabaseTables col mx-1 mb-3" style={{ height: '100%', overflow: 'hidden', width: splitOffset, backgroundColor:'#FFFFFF' }}>
              <div className="col" style={{ height: '100%', backgroundColor:'#' }}>
                <div className="col top mt-2" style={{ height: `${editorHeightPercentage}vh`,marginBottom:'10px', cursor:'text' }}>
                <Tabs 
                  activeKey={activeTab} 
                  onSelect={handleTabClick} 
                  className=""
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      eventKey={tabKeys[tab]}
                      title={tab}
                      className={activeTab === tabKeys[tab] ? 'selected-tab' : ''}
                      style={{
                        backgroundColor: activeTab === tabKeys[tab] ? '#7335B7' : '#FFFFFF'
                      }}
                    >
                    </Tab>
                  ))}
                </Tabs>
                  {renderEditor()}
                </div>
                <div className="Move" style={{ backgroundColor: '#E2F2FF', cursor: 'row-resize', margin: "-6px -12px" }} onMouseDown={handleVerticalMouseDown}>
                  <span style={{ display: 'inline-block', height: '3px' }}></span>
                </div>
                <div className="row down" style={{ height: `${outputHeightPercentage}vh`, overflow: 'auto' }}>
                <div className='' style={{backgroundColor:"#FFFFFF"}}>
                <div className="sticky-buttons-container">
                <div className='d-flex justify-content-between'>
                  <div className='d-flex justify-content-start mt-2'>
                    <div className="btn border" style={{ backgroundColor: '', color: 'black' }}>
                      Your Output
                    </div>
                    <FontAwesomeIcon 
                      icon={faExpand} 
                      className='px-1 mt-2 text-dark' 
                      onClick={Handlepreview} 
                      style={{ cursor: 'pointer', paddingTop: '5px' }} 
                    />
                  </div>
                  <div className='me-4'>
                    <>
                      {(submitStatus === 'Yes' || jsresponse==='Yes'  ) ? (
                        <button
                          className="btn btn-sm mt-2 text-white"
                          style={{ backgroundColor: '#7335B7', color: '#7335B7' }}
                          disabled
                        >
                          Submit Code
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm mt-2 text-white btnHvr"
                          style={{ backgroundColor: '#7335B7', color: '#7335B7' }}
                          onClick={handleSubmitClick}
                        >
                          Submit Code
                        </button>
                      )}
                      {(submitStatus === 'Yes' || jsresponse==='Yes' ) ? (
                        <button
                          className="btn btn-sm mt-2 ms-3 btnHvr"
                          onClick={handleNext}
                          style={{ backgroundColor: '#7335B7', color: 'white' }}
                        >
                          Next
                        </button>
                      ) : null}
                    </>
                  </div>
                </div>
              </div>
                      <div className="" style={{   width: '100%',   height:"98%",   backgroundColor: '#FFFFFF',   color: 'black',   borderColor: 'white', }}>
                      <iframe
                        style={{ width: '100%', minHeight: '90%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
                        className=""
                        srcDoc={srcCode}
                        title="output"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      ></iframe>
                      </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </>
          )}

            <div>
            </div>
          </div>
        </div>
      <Modal show={showAlert} onHide={handleCloseAlert} size='xl' aria-labelledby="" fullscreen >
        <Modal.Header className="close d-flex justify-content-between" style={{ backgroundColor: '#7335B7' }}>
          {displ === 'image' ? (
            <h5 className='ms-5 text-white'>Expected Output Preview</h5>
          ) : displ === 'output' ? (
            <h5 className='ms-5 text-white'>Your Output Preview</h5>
          ) : activeTab === 'html' ? (
            <h5 className='ms-5 text-white'>HTML Tag Explorer</h5>
          ) : (
            <h5 className='ms-5 text-white'>CSS Properties Explorer</h5>
          )}
          <button type="button" className='btn btn-light me-5' onClick={handleCloseAlert} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body className='' >
          {displ=='image'? 
          <img src={Preview_img} className="img-fluid mt-3" alt="image" style={{height:'95%', width:'100%', pointerEvents: 'none'}} />
          : displ=='output'?
            <iframe
      style={{ width: '100%', height: '95%',  backgroundColor: '', color: 'black', borderColor: 'white'}}
      className=" mt-3"
      srcDoc={srcCode}
      title="output"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>  
          :    <div>
      {activeTab === 'html' ? 
        <TableComponent searchTerm={searchTerm} /> : 
        <CSSComponent searchTerm={searchTerm} />
        }
    </div>
          }
          </Modal.Body>
      </Modal>
      <Modal show={showConfirmModal} size='lg' onHide={handleCloseConfirmModal} centered>
        <Modal.Body className='text-center'>
          Are you sure you want to submit Javascript assignment?
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
  
      {/* Bug Report Modal */}
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

export default JSEditor;