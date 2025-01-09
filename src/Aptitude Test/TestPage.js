import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ProgressBar, Modal, Button } from "react-bootstrap";
import "./TestPage.css";
import HeaderStd from '../HeaderStd';
import axios from "axios";
import { ScaleLoader, RiseLoader} from 'react-spinners';
import { FaRegCheckSquare, FaAngleRight, FaAngleDoubleRight, FaThumbsUp } from 'react-icons/fa';

function TestPage() {
  const [data, setData] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [ChapterId, setChapterId] = useState("");
  const [ChapterName, setChapterName] = useState("");
  const [CurrentChapterName, setCurrentChapterName] = useState("");
  const [, setnextChapterId] = useState("");
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [course, setCourse] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswerButton, setShowAnswerButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [questionskipped, setQuestionskipped] = useState(false);
  const [testIds, setTestIds] = useState([]);
  const [levels, setLevels] = useState([]);
  const [SessionValue, setSessionValue] = useState([]);
  const [, setFinishData] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const test = 'test';
  const TotalQuestions = jsonData ? jsonData.length : 0;
  sessionStorage.setItem("TotalQuestions", TotalQuestions);
  

  const progress = ((currentQuestionIndex + 1) / (jsonData && jsonData.length > 0 ? jsonData.length : 1)) * 100;

  useEffect(() => {
    const fetchData = async () => {
      const storedChapterId = sessionStorage.getItem("currentChapter");
      const storedCurrentChapterName = sessionStorage.getItem("currentChapterName");
      const storedCourse = sessionStorage.getItem("course");
      const storedStudentId = sessionStorage.getItem("StudentId");
      const storedNextChapterId = sessionStorage.getItem("nextChapter");
      const storedConceptId = sessionStorage.getItem("conceptId");
      const storedTestIds = sessionStorage.getItem("testIds");
      const storedLevels = sessionStorage.getItem("levels");
      
      if (storedChapterId && storedCourse && storedCurrentChapterName && storedStudentId && storedNextChapterId && storedConceptId && storedTestIds && storedLevels) {
        setChapterId(storedChapterId);
        setCourse(storedCourse);
        setStudentId(storedStudentId);
        setnextChapterId(storedNextChapterId);
        setCurrentChapterName(storedCurrentChapterName)
        setChapterName(storedConceptId);
        setTestIds(storedTestIds);
        setLevels(storedLevels);
      }
      
      try {
        let url = `https://surgebackend.azurewebsites.net/intr/test/exe/`;
        const dataToSend = {
          "StudentId": sessionStorage.getItem('StudentId'),
          "Course": sessionStorage.getItem('course')
        };
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });
  
        const responseJson = await response.json();
        // //console.log("Raw response:", responseJson); // Log the raw response

        if (Array.isArray(responseJson) && responseJson.length > 0 && Array.isArray(responseJson[0])) {
          const responseData = responseJson[0];
          setData(responseData);

          const sessionValueData = responseJson[1] || {};
          setSessionValue(sessionValueData.Session || []);

          const shuffledQuestions = responseData.map(questionObject => {
            return {
              ...questionObject,
              Option: shuffleOptions(questionObject.Option)
            };
          });

          setJsonData(shuffledQuestions);
        } else {
          console.error('Invalid response data format');
          setJsonData([]); // Set to empty array if invalid
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
        setJsonData([]); // Set to empty array in case of error
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const shuffleOptions = (options) => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOptionSelected(true);
  
    setJsonData(prevData => {
      if (!prevData) return null;
      const newData = [...prevData];
      const updatedOptions = newData[currentQuestionIndex].Option.map(opt => ({
        ...opt,
        backgroundColor: opt.Opt === option ? '#00ffc88e' : 'white'
      }));
      newData[currentQuestionIndex].Option = updatedOptions;
      return newData;
    });
  };

  const handleNextQuestion = () => {
    if (!jsonData || currentQuestionIndex === jsonData.length - 1) {
      setShowNextButton(false);
      setShowFinishButton(true);
    } else {
      setSelectedOption(null);
      const updatedOptions = jsonData[currentQuestionIndex].Option.map(option => ({
        ...option,
        backgroundColor: 'white'
      }));
      setJsonData(prevData => {
        if (!prevData) return null;
        const newData = [...prevData];
        newData[currentQuestionIndex].Option = updatedOptions;
        return newData;
      });

      setShowAnswerButton(true);
      setShowNextButton(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSubmitted(false);
      setIsOptionSelected(false);
    }
  };

  const handleAnswerSelection = () => {
    if (!jsonData || !isOptionSelected) {
      setAlertMessage("Please select an option before submitting.");
      setShowAlert(true);
      return;
    }

    const selectedOptionData = jsonData[currentQuestionIndex].Option.find(option => option.Opt === selectedOption);
    const isCorrectAnswer = selectedOptionData && selectedOptionData.Type === 'SNP_OPTA';
    let correctAnswer = jsonData[currentQuestionIndex].Option.find(option => option.Type === 'SNP_OPTA').Opt;
    let questionId = currentQuestionIndex + 1;

    setShowAnswerButton(false);
    setShowNextButton(true);
    setAnswerSubmitted(true);
    const Score = isCorrectAnswer ? 1 : 0;
    if (isCorrectAnswer) {
        setScore(prevScore => prevScore + 1);
    }
    sessionStorage.setItem("Score", String(score + Score));
    sessionStorage.setItem("correct_answer", correctAnswer);
    sessionStorage.setItem("entered_answer", selectedOption);

    const Qn_name = jsonData[currentQuestionIndex].Qn_name;

    const postJsonData = {
        questionId: questionId,
        correct_answer: correctAnswer,
        entered_answer: selectedOption,
        course: sessionStorage.getItem("course"),
        conceptId: sessionStorage.getItem("currentChapter"),
        studentId: sessionStorage.getItem("StudentId"),
        skipped_ans: '',
        Qn_name: Qn_name,
        type: sessionStorage.getItem("currentChapterName"),
        session: SessionValue
    };
    fetch('https://surgebackend.azurewebsites.net/test/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postJsonData)
    }).then((response) => {
        if (response.ok) {
            // //console.log('Data sent successfully');
        } else {
            // //console.log('Failed to send Data. Status:', response.status);
        }
    }).catch((err) => {
        // //console.log('Error sending Data:', err);
    });
  };

  const handleskipQuestion = () => {
    if (!jsonData) return;

    setQuestionskipped(true);

    let questionId = currentQuestionIndex + 1; 
    let correctAnswer = jsonData[currentQuestionIndex].Option.find(option => option.Type === 'SNP_OPTA').Opt; 

    if (currentQuestionIndex === jsonData.length - 1) {
      setShowNextButton(false);
      setShowFinishButton(true);
    } else {
      setSelectedOption(null);
      setShowAnswerButton(true);
      setShowNextButton(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSubmitted(false);
      setIsOptionSelected(false);
    }
    const Qn_name = jsonData[currentQuestionIndex].Qn_name;

    const postJsonData = {
      questionId: questionId,
      correct_answer: correctAnswer,
      entered_answer: selectedOption,
      course: sessionStorage.getItem("course"),
      conceptId: sessionStorage.getItem("currentChapter"),
      studentId: sessionStorage.getItem("StudentId"),
      skipped_ans: 'skipped',
      Qn_name: Qn_name,
      type: sessionStorage.getItem("currentChapterName"),
      session: SessionValue
    };
    fetch('https://surgebackend.azurewebsites.net/test/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postJsonData)
    }).then((response) => {
        if (response.ok) {
            // //console.log('Data sent successfully');
        } else {
            // //console.log('Failed to send Data. Status:', response.status);
        }
    }).catch((err) => {
        // //console.log('Error sending Data:', err);
    });
  };

  const handleQnPh = (QnPh) => {
    if (QnPh && QnPh.startsWith("##") && QnPh.endsWith("##")) {
      const imageName = QnPh.substring(2, QnPh.length - 2);
      const imageUrl = `http://storeholder.blob.core.windows.net/tpdata/Question/Assets/Image/${imageName}`;
      return <img src={imageUrl} alt="Question" height={100} />;
    } else {
      return QnPh; 
    }
  };

  const handleFinish = () => {
    navigate('/CoursePage')
    };

  const handleCloseAlert = () => setShowAlert(false);

  const answerDisabled = answerSubmitted || !isOptionSelected;
  const skipDisabled = answerSubmitted;

  return (
    <div className="mainT">
      <HeaderStd />
      <Container fluid className="px-0 g-0" style={{ maxWidth: '100%', minHeight: '100vh' }}>
        <Row className="justify-content-center mt-5 mainTD">
          <Col xs={12} sm={5} md={12} className="mainTD">
            <div className="mainTD">
              <div className="testHeader text-white">
                <h3 className="pt-3 text-center">Test</h3>
                <ProgressBar
                  className=" border border-3 rounded-pill mx-2"
                  animated
                  now={progress}
                  variant="secondary"
                />
                <div className="ps-2 pt-2 d-flex justify-content-center">
                  {jsonData && (
                    <div>
                      <p>
                        Questions: {currentQuestionIndex + 1} of {jsonData.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mainT">
                <div className="mainD">
                 {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                      <ScaleLoader color="#00ffc88e" />
                      <RiseLoader color="#00ffc88e" />
                      <ScaleLoader color="#00ffc88e" />
                    </div>
                 ) : jsonData && jsonData.length > 0 ? (
                    <div>
                     <div>
                      <div className="pb-3 pt-3 fs-5 d-flex justify-content-center align-items-center"><b>{jsonData[currentQuestionIndex].Qn}</b></div>
                      <div className="pb-3 fs-5 d-flex justify-content-center align-items-center"><b>{handleQnPh(jsonData[currentQuestionIndex].QnPh)}</b></div>
                      <div className="row px-5 mx-5">
                        {jsonData[currentQuestionIndex].Option.map((option, index) => (
                          <div key={index} className="col-md-6 mb-3 mt-3">
                            <button
                              className={` opts btn  display-1 ${selectedOption === option.Opt ? 'selectedOptionE' : ''}`}
                              style={{ backgroundColor: option.backgroundColor, width: '100%', color:'dark' }}
                              onClick={() => handleOptionChange(option.Opt)}
                              disabled={answerSubmitted}
                            >
                              {handleQnPh(option.Opt)}
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <Card.Footer className="d-flex justify-content-center mt-5 ">
                        {showFinishButton ? (
                          <button onClick={handleFinish} disabled={isClicked} className="btn btn-outline-primary px-4">
                            Finish <FaThumbsUp className="mb-2"/>
                          </button>
                        ) : (
                          <>
                            <button onClick={handleAnswerSelection} className="btn btn-outline-success mx-3 px-2" disabled={answerDisabled}>
                              Answer <FaRegCheckSquare />
                            </button>
                            <button onClick={handleskipQuestion} className="btn btn-outline-secondary px-3 mx-3" disabled={skipDisabled}>
                              skip <FaAngleDoubleRight />
                            </button>
                            <button onClick={handleNextQuestion} className="btn btn-outline-primary px-3 mx-3" disabled={!answerSubmitted}>
                              Next <FaAngleRight />
                            </button>
                          </>
                        )}
                      </Card.Footer>
                    </div>
                    </div>
                 ) : (
                    <div className="text-center">
                      <h3>No questions available</h3>
                    </div>
                 )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showAlert} onHide={handleCloseAlert} size="lg" centered>
        <Modal.Header closeButton className='alert'>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-warning" onClick={handleCloseAlert}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TestPage;