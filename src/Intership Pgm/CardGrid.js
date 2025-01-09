import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CardGrid.css'; // Add custom styles here

const CardGrid = () => {
  const cardsData = [
    { title: "Setup Project File", description: "", time: "" },
    { 
      title: "Database Setup", 
      description: "Table 1: Student\nTable 2: Recruiter\nTable 3: Job\nTable 4: Student Application", 
      time: "21st Oct to 31st Oct" 
    },
    { 
      title: "Index/Landing Page", 
      description: "Page 1: HTML, CSS, JavaScript, App.py", 
      time: "30th Sep to 19th Oct" 
    },
    { 
      title: "Student Login", 
      description: "Page 2: HTML, CSS, JavaScript, Python, App.py", 
      time: "2nd Nov to 12th Nov" 
    },
    { 
      title: "Student Home Page", 
      description: "Page 3: HTML, CSS, JavaScript, Python, App.py", 
      time: "30th Sep to 19th Oct" 
    },
  ];

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary">&lt;</button>
        <button className="btn btn-outline-secondary">&gt;</button>
      </div>
      <div className="row">
        {cardsData.map((card, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">{card.title}</h5>
                <p className="card-text text-muted" style={{ whiteSpace: 'pre-wrap' }}>{card.description}</p>
                {card.time && (
                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-clock mr-2"></i>
                    <small className="text-muted">{card.time}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
