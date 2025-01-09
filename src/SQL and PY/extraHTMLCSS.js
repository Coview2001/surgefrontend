// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import AceEditor from 'react-ace';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import CodeMirror from "@uiw/react-codemirror";
// import { html } from '@codemirror/lang-html';
// import { css } from '@codemirror/lang-css';
// // import { javascript } from '@codemirror/lang-javascript';
// // import { FaPhoenixFramework } from 'react-icons/fa';
// import { BarLoader, SyncLoader } from 'react-spinners';
// import './HTMLCSSEditor.css'
// import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquarePollHorizontal,faCheckCircle,faCircleXmark,faExpand, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
// import HeaderEditor from './HeaderEditor';
// import { useNavigate } from 'react-router-dom';

// import sk from 'skulpt';
// import TableComponent from './TableComponent';
// import CSSComponent from './CSSComponent';


// const HTMLCSSEditor  = () => {
//   const inputHandlerRef = useRef(null); // Store the input handler reference
//   const [pythonCode, setPythonCode] = useState('');
//   const [output, setOutput] = useState('');
//   const [inputQueue, setInputQueue] = useState([]); // To store inputs
//   const [sqlQuery, setSqlQuery] = useState('');
//   const [response, setResponse] = useState(null);
//   const [responseTestCase, setResponseTestCase] = useState(null);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [executingQuery, setExecutingQuery] = useState(false);
//   const [submitCount, setSubmitCount] = useState(0);
//   const [showAlert, setShowAlert] = useState(false);
//   const [submittingAnswer, setSubmittingAnswer] = useState(false); 
//   // const [splitOffset, setSplitOffset] = useState(1000);
//   const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);

//   const [isDragging, setIsDragging] = useState(false);
//   const [initialX, setInitialX] = useState(null);


//   const [isDraggingVertically, setIsDraggingVertically] = useState(false);
//   const [initialY, setInitialY] = useState(null);
//   const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); // in percentage (vh)
//   const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)
  
//   const navigate = useNavigate();
//   const [questionHistory, setQuestionHistory] = useState([]); // Track visited questions
//   const [viewedQuestions, setViewedQuestions] = useState([0]);
//   const [correctAnswers, setCorrectAnswers] = useState([]);
//   const [wrongAnswers, setWrongAnswers] = useState([]);
//   const questionButtonsContainerRef = useRef(null);
//   const [submissionAttempts, setSubmissionAttempts] = useState({});
//   const [ConceptID, setConceptID] = useState();
//   const [Qn_name, setQn_name] = useState();
//   const [submissionAttempts1, setSubmissionAttempts1] = useState({});
//   const [pyRun, setPyRun] = useState(false);
  
//   const [question, setQuestion] = useState([]);
//   const [showAlertFinish, setShowAlertFinish] = useState(false);
//   const [activeTab, setActiveTab] = useState('html');
//   const [selectedTableName, setSelectedTableName] = useState('');
//   const [runResponse, setRunResponse] = useState();
//   const [submissionSuccess, setSubmissionSuccess] = useState(false);
//   const [clickCount, setClickCount] = useState(0);
//   const [data, setData] = useState();
//   const [testCase, setTestCase] = useState([]);
//   const [questionName, setQuestionName] = useState();
//   const [runResponseTable, setRunResponseTable] = useState();
//   const [runResponseExecutionTime, setRunResponseExecutionTime] = useState();
//   const [successMessage, setSuccessMessage] = useState('');
//   const [additionalMessage, setAdditionalMessage] = useState('');
//   const [show, setShow] = useState(false);
//   const [example, setExample] = useState();
//   const [template, setTemplate] = useState('# Write your Python code here...');
//   const [nextBtn, setNextBtn] = useState(false);
//   const [isNextClicked, setIsNextClicked] = useState(false); 
//   const [qn_Number, setQn_Number] = useState();




//   const [tabs, setTabs] = useState([]);
//   const [Sample_img, setSample_img] = useState('');
//   const [HTMLMessage, setHTMLMessage] = useState([]);
//   const [CSSMessage, setCSSMessage] = useState([]);
//   const [htmlEdit, setHtmlEdit] = useState('');
//   const [cssEdit, setCssEdit] = useState('');
//   // const [jsEdit, setJsEdit] = useState('');
//   const [showSubmitButton, setShowSubmitButton] = useState(false);
//   const [validationStatus, setValidationStatus] = useState({});
//   const [cssHomeData, setcssHomeData] = useState();
//   const [imageView, setImageView] = useState(false);
//   const [displ, setdispl] = useState('');
//   const [htmlTags, setHtmlTags] = useState([]);
//   const [cssAttributes, setCssAttributes] = useState([]);


//   const handleTab = (selectedKey) => {
//     setShowSubmitButton(false)
//     setActiveTab(selectedKey);
//     // //console.log("-=-=-=-=",selectedKey)
//     const lastTabKey = tabKeys[tabs[tabs.length - 1]];
//     // //console.log("=======================",lastTabKey)

//   };

//   const cleanedHtmlEdit = htmlEdit.replace('</body>', '').replace('</html>', '');

//   const srcCode = `
//     ${cleanedHtmlEdit.replace('</title>', `</title><style>${cssEdit}</style>`)}
//     </body>
//     </html>
//   `;

