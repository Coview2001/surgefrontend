import React, { useCallback, useState, useEffect } from 'react';
import { Tab, Tabs, Modal,Button,Spinner } from 'react-bootstrap';
import { useNavigate, useLocation  } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './DBFrontend.css'
import CryptoJS from 'crypto-js';
import axios from 'axios'
import { sql } from "@codemirror/lang-sql";
import html2canvas from 'html2canvas';
import CodeMirror from "@uiw/react-codemirror";
import InternshipHeader from './InternshipHeader';

function DBFrontend() {
  const [activeTab, setActiveTab] = useState('Table1');
  const [table1, setTable1] = useState('');
  const [table2, setTable2] = useState('');
  const [table3, setTable3] = useState('');
  const [table4, setTable4] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testMessage, setTestMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [TestValid, setTestValid] = useState();
  const location = useLocation();
  const [table1HomeData, setTable1HomeData] = useState();
  const [table2HomeData, setTable2HomeData] = useState();
  const [table3HomeData , setTable3HomeData] = useState();
  const [table4HomeData, setTable4HomeData] = useState();
  const [Page_Name, setPage_Name] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [userEmail, setUserEmail] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState('');
  const [tabs, setTabs] = useState([]);
  const [showBugReport, setShowBugReport] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [bugDesc, setBugDesc] = useState('');
  const [issueType, setIssueType] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const issueTypes = [
    'UI related topics',
    'Functionality related topics',
    'Performance related topics',
    'Security Vulnerability related topics',
    'Other related topics',
    'Require Tutor Assistance'
];
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
  const [satisfiedRequirementsLength, setsatisfiedRequirementsLength] = useState(0);
const secretKey = 'gvhbfijsadfkefjnujrbghj';
const [ticketRaised, setTicketRaised] = useState(false)
const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
const encryptedStudentId = sessionStorage.getItem('StudentId');
const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
const encryptedEmail = sessionStorage.getItem('Email');
const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
const encryptedprojectpage = sessionStorage.getItem('ProjectPage ');
const decryptedprojectpage = CryptoJS.AES.decrypt(encryptedprojectpage, secretKey).toString(CryptoJS.enc.Utf8);
const encryptedprojectname = sessionStorage.getItem("ProjectName ");
const decryptedprojectname = CryptoJS.AES.decrypt(
  encryptedprojectname,
  secretKey
)
  .toString(CryptoJS.enc.Utf8)
  ?.replace("_", " ");
const [isRunClicked, setIsRunClicked] = useState(false);
const [RequirementsLength, setRequirementsLength] = useState(0);

const [table1Explanation, setTable1Explanation] = useState([]);
const [table2Explanation, setTable2Explanation] = useState([]);
const [table3Explanation, setTable3Explanation] = useState([]);
const [table4Explanation, setTable4Explanation] = useState([]);
const [table1messages, setTable1messages] = useState([]);
const [table2messages, setTable2messages] = useState([]);    
const [table3messages, setTable3messages] = useState([]);
const [table4messages, setTable4messages] = useState([]);

  const navigate = useNavigate();
   const handleNext = () => {
    // //console.log("Page_Name", Page_Name)
    navigate('/DBPage_report', {state : {Page_Name}})
  }
  const srcCode = ``;
  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.srcdoc = srcCode;
    }
  }, [table1, table2, table3, table4]);
  // const handleCloseConfirmModal = () => {
  //   setShowConfirmModal(false)
  // }
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
  
  
  

      useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }, [isDragging, initialX]);
    
      useEffect(() => {
        window.addEventListener('mousemove', handleVerticalMouseMove);
        window.addEventListener('mouseup', handleVerticalMouseUp);
      
        return () => {
          window.removeEventListener('mousemove', handleVerticalMouseMove);
          window.removeEventListener('mouseup', handleVerticalMouseUp);
        };
      }, [isDraggingVertically, initialY]);
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
            setLoading(true); // Set loading to true when starting fetch
            const payload = {
                StudentId: decryptedStudentId,
                Page: decryptedprojectpage,
                ProjectName: decryptedprojectname,
            };
            try {
                const response = await axios.post(
                    'https://surgebackend.azurewebsites.net/internship/pages/',
                    payload
                );
               
                const HomePageData = response.data;
                // //console.log("000", HomePageData)
                setFetchedData(HomePageData);
                // //console.log("first", fetchedData)
                
                if (HomePageData) {
                    const storedEmail = decryptedEmail;
                    if (storedEmail) {
                        setUserEmail(storedEmail);
                    }
                    if (HomePageData.Page_Name && HomePageData.Tabs) {
                        setPage_Name(HomePageData.Page_Name);
                        setTabs(HomePageData.Tabs);
                        // Setting state for all tabs
                        setTable1(HomePageData.Response.Table1 || '');
                        setTable2(HomePageData.Response.Table2 || '');
                        setTable3(HomePageData.Response.Table3 || '');
                        setTable4(HomePageData.Response.Table4 || '');
                        setTable1Explanation(HomePageData.Explanation.Table1 || '');
                        setTable2Explanation(HomePageData.Explanation.Table2 || '');
                        setTable3Explanation(HomePageData.Explanation.Table3 || '');
                        setTable4Explanation(HomePageData.Explanation.Table4 || '');
                        setTable1messages(HomePageData.Code_Validation.Table1_Messages || '');
                        setTable2messages(HomePageData.Code_Validation.Table2_Messages || '');
                        setTable3messages(HomePageData.Code_Validation.Table3_Messages || '');
                        setTable4messages(HomePageData.Code_Validation.Table4_Messages || '');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch completes (success or error)
            }
        };
        fetchData();
    }, []);


  
  const onChangeTable1 = useCallback((value) => {
    setTable1(value);
  }, []);
 
  const onChangeTable2 = useCallback((value) => {
    setTable2(value);
  }, []);
 
  const onChangeTable3 = useCallback((value) => {
    setTable3(value);
  }, []);
 
  const onChangeTable4 = useCallback((value) => {
    setTable4(value);
  }, []);
 
  const handleSubmitClick = () => {
    // setDOMTRUE(false);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
  }
  const handleConfirmSubmit = () => {
    handleCloseConfirmModal();
    // handleCheckCode();
    handleSubmitCode();
  };
 
  const handleSubmitCode = () => {
    setLoading(true);
    let codeToTest;
    switch (activeTab) {
      case 'Table1':
        codeToTest = table1;
        break;
      case 'Table2':
        codeToTest = table2;
        break;
      case 'Table3':
        codeToTest = table3;
        break;
      case 'Table4':
        codeToTest = table4;
        break;
      default:
        codeToTest = '';
        break;
    }
 
    sendDataToBackend(activeTab, codeToTest, Page_Name);
 
    const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    if (activeTab === lastTabKey) {
      setFormSubmitted(true);
      setShowNextButton(true);
    }
    else {
      setFormSubmitted(false);
      setShowNextButton(false);
    }
  };
 
  const sendDataToBackend = (type, code ) => {
    const url = `https://surgebackend.azurewebsites.net/internship/submit/`;
    const data = {
      "Tabs": tabs,
      "Subject":"db",
      "StudentId": decryptedStudentId,
      "ProjectName":decryptedprojectname,
      "KEYS": '',
      "Score" :(satisfiedRequirementsLength + '/' + RequirementsLength).toString(),
      "Ans": code ,
      "Page" : '',
    };
    // //console.log("dataruitrtortorth", data)
 
    switch (type) {
      case 'Table1':
        data.KEYS = table1HomeData;
        data.Page = "Table1"
        break;
      case 'Table2':
        data.KEYS = table2HomeData;
        data.Page = "Table2"
        break;
      case 'Table3':
        data.KEYS = table3HomeData;
        data.Page = "Table3"
        break;
      case 'Table4':
        data.KEYS = table4HomeData;
        data.Page = "Table4"
        break;
      default:
        data.KEYS = '';
        data.Page = ""
        break;
    }
 
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setTestResult(data.score);
      setTestMessage(data.message);
      setTestValid(data.valid);
      setLoading(false);
      setAlertMessage(`Test Message: ${data.message}\nTest Result: ${data.score}`);
      // setShowAlert(true);
 
    })
    .catch(error => console.error('Error:', error));
  };
 
 
  const handleCheckCode = () => {
    setIsRunClicked(true);
    setShowSubmitButton(true)
    let codeToTest;
    switch (activeTab) {
      case 'Table1':
        codeToTest = table1;
        break;
      case 'Table2':
        codeToTest = table2;
        break;
      case 'Table3':
        codeToTest = table3;
        break;
      case 'Table4':
        codeToTest = table4;
        break;
      default:
        codeToTest = '';
        break;
    }
 
    sendDataToCheck(activeTab, codeToTest);
  };
 
  const sendDataToCheck = (type, code) => {

  
    // Extract validation data for each table
    const { Table1, Table2, Table3, Table4 } = fetchedData.Code_Validation;
  
    // Set validation data in the state
    setTable1HomeData(Table1);
    setTable2HomeData(Table2);
    setTable3HomeData(Table3);
    setTable4HomeData(Table4);
  
    // Function to normalize code by removing whitespace
    const normalizeCode = codeString => codeString.replace(/\s+/g, '');
  
    // Select validation data and normalize user input based on table type
    let validationData, normalizedUserCode;
    switch (type) {
      case 'Table1':
        validationData = Table1.map(item => normalizeCode(item));
        normalizedUserCode = normalizeCode(table1);
        break;
      case 'Table2':
        validationData = Table2.map(item => normalizeCode(item));
        normalizedUserCode = normalizeCode(table2);
        break;
      case 'Table3':
        validationData = Table3.map(item => normalizeCode(item));
        normalizedUserCode = normalizeCode(table3);
        break;
      case 'Table4':
        validationData = Table4.map(item => normalizeCode(item));
        normalizedUserCode = normalizeCode(table4);
        break;
      default:
        setAlertMessage('Invalid table type.');
        return;
    }
  
    // Find missing values by comparing validation data with user code
    const missingValues = validationData.filter(item => !normalizedUserCode.includes(item));
    const isValid = missingValues.length === 0;
  
    // Length of satisfied requirements (items not in missingValues)
    setsatisfiedRequirementsLength( validationData.length - missingValues.length);
    setRequirementsLength(validationData.length)
  
    // Update the alert message based on validation result
    setAlertMessage(
      `${type} Validation result: ${isValid ? 'You have cleared all requirements' : 'Not Valid'}`
    );
  
    if (!isValid) {
      setAlertMessage('Please clear the requirements');
    }
  
    // Identify indices of present items in the validation data
    const presentIndices = validationData
      .map((item, index) => (missingValues.includes(item) ? null : index))
      .filter(index => index !== null);
  
    // Update validation status in state
    setValidationStatus(prevState => ({ ...prevState, [type]: presentIndices }));
  
    // Optionally, you can log or return the length of satisfied requirements
    // //console.log(`Satisfied requirements length: ${satisfiedRequirementsLength}`);
  };
  
 
 
 
  const handleExplanation = () => {
    let explanationData;
    switch (activeTab) {
      case 'Table1':
        explanationData = fetchedData.Explanation.Table1;
        // //console.log("90-90-99-9", explanationData)
        // //console.log(HomePageData.Explanation.Table1)
        break;
      case 'Table2':
        // explanationData = HomePageData.Explanation.Table2;
        explanationData = fetchedData.Explanation.Table2;
        // //console.log('+========', explanationData)
        break;
      case 'Table3':
        explanationData = fetchedData.Explanation.Table3;
        break;
      case 'Table4':
        explanationData = fetchedData.Explanation.Table4;
        break;
      default:
        explanationData = '';
    }
    setExplanation(explanationData);
    // setShowAlert(true);
  };
 
  const resetModal = () => {
    setAlertMessage('');
    setExplanation('');
    setShowAlert(false);
  };
 
  const handleCloseAlert = () => {
    setShowAlert(false);
    setExplanation('');
    resetModal();
  };
 
 
  const getButtonText = () => {
    switch (activeTab) {
      case 'Table1':
        return 'Submit Table1 Code';
      case 'Table2':
        return 'Submit Table2 Code';
      case 'Table3':
        return 'Submit Table3 Code';
      case 'Table4':
        return 'Submit Table4 Code';
      default:
        return 'Submit';
    }
  };
 
  const renderEditor = () => {
    switch (activeTab) {
      case 'Table1':
        return (
          // <AceEditor
          //             mode="sql"
          //             theme="dreamweaver"
          //             onChange={onChangeTable1 }
          //             value={table1}
          //             fontSize={14}
          //             showPrintMargin={false}
          //             showGutter={false}
          //             highlightActiveLine={false}
          //             wrapEnabled={true}
          //             className="text-xl  text-start mt-3"
          //             style={{ width: '100%', }} 
          //           />
          <CodeMirror
            className="text-xl mb-3 text-start custom-codemirror"
            value={table1}
            height="100%"
            width='100%'
            theme="light"
            extensions={[sql()]} // Use SQL extension for syntax highlighting
            onChange={(value) => {
              onChangeTable1(value); 
              // validateSQL(value); // Use if you have SQL validation
            }}
            style={{
              height: `calc(${outputHeightPercentage}vh - 4.5vh)`,
              overflowY: 'auto',
              color: 'black',
              paddingBottom: '20px',
            }}
          />
        );
      case 'Table2':
        return (
          // <AceEditor
          //             mode="sql"
          //             theme="dreamweaver"
          //             onChange={onChangeTable2 }
          //             value={table2}
          //             fontSize={14}
          //             showPrintMargin={false}
          //             showGutter={false}
          //             highlightActiveLine={false}
          //             wrapEnabled={true}
          //             className="text-xl  text-start mt-3"
          //             style={{ width: '100%', }} 
          //           />
<CodeMirror
  className="text-xl mb-3 text-start custom-codemirror"
  value={table2}
  height="100%"
  width='100%'
  theme="light"
  extensions={[sql()]} // Use SQL extension for syntax highlighting
  onChange={(value) => {
    onChangeTable2(value); 
    // validateSQL(value); // Use if you have SQL validation
  }}
  style={{
    height: `calc(${outputHeightPercentage}vh - 4.5vh)`,
    overflowY: 'auto',
    color: 'black',
    paddingBottom: '20px',
  }}
/>
        );
      case 'Table3':
        return (
        //   <AceEditor
        //             mode="sql"
        //             theme="dreamweaver"
        //             onChange={onChangeTable3 }
        //             value={table3}
        //             fontSize={14}
        //             showPrintMargin={false}
        //             showGutter={false}
        //             highlightActiveLine={false}
        //             wrapEnabled={true}
        //             className="text-xl  text-start mt-3"
        //             style={{ width: '100%', }} 
        // />
<CodeMirror
  className="text-xl mb-3 text-start custom-codemirror"
  value={table3}
  height="100%"
  width='100%'
  theme="light"
  extensions={[sql()]} // Use SQL extension for syntax highlighting
  onChange={(value) => {
    onChangeTable3(value); 
    // validateSQL(value); // Use if you have SQL validation
  }}
  style={{
    height: `calc(${outputHeightPercentage}vh - 4.5vh)`,
    overflowY: 'auto',
    color: 'black',
    paddingBottom: '20px',
  }}
/>
        );
      case 'Table4':
        return (
        //   <AceEditor
        //           mode="sql"
        //           theme="dreamweaver"
        //           onChange={onChangeTable4 }
        //           value={table4}
        //           fontSize={14}
        //           showPrintMargin={false}
        //           showGutter={false}
        //           highlightActiveLine={false}
        //           wrapEnabled={true}
        //           className="text-xl  text-start mt-3"
        //           style={{ width: '100%', }} 
        // />
<CodeMirror
  className="text-xl mb-3 text-start custom-codemirror"
  value={table4}
  height="100%"
  width='100%'
  theme="light"
  extensions={[sql()]} // Use SQL extension for syntax highlighting
  onChange={(value) => {
    onChangeTable4(value); 
    // validateSQL(value); // Use if you have SQL validation
  }}
  style={{
    height: `calc(${outputHeightPercentage}vh - 4.5vh)`,
    overflowY: 'auto',
    color: 'black',
    paddingBottom: '20px',
  }}
/>
        );
      default:
        return null;
    }
  };
 
  // const handleTab = () => {
  //   setShowSubmitButton(false)
  // }
  
  // const handleConfirmSubmit = () => {
  //   handleCloseConfirmModal();
  //   handleSubmitCode();
  // };
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
  const handleHome = () => {
    navigate('/CoursePage');
  }
  const tabKeys = {
    "Table1": "Table1",
    "Table2": "Table2",
    "Table3": "Table3",
    "Table4": "Table4",
  };
  const encryptedCourse = sessionStorage.getItem('course');
  const decryptedCourse = CryptoJS.AES.decrypt(encryptedCourse, secretKey).toString(CryptoJS.enc.Utf8)
 
  const handleTab = (selectedKey) => {
    setShowSubmitButton(false)
    setActiveTab(selectedKey);
    handleTabChange(selectedKey);
    // //console.log("-=-=-=-=",selectedKey)
    const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    // //console.log("=======================",lastTabKey)
  };
 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsRunClicked(false); // Reset `isRunClicked` when tabs change
  };

  const handleNextbutton = () => {
    navigate("/DBPage_report", { state: { Page_Name } })
  }
  return (
      <>
      <div className="container-fluid"style={{fontFamily:'"Segoe UI", Arial, sans-serif'}}>
    <div className="row" id="captureElement" style={{height: '50vh', maxHeight:'90vh', }}>
      <div className="container" >
        <InternshipHeader/>
      {/* <SessionTimeout/> */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border mx-3" style={{ color: '#3F51B5' }} /> Loading...
                    </div>
      ) : (
        <div className="row" style={{height: '50vh', maxHeight:'90vh'}}>
          <div className='container-fluid'>
         
            <div className='row body mt-5 pt-2' style={{backgroundColor:'#E2F2FF', overflow:'hidden', maxHeight: '93vh'}}>
            <div className='qns'>
            </div>
              <div className="InputQuery col-md-4" style={{ height: '100vh', overflow: 'hidden', width: splitOffset, minWidth: '30%', maxWidth: '60%' }}>
                <div className="col result" style={{ height: '100%' }}>
                <div className="row leftTop" style={{ height: `${leftTopHeightPercentage}vh`, backgroundColor: '#FFFFFF'}}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', overflowY: 'auto',color: 'black' }}>
    <div className="mb-3" style={{ position: 'sticky', top: '0', backgroundColor: '#ffffff', zIndex: '1' }}>
    <h4 className="d-inline-block border rounded text-center mt-2 mb-2 px-3 p-1 " style={{
        boxShadow: '2px 2px 4px black',
        backgroundColor: '#fff',
        fontSize: '16px',
        borderColor: 'black',
        width:'140px'
      }}>Explanation</h4>
                    </div>
    <div style={{ height:'80%'}}>
          {(() => {
    switch (activeTab) {
        case 'Table1':
            return (
                <div className='p-2'>
                    {table1Explanation.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            );
        case 'Table2':
            return (
                <div className='p-2'>
                    {table2Explanation.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            );
        case 'Table3':
            return (
                <div className='p-2'>
                    {table3Explanation.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            );
        case 'Table4':
            return (
                <div className='p-2'>
                    {table4Explanation.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            );
        default:
            return null;
    }
})()}
</div>
                      </div>
                  </div> 


                  <div
                    className="MoveUPDown"
                    onMouseDown={handleVerticalMouseDownLeft}
                    ></div>
                     <div className="row leftDown" style={{ height: `${leftDownHeightPercentage}vh`,backgroundColor: '#FFFFFF' }}>
                     <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', overflowY: 'auto',color: 'black' }}>
    <div className="mb-3" style={{ position: 'sticky', top: '0', backgroundColor: '#ffffff', zIndex: '1' }}>
                      <h4 className="d-inline-block border rounded text-center mt-2 mb-2 px-3 p-1 " style={{
        boxShadow: '2px 2px 4px black',
        backgroundColor: '#fff',
        fontSize: '16px',
        borderColor: 'black',
        width:'140px'
      }}>Requirements</h4>
                    </div>
                <div className='mb-5' style={{ height:'100%'}}>
                  {(() => {
                    switch (activeTab) {
                        case 'Table1':
                            return table1messages.map((message, index) => (
                              <div key={index}
                              className={`p-2  ${validationStatus.Table1 && validationStatus.Table1.includes(index) ? 'text-success' : 'text-danger'}`}>
                                    {validationStatus.Table1 && validationStatus.Table1.includes(index) ? (
                                      <i className="fas fa-check-circle text-success mx-1"></i>
                                    ) : (
                                      <i className="fas fa-times-circle text-danger mx-1"></i>
                                    )}{message}</div>
                            ));
                        case 'Table2':
                            return table2messages.map((message, index) => (
                              <div key={index}
                              className={`p-2  ${validationStatus.Table2 && validationStatus.Table2.includes(index) ? 'text-success' : 'text-danger'}`}>
                                    {validationStatus.Table2 && validationStatus.Table2.includes(index) ? (
                                      <i className="fas fa-check-circle text-success mx-1"></i>
                                    ) : (
                                      <i className="fas fa-times-circle text-danger mx-1"></i>
                                    )}{message}</div>
                            ));
                      case 'Table3':
                        return table3messages.map((message, index) => (
                          <div key={index}
                          className={`p-2  ${validationStatus.Table3 && validationStatus.Table3.includes(index) ? 'text-success' : 'text-danger'}`}>
                                {validationStatus.Table3 && validationStatus.Table3.includes(index) ? (
                                  <i className="fas fa-check-circle text-success mx-1"></i>
                                ) : (
                                  <i className="fas fa-times-circle text-danger mx-1"></i>
                                )}{message}</div>
                        ));
                      case 'Table4':
                        return table4messages.map((message, index) => (
                          <div key={index}
                          className={`p-2  ${validationStatus.Table4 && validationStatus.Table4.includes(index) ? 'text-success' : 'text-danger'}`}
                          >
                                {validationStatus.Table4 && validationStatus.Table4.includes(index) ? (
                                  <i className="fas fa-check-circle text-success mx-1"></i>
                                ) : (
                                  <i className="fas fa-times-circle text-danger mx-1"></i>
                                )}
                                {message}
                            </div>
                        ));
                      default:
                        return null;
                    }
                  })()}
                         <br/>
                </div>
                      </div>
                      </div>
                </div>
            </div> 
            <div className='curserDivPy' onMouseDown={handleMouseDown} ></div>
              <div className="OutputDatabaseTables col mx-1" style={{ height: '93vh', overflow: 'hidden', width: splitOffset, minWidth: '30%' }}>
                <div className="col" style={{ height: '100%', backgroundColor:'#fff', }}>
                  <div className="row pt-3" style={{ height: `${editorHeightPercentage}vh`, overflowY: 'auto', width: '105%', backgroundColor: '#ffffff',textWrap:'wrap' }}>
                  <h5 style={{fontWeight: 'normal'}}>{activeTab.length > 1
                      ? activeTab.slice(0, -1) + ' ' + activeTab.slice(-1)
                      : activeTab} {fetchedData.Qn} : {fetchedData.Qn}</h5>
                  </div>
                  <div className="Move" style={{ cursor: 'row-resize', height: '70px', backgroundColor: '#E2F2FF' }} onMouseDown={handleVerticalMouseDown}>
                    <div className="Move" style={{ cursor: 'row-resize', height: '60px', backgroundColor: '#E2F2FF' }} onMouseDown={handleVerticalMouseDown}>
                      <div className='row' >
                          <div className='col-12' style={{   backgroundColor: 'rgb(226, 242, 255)'}}>
                            <div className='MessageDiv d-flex justify-content-start align-items-center col-12 pe-5 text-wrap'>
                            <Tabs
                                activeKey={activeTab}
                                onSelect={handleTab}
                                className="mt-3"
                                style={{ backgroundColor: '#fff' }}
                              >
                                {tabs.map((tab, index) => {
                                  const modifiedTabTitle = tab.length > 1
                                    ? tab.slice(0, -1) + ' ' + tab.slice(-1)
                                    : tab;
                              
                                  return (
                                    <Tab
                                      key={index}
                                      eventKey={tabKeys[tab]}
                                      title={modifiedTabTitle}
                                      className={activeTab === tabKeys[tab] ? 'selected-tab' : ''}
                                      style={{
                                        backgroundColor: 'black',
                                      }}
                                    >
                                    </Tab>
                                  );
                                })}
                              </Tabs>
                            </div>                           
                           <div className=' d-flex justify-content-end align-items-center col-12 text-wrap'>
                           <button 
                                className="btn btn-sm me-1" 
                                onClick={() => { 
                                  // handleRun(false); 
                                  handleCheckCode();
                                   // Set `isRunClicked` to true when RUN CODE is clicked
                                }} 
                                style={{ backgroundColor: '#FFFFFF', color: '#000000', whiteSpace: 'nowrap', minWidth: '100px', boxShadow: '1px 2px 1px #888888' }}
                              >
                                RUN CODE
                              </button>

                              {(
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
                                    {/* {formSubmitted && showNextButton && (
        <button 
          className="btn btn-sm" 
          onClick={handleNextbutton} 
          style={{ backgroundColor: '#ADD8E6', color: '#000000', whiteSpace: 'nowrap', minWidth: '110px', boxShadow: '1px 2px 1px #888888' }}
        >
          NEXT
        </button>
      )} */}
                           </div>
                          </div>
                       </div>
                     </div>         
                  </div>
                  <div
                    className="col"
                    style={{
                      height: `${editorHeightPercentage}vh`,
                      backgroundColor: "#ffffff",
                      marginLeft: "-10px",
                      marginRight: "-10px",
                      textWrap: "wrap",
                    }}
                  >
                    <div className="editor" style={{}}>
                      {renderEditor()}
                    </div>
                  </div>
                </div>
              </div>
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

      <Modal show={showConfirmModal} size='lg' onHide={handleCloseConfirmModal} centered>
        <Modal.Body className='text-center'>
        Are you certain you wish to submit the code from {activeTab.length > 1 ? activeTab.slice(0, -1) + ' ' + activeTab.slice(-1) : activeTab} ?
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
    </>
  );
}
 
export default DBFrontend;