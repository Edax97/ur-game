import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

/*React icons*/
import { GiPerspectiveDiceThree } from "react-icons/gi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { BsMoonFill } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';


const BarNavi= (props) => (<Navbar bg={props.mode} expand="sm" className='Barr'>
  <Container className="barr">
    <Navbar.Brand  href="https://github.com/Edax97/ur-game"><AiFillGithub class='brand-bar'/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href='https://www.mastersofgames.com/rules/royal-ur-rules.htm'><p>Rules < FaExternalLinkAlt /></p></Nav.Link>
        
        <button type="button" class='bttn_dice' onClick={(e)=>props.change_style(e)}>
        {(props.mode=='light') ? <BsMoonFill/> : <BsFillSunFill/> }</button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>);


export default BarNavi;
