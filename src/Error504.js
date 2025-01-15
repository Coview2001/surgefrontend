import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

const Error504 = () => {
  const navigate = useNavigate()
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <div className="border rounded p-4 shadow-lg">
            <h1 className="display-3 text-danger">504</h1>
            <h2 className="mb-3">Bad Gateway</h2>
            <p className="text-muted mb-4">
              Something went wrong. Please try again later or check your network connection.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              Try Again
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error504;
