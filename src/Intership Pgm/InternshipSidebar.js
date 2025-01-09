import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InternshipSidebar.css'; // For custom styles

const InternshipSidebar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky pt-3">
            <h4 className="sidebar-heading">Internship Projects</h4>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <p><strong>Project Name:</strong> HireMe Web Application</p>
              </li>
              <li className="nav-item mb-2">
                <p><strong>skills Required:</strong> HTML, CSS, JS, Python, SQL, UI/UX</p>
              </li>
              <li className="nav-item mb-2">
                <p><strong>Framework:</strong> Flask</p>
              </li>
              <li className="nav-item mb-2">
                <p><strong>IDE:</strong> VS Code</p>
              </li>
              <li className="nav-item mb-2">
                <p><strong>Project Description:</strong></p>
                <hr />
              </li>
              <li className="nav-item mb-2">
                <p><strong>Project Video</strong></p>
                <div className="bg-secondary project-placeholder">Video Placeholder</div>
              </li>
              <li className="nav-item mb-2">
                <p><strong>Project UI/UX Screens</strong></p>
                <div className="bg-secondary project-placeholder">Screens Placeholder</div>
              </li>
            </ul>

            <div className="mt-4">
              <h5>Internship Overview</h5>
              <ol className="nav flex-column">
                <li className="nav-item">1. Setup Project File</li>
                <li className="nav-item">2. Project Web Pages
                  <ul>
                    <li>Database setup</li>
                    <li>Index or Landing Page</li>
                    <li>Student Login Page</li>
                    <li>Student Home Page</li>
                    <li>Student Job details Page</li>
                    <li>Recruiter Login Page</li>
                    <li>Recruiter Home Page</li>
                    <li>Recruiter Job details Page</li>
                  </ul>
                </li>
                <li className="nav-item">3. Setup Project Web Pages</li>
              </ol>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {/* Add main content here */}
        </main>
      </div>
    </div>
  );
};

export default InternshipSidebar;
