// import React, { useEffect} from "react"; // Import useEffect here
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate here
// import Login from "./Login";
// import CoursePage from "./CoursePage";
// import Header from "./SQL and PY/Header";
// import HeaderEditor from "./SQL and PY/Header";
// import HeaderQuestionPage from "./SQL and PY/Header";
// import HeaderIndex from "./SQL and PY/Header";
// import HeaderHome from "./HeaderHome";
// import SQLEditor from "./SQL and PY/SQLEditor";
// import Editor from './SQL and PY/Editor';
// import HTMLCSSEditor from './SQL and PY/HTMLCSSEditor';
// import JSEditor from './SQL and PY/JSEditor';
// import NextQuestionPage from "./SQL and PY/NextQuestionPage";
// import QuestionPageFrontend from './SQL and PY/QuestionPageFrontend';
// import HeaderStd from "./HeaderStd";
// import IndexPage from "./SQL and PY/IndexPage";
// import PyEditor from "./SQL and PY/PyEditor";
// import CertificatePage from "./CertificatePage";
// import IntershipIndexPage from "./Intership Pgm/IntershipIndexPage";
// import Frontend from "./Intership Pgm/Frontend";
// import InstructionPage from "./Intership Pgm/InstructionPage";
// import JsonTreeComponent from './Intership Pgm/JsonTreeComponent';
// import IntershipHeader from './Intership Pgm/IntershipHeader';
// import Certificate from './Intership Pgm/Certificate';
// import Page_report from './Intership Pgm/Page_report';
// import DBFrontend from './Intership Pgm/DBFrontend';
// import DBPage_report from './Intership Pgm/DBPage_report';
// import CoursePageInfo from './CoursePageInfo';
// import TestPage from './Aptitude Test/TestPage';
// import TestDonePage from "./Aptitude Test/TestDonePage";
// import NavigationBar from "./NavigationBar";
// import ReportPage from "./SQL and PY/ReportPage";
// import HeaderSQLPY from "./SQL and PY/HeaderSQLPY";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import MyDraggableComponent from './SQL and PY/MyDraggableComponent';
// import QuestionPage from './SQL and PY/QuestionPage';
// import Tickets from './Tickets';
// import BugReportPage from './BugReportPage';
// import ExskilenceInternshipCard from './ExskilenceInternshipCard';
// import CoursePageHeaderHome from "./CoursePageHeaderHome";
// import html2canvas from 'html2canvas';
// import SessionsPage from './SessionsPage';
// import SidebarPage from "./SidebarPage";
// import IntershipIndexPage1 from './Intership Pgm/IntershipIndexPage1';
// import InternshipSidebar from "./Intership Pgm/InternshipSidebar";
// // import Settings from './settings';
// // import ChatApp from './ChatApp';
// function App() {
//   useEffect(() => {

//     const handleKeyDown = (e) => {
//       if ((
//         (e.ctrlKey || e.metaKey) || (e.shiftKey) &&
//         (e.key === 'v' || e.key === 'c' || e.key === 'a' || e.key === 'i'))|| (e.key === 'F12')
//       ) {
//         e.preventDefault();
//       }
//     };