//   const tabKeys = {
//     "HTML": "html",
//     "CSS": "css",
//     // "JS": "js",
//   };




//   // useEffect(() => {
//   //   const storedEmail = sessionStorage.getItem('Email');

//   //   if (storedEmail ) {
//   //       setuserEmail(storedEmail);
//   //   }
    
//   //   if (HomePageData && HomePageData.Page_Name && HomePageData.Sample_img && HomePageData.Tabs) {
//   //     setPage_Name(HomePageData.Page_Name);
//   //     setSample_img(HomePageData.Sample_img);
//   //     setTabs(HomePageData.Tabs);
//   //     // //console.log("HomePageData.Tabs", HomePageData.Tabs)
      
//   //     // Setting state for all tabs
//   //     setHtmlEdit(HomePageData.Response.HTML[Page_Name] || '');
//   //     setCssEdit(HomePageData.Response.CSS[Page_Name] || '');
//   //     // setJsEdit(HomePageData.Response.JS[Page_Name] || '');


//   //   }
//   // }, [HomePageData, Page_Name]);


//   const onChangeHtml = useCallback((value, viewUpdate) => {
//     setHtmlEdit(value);
//     handleCheckCode();
//     //console.log("Cap") 

  
//     // Check if the "Enter" key was pressed
//     if (viewUpdate.state.doc.toString().endsWith('\n')) {
//       handleCheckCode(); // Call the handleCheckCode function
//     }
//   }, [htmlEdit]);
  

//   const onChangeCss = useCallback((value, viewUpdate) => {
//     setCssEdit(value);
//     handleCheckCode();
//     //console.log("Iron")

//     if (viewUpdate.state.doc.toString().endsWith('\n')) {

//     // if (viewUpdate.transactions.some(tr => tr.isUserEvent('input') && tr.newDoc.toString().endsWith('\n'))) {
//       handleCheckCode();
//     }
//   }, [cssEdit]);



//   const renderEditor = () => {
//     switch (activeTab) {
//       case 'html':
//         return (
//           <CodeMirror
//             className="text-xl text-start custom-codemirror"
//             value={htmlEdit}
//             height="500px"
//             theme="dark"
//             backgroundColor='#5F5F5F'
//             extensions={[html()]}
//             onChange={onChangeHtml}
//           />
//         );
//       case 'css':
//         return (
//           <CodeMirror
//             className="text-xl text-start  custom-codemirror"
//             value={cssEdit}
//             height="500px"
//             theme="dark"
//             extensions={[css()]}
//             onChange={onChangeCss}
//           />
//         );
//       // case 'js':
//       //   return (
//       //     <CodeMirror
//       //       className="text-xl text-start border-gray-700 border"
//       //       value={jsEdit}
//       //       height="400px"
//       //       theme="dark"
//       //       extensions={[javascript()]}
//       //       onChange={onChangeJavaScript}
//       //     />
//       //   );
//       default:
//         return null;
//     }
//   };






//   useEffect(() => {

//     const storedQn_Number= sessionStorage.getItem('Qn_Number');


//     if ( storedQn_Number ) {
//         setQn_Number(storedQn_Number);

//     }
//   }, []);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setInitialX(e.clientX);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging ||!initialX) return;
//     const dx = e.clientX - initialX;
//     setSplitOffset(splitOffset + dx);
//     setInitialX(e.clientX);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setInitialX(null);
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, initialX]);


//   const handleVerticalMouseDown = (e) => {
//     setIsDraggingVertically(true);
//     setInitialY(e.clientY);
//   };
//   const handleImgView = () => {
//     setImageView(true);
//     setdispl('image');
//     setShowAlert(true);
//   }

//   const handlesubmit = () => { 
//     //console.log("data submitted")
//     setLoading(true);

//     let codeToTest = '';
//     switch (activeTab) {
//       case 'html':
//         codeToTest = htmlEdit; 
//         break;
//       case 'css':
//         codeToTest = cssEdit;
//         break;
//       default:
//         codeToTest = '';
//         break;
//     }

//     sendDataToBackend(activeTab, codeToTest);
//   };

//   const sendDataToBackend = (type, code) => {
//     const stubjecttype=type.toUpperCase();
//     const url = `https://surgebackend.azurewebsites.net/${type}/`;
//     const data = {
//       "StudentId": "24MRIT0002",
//       "Subject": stubjecttype,
//       "Qn": "QHC2408010000AAXXMM16",
//       "KEYS": type === 'html' ? question.Code_Validation.HTML : question.Code_Validation.CSS,
//       "Ans": code,
//     };

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//       //console.log("Panther",data)
//       // setTestResult(data.score);
//       // setTestMessage(data.message);
//       // setTestValid(data.valid);
//       // setAlertMessage(`Test Message: ${data.message}\nTest Result: ${data.score}`);
//       // setShowAlert(true);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // setAlertMessage('An error occurred while processing your request.');
//       // setShowAlert(true);
//     })
//     .finally(() => {
//       setLoading(false); 
//     });

//     const lastTabKey = tabKeys[tabs[tabs.length - 1]];
//     if (activeTab === lastTabKey) {
//       // setFormSubmitted(true);
//       // setShowNextButton(true);
//     } else {
//       // setFormSubmitted(false);
//       // setShowNextButton(false);
//     }
//   };

