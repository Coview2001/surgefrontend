import React, { useCallback, useState, useEffect } from 'react';
import { Tab, Tabs, Modal } from 'react-bootstrap';
import { useNavigate, useLocation  } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DBFrontend.css'
import { FadeLoader ,PulseLoader  } from 'react-spinners';
import IntershipHeader from './IntershipHeader'
import JsonTreeComponent from './JsonTreeComponent';
import CryptoJS from 'crypto-js';
// import NotFound from '../NotFound'



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
  const [modalBgClass, setModalBgClass] = useState();
  const [TestValid, setTestValid] = useState();
  const location = useLocation();
  const { HomePageData } = location.state || {};
  const [table1HomeData, setTable1HomeData] = useState();
  const [table2HomeData, setTable2HomeData] = useState();
  const [table3HomeData , setTable3HomeData] = useState();
  const [table4HomeData, setTable4HomeData] = useState();
  const [Page_Name, setPage_Name] = useState(HomePageData.Page_Name || 'defaultPageName');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [userEmail, setuserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState([]);

  const navigate = useNavigate();
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const encryptedEmail = sessionStorage.getItem('Email');// Decrypt the data
  const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
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
  }, [table1, table2, table3]);

  

  useEffect(() => {
    const storedEmail =decryptedEmail;

    if (storedEmail ) {
        setuserEmail(storedEmail);
    }
    
    if (HomePageData && HomePageData.Page_Name  && HomePageData.Tabs) {
        // //console.log("===============", HomePageData);
      setPage_Name(HomePageData.Page_Name);
      setTabs(HomePageData.Tabs);
      // //console.log("HomePageData.Tabs", HomePageData.Tabs)
      
      // Setting state for all tabs
      setTable1(HomePageData.Response.Table1 || '');
      setTable2(HomePageData.Response.Table2 || '');
      setTable3(HomePageData.Response.Table3 || '');
      setTable4(HomePageData.Response.Table4 || '');
      
    }
  }, [HomePageData, Page_Name]);

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



  const handleSubmitCode = () => {
    setIsLoading(true); 
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
    const url = `https://surgebackend.azurewebsites.net/intr/db/`;
    const data = {
      "Email": userEmail,
      "KEYS": '',
      "data": code ,
      "Table_name" : '',
    };
    // //console.log("dataruitrtortorth", data)

    switch (type) {
      case 'Table1':
        data.KEYS = table1HomeData;
        data.Table_name = "Table1"
        break;
      case 'Table2':
        data.KEYS = table2HomeData;
        data.Table_name = "Table2"
        break;
      case 'Table3':
        data.KEYS = table3HomeData;
        data.Table_name = "Table3"
        break;
      case 'Table4':
        data.KEYS = table4HomeData;
        data.Table_name = "Table4"
        break;
      default:
        data.KEYS = '';
        data.Table_name = ""
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
      setIsLoading(false); 
      setAlertMessage(`Test Message: ${data.message}\nTest Result: ${data.score}`);
      setShowAlert(true);
  
    })
    .catch(error => console.error('Error:', error));
  };

  
  const handleCheckCode = () => {
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
    // //console.log(HomePageData);
    if (!HomePageData) {
      setAlertMessage('HomePageData is not available.');
      setShowAlert(true);
      return;
    }
  
    const Table1ValidationData = HomePageData.Code_Validation.Table1;
    const Table2ValidationData = HomePageData.Code_Validation.Table2;
    const Table3ValidationData = HomePageData.Code_Validation.Table3;
    const Table4ValidationData = HomePageData.Code_Validation.Table4;
  
    // //console.log("python_RegxData", python_RegxData)
    setTable1HomeData(Table1ValidationData);
    setTable2HomeData(Table2ValidationData);
    setTable3HomeData(Table3ValidationData);
    setTable4HomeData(Table4ValidationData);


     if (type === 'Table1') {
      
        const normalizedPYTHONFunctions = table1;
      
    
    
        const missingPYTHONValues = Table1ValidationData.filter(item => !normalizedPYTHONFunctions.includes(item));
        const isPYTHONValid = missingPYTHONValues.length === 0;
        setAlertMessage(`Table4 Validation result: ${isPYTHONValid ? 'You have cleared  all requirements' : 'Not Valid'}`);
      
        if (!isPYTHONValid) {
          setAlertMessage('Please clear the requirements');
        }
        const presentIndices = Table1ValidationData.map((item, index) => missingPYTHONValues.includes(item) ? null : index).filter(index => index !== null);
        setValidationStatus(prevState => ({ ...prevState, Table1: presentIndices }));
      }


      else if (type === 'Table2') {
      
        const normalizedPYTHONFunctions = table2;
      
    
    
        const missingPYTHONValues = Table2ValidationData.filter(item => !normalizedPYTHONFunctions.includes(item));
        const isPYTHONValid = missingPYTHONValues.length === 0;
        setAlertMessage(`Table4 Validation result: ${isPYTHONValid ? 'You have cleared  all requirements' : 'Not Valid'}`);
      
        if (!isPYTHONValid) {
          // setAlertMessage(`Missing Table4 Values: ${missingPYTHONValues.join(', ')}`);
          setAlertMessage('Please clear the requirements');
        }
        const presentIndices = Table2ValidationData.map((item, index) => missingPYTHONValues.includes(item) ? null : index).filter(index => index !== null);
        setValidationStatus(prevState => ({ ...prevState, Table2: presentIndices }));
      }

    
      else if (type === 'Table3') {
      
            const normalizedPYTHONFunctions = table3;



            const missingPYTHONValues = Table3ValidationData.filter(item => !normalizedPYTHONFunctions.includes(item));
            const isPYTHONValid = missingPYTHONValues.length === 0;
            setAlertMessage(`Table4 Validation result: ${isPYTHONValid ? 'You have cleared  all requirements' : 'Not Valid'}`);

            if (!isPYTHONValid) {
              setAlertMessage('Please clear the requirements');
            }
            const presentIndices = Table3ValidationData.map((item, index) => missingPYTHONValues.includes(item) ? null : index).filter(index => index !== null);
            setValidationStatus(prevState => ({ ...prevState, Table3: presentIndices }));
    }
     else if (type === 'Table4') {
      
        const normalizedPYTHONFunctions = table4;
      


        const missingPYTHONValues = Table4ValidationData.filter(item => !normalizedPYTHONFunctions.includes(item));
        const isPYTHONValid = missingPYTHONValues.length === 0;
        setAlertMessage(`Table4 Validation result: ${isPYTHONValid ? 'You have cleared  all requirements' : 'Not Valid'}`);
      
        if (!isPYTHONValid) {
          setAlertMessage('Please clear the requirements');
        }
        const presentIndices = Table4ValidationData.map((item, index) => missingPYTHONValues.includes(item) ? null : index).filter(index => index !== null);
        setValidationStatus(prevState => ({ ...prevState, Table4: presentIndices }));
      }
  
    setShowAlert(true);
  }; 


  
  const handleExplanation = () => {
    let explanationData;
    switch (activeTab) {
      case 'Table1':
        explanationData = HomePageData.Explanation.Table1;
        // //console.log("90-90-99-9", explanationData)
        // //console.log(HomePageData.Explanation.Table1)
        break;
      case 'Table2':
        // explanationData = HomePageData.Explanation.Table2;
        explanationData = HomePageData.Explanation.Table2;
        // //console.log('+========', explanationData)
        break;
      case 'Table3':
        explanationData = HomePageData.Explanation.Table3;
        break;
      case 'Table4':
        explanationData = HomePageData.Explanation.Table4;
        break;
      default:
        explanationData = '';
    }
    setExplanation(explanationData);
    setShowAlert(true); 
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
          <CodeMirror
            className="text-xl text-start border-gray-700 border"
            value={table1}
            height="400px"
            theme="dark"
            extensions={[python()]}
            onChange={onChangeTable1}
          />
        );
      case 'Table2':
        return (
          <CodeMirror
            className="text-xl text-start border-gray-700 border"
            value={table2}
            height="400px"
            theme="dark"
            extensions={[python()]}
            onChange={onChangeTable2}
          />
        );
      case 'Table3':
        return (
          <CodeMirror
            className="text-xl text-start border-gray-700 border"
            value={table3}
            height="400px"
            theme="dark"
            extensions={[python()]}
            onChange={onChangeTable3}
          />
        );
      case 'Table4':
        return (
          <CodeMirror
            className="text-xl text-start border-gray-700 border"
            value={table4}
            height="400px"
            theme="dark"
            extensions={[python()]}
            onChange={onChangeTable4}
          />
        );
      default:
        return null;
    }
  };

  // const handleTab = () => {
  //   setShowSubmitButton(false)
  // }


  const tabKeys = {
    "Table1": "Table1",
    "Table2": "Table2",
    "Table3": "Table3",
    "Table4": "Table4",
  };


  const handleTab = (selectedKey) => {
    setShowSubmitButton(false)
    setActiveTab(selectedKey);
    // //console.log("-=-=-=-=",selectedKey)
    const lastTabKey = tabKeys[tabs[tabs.length - 1]];
    // //console.log("=======================",lastTabKey)
  };
  
  return (
    <div>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 9999 }}>
          <PulseLoader size={10}  className='px-2' />
          <FadeLoader   />
          <PulseLoader  size={10} />
        </div>
      )}
      <div className="p-2">
      <IntershipHeader />
        <div className="mt-5 d-flex justify-content-between align-items-center">
        <JsonTreeComponent />

      <Tabs activeKey={activeTab} onSelect={handleTab} className="">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          eventKey={tabKeys[tab]}
          title={tab}
          className={activeTab === tabKeys[tab] ? 'selected-tab' : ''}
        >
        </Tab>
      ))}
      </Tabs>
          <button className="my-2  btn btn-outline-info btn-sm" onClick={handleExplanation}>
            Instructions
          </button>
          <button className="my-2  btn btn-outline-secondary btn-sm" onClick={handleCheckCode}>
            Check code
          </button>
          {showSubmitButton && (
              <button className="my-2 mx-3 btn btn-outline-success btn-sm" onClick={handleSubmitCode}>
              {getButtonText()}
            </button>
          )}
          {showNextButton &&  (
          <button className='btn btn-outline-primary btn-sm' onClick={handleNext} disabled={!formSubmitted}>Next</button>
          )}
        </div>
          {renderEditor()}
          {
            <div className="col-sm-12">
              <h2 className="text-lg text-center font-semibold mb-2 text-dark">Requirements</h2>
              <div className="border border-info rounded-md h-full" style={{ height: '40vh', overflow: 'auto' }}>
                <ul>
                  {(() => {
                    switch (activeTab) {
                        case 'Table1':
                            return HomePageData.Code_Validation.Table1_Messages.map((message, index) => (
                              <div key={index}
                              className={`p-2  ${validationStatus.Table1 && validationStatus.Table1.includes(index) ? 'text-success' : 'text-danger'}`}>
                                    {validationStatus.Table1 && validationStatus.Table1.includes(index) ? (
                                      <i className="fas fa-check-circle text-success mx-1"></i>
                                    ) : (
                                      <i className="fas fa-times-circle text-danger mx-1"></i>
                                    )}{message}</div>
                            ));
                        case 'Table2':
                            return HomePageData.Code_Validation.Table2_Messages.map((message, index) => (
                              <div key={index}
                              className={`p-2  ${validationStatus.Table2 && validationStatus.Table2.includes(index) ? 'text-success' : 'text-danger'}`}>
                                    {validationStatus.Table2 && validationStatus.Table2.includes(index) ? (
                                      <i className="fas fa-check-circle text-success mx-1"></i>
                                    ) : (
                                      <i className="fas fa-times-circle text-danger mx-1"></i>
                                    )}{message}</div>
                            ));
                      case 'Table3':
                        return HomePageData.Code_Validation.Table3_Messages.map((message, index) => (
                          <div key={index}
                          className={`p-2  ${validationStatus.Table3 && validationStatus.Table3.includes(index) ? 'text-success' : 'text-danger'}`}>
                                {validationStatus.Table3 && validationStatus.Table3.includes(index) ? (
                                  <i className="fas fa-check-circle text-success mx-1"></i>
                                ) : (
                                  <i className="fas fa-times-circle text-danger mx-1"></i>
                                )}{message}</div>
                        ));
                      case 'Table4':
                        return HomePageData.Code_Validation.Table4_Messages.map((message, index) => (
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
                </ul>
              </div>
            </div>
          }
      </div>
          <Modal show={showAlert} onHide={handleCloseAlert} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className={modalBgClass} closeButton>
            </Modal.Header>
            <Modal.Body>
              <p className='text-center'>{alertMessage}</p>
              {activeTab === '' ? (
                <pre>{explanation}</pre>
              ) : (
                <ul>
                  {Object.entries(explanation).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:<br /></strong> {value}
                    </li>
                  ))}
                </ul>
              )}
            </Modal.Body>
          </Modal>
    </div>
  );
}

export default DBFrontend;