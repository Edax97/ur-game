import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';


const BarNavi= (props) => (<Navbar bg={props.mode} expand="lg" fixed="top" className='Barr'>
  <Container className="barr">
    <Navbar.Brand  href="#royal_home"><p>Home</p></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href='https://www.mastersofgames.com/rules/royal-ur-rules.htm'><p>Rules (external)</p></Nav.Link>
        <Nav.Link href="#contact_info"><p>Contact me</p></Nav.Link>
        <button type="button" class='bttn_dice' onClick={(e)=>props.change_style(e)}>
        {props.style_mss}</button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>);


export default BarNavi;