//   const handleVerticalMouseMove = (e) => {
//     if (!isDraggingVertically || !initialY) return;
  
//     const dy = e.clientY - initialY;
//     const vhUnitChange = (dy / window.innerHeight) * 100; // Convert px to vh
  
//     setEditorHeightPercentage((prevHeight) => {
//       const newHeight = Math.max(30, Math.min(70, prevHeight + vhUnitChange)); // Ensure between 30% and 70%
//       setOutputHeightPercentage(94 - newHeight); // Adjust the output height to complement the editor height
//       return newHeight;
//     });
  
//     setInitialY(e.clientY);
//   };
  
//   const handleVerticalMouseUp = () => {
//     setIsDraggingVertically(false);
//     setInitialY(null);
//   };
  
//   // Add event listeners for vertical dragging
//   useEffect(() => {
//     window.addEventListener('mousemove', handleVerticalMouseMove);
//     window.addEventListener('mouseup', handleVerticalMouseUp);
  
//     return () => {
//       window.removeEventListener('mousemove', handleVerticalMouseMove);
//       window.removeEventListener('mouseup', handleVerticalMouseUp);
//     };
//   }, [isDraggingVertically, initialY]);
  

  
//   useEffect(() => {

//     const fetchData = async () => {
//       const bodyData = 
//         {
//           StudentId: sessionStorage.getItem('StudentId'),
//           Course: sessionStorage.getItem('course'),
//           // Day: sessionStorage.getItem('SelectedDay'),
//           Qn_name: sessionStorage.getItem('Qn_name')
//         }
//         //console.log("bodyData", bodyData)
//       try {
//         const response = await fetch("https://surgebackend.azurewebsites.net/frontend/qns/data/", 
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               },
//               body: JSON.stringify(bodyData)
//             }
//         );
//         const data = await response.json();
//         setData(data)
//         //console.log("data", data)
//         setQuestion(data.Question);
//         //console.log("YYYYYYY :",data.Question)
//         setQn_name(data.Question.Qn_name)
//         setQuestionName(data.Question.Qn)
//         setSample_img(data.Question.Sample_img )
//         setTabs(data.Question.Tabs )
//         setHTMLMessage(data.Question.Code_Validation?.HTML_Messages || '');
//         setCSSMessage(data.Question.Code_Validation?.CSS_Messages || '');
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);


//   // useEffect( () => {
//   //   setPythonCode(template)
//   // }, [ template]);


//   const handleNext = () => {
//     const nextQnNumber = Number(qn_Number) + 1;
//     sessionStorage.setItem('Qn_Number', nextQnNumber);
//     setNextBtn(false)
//     setIsNextClicked(true)
//     setLoading(true)
//     setOutput('');
//     setIsNextClicked(false);
//     setSuccessMessage('');
//     setAdditionalMessage('')
//     //console.log("Execute fetchNextData");

//     const fetchNextData = async () => {
//       const postData = {
//         StudentId: sessionStorage.getItem('StudentId'),
//         Day_no: sessionStorage.getItem('SelectedDay'),
//         Subject: sessionStorage.getItem('course'),
//         Qn: Qn_name 
//       };
//     //console.log("IPhone", postData);

//     try {
//       const response = await fetch("https://surgebackend.azurewebsites.net/nextqn/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(postData)
//       });

//       const data = await response.json();
//       setData(data)
//       //console.log("data", data)
//       setQuestion(data.Question);
//       //console.log("YYYYYYY :",data.Question)
//       setQn_name(data.Question.Qn_name)
//       //console.log("Tables", data.Tables)
//       setQuestionName(data.Question.Qn)
//       setTemplate(data.Question.Template || '# Write your Python code here...')
//       setLoading(false);
//     } catch (error) {
//       console.error('Error executing SQL query:', error);
//     }
//   };

//   fetchNextData();

//   };
  
//   const handleCloseAlert = () => {
//     setShowAlert(false);
//     setImageView(false);
//   };


//   const handleCheckCode = () => {
//     setShowSubmitButton(true)
//     let codeToTest;
//     switch (activeTab) {
//       case 'html':
//         codeToTest = htmlEdit;
//         break;
//       case 'css':
//         codeToTest = cssEdit;
//         break;
//       default:
//         codeToTest = '';
//         break;
//     }

//     sendDataToCheck(activeTab, codeToTest);
//   };

//   const sendDataToCheck = (type, code) => {
//     // //console.log(question);
//     if (!question) {
//       // setAlertMessage('HomePageData is not available.');
//       setShowAlert(true);
//       return;
//     }
  
//     const htmlValidationData = question.Code_Validation.HTML;
//     const cssValidationData = question.Code_Validation.CSS;
  
//     // //console.log("python_RegxData", python_RegxData)
//     setcssHomeData(cssValidationData);
  

//     if (type === 'html') {
//       const extractAttributes = html => {
//         const tagMatches = [...html.matchAll(/<(\w+)([^>]*)>/g)].map(match => {
//           const attributes = {};
//           const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
//           const attributeMatches = [...match[2].matchAll(/(\w+)=["']([^"']*)["']/g)];
    
//           attributeMatches.forEach(attrMatch => {
//             const attrName = attrMatch[1];
//             let attrValue = attrMatch[2];
    
