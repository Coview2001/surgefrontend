import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p className="lead">
            Oops! The page you are looking for does not exist.
          </p>
          <button className="btn btn-outline-primary" onClick={goHome}>
            Go Home
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
