import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link1">Link 1</Nav.Link>
          <Nav.Link href="#link2">Link 2</Nav.Link>
          <Nav.Link href="#link3">Link 3</Nav.Link>
          <Nav.Link href="#link4">Link 4</Nav.Link>
          <Nav.Link href="#link5">Link 5</Nav.Link>
          <Nav.Link href="#link6">Link 6</Nav.Link>
          <Nav.Link href="#link7">Link 7</Nav.Link>
          <Nav.Link href="#link8">Link 8</Nav.Link>
          <Nav.Link href="#link9">Link 9</Nav.Link>
          <Nav.Link href="#link10">Link 10</Nav.Link>
          <Nav.Link href="#link11">Link 11</Nav.Link>
          <Nav.Link href="#link12">Link 12</Nav.Link>
          <Nav.Link href="#link13">Link 13</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown alignLeft title={<FaUserCircle size={24} />} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action1">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
