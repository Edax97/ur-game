import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';



const BarNavi= () => (<Navbar bg="light" expand="lg" fixed="top">
  <Container>
    <Navbar.Brand href="#royal_home">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href='https://www.mastersofgames.com/rules/royal-ur-rules.htm'>Rules (external)</Nav.Link>
        <Nav.Link href="#contact_info">Contact me</Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>);


export default BarNavi;
