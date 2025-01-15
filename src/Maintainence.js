// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";

// const Maintenance = () => {
//   const navigate = useNavigate();

//   const handleRedirect = () => {
//     navigate("/home"); // Update the path as needed
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
//         backgroundColor: "#4a148c",
//         color: "#ffffff",
//       }}
//     >
//       <Container>
//         <Row>
//           <Col className="text-center">
//             <div
//               className="p-5 shadow rounded"
//               style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.8)",
//                 borderRadius: "15px",
//               }}
//             >
//               <h1 className="text-warning mb-3">We're Temporarily Offline</h1>
//               <p className="text-light fs-5">
//                 We're working hard to improve our system. Thank you for your patience!
//               </p>
//               <div className="d-flex justify-content-center align-items-center mb-3">
//                 <ThreeDots
//                   visible={true}
//                   height="50"
//                   width="50"
//                   color="#f4b400"
//                   ariaLabel="three-dots-loading"
//                 />
//               </div>
//               <Button variant="warning" onClick={handleRedirect}>
//                 Return to Homepage
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Maintenance;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import './Maintainence.css'
const Maintenance = () => {
  return (
    <div className="MaintainenceDiv"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
        color: "#ffffff",
        backgroundBlendMode: "overlay",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">
            <div
              className="p-5 shadow-lg rounded"
              style={{
                background: `linear-gradient(90deg, #7335B7, #bb92ee, #9b47db)`,
                borderRadius: "15px",
                fontWeight:'bold'
              }}
            >
              <h1 className="text-center mb-3 pt-4 mt-4">We'll Be Right Back!</h1>
              <p className="text-muted fs-4 mb-3" >
                Our team is working on exciting updates.
              </p>
              <div className="d-flex justify-content-center align-items-center mb-4">
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#f2ebfc"
                  ariaLabel="three-dots-loading"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Maintenance;
