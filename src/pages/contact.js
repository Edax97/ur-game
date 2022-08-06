import React from 'react'
import './contact.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*React icons*/
import { AiFillLinkedin } from 'react-icons/ai';

const Present = () => (<div class='pres'><p>E. Campos<br></br> <a href="https://www.github.com/Edax97">Github page</a></p></div>)



function Contact() {
    return (

        <div id="contact_info">
            <div class="bottom-container">
            <Container>
            <Row>
            <Col>
            <a class="footer-link" href="https://www.linkedin.com/in/edwin-edmar-campos-alarcon/"><AiFillLinkedin class='inlogo'/></a>
            </Col>
            </Row>
            </Container>
            <p class="copy">© Edwin Campos.</p>
            </div>
        </div>
    );
};

export default Contact;
