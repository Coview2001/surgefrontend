import React, { useCallback, useState, useEffect } from "react";
import { Tab, Tabs, Modal, Button, Spinner, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Frontend.css";
import { FadeLoader, PulseLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import CryptoJS from "crypto-js";
import axios from "axios";
import html2canvas from "html2canvas";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "bootstrap/dist/css/bootstrap.min.css";
import InternshipHeader from './InternshipHeader';
const Frontendnew = () => {
    const [userEmail, setuserEmail] = useState("");
    const [Page_Name, setPage_Name] = useState("");
    const [Sample_img, setSample_img] = useState("");
    const [Preview_img, setPreview_img] = useState("");
    const [tabs, setTabs] = useState([]);
    const [htmlEdit, setHtmlEdit] = useState("");
    const [htmlOldScore, sethtmlOldScore] = useState(0);
    const [cssEdit, setCssEdit] = useState("");
    const [cssOldScore, setcssOldScore] = useState(0);
    const [jsEdit, setJsEdit] = useState("");
    const [jsOldScore, setjsOldScore] = useState(0);
    const [pythonEdit, setPythonEdit] = useState("");
    const [pythonOldScore, setpythonOldScore] = useState(0);
    const [app_pyEdit, setapp_pyEdit] = useState("");
    const [app_pyOldScore, setapp_pyOldScore] = useState(0);
    const [fetchedData, setFetchedData] = useState("");
    const [fetchedDatahtml, setfetchedDatahtml] = useState("");
    const [activeTab, setActiveTab] = useState("html");
    const [htmlHomeData, sethtmlHomeData] = useState();
    const [cssHomeData, setcssHomeData] = useState();
    const [jsHomeData, setjsHomeData] = useState();
    const [pythonHomeData, setpythonHomeData] = useState();
    const [app_pyHomeData, setapp_pyHomeData] = useState();
    const [pythonRegx, setpythonRegx] = useState();
    const [sqlRegx, setsqlRegx] = useState();
    const [testResult, setTestResult] = useState(null);
    const [testMessage, setTestMessage] = useState(null);
    const [TestValid, setTestValid] = useState();
    const [alertMessage, setAlertMessage] = useState("");
    const [explanation, setExplanation] = useState("");

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [validationStatus, setValidationStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true); // Set this as needed
    const [DOMSTR, setDOMSTR] = useState("HTML DOM structure");
    const [DOMTRUE, setDOMTRUE] = useState(false);
    const [submitstatus, setSubmitstatus] = useState("");
    const [loading, setLoading] = useState(false);

    const [editorHeightPercentage, setEditorHeightPercentage] = useState(45);
    const [ticketRaised, setTicketRaised] = useState(false);
    const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [modalBgClass, setModalBgClass] = useState();


    const secretKey = "gvhbfijsadfkefjnujrbghj";
    const encryptedStudentId = sessionStorage.getItem("StudentId");
    const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId,secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedEmail = sessionStorage.getItem("Email");
    const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail,secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedprojectpage = sessionStorage.getItem("ProjectPage ");
    const decryptedprojectpage = CryptoJS.AES.decrypt(encryptedprojectpage,secretKey).toString(CryptoJS.enc.Utf8);
    const encryptedprojectname = sessionStorage.getItem("ProjectName ");
    const decryptedprojectname = CryptoJS.AES.decrypt(encryptedprojectname,secretKey).toString(CryptoJS.enc.Utf8)?.replace("_", " ");
    const [showBugReport, setShowBugReport] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [bugDesc, setBugDesc] = useState("");
    const [issueType, setIssueType] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const issueTypes = [
        "UI related topics",
        "Functionality related topics",
        "Performance related topics",
        "Security Vulnerability related topics",
        "Other related topics",
        "Require Tutor Assistance",
    ];
  
    const [KeysLength, setKeysLength] = useState(0);
    const [usercodelength, setUsercodeLength] = useState(0);
  
    const [hasChanges, setHasChanges] = useState(false);
      const navigate = useNavigate();
      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);  // Start loading
    
            const payload = {
              StudentId: decryptedStudentId,
              Page: decryptedprojectpage,
              ProjectName: decryptedprojectname,
            };
    
            const response = await axios.post(
              "https://surgebackend.azurewebsites.net/internship/pages/",
              payload
            );
    
            const data = response.data;
            setFetchedData(data);
            setfetchedDatahtml(data.Explanation.HTML);
            // //console.log(data.Explanation.HTML);
    
            if (data) {
              const storedEmail = decryptedEmail; // Assuming decryptedEmail is available in scope
              if (storedEmail) {
                setuserEmail(storedEmail);
              }
    
              setPage_Name(data.Page_Name || "");
              setSample_img(data.Sample_img || "");
              setPreview_img(data.Preview_img || "");
              setTabs(data.Tabs || []);
    
              const tabs = data.Tabs || [];
    
              if (tabs.includes("HTML")) {
                setHtmlmessages(data.Code_Validation.HTML_Messages);
                // //console.log("first", data.Code_Validation.HTML_Messages)
                setHtmlEdit(data.Response?.HTML || "");
                sethtmlOldScore(data.Response?.HTML?.[data.Page_Name + "_score"] || 0);
              } else {
                setHtmlEdit(""); // Fallback for missing HTML tab
                sethtmlOldScore(0); // Fallback for missing HTML score
              }
    
              if (tabs.includes("CSS")) {
                setCssmessages(data.Code_Validation.CSS_Messages);
                setCssEdit(data.Response?.CSS || "");
                setcssOldScore(data.Response?.CSS?.[data.Page_Name + "_score"] || 0);
              } else {
                setCssEdit(""); // Fallback for missing CSS tab
                setcssOldScore(0); // Fallback for missing CSS score
              }
    
              if (tabs.includes("JS")) {
                setJsmessages(data.Code_Validation.JS_Messages);
                setJsEdit(data.Response?.JS || "");
                setjsOldScore(data.Response?.JS?.[data.Page_Name + "_score"] || 0);
              } else {
                setJsEdit(""); // Fallback for missing JS tab
                setjsOldScore(0); // Fallback for missing JS score
              }
    
              if (tabs.includes("Python")) {
                setPythonmessages(data.Code_Validation.Python_Messages);
                setPythonEdit(data.Response?.Python || "");
                setpythonOldScore(data.Response?.Python?.[data.Page_Name + "_score"] || 0);
              } else {
                setPythonEdit(""); // Fallback for missing Python tab
                setpythonOldScore(0); // Fallback for missing Python score
              }
    
              if (tabs.includes("app.py")) {
                setapp_pymessages(data.Code_Validation.App_py_Messages);
                setapp_pyEdit(data.Response?.app_py || "");
                setapp_pyOldScore(data.Response?.app_py?.[data.Page_Name + "_score"] || 0);
              } else {
                setapp_pyEdit(""); // Fallback for missing app_py tab
                setapp_pyOldScore(0); // Fallback for missing app_py score
              }
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);  // Stop loading
          }
        };
    
        fetchData();
      }, []); // Dependency array is empty to fetch data once on component mount
        
      const [satisfiedRequirementshtmlLength, setSatisfiedRequirementshtmlLength] = useState(0);
      const [satisfiedRequirementscssLength, setSatisfiedRequirementscssLength] = useState(0);
      const [satisfiedRequirementsjsLength, setSatisfiedRequirementsjsLength] = useState(0);
      const [satisfiedRequirementspythonLength, setSatisfiedRequirementspythonLength] = useState(0);
      const [satisfiedRequirementsapp_pyLength, setSatisfiedRequirementsapp_pyLength] = useState(0);
    
      const [htmlmessages, setHtmlmessages] = useState([]);
      const [cssmessages, setCssmessages] = useState([]);
      const [jsmessages, setJsmessages] = useState([]);
      const [pythonmessages, setPythonmessages] = useState([]);
      const [app_pymessages, setapp_pymessages] = useState([]);

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
              backgroundColor: "#E2F2FF", // Match your background color
            });
          };
    
          // Capture the full page content
          const mainCanvas = await captureFullPage();
    
          // Get the iframe
          const iframe = document.querySelector("iframe");
          if (iframe) {
            // Calculate iframe position relative to the page
            const iframeRect = iframe.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
    
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
            const finalCanvas = document.createElement("canvas");
            finalCanvas.width = mainCanvas.width;
            finalCanvas.height = mainCanvas.height;
    
            const ctx = finalCanvas.getContext("2d");
    
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
    
            const screenshot = finalCanvas.toDataURL("image/png");
            setScreenshot(screenshot);
          } else {
            const screenshot = mainCanvas.toDataURL("image/png");
            setScreenshot(screenshot);
          }
    
          setShowBugReport(true);
        } catch (error) {
          console.error("Error capturing screenshot:", error);
          alert("Failed to capture screenshot. You can still report the bug.");
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
          Comment: {},
        };
    
        fetch("https://surgebackend.azurewebsites.net/internshipreport/bugs/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(
                  `HTTP error! Status: ${response.status}, Text: ${text}`
                );
              });
            }
            return response.json();
          })
          .then((data) => {
            // //console.log("Success:", data);
            // Reset form and close modal
            setBugDesc("");
            setIssueType("");
            setScreenshot(null);
            setShowBugReport(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            // Optionally show an error message to the user here
          })
          .finally(() => {
            setLoading(false);
          });
      };
    
      const handleTicket = async () => {
        navigate("/Tickets");
      };
      const handleLogOut = async () => {
        try {
          const response = await axios.post(
            "https://surgebackend.azurewebsites.net/logout/",
            {
              StudentId: decryptedStudentId,
            }
          );
          
          navigate("/");
        } catch (error) {
          console.error("Error sending comment:", error);
        }
      };
      const [splitOffset, setSplitOffset] = useState(window.innerWidth / 2);
  const [questionName, setQuestionName] = useState();
  const [requirementsHeightPercentage, setRequirementsHeightPercentage] =
    useState(45);
  const [questionsHeightPercentage, setQuestionHeightPercentage] = useState(45);
  const [imageView, setImageView] = useState(false);
  const [displ, setdispl] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(null);

  const [isDraggingVertically, setIsDraggingVertically] = useState(false);
  const [initialY, setInitialY] = useState(null);
  const [outputHeightPercentage, setOutputHeightPercentage] = useState(45); // in percentage (vh)
  const [isDraggingVerticallyLeft, setIsDraggingVerticallyLeft] =
    useState(false);
  const [initialYLeft, setInitialYLeft] = useState(null);
  const [leftTopHeightPercentage, setLeftTopHeightPercentage] = useState(45); // initial percentage (vh)
  const [leftDownHeightPercentage, setLeftDownHeightPercentage] = useState(49); // initial percentage (vh)

  //05-11 functions
  const handleshow = () => {
    setdispl("");
    setShowAlert(true);
  };

  const Handlepreview = () => {
    setShowAlert(true);
    setdispl("output");
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, initialX]);

  useEffect(() => {
    window.addEventListener("mousemove", handleVerticalMouseMove);
    window.addEventListener("mouseup", handleVerticalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleVerticalMouseMove);
      window.removeEventListener("mouseup", handleVerticalMouseUp);
    };
  }, [isDraggingVertically, initialY]);
  useEffect(() => {
    window.addEventListener("mousemove", handleVerticalMouseMoveLeft);
    window.addEventListener("mouseup", handleVerticalMouseUpLeft);

    return () => {
      window.removeEventListener("mousemove", handleVerticalMouseMoveLeft);
      window.removeEventListener("mouseup", handleVerticalMouseUpLeft);
    };
  }, [isDraggingVerticallyLeft, initialYLeft]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !initialX) return;
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

  const handleNext = () => {
    // //console.log("Page_Name", Page_Name)
    navigate("/Page_report", { state: { Page_Name } });
  };

  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.srcdoc = srcCode;
    }
  }, [htmlEdit, cssEdit, jsEdit]);


    
    const onChangeHtml = useCallback(
        (value, viewUpdate) => {
          setHtmlEdit(value);
          handleCheckCode();
          if (viewUpdate.state.doc.toString().endsWith("\n")) {
            handleCheckCode(); // Call the handleCheckCode function
          }
        },
        [htmlEdit]
      );
    
      const onChangeCss = useCallback(
        (value, viewUpdate) => {
          setCssEdit(value);
          handleCheckCode();
    
          if (viewUpdate && viewUpdate.state.doc.toString().endsWith("\n")) {
            handleCheckCode(); // Call the handleCheckCode function
          }
        },
        [cssEdit]
      );
    
      const onChangeJavaScript = useCallback(
        (value, viewUpdate) => {
          setJsEdit(value);
          handleCheckCode();
          if (viewUpdate && viewUpdate.state.doc.toString().endsWith("\n")) {
            handleCheckCode(); // Call the handleCheckCode function
          }
        },
        [jsEdit]
      );
    
      const onChangePython = useCallback(
        (value) => {
          setPythonEdit(value);
          handleCheckCode();
    
          // Check if the last character of the updated value is a newline
          if (value.endsWith("\n")) {
            handleCheckCode();
          }
        },
        [pythonEdit]
      );
    
      const onChangeApp_py = useCallback(
        (value) => {
          setapp_pyEdit(value);
          handleCheckCode();
    
          // Check if the last character of the updated value is a newline
          if (value.endsWith("\n")) {
            handleCheckCode();
          }
        },
        [app_pyEdit]
      );
    
      const handleSubmitClick = () => {
        setDOMTRUE(false);
        setShowConfirmModal(true);
      };
    
      const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
      };
      const handleConfirmSubmit = () => {
        handleCloseConfirmModal();
        // handleCheckCode();
        handleSubmitCode();
      };
    
      const handleSubmitCode = () => {
        setIsLoading(true);
        let codeToTest;
        switch (activeTab) {
          case "html":
            codeToTest = htmlEdit;
            break;
          case "css":
            codeToTest = cssEdit;
            break;
          case "js":
            codeToTest = jsEdit;
            break;
          case "python":
            codeToTest = pythonEdit;
            break;
          case "app_py":
            codeToTest = app_pyEdit;
          // setFormSubmitted(true);
          // setShowNextButton(true)
          default:
            codeToTest = "";
            break;
        }
    
        sendDataToBackend(activeTab, codeToTest, Page_Name);
    
        const lastTabKey = tabKeys[tabs[tabs.length - 1]];
        if (activeTab === lastTabKey) {
          setFormSubmitted(true);
          setShowNextButton(true);
        } else {
          setFormSubmitted(false);
          setShowNextButton(false);
        }
      };

      const sendDataToBackend = (type, code, Page_Name) => {
        const url = `https://surgebackend.azurewebsites.net/internship/submit/`;
        const data = {
          Page: Page_Name,
          StudentId: decryptedStudentId,
          Email: decryptedEmail,
          ProjectName: decryptedprojectname,
          Old_score: "0",
          Score: "0",
          KEYS: "",
          Regx: "",
          Qn: "",
          Requirements: "",
          Ans: code || app_pyEdit,
          Subject: '',
          Tabs: tabs
        };
        switch (type) {
            case "html":
              data.Subject = "HTML";
              data.KEYS = htmlHomeData;
              data.Regx = "";
              data.Old_score = htmlOldScore || 0;
              data.Qn = fetchedDatahtml;
              data.Requirements = htmlHomeData.length;
              data.Score = (satisfiedRequirementshtmlLength + '/' + htmlHomeData.length).toString();
              break;
            case "css":
              data.Subject = "CSS";
              data.KEYS = cssHomeData;
              data.Regx = "";
              data.Old_score = cssOldScore || 0;
              data.Qn =  fetchedData.Explanation.CSS
              data.Requirements = cssHomeData.length;
              data.Score = (satisfiedRequirementscssLength + '/' + cssHomeData.length).toString();
              break;
            case "js":
              data.Subject = "Java_Script";
              data.KEYS = jsHomeData;
              data.Regx = pythonRegx;
              data.Old_score = jsOldScore || 0;
              data.Qn = fetchedData.Explanation.JS;
              data.Requirements = jsHomeData.length;
              data.Score = (satisfiedRequirementsjsLength + '/' + jsHomeData.length).toString();
              break;
            case "python":
              data.Subject = "Python";
              data.KEYS = pythonHomeData;
              data.Regx = pythonRegx;
              data.File_name = "Python";
              data.Old_score = pythonOldScore || 0;
              data.Qn = fetchedData.Explanation.Python;
              data.Requirements = pythonHomeData.length;
              data.Score = (satisfiedRequirementspythonLength + '/' + pythonHomeData.length).toString();
              break;
            case "app_py":
              data.Subject = "app_py";
              data.KEYS = app_pyHomeData;
              data.Regx = sqlRegx;
              data.File_name = "app_py";
              data.Old_score = app_pyOldScore || 0;
              data.Qn = fetchedData.Explanation.App_py;
              data.Requirements = app_pyHomeData.length;
              data.Score = (satisfiedRequirementsapp_pyLength + '/' + app_pyHomeData.length).toString();
              break;
            default:
              data.KEYS = "";
              data.Regx = "";
              break;
          }

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setTestResult(data.score);
              setTestMessage(data.message);
              setTestValid(data.valid);
              setSubmitstatus(data.Status);
              setIsLoading(false);
              setAlertMessage(
                `Test Message: ${data.message}\nTest Result: ${data.score}`
              );
              // setShowAlert(true);
            })
            .catch((error) => console.error("Error:", error));
        };

        const handleCheckCode = () => {
            setHasChanges(true);
            setShowSubmitButton(true);
            let codeToTest;
            switch (activeTab) {
              case "html":
                codeToTest = htmlEdit;
                break;
              case "css":
                codeToTest = cssEdit;
                break;
              case "js":
                codeToTest = jsEdit;
                break;
              case "python":
                codeToTest = pythonEdit;
                break;
              case "app_py":
                codeToTest = app_pyEdit;
              default:
                codeToTest = "";
                break;
            }
        
            sendDataToCheck(activeTab, codeToTest);
          };
        
          const sendDataToCheck = (type, code) => {
            // //console.log(HomePageData);
            // if (!HomePageData) {
            //   setAlertMessage("HomePageData is not available.");
            //   // setShowAlert(true);
            //   return;
            // }
        
            const htmlValidationData = fetchedData.Code_Validation.HTML;
            const cssValidationData = fetchedData.Code_Validation.CSS;
            const jsValidationData = fetchedData.Code_Validation.JS;
            const pythonValidationData = fetchedData.Code_Validation.Python;
            const app_pyValidationData = fetchedData.Code_Validation.App_py;
            const python_RegxData = fetchedData.Code_Validation.Python_Regx;
            const db_RegxData = fetchedData.Code_Validation.App_py_Regx;
            // //console.log("python_RegxData", python_RegxData)
            sethtmlHomeData(htmlValidationData);
            setcssHomeData(cssValidationData);
            setjsHomeData(jsValidationData);
            setpythonRegx(python_RegxData);
            setsqlRegx(db_RegxData);
            setpythonHomeData(pythonValidationData);
            setapp_pyHomeData(app_pyValidationData);
        
            if (type === "html") {
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
                  // //console.log("converted html", finalHtml)
                // Self-closing tags that do not require a closing tag
                const selfClosingTags = [
                  "area",
                  "base",
                  "br",
                  "col",
                  "embed",
                  "hr",
                  "img",
                  "input",
                  "link",
                  "meta",
                  "param",
                  "source",
                  "track",
                  "wbr",
                ];
        
                // Tags that require a proper closing tag
                const nonSelfClosingTags = [
                  'html', 'head', 'body', 'header', 'footer', 'section', 'article', 'aside', 'nav',
                  'main', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'dl', 'dt', 
                  'dd', 'figure', 'figcaption', 'form', 'label', 'input', 'textarea', 'select', 'option',
                  'button', 'a', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'caption', 'details',
                  'summary', 'mark', 'b', 'i', 'u', 'strong', 'em', 'del', 'ins', 'sub', 'sup', 'code', 
                  'pre', 'blockquote', 'q', 'address', 'cite', 'time', 'var', 's', 'strike', 'ruby', 'rt',
                  'rp', 'wbr', 'progress', 'meter', 'output', 'canvas', 'iframe', 'object', 'param', 
                  'audio', 'video', 'source', 'track', 'picture', 'map', 'area', 'fieldset', 'legend', 
                  'details', 'menu', 'menuitem', 'dialog', 'template', 'bdi', 'bdo', 'span', 'small', 'big',
                  'sub', 'sup', 'dfn', 'abbr', 'acronym', 'kbd', 'samp', 'var', 'time', 'code', 'pre', 'ins',
                  'del', 'dfn', 'mark', 'samp', 'bdi', 'bdo'
              ];
        
                const tagMatches = [...finalHtml.matchAll(/<(\w+)([^>]*)>/g)].map(
                  (match) => {
                    const attributes = {};
                    const tagName = match[1].toLowerCase();
        
                    // Ensure the tag is properly formatted
                    if (!match[0].endsWith(">")) {
                      // //console.log(`Validation error: Opening tag <${tagName}> is not properly closed.`);
                      return {
                        tag: tagName,
                        attributes,
                        isSelfClosing: false,
                        hasClosingTag: false,
                        error: "Opening tag is not properly closed.",
                      };
                    }
        
                    const attributeMatches = [
                      ...match[2].matchAll(/(\w+)=["']([^"']*)["']/g),
                    ];
        
                    attributeMatches.forEach((attrMatch) => {
                      const attrName = attrMatch[1];
                      let attrValue = attrMatch[2];
        
                      // Handle complete attributes for href, src, data-url, and url without splitting
                      if (["href", "src", "data-url", "url"].includes(attrName)) {
                        const fullMatch = match[2].match(
                          new RegExp(
                            `${attrName}=["']([^"']*\\{\\{\\s*url_for\\s*\\([^\\)]+\\)\\s*[^"']*)["']`
                          )
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
                    const hasClosingTag =
                      !selfClosingTags.includes(match[1].toLowerCase()) &&
                      new RegExp(`</${match[1]}>`).test(finalHtml); // Check for a proper closing tag
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
                  }
                );
        
                return tagMatches;
              };
        
              const validHTMLTags = [
                "a",
                "abbr",
                "address",
                "area",
                "article",
                "aside",
                "audio",
                "b",
                "base",
                "bdi",
                "bdo",
                "blockquote",
                "body",
                "br",
                "button",
                "canvas",
                "caption",
                "cite",
                "code",
                "col",
                "colgroup",
                "data",
                "datalist",
                "dd",
                "del",
                "details",
                "dialog",
                "div",
                "dl",
                "dt",
                "em",
                "embed",
                "fieldset",
                "figcaption",
                "figure",
                "footer",
                "form",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "head",
                "header",
                "hr",
                "html",
                "i",
                "iframe",
                "img",
                "input",
                "ins",
                "kbd",
                "label",
                "legend",
                "li",
                "link",
                "main",
                "map",
                "mark",
                "meta",
                "meta",
                "nav",
                "noscript",
                "object",
                "ol",
                "optgroup",
                "option",
                "output",
                "p",
                "param",
                "picture",
                "pre",
                "progress",
                "q",
                "rp",
                "rt",
                "ruby",
                "s",
                "samp",
                "script",
                "section",
                "select",
                "small",
                "source",
                "span",
                "strong",
                "style",
                "sub",
                "summary",
                "sup",
                "table",
                "tbody",
                "td",
                "template",
                "textarea",
                "tfoot",
                "th",
                "thead",
                "title",
                "tr",
                "track",
                "u",
                "ul",
                "var",
                "video",
                "wbr",
              ];
        
              const validateHTML = (html) => {
                const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
                const headTags = ["title", "meta", "link", "style"];
                const bodyTags = ["head", "html", ...headTags];
                const selfClosingTags = [
                  "area",
                  "base",
                  "br",
                  "embed",
                  "hr",
                  "img",
                  "input",
                  "link",
                  "meta",
                  "source",
                  "track",
                  "wbr"
                ];
                const nonSelfClosingTags =[
                  'html', 'head', 'body', 'header', 'footer', 'section', 'article', 'aside', 'nav',
                  'main', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'dl', 'dt', 
                  'dd', 'figure', 'figcaption', 'form', 'label', 'input', 'textarea', 'select', 'option',
                  'button', 'a', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'caption', 'details',
                  'summary', 'mark', 'b', 'i', 'u', 'strong', 'em', 'del', 'ins', 'sub', 'sup', 'code', 
                  'pre', 'blockquote', 'q', 'address', 'cite', 'time', 'var', 's', 'strike', 'ruby', 'rt',
                  'rp', 'wbr', 'progress', 'meter', 'output', 'canvas', 'iframe', 'object', 'param', 
                  'audio', 'video', 'source', 'track', 'picture', 'map', 'area', 'fieldset', 'legend', 
                  'details', 'menu', 'menuitem', 'dialog', 'template', 'bdi', 'bdo', 'span', 'small', 'big',
                  'sub', 'sup', 'dfn', 'abbr', 'acronym', 'kbd', 'samp', 'var', 'time', 'code', 'pre', 'ins',
                  'del', 'dfn', 'mark', 'samp', 'bdi', 'bdo'
              ];
                
        
                const HtmlTags = ["html", "head", "body"];
        
                const doctypeContent = html.match(/<!DOCTYPE html[^>]*>(.*?)<\/html>/s);
                const htmlContent = html.match(/<html[^>]*>(.*?)<\/html>/s);
                const headContent = html.match(/<head[^>]*>(.*?)<\/head>/is);
                const bodyContent = html.match(/<body[^>]*>(.*?)<\/body>/is);
        
                const isValidTag = (tagName) => validHTMLTags.includes(tagName);
        
                if (htmlContent == null) {
                  setDOMSTR("Invalid DOM structure");
                  setDOMTRUE(true);
                  return false;
                } else {
                  if (doctypeContent) {
                    const docMatches = doctypeContent[1].match(tagPattern);
                    for (let tag of docMatches || []) {
                      const tagName = tag
                        .replace(/<\/?|\/?>/g, "")
                        .split(" ")[0]
                        .toLowerCase();
                      if (HtmlTags.includes(tagName) || !isValidTag(tagName)) {
                        // Handle any invalid tags found
                      }
                    }
                    setDOMSTR("HTML DOM structure");
                    setDOMTRUE(false);
                  }
        
                  if (htmlContent) {
                    const htmlMatches = htmlContent[1].match(tagPattern);
                    for (let tag of htmlMatches || []) {
                      const tagName = tag
                        .replace(/<\/?|\/?>/g, "")
                        .split(" ")[0]
                        .toLowerCase();
                      if (!isValidTag(tagName)) {
                        // //console.log(`Misspelled or misplaced tag: ${tagName}`);
                        setDOMSTR(
                          `Invalid ${tagName} tag inside html tag due to possible spelling error`
                        );
                        setDOMTRUE(true);
                        return false;
                      }
                    }
                    setDOMSTR("HTML DOM structure");
                    setDOMTRUE(false);
                  }
        
                  if (headContent) {
                    const headMatches = headContent[1].match(tagPattern);
                    for (let tag of headMatches || []) {
                      const tagName = tag
                        .replace(/<\/?|\/?>/g, "")
                        .split(" ")[0]
                        .toLowerCase();
                      if (!headTags.includes(tagName) || !isValidTag(tagName)) {
                        // //console.log('Invalid head tag:', tagName);
                        setDOMSTR(`Invalid ${tagName} tag inside head tag`);
                        setDOMTRUE(true);
                        return false;
                      }
                    }
                    setDOMSTR("HTML DOM structure");
                    setDOMTRUE(false);
                  }
        
                  // Check if body exists
                  if (!bodyContent || bodyContent[1].trim() === "") {
                    return false;
                  }
        
                  // Validate body tags
                  const bodyMatches = bodyContent[1].match(tagPattern);
                  for (let tag of bodyMatches || []) {
                    const tagName = tag
                      .replace(/<\/?|\/?>/g, "")
                      .split(" ")[0]
                      .toLowerCase();
                    if (bodyTags.includes(tagName) || !isValidTag(tagName)) {
                      // //console.log('Invalid body tag:', tagName);
                      setDOMSTR(`Invalid ${tagName} tag inside body tag`);
                      setDOMTRUE(true);
                      return false;
                    }
                    setDOMSTR("HTML DOM structure");
                    setDOMTRUE(false);
                  }
        
                  // Validate self-closing tags
                  const selfClosingMatches = bodyContent[1].match(
                    /<([a-z][a-z0-9]*)\s*\/?>/gi
                  );
                  for (let tag of selfClosingMatches || []) {
                    const tagName = tag.replace(/<\/?|\/?>/g, "").toLowerCase();
                    if (selfClosingTags.includes(tagName)) {
                      // //console.log(`Invalid self-closing tag: ${tagName}`);
                      // setDOMSTR(`Invalid self-closing tag: ${tagName}`);
                      setDOMTRUE(false);
                      return false;
                    } else {
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
        
                  setDOMSTR("HTML DOM structure");
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
        
              const relevantAttributes = [
                "type",
                "id",
                "name",
                "required",
                "class",
                "url",
              ];
        
              const missingHTMLValues = htmlValidationData
                .filter((expectedTag) => {
                  const foundTags = normalizedAttributes.filter(
                    (actualTag) => actualTag.tag === expectedTag.tag
                  );
                  let isTagMissing = false;
        
                  const hasMatchingTag = foundTags.some((foundTag) => {
                    const expectedAttributes = expectedTag.attributes;
                    const actualAttributes = foundTag.attributes;
        
                    // Check if the tag is not self-closing and has a closing tag before matching attributes
                    if (!foundTag.isSelfClosing && !foundTag.hasClosingTag) {
                      return false;
                    }
        
                    return Object.keys(expectedAttributes).every((attr) => {
                      const expectedValues = Array.isArray(expectedAttributes[attr])
                        ? expectedAttributes[attr]
                        : [expectedAttributes[attr]];
                      const actualValues = Array.isArray(actualAttributes[attr])
                        ? actualAttributes[attr]
                        : [actualAttributes[attr]];
        
                      if (!actualValues || actualValues.length === 0) {
                        expectedTag.missingAttributes =
                          expectedTag.missingAttributes || {};
                        expectedTag.missingAttributes[attr] = expectedValues;
                        return false;
                      }
        
                      const allValuesMatch = expectedValues.every((val) =>
                        actualValues.includes(val)
                      );
                      if (!allValuesMatch) {
                        expectedTag.missingAttributes =
                          expectedTag.missingAttributes || {};
                        expectedTag.missingAttributes[attr] = expectedValues.filter(
                          (val) => !actualValues.includes(val)
                        );
                        return false;
                      }
        
                      return true;
                    });
                  });
        
                  if (!hasMatchingTag) {
                    isTagMissing = true;
                  }
        
                  return isTagMissing;
                })
                .map((tag) => {
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
                const isHeadAndBodyValid = validateHTML(code); // Pass your HTML code to validate
        
                if (isHeadAndBodyValid) {
                  // //console.log("HTML structure with head and body is valid.");
                  // Continue with your process after validation
                } else {
                  // //console.log("Invalid HTML structure detected (head/body tag issues).");
                  // Handle the invalid structure case
                }
              }
        
              const presentIndices = htmlValidationData
                .map((item, index) => (missingHTMLValues.includes(item) ? null : index))
                .filter((index) => index !== null);
              setValidationStatus((prevState) => ({
                ...prevState,
                html: presentIndices,
              }));
        
        setSatisfiedRequirementshtmlLength(presentIndices.length);
              // setSatisfiedRequirementshtmlLength(validationStatus.html.length);
            } 
            else if (type === "css") {
                if (typeof code !== "string") {
                    setAlertMessage("Invalid CSS code format.");
                    return;
                  }
                  
                  // Function to validate CSS rules
                  const validateRules = (rules, blocks) => {
                    return rules.filter((expectedRule) => {
                      const foundRule = blocks.find((block) => {
                        const [selector, propertiesBlock] = block.split("{").map((part) => part.trim());
                        if (!propertiesBlock) return false;
                  
                        const properties = propertiesBlock
                          .split(";")
                          .map((prop) => prop.trim())
                          .filter((prop) => prop !== "");
                  
                        // Check if the selector matches and all properties are present
                        if (selector !== expectedRule.selector) {
                          return false;
                        }
                  
                        // Check if all expected properties and values are present
                        return expectedRule.properties.every((expectedProp) => {
                          const foundProp = properties.find((prop) => {
                            const [property, value] = prop.split(":").map((part) => part.trim());
                            return (
                              expectedProp.property === property &&
                              expectedProp.value === value
                            );
                          });
                          return !!foundProp;
                        });
                      });
                      return !foundRule;
                    });
                  };
                  
                  // Extract media query blocks and normal CSS blocks
                  const mediaQueryRegex = /@media[^{]+\{([\s\S]+?})\s*}/g;
                  const mediaQueryBlocks = [];
                  let match;
                  
                  while ((match = mediaQueryRegex.exec(code)) !== null) {
                    mediaQueryBlocks.push(match[0]);
                  }
                  
                  // Remove media query blocks from code to get normal CSS blocks
                  const normalCSS = code.replace(mediaQueryRegex, "");
                  const normalBlocks = normalCSS
                    .split("}")
                    .map((block) => block.trim())
                    .filter((block) => block !== "");
                  
                  // Validate normal CSS rules
                  const missingCSSRules = validateRules(
                    cssValidationData.filter((rule) => !rule.media_query),
                    normalBlocks
                  );
                  
                  // Validate media query rules
                  const missingMediaQueryRules = {};
                  cssValidationData
                    .filter((rule) => rule.media_query)
                    .forEach((mediaQuery) => {
                      const mediaQueryBlock = mediaQueryBlocks.find((block) =>
                        block.includes(mediaQuery.media_query)
                      );
                      if (mediaQueryBlock) {
                        // Extract content inside the media query block
                        const startIndex = mediaQueryBlock.indexOf("{") + 1;
                        const endIndex = mediaQueryBlock.lastIndexOf("}");
                        const mediaQueryContent = mediaQueryBlock
                          .substring(startIndex, endIndex)
                          .trim();
                  
                        const blocks = mediaQueryContent
                          .split("}")
                          .map((block) => block.trim())
                          .filter((block) => block !== "");
                  
                        const missingRules = validateRules(mediaQuery.rules, blocks);
                        if (missingRules.length > 0) {
                          missingMediaQueryRules[mediaQuery.media_query] = missingRules;
                        }
                      } else {
                        missingMediaQueryRules[mediaQuery.media_query] = mediaQuery.rules;
                      }
                    });
                  
                  const isCSSValid =
                    missingCSSRules.length === 0 &&
                    Object.keys(missingMediaQueryRules).length === 0;
                  
                  setAlertMessage(
                    isCSSValid
                      ? "CSS Validation result: You have cleared all requirements"
                      : "CSS Validation result: Not Valid"
                  );
                  
                  if (!isCSSValid) {
                    setAlertMessage("Please clear the requirements");
                  }
                  
                  // Find indices of valid rules
                  const presentIndices = cssValidationData
                    .map((item, index) => {
                      if (item.media_query) {
                        return missingMediaQueryRules[item.media_query] ? null : index;
                      }
                      return missingCSSRules.some((rule) => rule === item) ? null : index;
                    })
                    .filter((index) => index !== null);
                  
                  // Update validation status and satisfied requirements count
                  setValidationStatus((prevState) => ({
                    ...prevState,
                    css: presentIndices,
                  }));
                  
                  setSatisfiedRequirementscssLength(presentIndices.length);
                }       
            else if (type === "js") {
              const userCode = typeof code === "string" ? code.split("\n") : code;
              // //console.log("Usercode", userCode);
              const expectedCode = Array.isArray(jsHomeData)
                ? jsHomeData
                : jsHomeData.split("\n");
              // //console.log("ExpectedCode", expectedCode);
              setKeysLength(expectedCode.length);
            
              const standardizeCode = (line) => {
                const trimmedLine = line.trim();
                if (
                  trimmedLine === "}" ||
                  trimmedLine === "]" ||
                  trimmedLine === ")" ||
                  trimmedLine === "" ||
                  trimmedLine === ")," ||
                  trimmedLine === "}," ||
                  trimmedLine === "]," ||
                  trimmedLine === "};" ||
                  trimmedLine === "];" ||
                  trimmedLine === ");"
                ) {
                  return "";
                }
                return trimmedLine
                  .replace(/\n/g, "") // Remove newlines
                  .replace(/"/g, "'") // Replace double quotes with single quotes
                  .replace(/\s+/g, "") // Remove extra spaces
                  .replace(/\/\*.*?\*\//g, "") // Remove comments
                  .replace(/\/\/.*$/g, "")
                  .replace(/;/g, "")
                  .trim(); // Trim the line
              };
            
              const standardizedUserCode = userCode
                .map(standardizeCode)
                .filter((line) => line !== "");
              const standardizedExpectedCode = expectedCode
                .map(standardizeCode)
                .filter((line) => line !== "");
            
              let newValidationStatus = {};
            
              // Check if userCode is empty
              if (standardizedUserCode.length === 0) {
                // Reset validation status to initial state
                setValidationStatus((prevStatus) => ({
                  ...prevStatus,
                  js: {
                    correct: 0,
                    incorrect: 0,
                    closures: "pending",
                    brackets: "pending",
                  },
                }));
                return; // Exit the function early
              }
            
              let satisfiedRequirementsCount = 0; // Variable to store the count of common satisfied lines
            
              // Line-by-line comparison
              standardizedUserCode.forEach((userLine, index) => {
                if (
                  userLine === "" ||
                  typeof standardizedExpectedCode[index] === "undefined"
                )
                  return;
                const expectedLine = standardizedExpectedCode[index];
                const isMatch = userLine === expectedLine;
            
                if (isMatch) {
                  satisfiedRequirementsCount++; // Increment count for every match
                }
            
                newValidationStatus[index] = isMatch ? "correct" : "incorrect";
              });
            
              // Validate closures
              const validateClosures = (codeArray) => {
                const openingBraces = ["{", "[", "("];
                const closingBraces = ["}", "]", ")"];
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
                      if (
                        closingBraces.indexOf(char) !== openingBraces.indexOf(lastBrace)
                      ) {
                        return false;
                      }
            
                      // Special case for '})' combination
                      if (char === "}" && i > 0 && line[i - 1] === ")") {
                        // Ensure last closed parenthesis matches
                        const secondLastBrace = stack.pop();
                        if (secondLastBrace !== "(") {
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
            
              newValidationStatus.closures =
                userClosuresValid && expectedClosuresValid ? "correct" : "incorrect";
            
              // Validate brackets
              const countBrackets = (codeArray) => {
                let openingCount = 0,
                  closingCount = 0;
                codeArray.forEach((line) => {
                  openingCount += (line.match(/{/g) || []).length;
                  closingCount += (line.match(/}/g) || []).length;
                });
                return { openingCount, closingCount };
              };
            
              const userBrackets = countBrackets(userCode);
              newValidationStatus.brackets =
                userBrackets.openingCount === userBrackets.closingCount
                  ? "correct"
                  : "incorrect";
            
              // Increment the satisfied requirements count based on closures and brackets validity
              // if (newValidationStatus.closures === "correct") {
              //   satisfiedRequirementsCount++;
              // }
              // if (newValidationStatus.brackets === "correct") {
              //   satisfiedRequirementsCount++;
              // }
            
              // Set the length of common satisfied requirements
              setUsercodeLength(satisfiedRequirementsCount);
            
              // Final setValidationStatus update in one line
              setValidationStatus((prevStatus) => ({
                ...prevStatus,
                js: { ...prevStatus.js, ...newValidationStatus },
              }));
            
              // //console.log("ValidationStatus JS:", validationStatus.js);
              // //console.log("js",satisfiedRequirementsCount)
              setSatisfiedRequirementsjsLength(satisfiedRequirementsCount)
            }
            else if (type === "python") {
              const userPythonCode =
                typeof pythonEdit === "string" ? pythonEdit.split("\n") : pythonEdit;
              const expectedPythonCode = Array.isArray(pythonValidationData)
                ? pythonValidationData
                : pythonValidationData.split("\n");
                const standardizePythonCode = (line) => {
                  // Regular expression to match strings enclosed by either single or double quotes
                  const stringPattern = /(["'])(.*?)(\1)/g;
                
                  // Replace strings with standard form, ensuring matching quotes
                  line = line.replace(stringPattern, (match, quote, content) => {
                    return `${quote}${content.replace(/([=,@'`:"#$%^&*(){}[\]])/g, ' $1 ').trim()}${quote}`;
                  });
                
                  // Remove extra spaces, comments, and other unwanted characters
                  return line
                    .trim()
                    .replace(/ +/g, ' ') // Replace multiple spaces with a single space
                    .replace(/#.*/g, "") // Remove comments
                    .replace(/"/g, "'")  // Convert double quotes to single quotes
                    .trim(); 
                };
                
              const standardizedUserPythonCode = userPythonCode
                .map(standardizePythonCode)
                .filter((line) => line !== "");
              const standardizedExpectedPythonCode = expectedPythonCode
                .map(standardizePythonCode)
                .filter((line) => line !== "");
              // //console.log('user code',standardizedUserPythonCode)
              // //console.log('expected code', standardizedExpectedPythonCode)
              let newValidationStatus = {};
              let satisfiedRequirementsCount = 0;
              const convertToList = (code) => {
                return code.split(" ").filter((unit) => unit.trim() !== ""); 
              };
            
              standardizedUserPythonCode.forEach((userLine, index) => {
                if (
                  userLine === "" ||
                  typeof standardizedExpectedPythonCode[index] === "undefined"
                )
                  return;
                const userLineList = convertToList(userLine);
                const expectedLineList = convertToList(standardizedExpectedPythonCode[index]);
            
                const isMatch =
                  userLineList.length === expectedLineList.length &&
                  userLineList.every((unit, idx) => unit === expectedLineList[idx]);
            
                if (isMatch) {
                  satisfiedRequirementsCount++;
                }
            
                newValidationStatus[index] = isMatch ? "correct" : "incorrect";
              });
            
              const validateIndentation = (codeArray) => {
                let isConsistent = true;
                let indentationLevel = null;
            
                codeArray.forEach((line) => {
                  if (line.trim() === "") return; 
                  const currentIndentation = line.match(/^\s*/)[0].length;
            
                  if (currentIndentation % 4 !== 0) {
                    isConsistent = false;
                  }
            
                  if (indentationLevel === null && currentIndentation > 0) {
                    indentationLevel = currentIndentation;
                  } else if (
                    currentIndentation > 0 &&
                    currentIndentation < indentationLevel
                  ) {
                    isConsistent = false;
                  }
                });
            
                return isConsistent;
              };
            
              const isIndentationConsistent = validateIndentation(userPythonCode);
              newValidationStatus.indentation = isIndentationConsistent
                ? "correct"
                : "incorrect";
            
              const validateClosures = (codeArray) => {
                const stack = [];
                const pairs = { "(": ")", "{": "}", "[": "]" };
            
                for (let line of codeArray) {
                  for (let char of line) {
                    if (["(", "{", "["].includes(char)) {
                      stack.push(char);
                    }
                    if ([")", "}", "]"].includes(char)) {
                      const last = stack.pop();
                      if (pairs[last] !== char) {
                        return false;
                      }
                    }
                  }
                }
                return stack.length === 0;
              };
            
              const isClosuresCorrect = validateClosures(userPythonCode);
              newValidationStatus.closures = isClosuresCorrect ? "correct" : "incorrect";
            
              setUsercodeLength(satisfiedRequirementsCount);
            
              setValidationStatus((prevStatus) => ({
                ...prevStatus,
                python: { ...prevStatus.python, ...newValidationStatus },
              }));
            
              // //console.log("Validation status for Python code:", newValidationStatus);
              // //console.log("Score", usercodelength);
              setSatisfiedRequirementspythonLength(satisfiedRequirementsCount);
            }
            else if (type === "app_py") {
              const userAppCode =
                typeof app_pyEdit === "string" ? app_pyEdit.split("\n") : app_pyEdit;
              const expectedAppCode = Array.isArray(app_pyValidationData)
                ? app_pyValidationData
                : app_pyValidationData.split("\n");
            
              const standardizeAppCode = (line) => {
                const stringPattern = /(["'])(.*?)(\1)/g;
            
                line = line.replace(stringPattern, (match, quote, content) => {
                  return `${quote}${content.replace(/([=,@'`:"#$%^&*(){}[\]])/g, ' $1 ').trim()}${quote}`;
                });
            
                return line
                  .trim()
                  .replace(/#.*/g, "") // Remove comments
                  .replace(/ +/g, " ") // Replace multiple spaces with a single space
                  .replace(/"/g, "'") // Normalize quotes
                  .trim();
              };
            
              const standardizedUserAppCode = userAppCode
                .map(standardizeAppCode)
                .filter((line) => line !== "");
              const standardizedExpectedAppCode = expectedAppCode
                .map(standardizeAppCode)
                .filter((line) => line !== "");
            
              let newValidationStatus = {};
              let satisfiedRequirementsCount = 0;
            
              const convertToList = (code) => {
                return code.split(" ").filter((unit) => unit.trim() !== "");
              };
            
              standardizedUserAppCode.forEach((userLine, index) => {
                if (
                  userLine === "" ||
                  typeof standardizedExpectedAppCode[index] === "undefined"
                )
                  return;
            
                const userLineList = convertToList(userLine);
                const expectedLineList = convertToList(standardizedExpectedAppCode[index]);
            
                const isMatch =
                  userLineList.length === expectedLineList.length &&
                  userLineList.every((unit, idx) => unit === expectedLineList[idx]);
            
                if (isMatch) {
                  satisfiedRequirementsCount++;
                }
            
                newValidationStatus[index] = isMatch ? "correct" : "incorrect";
              });
            
              const validateIndentation = (codeArray) => {
                let isConsistent = true;
                let indentationLevel = null;
            
                codeArray.forEach((line) => {
                  if (line.trim() === "") return;
                  const currentIndentation = line.match(/^\s*/)[0].length;
            
                  if (currentIndentation % 4 !== 0) {
                    isConsistent = false;
                  }
            
                  if (indentationLevel === null && currentIndentation > 0) {
                    indentationLevel = currentIndentation;
                  } else if (
                    currentIndentation > 0 &&
                    currentIndentation < indentationLevel
                  ) {
                    isConsistent = false;
                  }
                });
            
                return isConsistent;
              };
            
              const isIndentationConsistent = validateIndentation(userAppCode);
              newValidationStatus.indentation = isIndentationConsistent
                ? "correct"
                : "incorrect";
            
              const validateClosures = (codeArray) => {
                const stack = [];
                const pairs = { "(": ")", "{": "}", "[": "]" };
            
                for (let line of codeArray) {
                  for (let char of line) {
                    if (["(", "{", "["].includes(char)) {
                      stack.push(char);
                    }
                    if ([")", "}", "]"].includes(char)) {
                      const last = stack.pop();
                      if (pairs[last] !== char) {
                        return false;
                      }
                    }
                  }
                }
                return stack.length === 0;
              };
            
              const isClosuresCorrect = validateClosures(userAppCode);
              newValidationStatus.closures = isClosuresCorrect ? "correct" : "incorrect";
            
              setUsercodeLength(satisfiedRequirementsCount);
            
              setValidationStatus((prevStatus) => ({
                ...prevStatus,
                app_py: { ...prevStatus.app_py, ...newValidationStatus },
              }));
            
              setSatisfiedRequirementsapp_pyLength(satisfiedRequirementsCount);
            }
            // setShowAlert(true);
          };

          const formatCSS = (cssData) => {
            let formattedCSS = "";
            for (const [selector, properties] of Object.entries(cssData)) {
              formattedCSS += `==> ${selector} {\n`;
              properties.forEach((property) => {
                formattedCSS += `  ${property};\n`;
              });
              formattedCSS += `}\n`;
            }
            return formattedCSS;
          };


          const resetModal = () => {
            setAlertMessage("");
            setExplanation("");
            setShowAlert(false);
          };
        
          const handleCloseAlert = () => {
            setShowAlert(false);
            setExplanation("");
            resetModal();
          };

          const handlePreview = () => {
            // setIsPreviewVisible(true);
            setIsPreviewVisible((prevState) => !prevState);
            setShow(true);
          };

          const getButtonText = () => {
            switch (activeTab) {
              case "html":
                return "Submit HTML Code";
              case "css":
                return "Submit CSS Code";
              case "js":
                return "Submit JS Code";
              case "python":
                return "Submit Python Code";
              case "app_py":
                return "Submit app.py Code";
              default:
                return "Submit";
            }
          };

          const renderEditor = () => {
            switch (activeTab) {
              case "html":
                return (
                  <CodeMirror
                    className="text-xl text-start "
                    value={htmlEdit}
                    height="100%"
                    theme="light"
                    extensions={[html()]}
                    onChange={(value) => {
                      onChangeHtml(value);
                      // validateHTML(value);
                    }}
                    style={{
                      height: `calc(${editorHeightPercentage}vh - 5vh)`,
                      width: "100%",
                      overflowY: "auto",
                      color: "black",
                    }}
                  />
                );
              case "css":
                return (
                  <CodeMirror
                    className="text-xl text-start "
                    value={cssEdit}
                    height="100%"
                    theme="light"
                    extensions={[css()]}
                    onBeforeChange={(value) => {
                      setCssEdit(value);
                    }}
                    onChange={(value) => {
                      onChangeCss(value);
                    }}
                    style={{
                      height: `calc(${editorHeightPercentage}vh - 5vh)`,
                      width: "100%",
                      overflowY: "auto",
                      color: "black",
                    }}
                  />
                );
              case "js":
                return (
                  <CodeMirror
                    className="text-xl  text-start "
                    value={jsEdit}
                    height="100%"
                    theme="light"
                    extensions={[javascript()]}
                    onBeforeChange={(value) => {
                      setJsEdit(value);
                    }}
                    onChange={(value) => {
                      onChangeJavaScript(value);
                    }}
                    style={{
                      height: `calc(${editorHeightPercentage}vh - 5vh)`,
                      width: "100%",
                      overflowY: "auto",
                      color: "black",
                    }}
                  />
                );
              case "python":
                return (
                  <AceEditor
                    mode="python"
                    theme="dreamweaver"
                    height="100%"
                    fontSize={16}
                    value={pythonEdit}
                    onChange={onChangePython}
                    style={{
                      height: `calc(${editorHeightPercentage}vh - 5vh)`,
                      width: "100%",
                      overflowY: "auto",
                      color: "black",
                    }}
                    className="text-xl text-start"
                  />
                  //   <CodeMirror
                  //   className="text-xl  text-start "
                  //   value={pythonEdit }
                  //   height="100%"
                  //   theme="light"
                  //   extensions={[python()]}
                  //   onBeforeChange={(value) => {
                  //     setPythonEdit(value);
                  //   }}
                  //   onChange={(value) => {
                  //     onChangePython(value); } }
                  //   style={{height: `calc(${editorHeightPercentage}vh - 5vh)`,width:'100%', overflowY:'auto', color:'black' }}
                  // />
                );
              case "app_py":
                return (
                  <AceEditor
                    mode="python"
                    theme="dreamweaver"
                    height="100%"
                    fontSize={16}
                    value={app_pyEdit}
                    onChange={(value) => {
                      onChangeApp_py(value);
                    }}
                    style={{
                      height: `calc(${editorHeightPercentage}vh - 5vh)`,
                      width: "100%",
                      overflowY: "auto",
                      color: "black",
                    }}
                    className="text-xl text-start"
                  />
                  // <CodeMirror
                  //   className="text-xl  text-start "
                  //   value={app_pyEdit}
                  //   height="100%"
                  //   theme="light"
                  //   extensions={[python()]}
                  //   onBeforeChange={(value) => {
                  //     setapp_pyEdit(value);
                  //   }}
                  //   onChange={(value) => {
                  //     onChangeApp_py(value);
                  //   }}
                  //   style={{
                  //     height: `calc(${editorHeightPercentage}vh - 5vh)`,
                  //     width: "100%",
                  //     overflowY: "auto",
                  //     color: "black",
                  //   }}
                  // />
                );
              default:
                return null;
            }
          };
          const handleImgView = () => {
            setImageView(true);
            setdispl("image");
            setShowAlert(true);
          };
          const cleanedHtmlEdit = htmlEdit
            .replace("</body>", "")
            .replace("</html>", "");
        
          const srcCode = `
            ${cleanedHtmlEdit.replace("</title>", `</title><style>${cssEdit}</style>`)}
            
            </body>
            </html>
          `;
        
          const tabKeys = {
            HTML: "html",
            CSS: "css",
            JS: "js",
            Python: "python",
            "app.py": "app_py",
          };
        
          const handleTab = (selectedKey) => {
            setShowSubmitButton(false);
            setActiveTab(selectedKey);
            // //console.log("-=-=-=-=",selectedKey)
            const lastTabKey = tabKeys[tabs[tabs.length - 1]];
            // //console.log("=======================",lastTabKey)
          };



    return (
    <>
      <div
        className="container-fluid"
        style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}
      >
        <div
          className="row"
          id="captureElement"
          style={{ height: "50vh", maxHeight: "90vh" }}
        >
          <div className="container">
            {/* <SessionTimeout/> */}
            <InternshipHeader/>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <Spinner animation="border mx-3" style={{ color: "#3F51B5" }} />{" "}
                Loading...
              </div>
            ) : (
              <div
                className="row mt-2"
                style={{ height: "50vh", maxHeight: "90vh" }}
              >
                <div className="container-fluid" style={{ height: "100%" }}>
                  {/* <div className="" style={{ width: "100%" }}>
                    <header className=" head fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 border-bottom border-dark-subtle">
                      <div className="d-flex justify-content-center align-items-center">
                        <img src={logo} alt="Logo" height={38} width={100} />
                        <nav>
                          <span
                            className="px-1 text-white"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/InternshipDashboard")}
                          >
                            Project
                          </span>
                          <span className="px-1 text-white">&gt;</span>
                          <span
                            className="px-1 text-white"
                          >
                            {decryptedprojectpage} Page
                          </span>
                        </nav>
                      </div>
                      <nav className="ms-auto ">
                        <Dropdown className="d-flex justify-content-center">
                          <span
                            className="px-2   custom-btnEditor"
                            title="Support Assistance"
                          >
                            <RiCustomerService2Fill
                              onClick={handleReportBug}
                              className="icons text-white"
                              style={{ fontSize: "20px" }}
                            />
                          </span>
                          <span
                            className="px-2   custom-btnEditor"
                            onClick={handleTicket}
                            title="Ticket"
                          >
                            <FontAwesomeIcon
                              icon={faTicket}
                              className="icons text-white"
                            />
                          </span>
                          <span
                            className="px-2   custom-btnEditor"
                            onClick={handleHome}
                            title="Home"
                          >
                            <FontAwesomeIcon
                              icon={faHome}
                              className="icons text-white"
                            />
                          </span>
                          <Dropdown.Toggle
                            variant="rounded-sm rounded-circle px-1"
                            id="dropdown-basic"
                            title={decryptedName}
                            className=""
                            style={{ color: "#7335B7" }}
                          >
                            <img
                              src={decryptedPicture}
                              height={20}
                              alt=""
                              className="me-1 rounded-circle"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="px-2 pt-5 me-5 bg-light ">
                            <div className="text-center">
                              <Dropdown.Item>
                                <img
                                  src={decryptedPicture}
                                  height={100}
                                  alt="username"
                                  className="mx-5 rounded-circle"
                                />
                              </Dropdown.Item>
                              <Dropdown.Item className="fs-5 fw-bold">
                                {decryptedName}
                              </Dropdown.Item>
                              <Dropdown.Item className="">
                                {decryptedEmail}
                              </Dropdown.Item>
                              <Dropdown.Item className="pb-4">
                                {decryptedStudentId}
                              </Dropdown.Item>
                            </div>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={handleLogOut}
                              className="rounded-pill outline-white mb-2 text-white"
                              title="Logout"
                              style={{ backgroundColor: "#7335B7" }}
                            >
                              <FontAwesomeIcon
                                icon={faSignOut}
                                className="me-1"
                              />
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </nav>
                    </header>
                  </div> */}
                  <div className='row body mt-5' style={{backgroundColor:'#E2F2FF', overflow:'hidden', maxHeight: '93vh'}}>
                    <div className="qns"></div>
                    <div
                      className="InputQuery col-md-4"
                      style={{
                        height: "100vh",
                        overflow: "hidden",
                        width: splitOffset,
                        minWidth: "30%",
                        maxWidth: "60%",
                      }}
                    >
                      <div
                        className="col result"
                        style={{ height: "100%" }}
                      >
                        <div
                          className="row leftTop"
                          style={{
                            height: `${leftTopHeightPercentage}vh`,
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          <div
                            className=""
                            style={{
                              width: "100%",
                              overflowY: "auto",
                              height: "100%",
                              color: "black",
                              backgroundColor: '#FFFFFF',
                            }}
                          >
                            <h3>Question:</h3>
                            <span
                              className="mb-4 "
                              style={{
                                fontFamily: '"Segoe UI", Arial, sans-serif',
                              }}
                            >
                              {fetchedData.Qn}
                            </span>
                            <div>
                              <h4>Explanation:</h4>
                            {(() => {
                                switch (activeTab) {
                                  case "html":
                                    return (
                                      <>
                                      <span>
                                        {fetchedDatahtml}
                                      </span>
                                      </>
                                    );
                                  case "css":
                                    return (
                                      <>
                                      <span>
                                        {fetchedData.Explanation.CSS}
                                      </span>
                                      </>
                                    );
                                  case "js":
                                    return (
                                      <>
                                      <span>
                                        {fetchedData.Explanation.JS}
                                      </span>
                                      </>
                                    );
                                  case "python":
                                    return (
                                      <>
                                      <span>
                                        {fetchedData.Explanation.Python}
                                      </span>
                                      </>
                                    );
                                  case "app_py":
                                    return (
                                    <>
                                    <span>
                                      {fetchedData.Explanation.App_py}
                                    </span>
                                    </>
                                  );
                                  default:
                                    return (
                                      <>
                                      <span>
                                        No explanation available.
                                      </span>
                                      </>
                                    );
                            }})()}
                            </div>
                            <div>
                              {activeTab === "html" || activeTab === "css" ? (
                                <>
                                  <div className=" mt-2 d-flex justify-content-start">
                                    <div
                                      className="  "
                                      style={{
                                        backgroundColor: "",
                                        color: "black",
                                      }}
                                    >
                                      <h4>Expected Output</h4>
                                    </div>
                                    <FontAwesomeIcon
                                      icon={faExpand}
                                      className="mx-2  text-dark"
                                      onClick={handleImgView}
                                      style={{
                                        cursor: "pointer",
                                        color: "#495057",
                                        marginTop: "8px",
                                      }}
                                    />
                                  </div>
                                  <img
                                    src={Preview_img}
                                    className="img-fluid mt-3"
                                    alt="image"
                                    style={{
                                      pointerEvents: "none",
                                      boxShadow:
                                        "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      height: "35vh",
                                      maxWidth: "70%",
                                      minWidth: "20vw",
                                      width: "30vw",
                                    }}
                                  />
                                </>
                              ) : (
                                <div style={{ display: "none" }}>
                                  Expected output
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="MoveUPDown"
                          onMouseDown={handleVerticalMouseDownLeft}
                        ></div>
                        <div
                          className="row leftDown"
                          style={{
                            height: `${leftDownHeightPercentage}vh`,
                            backgroundColor: "#FFFFFF",
                            paddingBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "92%",
                              backgroundColor: "#FFFFFF",
                              overflowY: "auto",
                              color: "black",
                            }}
                          >
                            <div
                              className="mb-3"
                              style={{
                                position: "sticky",
                                top: "0",
                                backgroundColor: "#ffffff",
                                zIndex: "1",
                              }}
                            >
                              <h4>Requirements</h4>
                            </div>

                            {/* <FontAwesomeIcon icon={faCircleInfo} className=" mx-2" onClick={handleshow} style={{cursor:'pointer', color: '#495057', marginTop:'8px'}}/> */}

                            <div
                              className="text-start"
                              style={{
                                fontSize: "16px",
                                maxHeight: "300px", // Add a fixed height to enable scrolling
                              }}
                            >
                              {(() => {
                                switch (activeTab) {
                                  case "html":
                                    return (
                                      <>
                                        <span
                                          style={{
                                            fontFamily:
                                              '"Segoe UI", Arial, sans-serif',
                                          }}
                                        >
                                          {DOMTRUE ? (
                                            <>
                                              <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                className="mx-1 text-danger"
                                              />
                                              {DOMSTR}
                                            </>
                                          ) : (
                                            <>
                                              <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mx-1 text-success"
                                              />
                                              {`HTML DOM structure`}
                                            </>
                                          )}
                                        </span>
                                        {htmlmessages.map((message, index) => (
        <div key={index} className="d-flex align-items-center">
          <span className="align-self-start">
            {validationStatus.html && validationStatus.html.includes(index) ? (
              <FontAwesomeIcon icon={faCheckCircle} className="mx-1 text-success" />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} className="mx-1 text-danger" />
            )}
          </span>
          <span
            className="pb-1 ms-2"
            style={{
              fontFamily: '"Segoe UI", Arial, sans-serif',
            }}
          >
            {message} {/* Displaying the message */}
          </span>
          
          {/* Displaying the requirement for the current message */}
          {/* <div className="ms-3 text-muted" style={{ fontSize: '14px' }}>
            {requirements[index]} Displaying the corresponding requirement
          </div> */}
        </div>
      ))}

                                        <br/>
                                      </>
                                    );
                                  case "css":
                                    return (
                                      <>
                                        {cssmessages.map(
                                          (message, index) => (
                                            <div
                                              key={index}
                                              className="d-flex align-items-center"
                                            >
                                              <span className="align-self-start">
                                                {validationStatus.css &&
                                                validationStatus.css.includes(
                                                  index
                                                ) ? (
                                                  <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="mx-1 text-success"
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="mx-1 text-danger"
                                                  />
                                                )}
                                              </span>
                                              <span
                                                className="pb-1"
                                                style={{
                                                  fontFamily:
                                                    '"Segoe UI", Arial, sans-serif',
                                                }}
                                              >
                                                {message}
                                              </span>
                                            </div>
                                          )
                                        )}
                                               <br/>
                                      </>
                                    );
                                  case "js":
                                    return (
                                      <>
                                        {jsmessages.map(
                                          (message, index) => (
                                            <div
                                              key={index}
                                              className="d-flex align-items-center"
                                            >
                                              <span className="align-self-start">
                                                {validationStatus.js &&
                                                validationStatus.js[index] ===
                                                  "correct" ? (
                                                  <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="mx-1 text-success"
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="mx-1 text-danger"
                                                  />
                                                )}
                                              </span>
                                              <span
                                                className="pb-1"
                                                style={{
                                                  fontFamily:
                                                    '"Segoe UI", Arial, sans-serif',
                                                }}
                                              >
                                                {message}
                                              </span>
                                            </div>
                                          )
                                        )}
                                               <br/>
                                      </>
                                    );
                                  case "python":
                                    return (
                                      <>
                                        {pythonmessages.map(
                                          (message, index) => (
                                            <div
                                              key={index}
                                              className="d-flex align-items-center"
                                            >
                                              <span className="align-self-start">
                                                {validationStatus.python &&
                                                validationStatus.python[
                                                  index
                                                ] === "correct" ? (
                                                  <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="mx-1 text-success"
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="mx-1 text-danger"
                                                  />
                                                )}
                                              </span>
                                              <span
                                                className="pb-1"
                                                style={{
                                                  fontFamily:
                                                    '"Segoe UI", Arial, sans-serif',
                                                }}
                                              >
                                                {message}
                                              </span>
                                            </div>
                                          )
                                        )}
                                               <br/>
                                      </>
                                    );
                                  case "app_py":
                                    return (
                                      <>
                                        {app_pymessages.map(
                                          (message, index) => (
                                            <div
                                              key={index}
                                              className="d-flex align-items-center"
                                            >
                                              <span className="align-self-start">
                                                {validationStatus.app_py &&
                                                validationStatus.app_py[
                                                  index
                                                ] === "correct" ? (
                                                  <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="mx-1 text-success"
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="mx-1 text-danger"
                                                  />
                                                )}
                                              </span>
                                              <span
                                                className="pb-1"
                                                style={{
                                                  fontFamily:
                                                    '"Segoe UI", Arial, sans-serif',
                                                }}
                                              >
                                                {message}
                                              </span>
                                            </div>
                                          )
                                        )}
                                               <br/>
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
                    <div
                      className="curserDivPy"
                      onMouseDown={handleMouseDown}
                    ></div>
                    <div
                      className="OutputDatabaseTables col mx-1 "
                      style={{
                        overflow: "hidden",
                        width: "100%",
                        minWidth: "30%",
                      }}
                    >
                      <div className="col">
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
                          <Tabs
                            activeKey={activeTab}
                            onSelect={handleTab}
                            className="mb-1 "
                          >
                            {tabs.map((tab, index) => (
                              <Tab
                                key={index}
                                eventKey={tabKeys[tab]}
                                title={tab}
                                className={
                                  activeTab === tabKeys[tab]
                                    ? "selected-tab"
                                    : ""
                                }
                                style={{
                                  backgroundColor:
                                    activeTab === tabKeys[tab]
                                      ? "#7335B7"
                                      : "white",
                                }}
                              >
                                {/* Tab content goes here if needed */}
                              </Tab>
                            ))}
                          </Tabs>

                          <div className="editor" style={{}}>
                            {renderEditor()}
                          </div>
                        </div>

                        <div
                          className="Move"
                          style={{
                            cursor: "row-resize",
                            height: "70px",
                            maxHeight: "70px",
                            width: "100%",
                            backgroundColor: "#E2F2FF",
                          }}
                          onMouseDown={handleVerticalMouseDown}
                        >
                          <div
                            className="row p-3 "
                            style={{ backgroundColor: "rgb(226, 242, 255)" }}
                          >
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center mt-1 ">
                                {/* Left side: Output label and expand icon */}
                                <div
                                  className="d-flex align-items-center"
                                  style={{ color: "black" }}
                                >
                                  {(activeTab === "html" ||
                                    activeTab === "css") && (
                                    <button
                                      className="btn btn-sm btnHvr  border"
                                      style={{
                                        backgroundColor: "#fff",
                                        color: "black",
                                        pointerEvents: "none",
                                      }}
                                    >
                                      Your Output
                                    </button>
                                  )}
                                  {(activeTab === "html" ||
                                    activeTab === "css") && (
                                    <FontAwesomeIcon
                                      icon={faExpand}
                                      className="px-1 text-dark"
                                      onClick={Handlepreview}
                                      style={{ cursor: "pointer" }}
                                    />
                                  )}
                                </div>

                                {/* Right side: Run Code, Submit Code, and Next buttons */}
                                <div className="d-flex align-items-center">
                                  <button
        className="btn btn-sm btnHvr me-2"
        style={{
          backgroundColor: "#7335B7",
          color: "white",
        }}
        onClick={handleSubmitClick}
        disabled={!hasChanges} // Disable button if no changes
      >
        Submit {activeTab === "app_py" ? "app.py" : activeTab.toUpperCase()} Code
      </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="row "
                          style={{
                            height: `calc(${outputHeightPercentage}vh - 3vh)`,
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <div
                            className="mt-3"
                            style={{ height: "100%", color: "black" }}
                          >
                            {(activeTab === "html" || activeTab === "css") && (
                              <iframe
                                style={{
                                  width: "100%",
                                  minHeight: "100%",
                                  color: "black",
                                  borderColor: "white",
                                  outline: "none",
                                  overflowY: "auto",
                                  resize: "none",
                                }}
                                className="scrolobar"
                                srcDoc={srcCode}
                                title="output"
                                sandbox="allow-scripts allow-same-origin"
                              ></iframe>
                            )}
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
      </div>

      <div
        className="container-fluid"
        style={{
          fontFamily: '"Segoe UI", Arial, sans-serif',
          overflow: "hidden",
        }}
      >
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 9999,
            }}
          >
            <PulseLoader size={10} className="px-2" />
            <FadeLoader />
            <PulseLoader size={10} />
          </div>
        )}

        {/* Alert Modal */}
        <Modal show={showAlert} onHide={handleCloseAlert} size="xl" fullscreen>
          <Modal.Header className={modalBgClass} closeButton>
            {displ === "image" ? (
              <h5 className="ms-5 text-white">Expected Output Preview</h5>
            ) : (
              <h5 className="ms-5 text-white">Your Output Preview</h5>
            )}
          </Modal.Header>
          <Modal.Body>
            {displ == "image" ? (
              <img
                src={Sample_img}
                className="img-fluid mt-3"
                alt="image"
                style={{ height: "95%", width: "100%", pointerEvents: "none" }}
              />
            ) : (
              <iframe
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "",
                  color: "black",
                  borderColor: "white",
                }}
                className=" mt-3"
                srcDoc={srcCode}
                title="output"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            )}
          </Modal.Body>
        </Modal>

        {/* Submit modal */}
        <Modal
          show={showConfirmModal}
          size="lg"
          onHide={handleCloseConfirmModal}
          centered
        >
          <Modal.Body className="text-center">
            Are you sure you want to submit {activeTab == 'app_py' ? 'app.py': activeTab.toLocaleUpperCase()} assignment?
          </Modal.Body>
          <div className="text-center d-flex justify-content-center mb-3">
            <Button
              variant=""
              className="btn btn-success mx-3"
              onClick={handleConfirmSubmit}
            >
              Yes
            </Button>
            <Button
              variant=""
              className="btn btn-danger"
              onClick={handleCloseConfirmModal}
            >
              No
            </Button>
          </div>
        </Modal>

        {/* Preview Modal */}
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="col-sm-10"
              style={{ height: "100vh", width: "90wh" }}
            >
              <iframe
                className="w-full h-full"
                srcDoc={srcCode}
                title="output"
                sandbox="allow-scripts allow-same-origin"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </Modal.Body>
        </Modal>

        {/* Bug Report modal */}
        <Modal
          show={showBugReport}
          onHide={() => setShowBugReport(false)}
          size="lg"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#7335B7", color: "white" }}
          >
            <Modal.Title>Support Assistance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <Spinner animation="border mx-3" style={{ color: "#7335B7" }} />{" "}
                Loading...
              </div>
            ) : ticketRaised ? ( // Check if the ticket is raised
              <div className="container text-center">
                <h5>Your ticket has been successfully raised!</h5>
                <p>
                  Thank you for your report. Our support team will look into it
                  shortly.
                </p>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    {screenshot && (
                      <div>
                        <h5>Screenshot</h5>
                        <img
                          src={screenshot}
                          alt="Bug Screenshot"
                          className="img-fluid"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <form onSubmit={handleBugSubmit}>
                      <div className="form-group mt-3">
                        <label className="me-2" htmlFor="issueType">
                          Support Type:
                        </label>
                        <select
                          id="issueType"
                          value={issueType}
                          onChange={(e) => setIssueType(e.target.value)}
                          required
                          className="form-control"
                        >
                          <option value="">Select</option>
                          {issueTypes.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
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
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        style={{
                          backgroundColor: "#7335B7",
                          borderColor: "#7335B7",
                        }}
                      >
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
  };
  
  export default Frontendnew;