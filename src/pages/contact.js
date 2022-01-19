import React from 'react'
import './contact.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Present = () => (<div class='pres'><p>E. Campos<br></br> <a href="https://www.github.com/Edax97">Github page</a></p></div>)


function Contact() {
    return (

        <div id="contact_info">
            <div class="bottom-container">
            <h3>Contact Me</h3>
            <Container>
            <Row>
            <Col>
            <a class="footer-link" href="https://www.linkedin.com/in/edwin-edmar-campos-alarcon/">LinkedIn</a>
            </Col>
            <Col>
            <a class="footer-link" href="https://github.com/Edax97">GitHub</a>
            </Col>
            <Col>
            <a class="footer-link" href="https://loving-brown-e6bf0c.netlify.app/">Portfolio</a>
            </Col>
            </Row>
            </Container>
            <p class="copy">© Edwin Campos.</p>
            </div>
        </div>
    );
};

export default Contact;