//             // Handle complete attributes for href, src, data-url, and url without splitting
//             if (['href', 'src', 'data-url', 'url'].includes(attrName)) {
//               const fullMatch = match[2].match(new RegExp(`${attrName}=["']([^"']*\\{\\{\\s*url_for\\s*\\([^\\)]+\\)\\s*[^"']*)["']`));
//               if (fullMatch) {
//                 attrValue = fullMatch[1];
//               }
//             }
    
//             if (!attributes[attrName]) {
//               attributes[attrName] = [];
//             }
//             attributes[attrName].push(attrValue);
//           });
//           //console.log("ironman",match[1])
    
//           return {
//             tag: match[1],
//             attributes,
//             isSelfClosing: selfClosingTags.includes(match[1].toLowerCase()), // Check if the tag is in the self-closing tag list
//             hasClosingTag: !selfClosingTags.includes(match[1].toLowerCase()) && new RegExp(`</${match[1]}>`).test(html) // Check if closing tag exists for non-self-closing tags
//           };
//         });
//         return tagMatches;
//       };
    
//       const normalizedAttributes = extractAttributes(code);
      
//       const relevantAttributes = ['type', 'id', 'name', 'required', 'class', 'url'];
    
//       const missingHTMLValues = htmlValidationData.filter(expectedTag => {
//         const foundTags = normalizedAttributes.filter(actualTag => actualTag.tag === expectedTag.tag);
//         let isTagMissing = false;
    
//         const hasMatchingTag = foundTags.some(foundTag => {
//           const expectedAttributes = expectedTag.attributes;
//           const actualAttributes = foundTag.attributes;
    
//           // Check if the tag is not self-closing and has a closing tag before matching attributes
//           if (!foundTag.isSelfClosing && !foundTag.hasClosingTag) {
//             // //console.log(`Tag <${foundTag.tag}> is missing a closing tag.`);
//             return false;
//           }
    
//           return Object.keys(expectedAttributes).every(attr => {
//             const expectedValues = Array.isArray(expectedAttributes[attr]) ? expectedAttributes[attr] : [expectedAttributes[attr]];
//             const actualValues = Array.isArray(actualAttributes[attr]) ? actualAttributes[attr] : [actualAttributes[attr]];
    
//             if (!actualValues || actualValues.length === 0) {
//               // //console.log(`Missing attribute: ${attr} in tag <${expectedTag.tag}>`);
//               expectedTag.missingAttributes = expectedTag.missingAttributes || {};
//               expectedTag.missingAttributes[attr] = expectedValues;
//               return false;
//             }
    
//             const allValuesMatch = expectedValues.every(val => actualValues.includes(val));
//             if (!allValuesMatch) {
//               // //console.log(`Attribute ${attr} in tag <${expectedTag.tag}> has mismatched values. Expected: ${expectedValues}, Actual: ${actualValues}`);
//               expectedTag.missingAttributes = expectedTag.missingAttributes || {};
//               expectedTag.missingAttributes[attr] = expectedValues.filter(val => !actualValues.includes(val));
//               return false;
//             }
    
//             return true;
//           });
//         });
    
//         if (!hasMatchingTag) {
//           // //console.log(`Missing or incorrect tag: <${expectedTag.tag}>`);
//           isTagMissing = true;
//         }
    
//         return isTagMissing;
//       }).map(tag => {
//         if (tag.missingAttributes) {
//           // //console.log(`Tag <${tag.tag}> is missing attributes:`, tag.missingAttributes);
//         }
//         return tag;
//       });
    
    
//       const isHTMLValid = missingHTMLValues.length === 0;
    
//       if (!isHTMLValid) {
//         // setAlertMessage('Please clear the requirements');
//       }
    
//       const presentIndices = htmlValidationData.map((item, index) => missingHTMLValues.includes(item) ? null : index).filter(index => index !== null);
//       setValidationStatus(prevState => ({ ...prevState, html: presentIndices }));
//     }




// else if (type === 'css') {
//   if (typeof code !== 'string') {
//       // setAlertMessage('Invalid CSS code format.');
//       setShowAlert(true);
//       return;
//   }

//   // Function to validate CSS rules
//   const validateRules = (rules, blocks) => {
//       return rules.filter(expectedRule => {
//           const foundRule = blocks.find(block => {
//               const selector = block.split('{')[0].trim();
//               const properties = block.split('{')[1].split(';').map(prop => prop.trim()).filter(prop => prop !== '');

//               // Check if the selector matches and all properties are present
//               if (selector !== expectedRule.selector) {
//                   return false;
//               }

//               // Check if all expected properties and values are present
//               return expectedRule.properties.every(expectedProp => {
//                   const foundProp = properties.find(prop => {
//                       const property = prop.split(':')[0].trim();
//                       const value = prop.split(':')[1].trim();
//                       return expectedProp.property === property && expectedProp.value === value;
//                   });
//                   return foundProp !== undefined;
//               });
//           });
//           return !foundRule;
//       });
//   };

//   // Extract media query blocks and normal CSS blocks
//   const mediaQueryRegex = /@media[^{]+\{([\s\S]+?})\s*}/g;
//   let match;
//   const mediaQueryBlocks = [];
//   while ((match = mediaQueryRegex.exec(code)) !== null) {
//       mediaQueryBlocks.push(match[0]);
//   }

