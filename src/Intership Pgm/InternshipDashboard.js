import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {  Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft,faChevronRight,faClockFour,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./InternshipDashboard.css";
import IntershipHeader from "./IntershipHeader";
import CryptoJS from "crypto-js";
import {FaArrowAltCircleRight} from "react-icons/fa";
import {HiMiniArrowRightStartOnRectangle,HiMiniArrowLeftStartOnRectangle,} from "react-icons/hi2";
import "./InternshipDashboard.css";
const InternshipDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState("");
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const courseContainerRef = useRef(null);
  const [Scores, setScores] = useState({});
  const [status, setStatus] = useState({});
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [datetime, setDatetime] = useState(null);
  const secretKey = "gvhbfijsadfkefjnujrbghj";
  const encryptedStudentId = sessionStorage.getItem("StudentId");
  const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId,secretKey).toString(CryptoJS.enc.Utf8);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  function formatText(input, page) {
    const map = {
      html: "HTML",
      css: "CSS",
      js: "JavaScript",
      python: "Python",
    };
    if (page === "Database_setup") {
      return input.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    }
    return map[input.toLowerCase()] || input;
  }
  const mainContentStyle = {
    marginLeft: isOpen ? "300px" : "0px",
    transition: "margin-left 0.3s ease",
  };
  const getHeightForPage = (course) => {
    if (course === "Database_setup") {
      return course === "Database_setup" ? "60px" : "150px";
    } else if (course === "Recruiter_job_details") {
      return course === "Recruiter_job_details" ? "200px" : "150px";
    } else {
      return "150px"; 
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "https://surgebackend.azurewebsites.net/internship/",
          {
            StudentId: decryptedStudentId,
          }
        );
        setCourses(
          response.data.Sidebar.Internship_Overview[1].Project_Web_Pages
        );
        setInternship(response.data.Sidebar);
        setData(response.data.data);
        setScores(response.data.Scores);
        setStatus(response.data.Status_Data);
        setDatetime(response.data.DateAndTime);
        const encryptedProjectName = CryptoJS.AES.encrypt(
          response.data.Sidebar.Internship_Project.Project_Name,
          secretKey
        ).toString();
        sessionStorage.setItem("ProjectName ", encryptedProjectName);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [decryptedStudentId]);
  const handlearrowclickreport = async (coursename) => {
    const Page_Name = coursename;
    if (Page_Name === "Database_setup") {
      navigate("/DBPage_report", { state: { Page_Name } });
    } else {
      navigate("/Page_report", { state: { Page_Name } });
    }
  };
  const handleArrowClick = async (courseName) => {
    setLoading(true);
    const encryptedProject = CryptoJS.AES.encrypt(courseName,secretKey).toString();
    sessionStorage.setItem("ProjectPage ", encryptedProject);
    const encryptedprojectname = sessionStorage.getItem("ProjectName ");
    const decryptedprojectname = CryptoJS.AES.decrypt(encryptedprojectname,secretKey).toString(CryptoJS.enc.Utf8)?.replace("_", " ");
    const postData = {
      StudentId: decryptedStudentId,
      Page: courseName,
      ProjectName: decryptedprojectname,
    };
    if (courseName === "Setup Project File") {
      navigate("/InstructionPage");
    }
    else if (courseName === "Database_setup") {
      navigate("/DBFrontendnew");
    } else {
      navigate("/Frontendnew");
    }
  };
  const scrollCourses = (direction) => {
    const scrollAmount = 600;
    if (direction === "left") {
      courseContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      courseContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const handleSelectedCourse = (course) => {
    setSelectedCourse(course);
  };
  const handleCardClick = (course) => {
    setSelectedCourse(course);
  };
  const colors = [ "#FBE2F4", "#E3DBFA", "#FFE1CC", "#E3DBFA"];
  useEffect(() => {
    if (status && status.Status) {
      const openedCourses = Object.keys(status.Status).filter((course) => status.Status[course] === "Opened");
      if (openedCourses.length > 0) {
        const lastOpenedCourse = openedCourses[openedCourses.length - 1];
        //console.log("Last opened course:", lastOpenedCourse);
        setSelectedCourse(lastOpenedCourse);
      }
    } else {
      //console.log("Status or status.Status is undefined");
    }
  }, [courses, status]); 
  return (
    <div className="container-fluid" style={{ maxHeight: "80vh" }}>
      <IntershipHeader />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Spinner animation="border mx-2" style={{ color: "#3F51B5" }} />{" "}
          Loading...
        </div>
      ) : (
        <div className="container-fluid pt-5" style={{ overflow: "hidden", height: "100vh", maxWidth: "100vw" }}>
          <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
            {/* Sidebar section */}
            <div style={{ transition: "all 0.1s ease" }}>
              <div className="pt-4">
                {/* Sidebar toggle button */}
                {!isOpen && (
                  <span
                    className="arrowicon1"
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      position: "fixed",
                      top: "60px", // Adjust the vertical position as needed
                      left: "10px", // Adjust the horizontal position as needed
                      zIndex: 1100, // Ensure it stays above the sidebar
                    }}
                    onClick={toggleSidebar}
                  >
                    <HiMiniArrowRightStartOnRectangle />
                  </span>
                )}

                {/* Sidebar content, only rendered if sidebar is open */}
                {isOpen && (
                  <div
                    id="sidebar"
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "315px",
                      height: "100%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
                      padding: "20px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      zIndex: 1000,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Sidebar content */}
                    <div className="mt-5">
                      <span
                        className="d-flex justify-content-end"
                        onClick={toggleSidebar}
                        style={{ cursor: "pointer", fontSize: "30px",}}
                      >
                        <HiMiniArrowLeftStartOnRectangle />
                      </span>
                      <h3>Internship Project</h3>
                      <h5>
                        <strong>Project Name: </strong>
                      </h5>
                      <span style={{ fontWeight: "normal", fontSize: "18px" }}>
                        {internship?.Internship_Project?.Project_Name}
                      </span>
                      <br />
                      <br />


                      <h5>
                        <strong>Skills Required:</strong>
                      </h5>
                      <ul style={{ fontWeight: "normal", fontSize: "16px" }}>
                        {internship?.Internship_Project?.Skills_Required?.map(
                          (skill, index) => (
                            <li key={index}>{skill}</li>
                          )
                        )}
                      </ul>

                      <h5>
                        <strong>Framework:</strong>
                      </h5>
                      <ul style={{ fontWeight: "normal", fontSize: "16px" }}>
                        {internship?.Internship_Project?.FrameWork?.map(
                          (framework, index) => (
                            <li key={index}>{framework}</li>
                          )
                        )}
                      </ul>

                      <h5>
                        <strong>IDE:</strong>
                      </h5>
                      <ul style={{ fontWeight: "normal", fontSize: "16px" }}>
                        {internship?.Internship_Project?.IDE?.map(
                          (ide, index) => (
                            <li key={index}>{ide}</li>
                          )
                        )}
                      </ul>
                      <p>
                        <h5>
                          <strong>Project Description: </strong>
                        </h5>
                        {/* Project Description:  */}
                        <span
                          style={{ fontWeight: "normal", fontSize: "16px" }}
                        >
                          {internship?.Internship_Project?.Project_Description}
                        </span>
                        <br />
                        <br />
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h5 style={{ margin: 0, fontWeight: "bold" }}>
                          Project Video:&nbsp;
                        </h5>
                        <a
                          style={{ fontWeight: "normal", fontSize: "16px" }}
                          href={internship?.Internship_Project?.Project_Video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch Video
                        </a>
                      </div>
                      <div style={{  alignItems: "center" }}>
  <h5 style={{ margin: 0, fontWeight: "bold" }}>UI/UX Design:&nbsp;</h5>
  <span>
  <a
    style={{ fontWeight: "normal" }}
    href={internship?.Internship_Project?.["Project_UI/UX"]}
    target="_blank"
    rel="noopener noreferrer"
  >
    View Figma Design
  </a>
  </span>
</div>

                      <h4>Internship Overview:</h4>
                      <ol>
                        <li>
                          Project Setup
                          <p>
                            {
                              internship?.Internship_Overview[0]
                                ?.Setup_Project_File
                            }
                          </p>
                        </li>
                        <li>
                          Project Web Pages:
                          <ul
                            style={{
                              fontWeight: "normal",
                              fontSize: "14px",
                              marginRight: "15px",
                            }}
                          >
                            {internship?.Internship_Overview[1]?.Project_Web_Pages?.map(
                              (page, index) => (
                                <li key={index}>{page}</li>
                              )
                            )}
                          </ul>
                        </li>
                        <li>
                          Setup Project Web Pages:
                          <p>
                            {
                              internship?.Internship_Overview[2]
                                ?.Setup_Project_Web_Pages
                            }
                          </p>
                        </li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Main content section */}
            <div className="flex-grow-1" style={{padding: "10px",paddingLeft: "25px",paddingBottom: "50px",paddingTop: "20px",overflowY: "auto",scrollbarWidth: "none",msOverflowStyle: "none",}}>
              <div className="" style={mainContentStyle}>
                <div className={` ${isOpen ? "content-shifted" : ""}`}>
                  <h3>Internship Task</h3>
                  <Row className="pt-3">
                    <Col xs={12} md={12} lg={12} className="mb-4 mb-md-0">
                      <div className="position-relative">
                        <Button variant="light" className="position-absolute d-none d-md-block" style={{ top: "-50px", right: "50px", zIndex: 1, fontSize: "16px", fontWeight: "bold" }} onClick={() => scrollCourses("left")} >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>
                        <Button variant="light" className="position-absolute d-none d-md-block" style={{ top: "-50px", right: "0px", zIndex: 1, fontSize: "16px",  fontWeight: "bold" }} onClick={() => scrollCourses("right")} >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Button>

                        <div className="d-flex flex-nowrap cardbody" ref={courseContainerRef} style={{ overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none", height: "300px", }} >
                          <Card className={`shadow mb-3 my-2`} style={{ width: "250px", height: "250px", minWidth: "300px", borderRadius: "15px", }} >
                          <Card.Title className={"mb-2 text-start mt-2 arrowicon"} onClick={() => handleArrowClick("Setup Project File")} style={{ fontSize: "1rem", height: "5vh", width: "100%", display: "flex",  alignItems: "center", cursor: "pointer", padding: "31px 15px 7px 15px", }} >
                                  <span className="p-2" style={{ backgroundColor: "#E3DBFA", boxShadow: "1px 1px 1px 1px black", borderRadius: "10px", flex: 1,  display: "flex", justifyContent: "space-between",  alignItems: "center", }} >
                                  Setup Project File
                                  <span className="ms-2 arrowicon" onClick={() => handleArrowClick("Setup Project File")} >
                                      <FaArrowAltCircleRight style={{ color: "#3997f8", fontSize: "26px", }} />
                                    </span>
                                  </span>
                            </Card.Title>
                          </Card>
                          {courses.map((course, index) => (
                            <Card key={index} className={`shadow mx-2 mb-3 my-2 courseCard12 ${ status.Status[course] === "Locked" ? "Locked" : "Opened" }`} onClick={() => { handleSelectedCourse(course); handleCardClick(course); }} style={{width: "250px",height: "250px",minWidth: "300px",overflowY: "hidden",pointerEvents:status.Status[course] === "Locked" ? "none" : "",borderRadius: "15px",}}>
                              <Card.Body>
                                <Card.Title className={"mb-2 text-start mt-1 arrowicon"} onClick={() => handleArrowClick(course)} style={{ fontSize: "1rem", height: "5vh", width: "100%",  display: "flex", alignItems: "center", cursor: "pointer", }} >
                                  <span className="p-2" style={{ backgroundColor: colors[index % colors.length],  boxShadow: "1px 1px 1px 1px black", borderRadius: "10px", flex: 1,  display: "flex", justifyContent: "space-between",  alignItems: "center", }} >
                                    {course}
                                    <span className="ms-2 arrowicon" onClick={() => handleArrowClick(course)} >
                                      <FaArrowAltCircleRight style={{color: "#3997f8",fontSize: "26px",}}/>
                                    </span>
                                  </span>
                                </Card.Title>
                                <Card.Text>
                                  <div className="mt-3">
                                    {data[course]
                                      ? Object.entries(data[course]).map(
                                          ([page, files]) =>
                                            page != "Table1" &&
                                            page != "Table2" &&
                                            page != "Table3" &&
                                            page != "Table4" ? (
                                              <div className="text-start" key={page} style={{display: "inline",alignItems: "center",}}>
                                                <h6 style={{marginRight: "10px",whiteSpace: "nowrap",display: "inline",}}>
                                                  {(page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()).replace(/([a-zA-Z])(\d)/g,"$1 $2")}:
                                                </h6>
                                                {Array.isArray(files) && (
                                                  <div style={{margin: 0,display: "inline",wordWrap: "break-word",}}>
                                                    {files.map((file) => {
                                                        const mapping = {
                                                          html: "HTML",
                                                          css: "CSS",
                                                          js: "Javascript",
                                                          python: "Python",
                                                          "app.py": "App.py",
                                                        };
                                                        const cleanedFile = file.replace(/\s+/g, "").toLowerCase();
                                                        return (mapping[cleanedFile] ||cleanedFile.replace(/^[a-z]/,(match) =>match.toUpperCase()));
                                                      }).join(", ")}
                                                  </div>
                                                )}
                                              </div>
                                            ) : (
                                              <div className="text-start" key={page}>
                                                <h6 style={{marginRight: "10px",whiteSpace: "nowrap",display: "inline",}}>
                                                  {(page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()).replace(/([a-zA-Z])(\d)/g,"$1 $2")}:
                                                </h6>
                                                <div style={{display: "inline-block",}}>
                                                  {files.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                                                </div>
                                              </div>
                                            )) : "No data available for this course"}
                                  </div>
                                  <div className="pt-2 mt-3" style={{height: getHeightForPage(course),display: "flex",alignItems: "center",}}>
                                    {data[course] ? Object.keys(datetime).map((courseKey) => {
                                            if (courseKey === course) {
                                              const { Start_Time, End_Time } =
                                                datetime[courseKey];
                                              const startDate = new Date(
                                                Start_Time
                                              ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                              });
                                              const endDate = new Date(
                                                End_Time
                                              ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                              });
                                              return (
                                                <div key={courseKey} style={{margin: "0",width: "300px",display: "flex",flexDirection: "row", justifyContent:"space-between",position: "relative",}}>
                                                  <div style={{ flexGrow: 1 }}>
                                                  </div>
                                                  <div style={{position: "absolute",bottom: "0",width: "calc(90% - 5px)", display: "flex",}}>
                                                    <span>
                                                      <FontAwesomeIcon icon={faClockFour} className="me-2 text-start"/>{" "}
                                                      {startDate} - {endDate}
                                                    </span>
                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          }) : null}
                                  </div>
                                  </Card.Text>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Row>
      <div className="container mt-2 ms-2">
      {selectedCourse ? (
        <div>
          <h3>
            <span>My Progress &gt; {selectedCourse.replace(/_/g, " ")}</span>
          </h3>
          {Scores[selectedCourse + "_Score"] ? (
            <div style={{ width: "35%", fontSize: "18px" }}>
              <table className="table table-borderless"style={{borderCollapse: "collapse",}}>
                <thead>
                  <tr style={{position: "sticky",top: 0,backgroundColor: "#f8f9fa",zIndex: 1,}}>
                    <th style={{ padding: "5px" }}>
                      {selectedCourse === "Database_setup"
                        ? "Tables"
                        : "Sl No"}
                    </th>
                    <th style={{ textAlign: "left", padding: "5px" }}>
                      {selectedCourse === "Database_setup" ? "Table Name": "Pages"}
                    </th>
                    <th style={{ textAlign: "left", padding: "5px" }}>
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Scores[selectedCourse + "_Score"].filter((item) => item.Score !== null).map((item, index) => (
                      <tr key={index} className="rowpad">
                        <td style={{ padding: "5px " }}>
                          {item.Sl_No || item.Tables}
                        </td>
                        <td style={{ padding: "5px" }}>
                          {item.Name || item.Pages}
                        </td>
                        <td style={{ padding: "5px" }}>{item.Score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No scores available for this course.</p>
          )}
        </div>
      ) : (
        <p className="mt-4">Select a course to view the scores.</p>
      )}
      </div>
    </Row>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipDashboard;
