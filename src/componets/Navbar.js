import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'


function NavbarComponent() {
  return (
    <Navbar collapseOnSelect expand="lg"   style={{ border : " solid 2px white" , borderRadius:"5px", backgroundColor:"#5C2FC2"} } >
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white' }}>
          Fashion Fellow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  style={{color : "whitesmoke" , backgroundColor : "white"}} />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end' style={{color : "whitesmoke"}}>
          <Nav className="me-auto" style={{color : "whitesmoke"}}>
            <Nav.Link href="/addbills" style={{ color: 'white' }}>
              Add Bill
            </Nav.Link>
            <Nav>
            <Nav.Link href="/additeam" style={{ color: 'white' }}>
              Add Iteam
            </Nav.Link>
          </Nav>
            <Nav.Link href="#pricing" style={{ color: 'white' }}>
              Reports
            </Nav.Link>
            
            </Nav>
            <Nav>
            <Nav.Link href="/addemplyee" style={{ color: 'white' }}>
              
              Emplyee
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
