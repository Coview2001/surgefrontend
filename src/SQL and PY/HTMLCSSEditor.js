import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CodeMirror from "@uiw/react-codemirror";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
// import { javascript } from '@codemirror/lang-javascript';
// import { FaPhoenixFramework } from 'react-icons/fa';
import { BarLoader, SyncLoader } from 'react-spinners';
import './HTMLCSSEditor.css'
import {  Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle,faCircleXmark,faExpand, faCircleInfo, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import TableComponent from './TableComponent';
import CSSComponent from './CSSComponent';
import logo from '../Img/logo.png';
import {  faHome, faSignOut, faGreaterThan, faLessThan  } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';




const HTMLCSSEditor = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);


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
  const [nextBtn, setNextBtn] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false); 
  const [qn_Number, setQn_Number] = useState();
  

  const [tabs, setTabs] = useState([]);
  const [Sample_img, setSample_img] = useState('');
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
  const [day, setDay] = useState();
  const [qnNumber, setQnNumber] = useState();
  const [submitHTMLStatus, setSubmitHTMLStatus] = useState('');
  const [submitCSSStatus, setSubmitCSSStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [HTMLStatusResponse, setHTMLStatusResponse] = useState('');
  const [CSSStatusResponse, setCSSStatusResponse] = useState('');





  useEffect(() => {

    const storedQn_Number= sessionStorage.getItem('Qn_Number');
    const storedName = sessionStorage.getItem('Name');
    const storedEmail = sessionStorage.getItem('Email');
    const storedPicture = sessionStorage.getItem('Picture');
    const storedStudentId = sessionStorage.getItem('StudentId');
    const storedDay= sessionStorage.getItem('SelectedDay');
    const storedCourse = sessionStorage.getItem('course');


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

  
  // const handleTab = (selectedKey) => {
  //   setShowSubmitButton(false)
  //   setActiveTab(selectedKey);
  //   const lastTabKey = tabKeys[tabs[tabs.length - 1]];
  //   //console.log("=======================",lastTabKey)

  // };


  const handleSearch = (event) => {
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

  const handlesubmit = () => { 
    // //console.log("data submitted")
    setLoading(true);
    setNextBtn(true)
    let codeToTest = '';
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

    sendDataToBackend(activeTab, codeToTest);
  };

  const sendDataToBackend = (type, code) => {
    const stubjecttype=type.toUpperCase();
    const url = `https://surgebackend.azurewebsites.net/${type}/`;
    const data = {
      StudentId: sessionStorage.getItem('StudentId'),
      Subject: stubjecttype,
      Qn: Qn_name,
      KEYS: type === 'html' ? question.Code_Validation.HTML : question.Code_Validation.CSS,
      Ans: code || '',
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
      // //console.log("Panther",data)
      setHTMLStatusResponse(data.HTMLStatuses)
      setCSSStatusResponse(data.CSSStatuses)
      // setTestResult(data.score);
      // setTestMessage(data.message);
      // setTestValid(data.valid);
      // setAlertMessage(`Test Message: ${data.message}\nTest Result: ${data.score}`);
      // setShowAlert(true);
    })
    .catch(error => {
      console.error('Error:', error);
      // setAlertMessage('An error occurred while processing your request.');
      // setShowAlert(true);
    })
    .finally(() => {
      setLoading(false); 
    });

    // const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    // if (activeTab === lastTabKey) {
    // setNextBtn(true) 
    //   // setFormSubmitted(true);
    //   // setShowNextButton(true);
    // } else {
    // setNextBtn(false) 

    //   // setFormSubmitted(false);
    //   // setShowNextButton(false);
    // }
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
          Course: sessionStorage.getItem('course'),
          // Day: sessionStorage.getItem('SelectedDay'),
          Qn_name: sessionStorage.getItem('QnName')
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
        setQnNumber(data.Question.Qn_No)
        setUserAnsHTML(data.Question.UserAnsHTML || '')
        setUserAnsCSS(data.Question.UserAnsCSS || '')
        setTabs(data.Question.Tabs )
        setHTMLMessage(data.Question.Code_Validation?.HTML_Messages || '');
        setCSSMessage(data.Question.Code_Validation?.CSS_Messages || '');
        setSubmitHTMLStatus(data.Question.UserSubmitedHTML);
        setSubmitCSSStatus(data.Question.UserSubmitedCSS);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  

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
    setIsNextClicked(true)
    setLoading(true)
    setOutput('');
    setIsNextClicked(false);
    setSuccessMessage('');
    setAdditionalMessage('')
    // //console.log("Execute fetchNextData");

    const fetchNextData = async () => {
      const postData = {
        StudentId: sessionStorage.getItem('StudentId'),
        Subject: sessionStorage.getItem('course'),
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
      setUserAnsHTML(data.Question.UserAnsHTML || '')
      // //console.log("sadfsfdsfsfsdfsdfdff", data.Question.UserAnsHTML)
      setUserAnsCSS(data.Question.UserAnsCSS || '')
      setSubmitHTMLStatus(data.Question.UserSubmitedHTML);
      setSubmitCSSStatus(data.Question.UserSubmitedCSS);
      setLoading(false);
    } catch (error) {
      console.error('Error :', error);
    }
  };

  fetchNextData();

  };
  

  const handlePrevious = () => {
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
    setAdditionalMessage('')
    // //console.log("Execute fetchNextData");
  
    const fetchNextData = async () => {
      const postData = {
        StudentId: sessionStorage.getItem('StudentId'),
        // Day_no: sessionStorage.getItem('SelectedDay'),
        Subject: sessionStorage.getItem('course'),
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
      setQuestionName(data.Question.Qn)
      setQnNumber(data.Question.Qn_No)
      setUserAnsHTML(data.Question.UserAnsHTML || '')
      setUserAnsCSS(data.Question.UserAnsCSS || '')
      setSubmitHTMLStatus(data.Question.UserSubmitedHTML);
      setSubmitCSSStatus(data.Question.UserSubmitedCSS);
      setLoading(false);
    } catch (error) {
      // console.error('Error executing SQL query:', error);
      navigate('/QuestionPageFrontend')
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
  
    // //console.log("python_RegxData", python_RegxData)
    setcssHomeData(cssValidationData);
  

    if (type === 'html') {
      const extractAttributes = html => {
        const tagMatches = [...html.matchAll(/<(\w+)([^>]*)>/g)].map(match => {
          const attributes = {};
          const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
          const attributeMatches = [...match[2].matchAll(/(\w+)=["']([^"']*)["']/g)];
    
          attributeMatches.forEach(attrMatch => {
            const attrName = attrMatch[1];
            let attrValue = attrMatch[2];
    
            // Handle complete attributes for href, src, data-url, and url without splitting
            if (['href', 'src', 'data-url', 'url'].includes(attrName)) {
              const fullMatch = match[2].match(new RegExp(`${attrName}=["']([^"']*\\{\\{\\s*url_for\\s*\\([^\\)]+\\)\\s*[^"']*)["']`));
              if (fullMatch) {
                attrValue = fullMatch[1];
              }
            }
    
            if (!attributes[attrName]) {
              attributes[attrName] = [];
            }
            attributes[attrName].push(attrValue);
          });
          // //console.log("ironman",match[1])
    
          return {
            tag: match[1],
            attributes,
            isSelfClosing: selfClosingTags.includes(match[1].toLowerCase()), // Check if the tag is in the self-closing tag list
            hasClosingTag: !selfClosingTags.includes(match[1].toLowerCase()) && new RegExp(`</${match[1]}>`).test(html) // Check if closing tag exists for non-self-closing tags
          };
        });
        return tagMatches;
      };
    
      const normalizedAttributes = extractAttributes(code);
      
      const relevantAttributes = ['type', 'id', 'name', 'required', 'class', 'url'];
    
      const missingHTMLValues = htmlValidationData.filter(expectedTag => {
        const foundTags = normalizedAttributes.filter(actualTag => actualTag.tag === expectedTag.tag);
        let isTagMissing = false;
    
        const hasMatchingTag = foundTags.some(foundTag => {
          const expectedAttributes = expectedTag.attributes;
          const actualAttributes = foundTag.attributes;
    
          // Check if the tag is not self-closing and has a closing tag before matching attributes
          if (!foundTag.isSelfClosing && !foundTag.hasClosingTag) {
            // //console.log(`Tag <${foundTag.tag}> is missing a closing tag.`);
            return false;
          }
    
          return Object.keys(expectedAttributes).every(attr => {
            const expectedValues = Array.isArray(expectedAttributes[attr]) ? expectedAttributes[attr] : [expectedAttributes[attr]];
            const actualValues = Array.isArray(actualAttributes[attr]) ? actualAttributes[attr] : [actualAttributes[attr]];
    
            if (!actualValues || actualValues.length === 0) {
              // //console.log(`Missing attribute: ${attr} in tag <${expectedTag.tag}>`);
              expectedTag.missingAttributes = expectedTag.missingAttributes || {};
              expectedTag.missingAttributes[attr] = expectedValues;
              return false;
            }
    
            const allValuesMatch = expectedValues.every(val => actualValues.includes(val));
            if (!allValuesMatch) {
              // //console.log(`Attribute ${attr} in tag <${expectedTag.tag}> has mismatched values. Expected: ${expectedValues}, Actual: ${actualValues}`);
              expectedTag.missingAttributes = expectedTag.missingAttributes || {};
              expectedTag.missingAttributes[attr] = expectedValues.filter(val => !actualValues.includes(val));
              return false;
            }
    
            return true;
          });
        });
    
        if (!hasMatchingTag) {
          // //console.log(`Missing or incorrect tag: <${expectedTag.tag}>`);
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
      }
    
      const presentIndices = htmlValidationData.map((item, index) => missingHTMLValues.includes(item) ? null : index).filter(index => index !== null);
      setValidationStatus(prevState => ({ ...prevState, html: presentIndices }));
    }
    



else if (type === 'css') {
  if (typeof code !== 'string') {
      // setAlertMessage('Invalid CSS code format.');
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
                      const value = prop.split(':')[1].trim();
                      return expectedProp.property === property && expectedProp.value === value;
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
  // setAlertMessage(`CSS Validation result: ${isCSSValid ? 'You have cleared  all requirements' : 'Not Valid'}`);

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
          className="text-xl text-start custom-codemirror"
          value={htmlEdit || userAnsHTML }
          height="100%"
          theme="dark"
          backgroundColor='#'
          extensions={[html()]}
          onChange={onChangeHtml}
        />
      );
    case 'css':
      return (
        <CodeMirror
          className="text-xl text-start  custom-codemirror"
          value={cssEdit || userAnsCSS}
          height="95%"
          theme="dark"
          backgroundColor='#'
          extensions={[css()]}
          onChange={onChangeCss}
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


                <div className='' style={{width:'100%'}}>
                  <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
                  <img src={logo}  alt="Logo" height={38} width={100} />
                  <div style={{fontSize:'15px'}}><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/CoursePage')}>{sessionStorage.getItem('course').replace('_', ' ')}</span> <FontAwesomeIcon icon={faGreaterThan}  /><span className='px-1' style={{cursor: 'pointer'}} onClick={() => navigate('/QuestionPageFrontend')}>Qn {qnNumber}</span></div>
                  <nav className="ms-auto ">
                    <Dropdown className="d-flex justify-content-center" >
                        <button className='px-2 rounded-pill  custom-btn' onClick={handlePrevious} title='Previous Question'>
                          <FontAwesomeIcon icon={faLessThan}  className="icons" />
                        </button>
                        <button className='px-2 rounded-pill  custom-btn' onClick={handleNext}  title='Next Question'>
                          <FontAwesomeIcon icon={faGreaterThan}  className="icons" />
                        </button>
                        <button className='px-2 rounded-pill  custom-btn' onClick={handleHome} title="Home">
                          <FontAwesomeIcon icon={faHome} className="icons" />
                        </button>
                        {/* <button className='px-1 rounded-pill  custom-btn' onClick={handleHome} title="Support Assistance">
                          <FontAwesomeIcon icon={faBug} className="icons" /> Bug
                        </button> */}
                        <Dropdown.Toggle variant="rounded-sm rounded-circle px-1" id="dropdown-basic" title={userName} className='' style={{color:'#9CCCD7'}}>
                        <img src={sessionStorage.getItem('Picture')} height={20} alt='' className='me-1 rounded-circle' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='px-2 pt-5 me-5 bg-light custom-btn'>
                          <div className="text-center">
                            <Dropdown.Item ><img src={sessionStorage.getItem('Picture')} height={100} alt='username' className='mx-5 rounded-circle'/></Dropdown.Item>
                            <Dropdown.Item className='fs-5 fw-bold'>{sessionStorage.getItem('Name')}</Dropdown.Item>
                            <Dropdown.Item className=''>{sessionStorage.getItem('Email')}</Dropdown.Item>
                            <Dropdown.Item className='pb-4'>{sessionStorage.getItem('StudentId')}</Dropdown.Item>
                          </div>
                          <Dropdown.Divider />
                          <Dropdown.Item href="/" className='bg-secondary outline-white rounded-pill mb-2 text-white' title='Logout'><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </nav> 
                  </header>
              </div> 
               <div className='row body mt-5 pt-2 pb-3' style={{backgroundColor:'#9ECEDA', overflow:'hidden', maxHeight: '92.5vh'}}>
              <div className='qns'>
              </div>
              <div className="InputQuery  col-md-4 mx-1 " style={{ height: '100vh', overflowY: 'auto',width: splitOffset, minWidth: '30%', maxWidth: '65%', backgroundColor:'#707070' }}>
                  <div className='col result' >
                    <div className='row'>
                      <div style={{ width: '100%', height: '100vh', color:'white' }}>
                      <h6 className='mb-4'>{questionName}</h6>
                          <div className='d-flex justify-content-start'>
                                <div className="btn  btn-sm" style={{ backgroundColor: '#B8B7B7', color: '#000000' }}>
                                Expected output 
                                </div>
                                <FontAwesomeIcon icon={faExpand} className='px-1 mt-2 text-dark' onClick={handleImgView} style={{cursor:'pointer'}}/>
                          </div>
                          <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{pointerEvents: 'none'}} / >
                          <div className='d-flex justify-content-start mt-3'>
                                <div className="btn btn-sm" style={{ backgroundColor: '#B8B7B7', color: '#000000' }}>
                                Requirements 
                                </div>
                                <FontAwesomeIcon icon={faCircleInfo} className="px-1 mt-2 text-dark" onClick={handleshow} style={{cursor:'pointer'}}/>
                          </div>
                          <div className='pb-5' style={{fontSize:'12px', height:'100vh',minHeight:'70vh', maxHeight:'100vh', overflowY:'auto'}}>
                            {(() => {
                              switch (activeTab) {
                                case 'html':
                                  return question.Code_Validation.HTML_Messages.map((message, index) => (
                                    <div
                                      key={index}
                                      className='p-2'
                                    >
                                      {validationStatus.html && validationStatus.html.includes(index) ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className='mx-1 text-success'/>
                                      ) : (
                                        <FontAwesomeIcon icon={faCircleXmark} className='mx-1 text-danger'/>
                                      )}
                                      {message}
                                    </div>
                                  ));
                                case 'css':
                                  return question.Code_Validation.CSS_Messages.map((message, index) => (
                                    <div
                                      key={index}
                                      className={`p-2 `}
                                    >
                                      {validationStatus.css && validationStatus.css.includes(index) ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className='mx-1 text-success'/>
                                      ) : (
                                        <FontAwesomeIcon icon={faCircleXmark} className='mx-1 text-danger'/>
                                      )}
                                      {message}
                                    </div>
                                  ));
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
              <div className="OutputDatabaseTables col mx-1 mb-3" style={{ height: '100%', overflow: 'hidden', width: splitOffset, backgroundColor:'black' }}>
                <div className="col" style={{ height: '100%', backgroundColor:'#' }}>
                  <div className="col top" style={{ height: `${editorHeightPercentage}vh`, overflow: 'auto',marginBottom:'10px' }}>
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        style={{width:'70px', height:'30px', borderRadius:'10px', backgroundColor:'#'}}
                        className={`tab-button ${activeTab === tabKeys[tab] ? 'selected-tab' : ''}`}
                        onClick={() => handleTabClick(tabKeys[tab])}
                      >
                        {tab}
                      </button>
                    ))}
                    {renderEditor()}

                  </div>
                  {/* <div className="Move" style={{backgroundColor:'blue',  marginRight:'-50px', cursor:'pointer' }} onMouseDown={handleVerticalMouseDown}>
                      <span className=''></span>
                  </div> */}
                  <div className="Move" style={{ backgroundColor: '#9eceda', cursor: 'row-resize', margin: "-4px -12px" }} onMouseDown={handleVerticalMouseDown}>
                    <span style={{ display: 'inline-block', height: '3px' }}></span>
                  </div>
                  <div className="row down" style={{ height: `${outputHeightPercentage}vh`, overflow: 'auto' }}>
                  <div className='' style={{backgroundColor:"#F5FAFB"}}>
                  <div className='d-flex justify-content-between'>
                  <div className='d-flex justify-content-start mt-2'>
                                <div className="btn btn-sm" style={{ backgroundColor: '#B8B7B7', color: '#000000' }}>
                                Your Output 
                                </div>
                                <FontAwesomeIcon icon={faExpand} className='px-1 mt-2' onClick={Handlepreview} style={{cursor:'pointer'}}/>
                          </div>
                          <div className=''>
                                {/* <button className="btn btn-sm mt-2" style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }} onClick={handlesubmit}   
                                disabled={
                                  (activeTab === 'html' && submitHTMLStatus === 'Yes') || (activeTab === 'css' && submitCSSStatus === 'Yes')
                                  }>
                                Submit Code
                                </button>
                                {(nextBtn && submitCSSStatus === 'Yes') && (
                                <button className="btn btn-sm mt-2 ms-3" 
                                        onClick={handleNext} 
                                        style={{ backgroundColor: '#c0eead', color: '#000000', width:'100px'}}>
                                NEXT
                                </button>
                            )} */}
                            {/* {(nextBtn) || (submitHTMLStatus == 'Yes' && submitCSSStatus === 'Yes') ? (
                              <button
                                className="btn btn-sm mt-2 ms-3"
                                onClick={handleNext}
                                style={{ backgroundColor: '#c0eead', color: '#000000', width: '100px' }}
                              >
                                NEXT
                              </button>
                              ):(

                              <button className="btn btn-sm mt-2" style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }} onClick={handlesubmit}>
                                Submit Code
                              </button>
                              )} */}
                              {activeTab === 'html' ? (
                                <>
                                  {HTMLStatusResponse === 'Yes' || submitHTMLStatus === 'Yes' ? (
                                    <button
                                      className="btn btn-sm mt-2"
                                      style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }}
                                      onClick={handlesubmit}
                                      disabled
                                    >
                                      Submit Code
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-sm mt-2"
                                      style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }}
                                      onClick={handlesubmit}
                                    >
                                      Submit Code
                                    </button>
                                  )}
                                </>
                              ) : (
                                <>
                                  {(CSSStatusResponse === 'Yes' || submitCSSStatus === 'Yes') ? (
                                    <button
                                      className="btn btn-sm mt-2"
                                      style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }}
                                      onClick={handlesubmit}
                                      disabled
                                    >
                                      Submit Code
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-sm mt-2"
                                      style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }}
                                      onClick={handlesubmit}
                                    >
                                      Submit Code
                                    </button>
                                  )}
                                  {submitCSSStatus === 'Yes' || CSSStatusResponse === 'Yes' ? (
                                    <button
                                      className="btn btn-sm mt-2 ms-3"
                                      onClick={handleNext}
                                      style={{ backgroundColor: '#c0eead', color: '#000000', width: '100px' }}
                                    >
                                      NEXT
                                    </button>
                                  ) : null}
                                </>
                              )}

                          </div>
                          </div>
                        <div className="pt-3" style={{   width: '100%',   height: '30.5vh',   backgroundColor: '#F5FAFB',   color: 'black',   borderColor: 'white', }}>
                        <iframe
                          style={{ width: '100%', height: '100%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
                          className="w-full h-full"
                          srcDoc={srcCode}
                          title="output"
                          sandbox="allow-scripts allow-same-origin"
                          width="100%"
                          height="100%"
                          // style={{ pointerEvents: 'none'}}
                        ></iframe>
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
      <Modal show={showAlert} onHide={handleCloseAlert} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className=' text-dark' >
          {displ=='image'? 
          <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{height:'100%', width:'100%', pointerEvents: 'none'}} />: displ=='output'?
            <iframe
      style={{ width: '100%', height: '95%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
      className="w-full h-full"
      srcDoc={srcCode}
      title="output"
      sandbox="allow-scripts allow-same-origin"
      width="100%"
      height="100%"
    ></iframe>  
          :    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '5px', borderRadius:'50px' }}
      />
      <FontAwesomeIcon className='mx-2' size='xl' icon={faMagnifyingGlass} />
      {activeTab === 'html' ? 
        <TableComponent searchTerm={searchTerm} /> : 
        <CSSComponent searchTerm={searchTerm} />
        }
    </div>
          }
          </Modal.Body>
          <Modal.Footer >
          <Button variant="dark" onClick={handleCloseAlert}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HTMLCSSEditor;