//   // Remove media query blocks from code to get normal CSS blocks
//   const normalCSS = code.replace(mediaQueryRegex, '');
//   const normalBlocks = normalCSS.split('}').map(block => block.trim()).filter(block => block !== '');

//   // Validate normal CSS rules
//   const missingCSSRules = validateRules(cssValidationData.filter(rule => !rule.media_query), normalBlocks);

//   // Validate media query rules
//   const missingMediaQueryRules = {};
//   cssValidationData.filter(rule => rule.media_query).forEach(mediaQuery => {
//       const mediaQueryBlock = mediaQueryBlocks.find(block => block.includes(mediaQuery.media_query));
//       if (mediaQueryBlock) {
//           // Extract the content inside the media query block
//           const startIndex = mediaQueryBlock.indexOf('{') + 1;
//           const endIndex = mediaQueryBlock.lastIndexOf('}');
//           const mediaQueryContent = mediaQueryBlock.substring(startIndex, endIndex).trim();

//           // Split media query content by '}' to handle nested rules properly
//           const blocks = mediaQueryContent.split('}').map(block => block.trim()).filter(block => block !== '');

//           // Validate rules within media query
//           const missingRules = validateRules(mediaQuery.rules, blocks);
//           if (missingRules.length > 0) {
//               missingMediaQueryRules[mediaQuery.media_query] = missingRules;
//           }
//       } else {
//           // If media query block is missing, add all its rules to missingMediaQueryRules
//           missingMediaQueryRules[mediaQuery.media_query] = mediaQuery.rules;
//       }
//   });

//   const isCSSValid = missingCSSRules.length === 0 && Object.keys(missingMediaQueryRules).length === 0;
//   // setAlertMessage(`CSS Validation result: ${isCSSValid ? 'You have cleared  all requirements' : 'Not Valid'}`);

//   if (!isCSSValid) {
//       // setAlertMessage('Please clear the requirements');
//   }

//   // Map through cssValidationData to find indices of valid rules
//   const presentIndices = cssValidationData.map((item, index) => {
//       if (item.media_query) {
//           return missingMediaQueryRules[item.media_query] ? null : index;
//       }
//       return missingCSSRules.includes(item) ? null : index;
//   }).filter(index => index !== null);

//   setValidationStatus(prevState => ({ ...prevState, css: presentIndices }));
// }


//     // setShowAlert(true);
//   }; 
//   const Handlepreview = () => {
//     setShowAlert(true);
//     setdispl('output');
//   }
   
//   const handleshow = () => { 
//     setdispl('')
//     setShowAlert(true);
// }

//   return (
//     <div className="container-fluid">
//       {loading ? (
//         <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
//           <div>
//             <SyncLoader color="#9ab4c9" size={10}/>
//           </div>
//           <div className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <h3 className='pt-4 text-secondary'>Preparing data, Please wait...</h3>
//             <BarLoader color="#9ab4c7" width={200}/>
//           </div>
//           <div>
//             <SyncLoader color="#9ab4c9" size={10}/>
//           </div>
//         </div>
//       ) : (
//         <div className="row" style={{height: '50vh', maxHeight:'100'}}>
//           <div className="container" >
//           <HeaderEditor/>
//             <div className='row body mt-5 pt-2 pb-3' style={{backgroundColor:'#9ECEDA', overflow:'hidden', maxHeight: '92.5vh'}}>
//               <div className='qns'>
//               </div>
//               <div className="InputQuery  col-md-4 mx-1 " style={{ height: '100vh', maxHeight:'100vh',backgroundColor:'#2C2C2C', overflowY: 'auto',width: splitOffset, minWidth: '20%', maxWidth: '70%' }}>
//                   <div className='col result' >
//                     <div className='row'>
//                       <div className='' style={{ width: '100%', height: '100vh',maxHeight: '100vh', overflowY:'auto', backgroundColor:'#2C2C2C', color:'white' }}>
//                           <h6 className='mb-4'>{questionName}</h6>
//                           <div className='d-flex justify-content-start'>
//                                 <button className="btn btn-dark btn-sm" style={{ backgroundColor: '#707070', color: '#000000' }}>
//                                 Expected output 
//                                 </button>
//                                 <FontAwesomeIcon icon={faExpand} className="px-1" />
//                           </div>
//                           <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{pointerEvents: 'none'}} / >
//                           <div className='d-flex justify-content-start'>
//                                 <button className="btn btn-dark btn-sm" style={{ backgroundColor: '#707070', color: '#000000' }}>
//                                 Requriments 
//                                 </button>
//                                 <FontAwesomeIcon icon={faCircleInfo} className="px-1 mt-2" onClick={handleshow}/>
//                           </div>
//                           <div>
//                             {(() => {
//                               switch (activeTab) {
//                                 case 'html':
//                                   return question.Code_Validation.HTML_Messages.map((message, index) => (
//                                     <div
//                                       key={index}
//                                       className='p-2'
//                                     >
//                                       {validationStatus.html && validationStatus.html.includes(index) ? (
//                                         <FontAwesomeIcon icon={faCheckCircle} className='mx-1 text-success'/>
//                                       ) : (
//                                         <FontAwesomeIcon icon={faCircleXmark} className='mx-1 text-danger'/>
//                                       )}
//                                       {message}
//                                     </div>
//                                   ));
//                                 case 'css':
//                                   return question.Code_Validation.CSS_Messages.map((message, index) => (
//                                     <div
//                                       key={index}
//                                       className={`p-2 `}
//                                     >
//                                       {validationStatus.css && validationStatus.css.includes(index) ? (
//                                         <FontAwesomeIcon icon={faCheckCircle} className='mx-1 text-success'/>
//                                       ) : (
//                                         <FontAwesomeIcon icon={faCircleXmark} className='mx-1 text-danger'/>
//                                       )}
//                                       {message}
//                                     </div>
//                                   ));
//                                 default:
//                                   return null;
//                               }
//                             })()}
//                           </div>
//                       </div>
//                     </div>
//                   </div>
//               </div>
//               <div className='curserDivPy' onMouseDown={handleMouseDown}></div>
//               <div className="OutputDatabaseTables col  mb-3" style={{ height: '94vh', overflow: 'hidden', width: splitOffset ,minWidth: '30%' }}>
//                 <div className="col" style={{ height: '100%' }}>
//                   <div className="row top" style={{ height: `${editorHeightPercentage}vh`, overflow: 'auto', backgroundColor:'#5F5F5F' }}>
//                   <Tabs activeKey={activeTab} onSelect={handleTab} className="pt-2">
//                     {tabs.map((tab, index) => (
//                       <Tab
//                         key={index}
//                         eventKey={tabKeys[tab]}
//                         title={tab}
//                         className={` ${activeTab === tabKeys[tab] ? 'selected-tab' : ''}`}
//                         >
//                       </Tab>
//                     ))}
//                     </Tabs>
//                     {renderEditor()}
//                   </div>
//   <div className='row Move py-2 container-fluid d-flex justify-content-end align-items-center' style={{  backgroundColor: '#9ECEDA'}} onMouseDown={handleVerticalMouseDown} >

      
//   </div>

