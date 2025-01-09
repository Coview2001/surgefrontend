import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import HeaderHome from './HeaderHome';
import Overview from './Img/overview.jpg';
const ExskilenceInternshipCard = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/CoursePage');
  };

  return (
<div className="container-fluid d-flex flex-column" style={{ height: '100vh' }}>
  <HeaderHome />
  <div className="flex-grow-1 d-flex justify-content-between">
    <div className="row w-100 align-items-center mt-5">
      <div className="col-lg-6 col-md-12 text-center">
        <img src={Overview} alt="Internship illustration" className="img-fluid rounded" style={{ height: '50%',width:'65%', objectFit: 'cover' }} />
        <p className="text-muted mt-2 text-end" style={{ fontSize: '12px', marginRight:'18%' }}><u>Designed by Freepik</u></p>
      </div>

      <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
      
        <h2 className="mb-4 text-center">Exskilence Internship</h2>
        <p>
          The Exskilence internship program is designed to give you a solid and structured practical experience, focusing on hands-on work.
        </p>
        <p>
          During the internship, you will have access to over
          <span className="text-primary"> 7+ hours of HTML</span> study materials,
          <span className="text-primary"> 4+ hours of CSS</span> content, and
          <span className="text-primary"> 7+ hours of JavaScript</span> lessons. Each of these subjects comes with
          <span className="text-primary"> 30+ practical tasks</span> to help you learn by doing it yourself. You will also work on
          <span className="text-primary"> 200+ SQL coding tasks, 200+ Python coding tasks, 10+ website creation tasks</span>, besides a specially designed
          <span className="text-primary"> Python Full-Stack project</span>.
        </p>
        <p>
          To help you through this process, there will be over
          <span className="text-primary"> 100 hours of live discussion sessions</span>, and one-on-one interaction sessions (if deemed necessary by our trainers).
          Your progress will be monitored closely through this entire process. Our goal is to help you gain the practical skills and knowledge that you need to succeed in a practical work environment.
          The outcomes will depend on your attitude and seriousness throughout this learning process.
        </p>
      </div>
    </div>
  </div>

  {/* Adjust the margin here to bring it higher */}
  <div className="text-center mb-2"> {/* Add mt-3 to adjust spacing */}
    <b className="fs-3">Welcome aboard! Let's make these 15 weeks a truly joyful and beneficial learning experience.</b>
    <div className="text-end mt-2 me-5"> {/* Align the button to the right */}
      <button className="btn btn-primary btn-outline-secondary" onClick={handleStart}>
        Let's start
      </button>
    </div>
  </div>
</div>


  );
};

export default ExskilenceInternshipCard;
