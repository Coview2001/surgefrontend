import React, { useState, useEffect, useRef, useCallback } from 'react';
import AceEditor from 'react-ace';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeMirror from "@uiw/react-codemirror";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

// import { javascript } from '@codemirror/lang-javascript';
// import { FaPhoenixFramework } from 'react-icons/fa';
import { BarLoader, SyncLoader } from 'react-spinners';
import './HTMLCSSEditor.css'
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal,faCheckCircle,faCircleXmark,faExpand, faCircleInfo, faMagnifyingGlass, faTicket } from '@fortawesome/free-solid-svg-icons';
import HeaderEditor from './HeaderEditor';
import { useNavigate } from 'react-router-dom';

import TableComponent from './TableComponent';
import CSSComponent from './CSSComponent';
import logo from '../Img/logo.png';
import { faEnvelope,faBell, faHome,faBug, faSignOut, faGreaterThan, faLessThan, faRectangleXmark  } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Spinner } from 'react-bootstrap';
import './Editor.css';
import html2canvas from 'html2canvas';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import SessionTimeout from '../SessionTimeout';
import { RiCustomerService2Fill } from "react-icons/ri";

const Editor = () => {
  const inputHandlerRef = useRef(null); // Store the input handler reference
  // const [pythonCode, setPythonCode] = useState('');
  const [output, setOutput] = useState('');
  const [inputQueue, setInputQueue] = useState([]); // To store inputs
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
  // const [splitOffset, setSplitOffset] = useState(1000);
  const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);
  const [DOMSTR, setDOMSTR] = useState('HTML DOM structure');
  const [DOMTRUE, setDOMTRUE] = useState(false);


  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);

  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); // in percentage (vh)
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)
  
  const navigate = useNavigate();
  const [Qn_name, setQn_name] = useState();
  const [question, setQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState('html');
  const [clickCount, setClickCount] = useState(0);
  const [data, setData] = useState();
  const [questionName, setQuestionName] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [template, setTemplate] = useState('');
  const [nextBtn, setNextBtn] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false); 
  const [qn_Number, setQn_Number] = useState();
  
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [Sample_img, setSample_img] = useState('');
  const [Preview_img, setPreview_img] = useState('');
  const [HTMLMessage, setHTMLMessage] = useState([]);
  const [CSSMessage, setCSSMessage] = useState([]);
  const [userAnsHTML, setUserAnsHTML] = useState();
  const [userAnsCSS, setUserAnsCSS] = useState();
  const [htmlEdit, setHtmlEdit] = useState('');
  const [cssEdit, setCssEdit] = useState('');
  // const [jsEdit, setJsEdit] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [cssHomeData, setcssHomeData] = useState();
  const [imageView, setImageView] = useState(false);
  const [displ, setdispl] = useState('');
  const [course, setCourse] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPicture, setuserPicture] = useState('');
  const [StudentId, setStudentId] = useState('');
  const [qnNumber, setQnNumber] = useState();
  const [submitHTMLStatus, setSubmitHTMLStatus] = useState('');
  const [submitCSSStatus, setSubmitCSSStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [HTMLStatusResponse, setHTMLStatusResponse] = useState('');
  const [CSSStatusResponse, setCSSStatusResponse] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ticketRaised, setTicketRaised] = useState(false)


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


    if (storedName && storedPicture && storedEmail && storedStudentId && storedQn_Number && storedCourse) {
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
    </body>
    </html>
  `;

  const tabKeys = {
    "HTML": "html",
    "CSS": "css",
    // "JS": "js",
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

//   const handleEnvelope = () => { 
//     navigate('/ChatApp');
//  }

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
    setDOMTRUE(false);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    handleCloseConfirmModal();
    handleSubmit();
  };

  const handleSubmit = () => {
    // //console.log("data submitted");
    setLoading(true);
    sendDataToBackend('html', htmlEdit);
    sendDataToBackend('css', cssEdit);
    setNextBtn(true);
  };

  const sendDataToBackend = (type, code) => {
    const subjectType = type.toUpperCase();
    const url = `https://surgebackend.azurewebsites.net/${type}/`;
    const data = {
      StudentId: decryptedStudentId,
      Subject: subjectType,
      Qn: Qn_name,
      KEYS: type === 'html' ? question.Code_Validation.HTML : question.Code_Validation.CSS,
      Ans: code || ' ',
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
      // //console.log("Panther", data);
      if (type === 'html') {
        setHTMLStatusResponse(data.HTMLStatuses);
      } else if (type === 'css') {
        setCSSStatusResponse(data.CSSStatuses);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      setLoading(false);
    });
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
    setDOMTRUE(false);
    setValidationStatus({})
        setCssEdit('')
        setHtmlEdit('')
        setData(data)
        // //console.log("data", data)
        setQuestion(data.Question);
        // //console.log("YYYYYYY :",data.Question)
        setQn_name(data.Question.Qn_name)
        // //console.log(data.Question.Qn_name)
        setQuestionName(data.Question.Qn)
        setSample_img(data.Question.Sample_img )
        setPreview_img(data.Question.Preview_img)
        setTemplate(data.Question.Template)
        setQnNumber(data.Question.Qn_No)
        setUserAnsHTML(data.Question.UserAnsHTML || data.Question.Template)
        setUserAnsCSS(data.Question.UserAnsCSS || '')
        setTabs(data.Question.Tabs )
        setHTMLMessage(data.Question.Code_Validation?.HTML_Messages || '');
        setCSSMessage(data.Question.Code_Validation?.CSS_Messages || '');
        setSubmitHTMLStatus(data.Question.UserSubmitedHTML);
        setSubmitCSSStatus(data.Question.UserSubmitedCSS);
        if(data.Question == 'None'){
          navigate('/QuestionPageFrontend')
        }
      setLoading(false);
        if (data.Question.UserAnsHTML || data.Question.UserAnsCSS) {
          // //console.log('UserAnsHTML', data.Question.UserAnsHTML)
          onChangeHtml(data.Question.UserAnsHTML);
          onChangeCss(data.Question.UserAnsCSS);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  

  useEffect(() => {
    if (userAnsHTML || userAnsCSS) {
      setHtmlEdit(userAnsHTML);
    } else {
      setHtmlEdit(template);
    }
  }, [userAnsHTML, userAnsCSS, template]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    // //console.log("=======================",lastTabKey)

    // if (tabKey === lastTabKey) {
    //   setNextBtn(true)
    //   } else {
    //     setNextBtn(false)
    //     }
  };


  const handleNext = () => {
    const nextQnNumber = Number(qn_Number) + 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    setNextBtn(false)
    setDOMTRUE(false);
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('')
    setValidationStatus({})
    setSubmitHTMLStatus('')
    setSubmitCSSStatus('')
    setCSSStatusResponse('')
    setHTMLStatusResponse('')
    // //console.log("Execute fetchNextData");

    const fetchNextData = async () => {
      const postData = {
        StudentId: decryptedStudentId,
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
      setActiveTab('html')
      setCssEdit('')
      setHtmlEdit('')
      setData(data)
      // //console.log("data", data)
      setQuestion(data.Question);
      // //console.log("YYYYYYY :",data.Question)
      setQn_name(data.Question.Qn_name)
      setQnNumber(data.Question.Qn_No)
      // //console.log("jhjhfdhjhfgdhhdfghdgdjfhg",data.Question.Qn_No)
      setQuestionName(data.Question.Qn)
      setSample_img(data.Question.Sample_img )
      setPreview_img(data.Question.Preview_img)
      setTemplate(data.Question.Template)
      setUserAnsHTML(data.Question.UserAnsHTML || data.Question.Template)
      // //console.log("sadfsfdsfsfsdfsdfdff", data.Question.UserAnsHTML)
      setUserAnsCSS(data.Question.UserAnsCSS || '')
      setSubmitHTMLStatus(data.Question.UserSubmitedHTML);
      setSubmitCSSStatus(data.Question.UserSubmitedCSS);
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      if(data.Question == 'None'){
        navigate('/QuestionPageFrontend')
      }
      setLoading(false);
        if (data.Question.UserAnsHTML || data.Question.UserAnsCSS) {
          // //console.log('UserAnsHTML', data.Question.UserAnsHTML)
          onChangeHtml(data.Question.UserAnsHTML);
          onChangeCss(data.Question.UserAnsCSS);
        }

    } catch (error) {
      console.error('Error :', error);
    }
  };

  fetchNextData();

  };
  

  const handlePrevious = () => {
    setValidationStatus({})
    setDOMTRUE(false);
    setSubmitHTMLStatus('')
    setSubmitCSSStatus('')
    setCSSStatusResponse('')
    setHTMLStatusResponse('')
    setCssEdit('')
    setHtmlEdit('')
    setClickCount('')
    const nextQnNumber = Number(qn_Number) - 1;
    sessionStorage.setItem('Qn_Number', nextQnNumber);
    // setNextBtn(false)
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    // setRunResponseTestCases('')
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('');
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
      setActiveTab('html')
      setData(data)
      // //console.log("data", data)
      setQuestion(data.Question);
      // //console.log("YYYYYYY :",data.Question)
      setQn_name(data.Question.Qn_name)
      setSample_img(data.Question.Sample_img )
      setPreview_img(data.Question.Preview_img)
      setTemplate(data.Question.Template)
      setQuestionName(data.Question.Qn)
      setQnNumber(data.Question.Qn_No)
      const encryptedQnName = CryptoJS.AES.encrypt(data.Question.Qn_name, secretKey).toString();
      sessionStorage.setItem('QnName', encryptedQnName);
      setUserAnsHTML(data.Question.UserAnsHTML || data.Question.Template)
      setUserAnsCSS(data.Question.UserAnsCSS || '')
      setSubmitHTMLStatus(data.Question.UserSubmitedHTML);
      setSubmitCSSStatus(data.Question.UserSubmitedCSS);
        if(data.Question == 'None'){
          navigate('/QuestionPageFrontend')
        }
      setLoading(false);
        if (data.Question.UserAnsHTML || data.Question.UserAnsCSS) {
          // //console.log('UserAnsHTML', data.Question.UserAnsHTML)
          onChangeHtml(data.Question.UserAnsHTML);
          onChangeCss(data.Question.UserAnsCSS);
        }
    } catch (error) {
      console.error('Error executing HtmlCSS:', error);
    }
  };
  
  fetchNextData();
  
  };


  const handleCloseAlert = () => {
    setShowAlert(false);
    setImageView(false);
  };


  const handleCheckCode = () => {
    // //console.log("first")
    setShowSubmitButton(true)
    let codeToTest;
    switch (activeTab) {
      case 'html':
        codeToTest = htmlEdit;
        break;
      case 'css':
        codeToTest = cssEdit;
        break;
      default:
        codeToTest = '';
        break;
    }

    sendDataToCheck(activeTab, codeToTest);
  };


  const sendDataToCheck = (type, code) => {
    // //console.log(question);
    if (!question) {
      // setAlertMessage('HomePageData is not available.');
      setShowAlert(true);
      return;
    }
  
    const htmlValidationData = question.Code_Validation.HTML;
    const cssValidationData = question.Code_Validation.CSS;
    // //console.log("sdjbgsdfjgbdfkbgdkjgb", htmlValidationData)
  
    // //console.log("python_RegxData", python_RegxData)
    setcssHomeData(cssValidationData);
  

    if (type === 'html') {
      const extractAttributes = (html) => {
        // validateHTML(html);
        // //console.log("SAM", html);
      
        // Normalize spacing around equals and commas
        const reducedHTML = html
          .toString()
          .split("\n")
          .map((line) => line.replace(/\s*=\s*/g, "="))
          .join("\n");
        const finalHtml = reducedHTML
          .toString()
          .split("\n")
          .map((line) => line.replace(/\s*,\s*/g, ", "))
          .join("\n");
      
        // Self-closing tags that do not require a closing tag
        const selfClosingTags = [
          "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
          "meta", "param", "source", "track", "wbr"
        ];
      
        // Tags that require a proper closing tag
        const nonSelfClosingTags = [
          "html", "title", "body", "head", "h1", "h2", "h3", "h4", "h5", "h6",
          "b", "strong", "small", "pre", "i", "em", "sub", "sup", "ins", "dfn",
          "del", "div", "span", "a", "ul", "ol", "li", "dl", "dd", "table", 
          "tr", "td", "th", "thead", "tbody", "tfoot", "form", "label", "fieldset", 
          "textarea", "script", "noscript", "figure", "figcaption", "header", 
          "nav", "main", "section", "footer", "abbr", "address", "blockquote", 
          "iframe", "aside", "audio", "code", "map", "object"
        ];
        
        const tagMatches = [...finalHtml.matchAll(/<(\w+)([^>]*)>/g)].map((match) => {
          const attributes = {};
          const tagName = match[1].toLowerCase();
      
          // Ensure the tag is properly formatted
          if (!match[0].endsWith('>')) {
            // //console.log(`Validation error: Opening tag <${tagName}> is not properly closed.`);
            return {
              tag: tagName,
              attributes,
              isSelfClosing: false,
              hasClosingTag: false,
              error: "Opening tag is not properly closed."
            };
          }
      
          const attributeMatches = [...match[2].matchAll(/(\w+)=["']([^"']*)["']/g)];
      
          attributeMatches.forEach((attrMatch) => {
            const attrName = attrMatch[1];
            let attrValue = attrMatch[2];
      
            // Handle complete attributes for href, src, data-url, and url without splitting
            if (["href", "src", "data-url", "url"].includes(attrName)) {
              const fullMatch = match[2].match(
                new RegExp(`${attrName}=["']([^"']*\\{\\{\\s*url_for\\s*\\([^\\)]+\\)\\s*[^"']*)["']`)
              );
              if (fullMatch) {
                attrValue = fullMatch[1];
              }
            }
      
            if (!attributes[attrName]) {
              attributes[attrName] = [];
            }
            attributes[attrName].push(attrValue);
          });
      
          const isSelfClosing = selfClosingTags.includes(tagName);
          const hasSelfClosingSyntax = match[0].endsWith("/>"); // Check if it's self-closing (e.g., <div ... />)
          const hasClosingTag = !selfClosingTags.includes(match[1].toLowerCase()) && new RegExp(`</${match[1]}>`).test(finalHtml); // Check for a proper closing tag
          // //console.log("323244", finalHtml)
          // Validate that non-self-closing tags like <div> are not self-closed
          if (nonSelfClosingTags.includes(tagName) && hasSelfClosingSyntax) {
            // //console.log(`Validation error: <${tagName}/> is not allowed, should be <${tagName}></${tagName}>.`);
            return {
              tag: tagName,
              attributes,
              isSelfClosing: false, // force non-self-closing tags to be marked as not self-closing
              hasClosingTag: false, // force validation failure
            };
          }
      
          // Validate that the tag has a closing tag if required
          if (!isSelfClosing && !hasClosingTag) {
            // //console.log(`Validation error: <${tagName}> must have a closing tag </${tagName}>.`);
            return {
              tag: tagName,
              attributes,
              isSelfClosing: false,
              hasClosingTag: false,
            };
          }
      
          return {
            tag: tagName,
            attributes,
            isSelfClosing,
            hasClosingTag,
          };
        });
      
        return tagMatches;
      };
      



      const validHTMLTags = [
        'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
        'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
        'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
        'data', 'datalist', 'dd', 'del', 'details', 'dialog', 'div',
        'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure',
        'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
        'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins',
        'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark',
        'meta','meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
        'output', 'p', 'param', 'picture', 'pre', 'progress', 'q',
        'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
        'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
        'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot',
        'th', 'thead', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video',
        'wbr'
      ];
 
      const validateHTML = (html) => {
        const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        const headTags = ['title', 'meta', 'link', 'style', 'script'];
        const bodyTags = ['head', 'html', ...headTags];
        const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
        const nonSelfClosingTags = [
          'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
          'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 
          'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dialog', 'div', 'dl', 'dt',
          'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 
          'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 
          'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 
          'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 
          'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 
          'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 
          'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 
          'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 
          'var', 'video', 'wbr'
        ];
        
        const HtmlTags = ['html', 'head', 'body'];
      
        const doctypeContent = html.match(/<!DOCTYPE html[^>]*>(.*?)<\/html>/s);
        const htmlContent = html.match(/<html[^>]*>(.*?)<\/html>/s);
        const headContent = html.match(/<head[^>]*>(.*?)<\/head>/si);
        const bodyContent = html.match(/<body[^>]*>(.*?)<\/body>/si);
      
        const isValidTag = (tagName) => validHTMLTags.includes(tagName);
        
        if (htmlContent == null) {
          setDOMSTR('Invalid DOM structure');
          setDOMTRUE(true);
          return false;
        } else {
          if (doctypeContent) {
            const docMatches = doctypeContent[1].match(tagPattern);
            for (let tag of docMatches || []) {
              const tagName = tag.replace(/<\/?|\/?>/g, '').split(' ')[0].toLowerCase();
              if (HtmlTags.includes(tagName) || !isValidTag(tagName)) {
                // Handle any invalid tags found
              }
            }
            setDOMSTR('HTML DOM structure');
            setDOMTRUE(false);
          }
      
          if (htmlContent) {
            const htmlMatches = htmlContent[1].match(tagPattern);
            for (let tag of htmlMatches || []) {
              const tagName = tag.replace(/<\/?|\/?>/g, '').split(' ')[0].toLowerCase();
              if (!isValidTag(tagName)) {
                // //console.log(`Misspelled or misplaced tag: ${tagName}`);
                setDOMSTR(`Invalid ${tagName} tag inside html tag due to possible spelling error`);
                setDOMTRUE(true);
                return false;
              }
            }
            setDOMSTR('HTML DOM structure');
            setDOMTRUE(false);
          }
      
          if (headContent) {
            const headMatches = headContent[1].match(tagPattern);
            for (let tag of headMatches || []) {
              const tagName = tag.replace(/<\/?|\/?>/g, '').split(' ')[0].toLowerCase();
              if (!headTags.includes(tagName) || !isValidTag(tagName)) {
                // //console.log('Invalid head tag:', tagName);
                setDOMSTR(`Invalid ${tagName} tag inside head tag`);
                setDOMTRUE(true);
                return false;
              }
            }
            setDOMSTR('HTML DOM structure');
            setDOMTRUE(false);
          }
      
          // Check if body exists
          if (!bodyContent || bodyContent[1].trim() === '') {
            return false;
          }
      
          // Validate body tags
          const bodyMatches = bodyContent[1].match(tagPattern);
          for (let tag of bodyMatches || []) {
            const tagName = tag.replace(/<\/?|\/?>/g, '').split(' ')[0].toLowerCase();
            if (bodyTags.includes(tagName) || !isValidTag(tagName)) {
              // //console.log('Invalid body tag:', tagName);
              setDOMSTR(`Invalid ${tagName} tag inside body tag`);
              setDOMTRUE(true);
              return false;
            }
            setDOMSTR('HTML DOM structure');
            setDOMTRUE(false);
          }
      
          // Validate self-closing tags
          const selfClosingMatches = bodyContent[1].match(/<([a-z][a-z0-9]*)\s*\/?>/gi);
          for (let tag of selfClosingMatches || []) {
            const tagName = tag.replace(/<\/?|\/?>/g, '').toLowerCase();
            if (selfClosingTags.includes(tagName)) {
              // //console.log(`Invalid self-closing tag: ${tagName}`);
              setDOMSTR(`Invalid self-closing tag: ${tagName}`);
              setDOMTRUE(true);
              return false;
            }
            else{
              if (!nonSelfClosingTags.includes(tagName)) {
                // //console.log(`Invalid non-self-closing tag: ${tagName}`);
                setDOMSTR(`Invalid non-self-closing tag: ${tagName}`);
                setDOMTRUE(true);
                return false;
              }
            }
          }
      
          // // Validate non-self-closing tags
          // const nonSelfClosingMatches = bodyContent[1].match(/<([a-z][a-z0-9]*)[^>]*>(.*?)<\/\1>/gi);
          // for (let tag of nonSelfClosingMatches || []) {
          //   const tagName = tag.replace(/<\/?([^>]+)>.*/g, '$1').toLowerCase();
            
          // }
      
          setDOMSTR('HTML DOM structure');
          setDOMTRUE(false);
          return true;
        }
      };
      
      
      // Use extractAttributes and validateHTML functions correctly
      const normalizedAttributes = extractAttributes(code);
      const isValidHTML = validateHTML(code);
      
      if (isValidHTML) {
        // //console.log("HTML is valid");
      } else {
        // //console.log("HTML is invalid");
      }
      
    
      const relevantAttributes = ['type', 'id', 'name', 'required', 'class', 'url'];
      
      const missingHTMLValues = htmlValidationData.filter(expectedTag => {
        const foundTags = normalizedAttributes.filter(actualTag => actualTag.tag === expectedTag.tag);
        let isTagMissing = false;
    
        const hasMatchingTag = foundTags.some(foundTag => {
          const expectedAttributes = expectedTag.attributes;
          const actualAttributes = foundTag.attributes;
    
          // Check if the tag is not self-closing and has a closing tag before matching attributes
          if (!foundTag.isSelfClosing && !foundTag.hasClosingTag) {
            return false;
          }
    
          return Object.keys(expectedAttributes).every(attr => {
            const expectedValues = Array.isArray(expectedAttributes[attr]) ? expectedAttributes[attr] : [expectedAttributes[attr]];
            const actualValues = Array.isArray(actualAttributes[attr]) ? actualAttributes[attr] : [actualAttributes[attr]];
    
            if (!actualValues || actualValues.length === 0) {
              expectedTag.missingAttributes = expectedTag.missingAttributes || {};
              expectedTag.missingAttributes[attr] = expectedValues;
              return false;
            }
    
            const allValuesMatch = expectedValues.every(val => actualValues.includes(val));
            if (!allValuesMatch) {
              expectedTag.missingAttributes = expectedTag.missingAttributes || {};
              expectedTag.missingAttributes[attr] = expectedValues.filter(val => !actualValues.includes(val));
              return false;
            }
    
            return true;
          });
        });
    
        if (!hasMatchingTag) {
          isTagMissing = true;
        }
    
        return isTagMissing;
      }).map(tag => {
        if (tag.missingAttributes) {
          // //console.log(`Tag <${tag.tag}> is missing attributes:`, tag.missingAttributes);
        }
        return tag;
      });
    
      const isHTMLValid = missingHTMLValues.length === 0;
    
      if (!isHTMLValid) {
        // setAlertMessage('Please clear the requirements');
      } else {
        // Now that the HTML is valid, we can execute the validateHTML function
        const isHeadAndBodyValid = validateHTML(code);  // Pass your HTML code to validate
    
        if (isHeadAndBodyValid) {
          // //console.log("HTML structure with head and body is valid.");
          // Continue with your process after validation
        } else {
          // //console.log("Invalid HTML structure detected (head/body tag issues).");
          // Handle the invalid structure case
        }
      }
    
      const presentIndices = htmlValidationData.map((item, index) => missingHTMLValues.includes(item) ? null : index).filter(index => index !== null);
      setValidationStatus(prevState => ({ ...prevState, html: presentIndices }));
    }
    
    
    



    else if (type === 'css') {
      if (typeof code !== 'string') {
          setShowAlert(true);
          return;
      }
    
      // Function to validate CSS rules
      const validateRules = (rules, blocks) => {
          return rules.filter(expectedRule => {
            
              const foundRule = blocks.find(block => {
                  const selector = block.split('{')[0].trim();
                  const properties = block.split('{')[1].split(';').map(prop => prop.trim()).filter(prop => prop !== '');
    
                  // Check if the selector matches and all properties are present
                  if (selector !== expectedRule.selector) {
                      return false;
                  }
    
                  // Check if all expected properties and values are present
                  return expectedRule.properties.every(expectedProp => {
                      const foundProp = properties.find(prop => {
                          const property = prop.split(':')[0].trim();
                          let value = prop.split(':')[1].trim();
    
                          // Remove spaces around commas in the value
                          const finalvalue = value.toString().split('\n').map(line => line.replace(/\s*,\s*/g, ', ')).join('\n');
                          return expectedProp.property === property && expectedProp.value === finalvalue;
     
                      });
                      return foundProp !== undefined;
                  });
              });
              return !foundRule;
          });
      };
    
      // Extract media query blocks and normal CSS blocks
      const mediaQueryRegex = /@media[^{]+\{([\s\S]+?})\s*}/g;
      let match;
      const mediaQueryBlocks = [];
      while ((match = mediaQueryRegex.exec(code)) !== null) {
          mediaQueryBlocks.push(match[0]);
      }
    
      // Remove media query blocks from code to get normal CSS blocks
      const normalCSS = code.replace(mediaQueryRegex, '');
      const normalBlocks = normalCSS.split('}').map(block => block.trim()).filter(block => block !== '');
    
      // Validate normal CSS rules
      const missingCSSRules = validateRules(cssValidationData.filter(rule => !rule.media_query), normalBlocks);
    
      // Validate media query rules
      const missingMediaQueryRules = {};
      cssValidationData.filter(rule => rule.media_query).forEach(mediaQuery => {
          const mediaQueryBlock = mediaQueryBlocks.find(block => block.includes(mediaQuery.media_query));
          if (mediaQueryBlock) {
              // Extract the content inside the media query block
              const startIndex = mediaQueryBlock.indexOf('{') + 1;
              const endIndex = mediaQueryBlock.lastIndexOf('}');
              const mediaQueryContent = mediaQueryBlock.substring(startIndex, endIndex).trim();
    
              // Split media query content by '}' to handle nested rules properly
              const blocks = mediaQueryContent.split('}').map(block => block.trim()).filter(block => block !== '');
    
              // Validate rules within media query
              const missingRules = validateRules(mediaQuery.rules, blocks);
              if (missingRules.length > 0) {
                  missingMediaQueryRules[mediaQuery.media_query] = missingRules;
              }
          } else {
              // If media query block is missing, add all its rules to missingMediaQueryRules
              missingMediaQueryRules[mediaQuery.media_query] = mediaQuery.rules;
          }
      });
    
      const isCSSValid = missingCSSRules.length === 0 && Object.keys(missingMediaQueryRules).length === 0;
    
      if (!isCSSValid) {
          // setAlertMessage('Please clear the requirements');
      }
    
      // Map through cssValidationData to find indices of valid rules
      const presentIndices = cssValidationData.map((item, index) => {
          if (item.media_query) {
              return missingMediaQueryRules[item.media_query] ? null : index;
          }
          return missingCSSRules.includes(item) ? null : index;
      }).filter(index => index !== null);
    
      setValidationStatus(prevState => ({ ...prevState, css: presentIndices }));
    }
    


    // setShowAlert(true);
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
          className="text-xl mt-5 mb-3 text-start "
          value={htmlEdit || userAnsHTML }
          height="98%"
          theme="light"
          backgroundColor=''
          extensions={[html()]}
          onChange={(value) => {
            onChangeHtml(value); 
            // validateHTML(value); 
          }}
          style={{height: `calc(${editorHeightPercentage}vh - 5vh)`, overflowY:'auto', color:'black', paddingBottom:'20px'}}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'c' || e.key === 'a' || e.key === 'V' || e.key === 'C' || e.key === 'A')) {
            e.preventDefault();
          }}}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        />
      );
    case 'css':
      return (
        <CodeMirror
          className="text-xl mt-5 mb-3 text-start  custom-codemirror"
          value={cssEdit || userAnsCSS}
          height="98%"
          theme="light"
          backgroundColor=''
          extensions={[css()]}
          onBeforeChange={(value) => {
            setCssEdit(value);
          }}
          onChange={(value) => {
            onChangeCss(value); } }
          style={{height: `calc(${editorHeightPercentage}vh - 5vh)`, overflowY:'auto', color:'black', paddingBottom:'20px'}}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'c' || e.key === 'a' || e.key === 'V' || e.key === 'C' || e.key === 'A')) {
            e.preventDefault();
          }}}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        />
      );
    // case 'js':
    //   return (
    //     <CodeMirror
    //       className="text-xl text-start border-gray-700 border"
    //       value={jsEdit}
    //       height="400px"
    //       theme="dark"
    //       extensions={[javascript()]}
    //       onChange={onChangeJavaScript}
    //     />
    //   );
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
                      <span className='px-2   custom-btnEditor'  title="Bug">
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
                  {/* <span className='px-2   custom-btnEditor'  title="Notification">
                    <FontAwesomeIcon icon={faBell} className="icons" />
                  </span> */}
                  <span className='px-2   custom-btnEditor' onClick={handleTicket} title="Ticket">
                    <FontAwesomeIcon icon={faTicket} className="icons text-white" />
                  </span>
                  {/* <span className='px-2   custom-btnEditor' onClick={handleEnvelope} title="Messages">
                    <FontAwesomeIcon icon={faEnvelope} className="icons" />
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
            <div className='row body mt-4 pt-4 pb-3 Helor' style={{backgroundColor:'#E2F2FF', overflow:'hidden', maxHeight: '92.5vh'}}>
            <div className='qns'>
            </div>
            <div className="InputQuery  col-md-4 mx-1 p-4" style={{ height: '100vh', overflowY: 'auto',width: splitOffset, minWidth: '30%', maxWidth: '65%', backgroundColor:'#FFFFFF' }}>
                <div className='col result' >
                  <div className='row'>
                    <div style={{ width: '100%', height: '100vh', color:'black' }}>
                    <h3>Question:</h3>
                    <span className='mb-4 ' style={{fontFamily:'"Segoe UI", Arial, sans-serif'}}>{questionName}</span>
                    <div className=' mt-2 d-flex justify-content-start'>
                      <div className="  " style={{ backgroundColor: '', color: 'black' }}>
                          <h4>Expected output</h4>
                      </div>
                      <FontAwesomeIcon icon={faExpand} className='mx-2  text-dark' onClick={handleImgView} style={{cursor:'pointer', color: '#495057', marginTop:'8px'}}/>
                      </div>
                      <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{pointerEvents: 'none', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', height:'35vh', maxWidth:'70%', minWidth:'20vw', width:'30vw'}} />
                      <div className='d-flex justify-content-start mt-3'>
                      <div className=" mb-3" style={{ backgroundColor: '', color: 'black' }}>
                          <h4>Requirements</h4> 
                      </div>
                      <FontAwesomeIcon icon={faCircleInfo} className=" mx-2" onClick={handleshow} style={{cursor:'pointer', color: '#495057', marginTop:'8px'}}/>
                      </div>
                      <div
  className="text-start"
  style={{ fontSize: '16px', paddingBottom: '100px', overflow: 'hidden' }}
  onMouseDown={(e) => e.preventDefault()}       // Prevents selection with mouse
  onSelectStart={(e) => e.preventDefault()}     // Prevents selection on all devices
  onCopy={(e) => e.preventDefault()}            // Prevents copy action
  onContextMenu={(e) => e.preventDefault()}     // Disables right-click context menu
  onKeyDown={(e) => {                           // Disables keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'x' || e.key === 'C' || e.key === 'A' || e.key === 'X')) {
      e.preventDefault();
    }
  }}
>
  {(() => {
    switch (activeTab) {
      case 'html':
        return (
          <>
            <span style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}>
              {DOMTRUE ? (
                <>
                  <FontAwesomeIcon icon={faCircleXmark} className="mx-1 text-danger" />
                  {DOMSTR}
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="mx-1 text-success" />
                  {`HTML DOM structure`}
                </>
              )}
            </span>
            {question.Code_Validation.HTML_Messages.map((message, index) => (
              <div key={index} className="d-flex align-items-center Helor">
                <span className="align-self-start">
                  {validationStatus.html && validationStatus.html.includes(index) ? (
                    <FontAwesomeIcon icon={faCheckCircle} className="mx-1 text-success" />
                  ) : (
                    <FontAwesomeIcon icon={faCircleXmark} className="mx-1 text-danger" />
                  )}
                </span>
                <span className="pb-1" style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}>{message}</span>
              </div>
            ))}
          </>
        );
      case 'css':
        return (
          <>
            {question.Code_Validation.CSS_Messages.map((message, index) => (
              <div key={index} className="d-flex align-items-center Helor">
                <span className="align-self-start">
                  {validationStatus.css && validationStatus.css.includes(index) ? (
                    <FontAwesomeIcon icon={faCheckCircle} className="mx-1 text-success" />
                  ) : (
                    <FontAwesomeIcon icon={faCircleXmark} className="mx-1 text-danger" />
                  )}
                </span>
                <span className="pb-1" style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}>{message}</span>
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  })()}
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
      {(submitHTMLStatus === 'Yes' || submitCSSStatus === 'Yes' || CSSStatusResponse === 'Yes' || HTMLStatusResponse === 'Yes') ? (
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
      {(submitHTMLStatus === 'Yes' || submitCSSStatus === 'Yes' || CSSStatusResponse === 'Yes' || HTMLStatusResponse === 'Yes') ? (
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
                        sandbox="allow-scripts allow-same-origin"
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
          Are you sure you want to submit both HTML and CSS assignment?
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

export default Editor;