//                   <div className="row down mx-1" style={{ height: `${outputHeightPercentage}vh`, overflow: 'auto' }}>
//                   <div className='' style={{backgroundColor:"#F5FAFB"}}>
//                   {/* <button
//                         className="btn btn-dark btn-sm mx-2" onClick={() => { handleCheckCode(false); setShowAlert(false); }} style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
//                       >
//                         Check Test Cases
//                       </button> */}
//                       <div className='d-flex justify-content-between'>
//                       <div className=''>
//                                 <button className="btn btn-dark btn-sm" style={{ backgroundColor: '#707070', color: '#000000' }}>
//                                   Your Output
//                                 </button>
//                                 <FontAwesomeIcon icon={faExpand} className='px-1 mt-2' onClick={Handlepreview}/>
//                           </div>
//                           <div className=''>
//                                 <button className="btn btn-dark btn-sm" style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }} onClick={handlesubmit}>
//                                 Submit Code
//                                 </button>
//                           </div>
//                           </div>
//                   <iframe
//                           style={{ width: '100%', height: '30%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
//                           className="w-full h-full"
//                           srcDoc={srcCode}
//                           title="output"
//                           sandbox="allow-scripts allow-same-origin"
//                           width="100%"
//                           height="100%"
//                           // style={{ pointerEvents: 'none'}}
//                         ></iframe>
//                         <div className="pt-3" style={{   width: '100%',   height: '30.5vh',   backgroundColor: '#F5FAFB',   color: 'black',   borderColor: 'white', }}>
//                           {/* {runResponseTestCases && (
//                             <div className="col">
//                               {runResponseTestCases.map((testCase, index) => (
//                                 <p key={index}>
//                                   {Object.entries(testCase).map(([key, value], i) => {
//                                     let textColor = value === 'Passed' ? 'text-primary' : value === 'Failed' ? 'text-danger' : 'text-dark';
//                                     return (
//                                       <span
//                                         key={i}
//                                         className="border-2 rounded-3 p-2 px-3 my-5"
//                                         style={{ backgroundColor: '#FFFFFF', fontSize: '12px' }}
//                                       >
//                                         {key}: <span className={textColor}>{value}</span>
//                                       </span>
//                                     );
//                                   })}
//                                 </p>
//                               ))}
//                             </div>
//                           )} */}
//                         </div>
//                   </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//             </div>
//           </div>
//         </div>
//       )}
//       <Modal show={showAlert} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//         <Modal.Body className=' text-dark' style={{minHeight:'100%', height:'50vh',maxHeight:'100%',overflowY:'auto'}}>
//           {/* {alertMessage || Sample_img} */}
//           {displ=='image'? 
//           <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{pointerEvents: 'none'}} />: displ=='output'?
//             <iframe
//       style={{ width: '100%', height: '30%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
//       className="w-full h-full"
//       srcDoc={srcCode}
//       title="output"
//       sandbox="allow-scripts allow-same-origin"
//       width="100%"
//       height="100%"
//       // style={{ pointerEvents: 'none'}}
//     ></iframe>  
//           : <div>{ activeTab=='html'? 
//           <TableComponent/>:
//           <CSSComponent/>}
//       </div>
//           }
//           </Modal.Body>
//           <Modal.Footer >
//           <Button variant="dark" onClick={handleCloseAlert}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default HTMLCSSEditor ;

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
import { faSquarePollHorizontal,faCheckCircle,faCircleXmark,faExpand, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import HeaderEditor from './HeaderEditor';
import { useNavigate } from 'react-router-dom';

// import * as XLSX from 'xlsx';
import sk from 'skulpt';
import TableComponent from './TableComponent';
import CSSComponent from './CSSComponent';


const HTMLCSSEditor  = () => {
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


  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);


  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [editorHeightPercentage, setEditorHeightPercentage] = useState(45); // in percentage (vh)
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)
  
  const navigate = useNavigate();
  const [questionHistory, setQuestionHistory] = useState([]); // Track visited questions
  const [viewedQuestions, setViewedQuestions] = useState([0]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const questionButtonsContainerRef = useRef(null);
  const [submissionAttempts, setSubmissionAttempts] = useState({});
  const [ConceptID, setConceptID] = useState();
  const [Qn_name, setQn_name] = useState();
  const [submissionAttempts1, setSubmissionAttempts1] = useState({});
  const [pyRun, setPyRun] = useState(false);
  
  const [question, setQuestion] = useState([]);
  const [showAlertFinish, setShowAlertFinish] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [selectedTableName, setSelectedTableName] = useState('');
  const [runResponse, setRunResponse] = useState();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [data, setData] = useState();
  const [testCase, setTestCase] = useState([]);
  const [questionName, setQuestionName] = useState();
  const [runResponseTable, setRunResponseTable] = useState();
  const [runResponseExecutionTime, setRunResponseExecutionTime] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [show, setShow] = useState(false);
  const [example, setExample] = useState();
  const [template, setTemplate] = useState('# Write your Python code here...');
  const [nextBtn, setNextBtn] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false); 
  const [qn_Number, setQn_Number] = useState();
  




  const [tabs, setTabs] = useState([]);
  const [Sample_img, setSample_img] = useState('');
  const [HTMLMessage, setHTMLMessage] = useState([]);
  const [CSSMessage, setCSSMessage] = useState([]);
  const [htmlEdit, setHtmlEdit] = useState('');
  const [cssEdit, setCssEdit] = useState('');
  // const [jsEdit, setJsEdit] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [cssHomeData, setcssHomeData] = useState();
  const [imageView, setImageView] = useState(false);
  const [displ, setdispl] = useState('');
  const [htmlTags, setHtmlTags] = useState([]);
  const [cssAttributes, setCssAttributes] = useState([]);


  const handleTab = (selectedKey) => {
    setShowSubmitButton(false)
    setActiveTab(selectedKey);
    // //console.log("-=-=-=-=",selectedKey)
    const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    // //console.log("=======================",lastTabKey)

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




  // useEffect(() => {
  //   const storedEmail = sessionStorage.getItem('Email');

  //   if (storedEmail ) {
  //       setuserEmail(storedEmail);
  //   }
    
  //   if (HomePageData && HomePageData.Page_Name && HomePageData.Sample_img && HomePageData.Tabs) {
  //     setPage_Name(HomePageData.Page_Name);
  //     setSample_img(HomePageData.Sample_img);
  //     setTabs(HomePageData.Tabs);
  //     // //console.log("HomePageData.Tabs", HomePageData.Tabs)
      
  //     // Setting state for all tabs
  //     setHtmlEdit(HomePageData.Response.HTML[Page_Name] || '');
  //     setCssEdit(HomePageData.Response.CSS[Page_Name] || '');
  //     // setJsEdit(HomePageData.Response.JS[Page_Name] || '');


  //   }
  // }, [HomePageData, Page_Name]);


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



  const renderEditor = () => {
    switch (activeTab) {
      case 'html':
        return (
          <CodeMirror
            className="text-xl text-start custom-codemirror"
            value={htmlEdit}
            height="100%"
            theme="dark"
            backgroundColor='#5F5F5F'
            extensions={[html()]}
            onChange={onChangeHtml}
          />
        );
      case 'css':
        return (
          <CodeMirror
            className="text-xl text-start  custom-codemirror"
            value={cssEdit}
            height="100"
            theme="dark"
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
      Qn: sessionStorage.getItem('Qn_name'),
      KEYS: type === 'html' ? question.Code_Validation.HTML : question.Code_Validation.CSS,
      Ans: code,
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
      // setTestResult(data.score);
      // setTestMessage(data.message);
      // setTestValid(data.valid);
      // setAlertMessage(`Test Message: ${data.message}\nTest Result: ${data.score}`);
      // setShowAlert(true);
    })
    .catch(error => {
      // console.error('Error:', error);
      // setAlertMessage('An error occurred while processing your request.');
      // setShowAlert(true);
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
          StudentId: sessionStorage.getItem('StudentId'),
          Course: sessionStorage.getItem('course'),
          // Day: sessionStorage.getItem('SelectedDay'),
          Qn_name: sessionStorage.getItem('Qn_name')
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
        setData(data)
        // //console.log("data", data)
        setQuestion(data.Question);
        // //console.log("YYYYYYY :",data.Question)
        setQn_name(data.Question.Qn_name)
        setQuestionName(data.Question.Qn)
        setSample_img(data.Question.Sample_img )
        setTabs(data.Question.Tabs )
        setHTMLMessage(data.Question.Code_Validation?.HTML_Messages || '');
        setCSSMessage(data.Question.Code_Validation?.CSS_Messages || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  // useEffect( () => {
  //   setPythonCode(template)
  // }, [ template]);
  

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
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
        // Day_no: sessionStorage.getItem(''),
        Subject: sessionStorage.getItem('course'),
        Qn: sessionStorage.getItem('Qn_name')


        
      };
    // //console.log("IPhone", postData);

    try {
      const response = await fetch("https://surgebackend.azurewebsites.net/nextqn/", {
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
      // //console.log("Tables", data.Tables)
      setQuestionName(data.Question.Qn)
      setTemplate(data.Question.Template || '# Write your Python code here...')
      setLoading(false);
    } catch (error) {
      // console.error('Error executing SQL query:', error);
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
              <div className="InputQuery  col-md-4 mx-1 " style={{ height: '100vh',maxHeight:'100vh',backgroundColor:'#2C2C2C', overflowY: 'auto',width: splitOffset, minWidth: '35%', maxWidth: '60%' }}>
                  <div className='col result' >
                    <div className='row'>
                      <div style={{ width: '100%', height: '100vh',backgroundColor:'#2C2C2C', color:'white' }}>
                          <h6 className='mb-4'>{questionName}</h6>
                          <div className='d-flex justify-content-start'>
                                <button className="btn btn-dark btn-sm" style={{ backgroundColor: '#707070', color: '#000000' }}>
                                Expected output 
                                </button>
                                <FontAwesomeIcon icon={faExpand} className='px-1 mt-2' onClick={handleImgView}/>
                          </div>
                          <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{pointerEvents: 'none'}} / >
                          <div className='d-flex justify-content-start'>
                                <button className="btn btn-dark btn-sm" style={{ backgroundColor: '#707070', color: '#000000' }}>
                                Requriments 
                                </button>
                                <FontAwesomeIcon icon={faCircleInfo} className="px-1 mt-2" onClick={handleshow}/>
                          </div>
                          <div>
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
              <div className='curserDivPy' onMouseDown={handleMouseDown} style={{cursor:'pointer'}}><span></span></div>
              <div className="OutputDatabaseTables col  mb-3" style={{ height: '94vh', overflow: 'hidden', width: splitOffset ,minWidth: '30%' }}>
                <div className="col" style={{ height: '100%' }}>
                  <div className="row top" style={{ height: `${editorHeightPercentage}vh`, overflow: 'auto', backgroundColor:'#5F5F5F' }}>
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        style={{width:'70px', height:'40px', border:''}}
                        className={`tab-button ${activeTab === tabKeys[tab] ? 'selected-tab' : ''}`}
                        onClick={() => handleTabClick(tabKeys[tab])}
                      >
                        {tab}
                      </button>
                    ))}
                    {renderEditor()}
                  </div>

  <div className='row Move py-2 container-fluid d-flex justify-content-end align-items-center' style={{  backgroundColor: '#9ECEDA'}} onMouseDown={handleVerticalMouseDown} >

      
  </div>

                  <div className="row down mx-1" style={{ height: `${outputHeightPercentage}vh`, overflow: 'auto' }}>
                  <div className='' style={{backgroundColor:"#F5FAFB"}}>
                  {/* <button
                        className="btn btn-dark btn-sm mx-2" onClick={() => { handleCheckCode(false); setShowAlert(false); }} style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                      >
                        Check Test Cases
                      </button> */}
                      <div className='d-flex justify-content-between'>
                      <div className=''>
                                <button className="btn btn-sm" style={{ backgroundColor: '#B8B7B7', color: '#000000' }}>
                                  Your Output
                                </button>
                                <FontAwesomeIcon icon={faExpand} className='px-1 mt-2' onClick={Handlepreview}/>
                          </div>
                          <div className=''>
                                <button className="btn btn-sm" style={{ backgroundColor: '#C9C8FF', color: '#3F3F50' }} onClick={handlesubmit}>
                                Submit Code
                                </button>
                          </div>
                          </div>
                  <iframe
                          style={{ width: '100%', height: '30%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
                          className="w-full h-full"
                          srcDoc={srcCode}
                          title="output"
                          sandbox="allow-scripts allow-same-origin"
                          width="100%"
                          height="100%"
                          // style={{ pointerEvents: 'none'}}
                        ></iframe>
                        <div className="pt-3" style={{   width: '100%',   height: '30.5vh',   backgroundColor: '#F5FAFB',   color: 'black',   borderColor: 'white', }}>

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
        <Modal.Body className=' text-dark' style={{minHeight:'100%', height:'50vh',maxHeight:'100%',overflowY:'auto'}}>
          {/* {alertMessage || Sample_img} */}
          {displ=='image'? 
          <img src={Sample_img} className="img-fluid mt-3" alt="image" style={{pointerEvents: 'none'}} />: displ=='output'?
            <iframe
      style={{ width: '100%', height: '30%',  backgroundColor: '', color: 'black', borderColor: 'white', outline: 'none', resize: 'none'}}
      className="w-full h-full"
      srcDoc={srcCode}
      title="output"
      sandbox="allow-scripts allow-same-origin"
      width="100%"
      height="100%"
      // style={{ pointerEvents: 'none'}}
    ></iframe>  
          : <div>{ activeTab=='html'? 
          <TableComponent/>:
          <CSSComponent/>}
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

export default HTMLCSSEditor ;