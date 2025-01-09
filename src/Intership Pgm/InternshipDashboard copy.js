import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faBars,
  faArrowAltCircleRight,
  faClockFour,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./InternshipDashboard.css";
import IntershipHeader from "./IntershipHeader";
import CryptoJS from "crypto-js";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import {
  HiMiniArrowRightStartOnRectangle,
  HiMiniArrowLeftStartOnRectangle,
} from "react-icons/hi2";
import { PiArrowFatRightFill } from "react-icons/pi";
import { TextWrap } from "react-bootstrap-icons";
import CustomCard from "./CustomCard";
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
  const decryptedStudentId = CryptoJS.AES.decrypt(
    encryptedStudentId,
    secretKey
  ).toString(CryptoJS.enc.Utf8);

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
      // Convert to sentence case
      return input
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());
    }
  
    // Apply mapping for other pages
    return map[input.toLowerCase()] || input;
  }

  const sidebarStyle = {
    height: "100%",
    width: isOpen ? "300px" : "60px",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#faf6fe",
    color: "#000",
    transition: "width 0.3s ease",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(115,53,183,0.3)",
  };

  const mainContentStyle = {
    marginLeft: isOpen ? "300px" : "0px",
    transition: "margin-left 0.3s ease",
  };

  const iconButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "32px",
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
        setStatus(response.data.Status);
        setDatetime(response.data.DateAndTime);
        const encryptedProjectName = CryptoJS.AES.encrypt(response.data.Sidebar.Internship_Project.Project_Name, secretKey).toString();
        // sessionStorage.setItem(
        //   "ProjectName ",
        //   response.data.Sidebar.Internship_Project.Project_Name
        // );
        sessionStorage.setItem("ProjectName ", encryptedProjectName)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [decryptedStudentId]);

  const handlearrowclickreport = async (coursename) => {
    // //console.log("arrow clicked", coursename);
    const Page_Name = coursename;
    if (Page_Name==='Database_setup'){
      navigate('/DBPage_report', {state: {Page_Name}});
    }
    else{
      navigate("/Page_report", { state: { Page_Name } });
    }
  };

  const handleArrowClick = async (courseName) => {
    setLoading(true);
    const encryptedProject = CryptoJS.AES.encrypt(
      courseName,
      secretKey
    ).toString();
    sessionStorage.setItem("ProjectPage ", encryptedProject);
  const encryptedprojectname = sessionStorage.getItem("ProjectName ");
  const decryptedprojectname = CryptoJS.AES.decrypt(
    encryptedprojectname,
    secretKey
  )
    .toString(CryptoJS.enc.Utf8)
    ?.replace("_", " ");
    const postData = {
      StudentId: decryptedStudentId,
      Page: courseName,
      ProjectName: decryptedprojectname,
    };

    try {
      const response = await axios.post(
        "https://surgebackend.azurewebsites.net/internship/pages/",
        postData
      );
      const HomePageData = response.data;
      // //console.log("hello",HomePageData)
      if (courseName === "Database_setup") {
        navigate("/DBFrontend");
      } else {
        navigate("/Frontend");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending data:", error);
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
    // //console.log("Selected course", course);
    setSelectedCourse(course);
  };
  const colors = ["#E3DBFA", "#FBE2F4", "#E3DBFA", "#FFE1CC"];
  const encryptedselectedcourse = CryptoJS.AES.encrypt(selectedCourse, secretKey).toString();
  sessionStorage.setItem('Pageselected', encryptedselectedcourse);
  return (
    <div className="container-fluid" style={{ maxHeight: "80vh" }}>
      <IntershipHeader />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border mx-2" style={{ color: "#3F51B5" }} />{" "}
          Loading...
        </div>
      ) : (
        <div
          className="container-fluid pt-5"
          style={{ overflow: "hidden", height: "100vh" }}
        >
          <div
            className="d-flex"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            {/* Sidebar section */}
            <div style={{ transition: "all 0.1s ease" }}>
              <div className="pt-4">
                {/* Sidebar toggle button */}
                {!isOpen && (
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "32px",
                      position: "fixed",
                      top: "60px", // Adjust the vertical position as needed
                      left: "20px", // Adjust the horizontal position as needed
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
                      width: "300px",
                      height: "100%",
                      backgroundColor: "#f4f4f4",
                      padding: "20px",
                      overflowY: "auto",
                      zIndex: 1000,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Sidebar content */}
                    <div className="mt-5">
                      <span
                        className="d-flex justify-content-end"
                        onClick={toggleSidebar}
                        style={{ cursor: "pointer", fontSize: "30px" }}
                      >
                        <HiMiniArrowLeftStartOnRectangle />
                      </span>
                      <h3>Internship Project</h3>
                      <h5>
                        Project Name:{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {internship?.Internship_Project?.Project_Name}
                        </span>
                      </h5>
                      <p>
                        <strong>Project Description:</strong>{" "}
                        {internship?.Internship_Project?.Project_Description}
                      </p>

                      <h5>Skills Required:</h5>
                      <ul>
                        {internship?.Internship_Project?.Skills_Required?.map(
                          (skill, index) => (
                            <li key={index}>{skill}</li>
                          )
                        )}
                      </ul>

                      <h5>Framework:</h5>
                      <ul>
                        {internship?.Internship_Project?.FrameWork?.map(
                          (framework, index) => (
                            <li key={index}>{framework}</li>
                          )
                        )}
                      </ul>

                      <h5>IDE:</h5>
                      <ul>
                        {internship?.Internship_Project?.IDE?.map(
                          (ide, index) => (
                            <li key={index}>{ide}</li>
                          )
                        )}
                      </ul>

                      <p>
                        <strong>Project Video: </strong>
                        <a
                          href={internship?.Internship_Project?.Project_Video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch Video
                        </a>
                      </p>
                      <p>
                        <strong>UI/UX Design: </strong>
                        <a
                          href={
                            internship?.Internship_Project?.["Project_UI/UX"]
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Figma Design
                        </a>
                      </p>

                      <h5>Internship Overview:</h5>
                      <ol>
                        <li>
                          <h5>Project Setup</h5>
                          <p>
                            {
                              internship?.Internship_Overview[0]
                                ?.Setup_Project_File
                            }
                          </p>
                        </li>
                        <li>
                          <h5>Project Web Pages:</h5>
                          <ul>
                            {internship?.Internship_Overview[1]?.Project_Web_Pages?.map(
                              (page, index) => (
                                <li key={index}>{page}</li>
                              )
                            )}
                          </ul>
                        </li>
                        <li>
                          <h5>Setup Project Web Pages:</h5>
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
            <div
              className="flex-grow-1"
              style={{
                padding: "10px",
                paddingLeft: "25px",
                paddingBottom: "50px",
                paddingTop: "50px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="" style={mainContentStyle}>
                <div className={` ${isOpen ? "content-shifted" : ""}`}>
                  <h3>Internship Task</h3>
                  <Row className="pt-3">
                    <Col xs={12} md={12} lg={12} className="mb-4 mb-md-0">
                      <div className="position-relative">
                        <Button
                          variant="light"
                          className="position-absolute d-none d-md-block"
                          style={{ top: "-50px", right: "50px", zIndex: 1 }}
                          onClick={() => scrollCourses("left")}
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>
                        <Button
                          variant="light"
                          className="position-absolute d-none d-md-block"
                          style={{ top: "-50px", right: "0px", zIndex: 1 }}
                          onClick={() => scrollCourses("right")}
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Button>

                        <div
                          className="d-flex flex-nowrap"
                          ref={courseContainerRef}
                          style={{
                            overflowX: "auto",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {courses.map((course, index) => (
                            <Card
                              key={index}
                              className={`shadow mx-2 mb-3 my-2 courseCard12 ${
                                course.Status === "Closed" ? "Closed" : "Opened"
                              }`}
                              onClick={() => handleSelectedCourse(course)}
                              style={{
                                width: "250px",
                                height: "250px",
                                minWidth: "300px",
                                pointerEvents:
                                  course.Status === "Closed" ? "none" : "",
                                borderRadius: "15px",
                                opacity: course.Status === "Closed" ? 0.5 : 1,
                              }}
                            >
                              <Card.Body>
                                <Card.Title
                                  className="mb-2 text-start mt-2"
                                  style={{ fontSize: "1rem", height: "8.5vh" }}
                                >
                                  <span
                                    className="p-3"
                                    style={{
                                      backgroundColor:
                                        colors[index % colors.length], // Use color from array
                                      boxShadow: "1px 1px 1px 1px black",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {course}
                                    <span
                                      className="ms-2"
                                      style={{
                                        cursor: "pointer",
                                        alignContent: "end",
                                        fontSize: "24px",
                                      }}
                                      onClick={() => handleArrowClick(course)}
                                    >
                                      <PiArrowFatRightFill />
                                    </span>
                                  </span>
                                </Card.Title>
                                <Card.Text>
                                  <div>
                                    {data[course]
                                      ? Object.entries(data[course]).map(
                                          ([page, files]) =>
                                            page != "databaseSetup" ? (
                                              <div
                                                className="text-start"
                                                key={page}
                                                style={{
                                                  display: "inline",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <p
                                                  style={{
                                                    marginRight: "10px",
                                                    whiteSpace: "nowrap",
                                                    display: "inline",
                                                    fontSize: "18px",
                                                  }}
                                                >
                                                  {(
                                                    page
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                    page.slice(1).toLowerCase()
                                                  ).replace(
                                                    /([a-zA-Z])(\d)/g,
                                                    "$1 $2"
                                                  )}
                                                  :
                                                </p>
                                                {Array.isArray(files) && (
                                                  <p
                                                    style={{
                                                      margin: 0,
                                                      display: "inline",
                                                      wordWrap: "break-word",
                                                    }}
                                                  >
                                                    {files
                                                      .map((file) => {
                                                        const mapping = {
                                                          html: "HTML",
                                                          css: "CSS",
                                                          js: "Javascript",
                                                          python: "Python",
                                                          "app.py": "App.py",
                                                        };
                                                        const cleanedFile = file
                                                          .replace(/\s+/g, "")
                                                          .toLowerCase();
                                                        return (
                                                          mapping[
                                                            cleanedFile
                                                          ] ||
                                                          cleanedFile.replace(
                                                            /^[a-z]/,
                                                            (match) =>
                                                              match.toUpperCase()
                                                          )
                                                        );
                                                      })
                                                      .join(", ")}
                                                  </p>
                                                )}
                                              </div>
                                            ) : (
                                              <div
                                                className="text-start"
                                                key={page}
                                              >
                                                <h6
                                                  style={{
                                                    marginRight: "10px",
                                                    whiteSpace: "nowrap",
                                                    display: "inline",
                                                  }}
                                                >
                                                  {page
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    page.slice(1).toLowerCase()}
                                                  :
                                                </h6>
                                                <div
                                                  style={{
                                                    display: "inline-block",
                                                  }}
                                                >
                                                  {Object.entries(files).map(
                                                    ([table, name], index) => (
                                                      <p
                                                        key={index}
                                                        style={{ margin: 0 }}
                                                      >
                                                        <strong>{table}</strong>
                                                        : {name}
                                                      </p>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            )
                                        )
                                      : "No data available for this course"}
                                  </div>

                                  <div
                                    className="pt-2 mt-3"
                                    style={{
                                      height:
                                        course === "Recruiter_job_details"
                                          ? "90px"
                                          : "40px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {data[course]
                                      ? Object.keys(datetime).map(
                                          (courseKey) => {
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
                                                <div
                                                  key={courseKey}
                                                  style={{
                                                    margin: "0",
                                                    width: "300px",
                                                    display: "flex",
                                                    flexDirection: "row", // Changed from column to row
                                                    justifyContent:
                                                      "space-between", // Push content to left and right
                                                    position: "relative",
                                                  }}
                                                >
                                                  <div style={{ flexGrow: 1 }}>
                                                    {/* Other card content goes here */}
                                                  </div>
                                                  <div
                                                    style={{
                                                      position: "absolute",
                                                      bottom: "0",
                                                      width: "calc(90% - 5px)", // Calculate half the width minus margins
                                                      display: "flex",
                                                    }}
                                                  >
                                                    <span>
                                                      <FontAwesomeIcon
                                                        icon={faClockFour}
                                                        className="me-2 text-start"
                                                      />{" "}
                                                      {startDate} -
                                                      {/* Date at the start */}
                                                      {endDate}
                                                    </span>
                                                    {/* Date at the end */}
                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          }
                                        )
                                      : null}
                                  </div>

                                  <div
                                    className="text-end"
                                    style={{
                                      position: "absolute",
                                      bottom: "20px", // adjust as needed
                                      right: "20px", // adjust as needed
                                    }}
                                  >
                                    Report :{" "}
                                    <span
                                      className="ms-2"
                                      style={{
                                        cursor: "pointer",
                                        alignContent: "end",
                                        fontSize: "24px",
                                      }}
                                      onClick={() =>
                                        handlearrowclickreport(course)
                                      }
                                    >
                                      <FaArrowAltCircleRight />
                                    </span>
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
                          <div className="">
                            <h4>
                              <span>
                                My Progress &gt;{" "}
                                {selectedCourse.replace(/_/g, " ")}
                              </span>
                            </h4>
                            {/* {//console.log("selected", selectedCourse + "_Score")} */}
                            {Scores[selectedCourse + "_Score"] ? (
                              <div style={{ width: "35%", fontSize: "18px" }}>
                                <table
                                  className="table table-borderless"
                                  style={{
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <thead>
                                    <tr
                                      style={{
                                        position: "sticky",
                                        top: 0,
                                        backgroundColor: "#f8f9fa",
                                        zIndex: 1,
                                      }}
                                    >
                                      <th
                                        style={{
                                          paddingBottom: "5px",
                                          paddingLeft: "5px",
                                          paddingTop: "5px",
                                        }}
                                      >
                                        {selectedCourse === "Database_setup"
                                          ? "Tables"
                                          : "Sl No"}
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          paddingBottom: "5px",
                                          paddingLeft: "5px",
                                          paddingTop: "5px",
                                        }}
                                      >
                                        {selectedCourse === "Database_setup"
                                          ? "Table Name"
                                          : "Pages"}
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          paddingBottom: "5px",
                                          paddingLeft: "5px",
                                          paddingTop: "5px",
                                        }}
                                      >
                                        Score
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Scores[selectedCourse + "_Score"].map(
                                      (item, index) => (
                                        <tr
                                          key={index}
                                          className="rowpad"
                                          style={{}}
                                        >
                                          <td
                                            style={{
                                              paddingBottom: "5px",
                                              paddingLeft: "25px",
                                              paddingTop: "5px",
                                            }}
                                          >
                                            {item.Sl_No || item.Tables}
                                          </td>
                                          <td style={{ paddingBottom: '5px', paddingLeft: '5px', paddingTop: '5px' }}>
                                            {formatText(item.Name || item.Pages, selectedCourse)}
                                          </td>
                                          <td
                                            style={{
                                              paddingBottom: "5px",
                                              paddingLeft: "5px",
                                              paddingTop: "5px",
                                            }}
                                          >
                                            {item.Score}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p>No scores available for this course.</p>
                            )}
                          </div>
                        ) : (
                          <p className="mt-4">
                            Select a course to view the scores.
                          </p>
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
