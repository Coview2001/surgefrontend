import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { HashLoader, BeatLoader } from 'react-spinners';
import './TestDonePage.css';

function TestDonePage() {
  const [data, setData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { finishData } = location.state || {};

  useEffect(() => {
    if (finishData) {
      const reviewSummary = finishData.Review;
      const questionsData = finishData.Data;

      setData(questionsData);
      setTotalScore(reviewSummary.Score);
      setLoading(false);
    }
  }, [finishData]);

  const handleAnswer = () => {
    setShowData(true);
  };

  const handleIndex = () => {
    navigate('/IndexPage');
  };

  const renderImage = (QnPh) => {
    if (!QnPh) return null;
    if (QnPh.startsWith("##") && QnPh.endsWith("##")) {
      const imageName = QnPh.substring(2, QnPh.length - 2);
      const imageUrl = `http://storeholder.blob.core.windows.net/tpdata/Question/Assets/Image/${imageName}`;
      return <img src={imageUrl} alt="Image" height={80} />;
    } else {
      return QnPh;
    }
  };

  const getOptionClass = (option, enteredAns, correctAns) => {
    if (option === enteredAns && option === correctAns) {
      return 'bg-success text-white'; // Correctly answered option
    } else if (option === enteredAns) {
      return 'bg-danger text-white'; // Incorrectly answered option
    } else if (option === correctAns) {
      return 'bg-success text-white'; // Correct answer option
    }
    return ''; // Default option
  };

  return (
    <div className="container-fluid px-3 TestDoneMainDiv">
      <h2 className="text-center mb-4">Test Completed</h2>
      <p className="text-center">Congratulations You have successfully completed the test.</p>
      <div className='mb-3 d-flex justify-content-around'>
        <Button className="btn btn-primary" onClick={handleAnswer}>Review your answers</Button>
        <Button variant="outline-success" block onClick={handleIndex}>Go to IndexPage</Button>
      </div>
      {showData? (
        loading? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <BeatLoader color="#011627" /> &nbsp;
            <HashLoader color="#011627" /> &nbsp;
            <BeatLoader color="#011627" />
          </div>
        ) : (
          <div className='DataDiv'>
            <h4 className='text-center'><small className="text-muted">Out of </small><strong>{data.length}</strong><small class="text-muted"> questions you have scored</small> <strong>{totalScore}</strong></h4>
            <p className='text-center'><strong>Total Score</strong> : {totalScore}</p>
            <div className='qnsDiv' style={{ maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'thin' }}>
              {data.map((item, index) => (
                <div key={index} className="card mb-3" style={{ backgroundColor: '#e5edf8' }}>
                  <div className="card-body">
                    <h5 className="card-title">{index + 1}. {item.Qn}</h5>
                    <h5 className="card-title">{renderImage(item.QnPh)}</h5>
                    <div className='d-flex justify-content-start mb-3'>
                      {item.Option.map((option, optionIndex) => (
                        <div
                          className={`col-md-2 border mx-2 text-center p-2 ${getOptionClass(option.Opt, item.entered_ans, item.correct_ans)}`}
                          key={optionIndex}
                        >
                          {renderImage(option.Opt)}
                        </div>
                      ))}
                    </div>
                    <div className='d-flex justify-content-start'>
                      <p><strong>Entered Answer :</strong> {renderImage(item.entered_ans)}</p>
                      <p className='px-5'><strong>Correct Answer :</strong> {renderImage(item.correct_ans)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default TestDonePage;