//     const handleContextMenu = (e) => {
//       e.preventDefault();
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('contextmenu', handleContextMenu);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('contextmenu', handleContextMenu);
//     };
//   }, []);
//   // const CoursePage = lazy(()=> import("./CoursePage"));
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/CoursePageHeaderHome" element={<CoursePageHeaderHome />} />
//         <Route path="/ExskilenceInternshipCard" element={<ExskilenceInternshipCard />} />
//         <Route path="/CoursePage" element={<CoursePage />} />
//         <Route path="/Header" element={<Header />} />
//         <Route path="/HeaderEditor" element={<HeaderEditor />} />
//         <Route path="/HeaderQuestionPage" element={<HeaderQuestionPage />} />
//         <Route path="/HeaderIndex" element={<HeaderIndex />} />
//         <Route path="/HeaderHome" element={<HeaderHome />} />
//         <Route path="/HeaderStd" element={<HeaderStd />} />
//         <Route path="/SQLEditor" element={<SQLEditor />} />
//         <Route path="/HTMLCSSEditor" element={<HTMLCSSEditor />} />
//         <Route path="/JSEditor" element={<JSEditor />} />
//         <Route path="/Editor" element={<Editor />} />
//         <Route path="/QuestionPageFrontend" element={<QuestionPageFrontend />} />
//         <Route path="/NextQuestionPage" element={<NextQuestionPage />} />
//         <Route path="/IndexPage" element={<IndexPage />} />
//         <Route path="/PyEditor" element={<PyEditor />} />
//         <Route path="/CertificatePage" element={<CertificatePage />} />
//         <Route path="/IntershipIndexPage" element={<IntershipIndexPage />} />
//         <Route path="/Frontend" element={<Frontend />} />
//         <Route path="/InstructionPage" element={<InstructionPage />} />
//         <Route path="/JsonTreeComponent" element={<JsonTreeComponent />} />
//         <Route path="/IntershipHeader" element={<IntershipHeader />} />
//         <Route path="/Certificate" element={<Certificate />} />
//         <Route path="/Page_report" element={<Page_report />} />
//         <Route path="/DBFrontend" element={<DBFrontend />} />
//         <Route path="/DBPage_report" element={<DBPage_report />} />
//         <Route path="/CoursePageInfo" element={<CoursePageInfo />} />
//         <Route path="/TestPage" element={<TestPage />} />
//         <Route path="/TestDonePage" element={<TestDonePage />} />
//         <Route path="/NavigationBar" element={<NavigationBar />} />
//         <Route path="/ReportPage" element={<ReportPage />} />
//         <Route path="/HeaderSQLPY" element={<HeaderSQLPY />} />
//         <Route path="/MyDraggableComponent" element={<MyDraggableComponent />} />
//         <Route path="/QuestionPage" element={<QuestionPage />} />
//         <Route path="/Tickets" element={<Tickets />} />
//         <Route path="/BugReportPage" element={<BugReportPage />} />
//         <Route path="/SessionsPage" element={<SessionsPage />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/SidebarPage" element={<SidebarPage />} />
//         <Route path="/IntershipIndexPage1" element={<IntershipIndexPage1/>}/>
//         <Route path="/InternshipSidebar" element={<InternshipSidebar/>}/>
//         {/* <Route path="/settings" element={<Settings/>}/> */}
//         {/* <Route path="/ChatApp" element={<ChatApp/>}/> */}
//       </Routes>
//     </Router>
//   );
// }

// function NotFound() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate("/", { replace: true });
//   }, [navigate]);

//   return null;
// }

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import CoursePage from "./CoursePage";
import Header from "./SQL and PY/Header";
import HeaderEditor from "./SQL and PY/Header";
import HeaderQuestionPage from "./SQL and PY/Header";
import HeaderIndex from "./SQL and PY/Header";
import HeaderHome from "./HeaderHome";
import SQLEditor from "./SQL and PY/SQLEditor";
import Editor from './SQL and PY/Editor';
import HTMLCSSEditor from './SQL and PY/HTMLCSSEditor';
import JSEditor from './SQL and PY/JSEditor';
import NextQuestionPage from "./SQL and PY/NextQuestionPage";
import QuestionPageFrontend from './SQL and PY/QuestionPageFrontend';
import HeaderStd from "./HeaderStd";
import IndexPage from "./SQL and PY/IndexPage";
import PyEditor from "./SQL and PY/PyEditor";
import CertificatePage from "./CertificatePage";
import IntershipIndexPage from "./Intership Pgm/IntershipIndexPage";
import InstructionPage from "./Intership Pgm/InstructionPage";
import IntershipHeader from './Intership Pgm/IntershipHeader';
import Certificate from './Intership Pgm/Certificate';
import Page_report from './Intership Pgm/Page_report';
import DBPage_report from './Intership Pgm/DBPage_report';
import CoursePageInfo from './CoursePageInfo';
import TestPage from './Aptitude Test/TestPage';
import TestDonePage from "./Aptitude Test/TestDonePage";
import NavigationBar from "./NavigationBar";
import ReportPage from "./SQL and PY/ReportPage";
import HeaderSQLPY from "./SQL and PY/HeaderSQLPY";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyDraggableComponent from './SQL and PY/MyDraggableComponent';
import QuestionPage from './SQL and PY/QuestionPage';
import Tickets from './Tickets';
import BugReportPage from './BugReportPage';
import ExskilenceInternshipCard from './ExskilenceInternshipCard';
import CoursePageHeaderHome from "./CoursePageHeaderHome";
import SessionsPage from './SessionsPage';
import SidebarPage from "./SidebarPage";
import IntershipIndexPage1 from './Intership Pgm/IntershipIndexPage1';
import InternshipSidebar from "./Intership Pgm/InternshipSidebar";
import Error504 from "./Error504";
import InternshipDashboard from "./Intership Pgm/InternshipDashboard";
import ChatApp from './ChatApp';
import Frontendnew from "./Intership Pgm/Frontendnew";
import DBFrontendnew from "./Intership Pgm/DBFrontendnew";
import InternshipInstructionHeader from "./Intership Pgm/InternshipInstructionHeader";
import Testing from "./Testing";
import InternshipHeader from './Intership Pgm/InternshipHeader';
// import Demo from './Demo';

function App() {
  const [restrictKeys, setRestrictKeys] = useState(false);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get('https://surgebackend.azurewebsites.net/getDevTool/');
  //       //console.log("first", response.data.DevTool);
       
  //       if (response.data.DevTool === 'Y') {
  //         const handleKeyDown = (e) => {
  //           if ((e.ctrlKey || e.metaKey) && ['v', 'c', 'a', 'V', 'C', 'A'].includes(e.key.toLowerCase()) || e.key === 'F12') {
  //             e.preventDefault();
  //           }
  //         };
       
  //         const handleContextMenu = (e) => {
  //           e.preventDefault();
  //         };
       
  //         document.addEventListener('keydown', handleKeyDown);
  //         document.addEventListener('contextmenu', handleContextMenu);
 
  //         return () => {
  //           document.removeEventListener('keydown', handleKeyDown);
  //           document.removeEventListener('contextmenu', handleContextMenu);
  //         };
  //       }
  //     } catch (error) {
  //       console.error('Error fetching :', error);
  //     }
  //   };
 
  //   fetchCourses();
  // }, []);
  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Maintainence />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/rJ_Lc=VwzWrQmt%!" element={<Login />} />
        <Route path="/Error504" element={<Error504 />} />
        <Route path="/CoursePageHeaderHome" element={<CoursePageHeaderHome />} />
        <Route path="/ExskilenceInternshipCard" element={<ExskilenceInternshipCard />} />
        <Route path="/CoursePage" element={<CoursePage />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/HeaderEditor" element={<HeaderEditor />} />
        <Route path="/HeaderQuestionPage" element={<HeaderQuestionPage />} />
        <Route path="/HeaderIndex" element={<HeaderIndex />} />
        <Route path="/HeaderHome" element={<HeaderHome />} />
        <Route path="/HeaderStd" element={<HeaderStd />} />
        <Route path="/SQLEditor" element={<SQLEditor />} />
        <Route path="/HTMLCSSEditor" element={<HTMLCSSEditor />} />
        <Route path="/JSEditor" element={<JSEditor />} />
        <Route path="/Editor" element={<Editor />} />
        <Route path="/QuestionPageFrontend" element={<QuestionPageFrontend />} />
        <Route path="/NextQuestionPage" element={<NextQuestionPage />} />
        <Route path="/IndexPage" element={<IndexPage />} />
        <Route path="/PyEditor" element={<PyEditor />} />
        <Route path="/CertificatePage" element={<CertificatePage />} />
        <Route path="/IntershipIndexPage" element={<IntershipIndexPage />} />
        <Route path="/InstructionPage" element={<InstructionPage />} />
        {/* <Route path="/JsonTreeComponent" element={<JsonTreeComponent />} /> */}
        <Route path="/IntershipHeader" element={<IntershipHeader />} />
        <Route path="/Certificate" element={<Certificate />} />
        <Route path="/Page_report" element={<Page_report />} />
        <Route path="/DBPage_report" element={<DBPage_report />} />
        <Route path="/CoursePageInfo" element={<CoursePageInfo />} />
        <Route path="/TestPage" element={<TestPage />} />
        <Route path="/TestDonePage" element={<TestDonePage />} />
        <Route path="/NavigationBar" element={<NavigationBar />} />
        <Route path="/ReportPage" element={<ReportPage />} />
        <Route path="/HeaderSQLPY" element={<HeaderSQLPY />} />
        <Route path="/MyDraggableComponent" element={<MyDraggableComponent />} />
        <Route path="/QuestionPage" element={<QuestionPage />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/BugReportPage" element={<BugReportPage />} />
        <Route path="/SessionsPage" element={<SessionsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/SidebarPage" element={<SidebarPage />} />
        <Route path="/IntershipIndexPage1" element={<IntershipIndexPage1 />} />
        <Route path="/InternshipSidebar" element={<InternshipSidebar />} />
        <Route path="/InternshipDashboard" element={<InternshipDashboard />} />
        {/* <Route path="/Sidebar" element={<Sidebar2 />} /> */}
        {/* <Route path="/WifiPing" element={<WifiPing />} /> */}
        <Route path="/Frontendnew" element={<Frontendnew />} />
        <Route path="/Testing" element={<Testing />} />
        <Route path="/ChatApp" element={<ChatApp/>}/>
        <Route path="/DBFrontendnew" element={<DBFrontendnew/>}/>
        <Route path="/InternshipInstructionHeader" element={<InternshipInstructionHeader/>}/>
        <Route path="/InternshipHeader" element={<InternshipHeader/>}/>
      </Routes>
    </Router>
    {/* <> 
    <WifiPing/>

    </> */}
    </>
  );
}

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

export default App;
