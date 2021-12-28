
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from '../pages/contact'
import Home from '../App'
import './navbar.css'

const Bar_navi= (props) => (
  <div class='bar_navi'>
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/contact" element={<props.contactEl/>}/>
      </Routes>
      <ul class="mobile-menu">
        <li><a href="/">Home</a></li>
        <li><a href="https://www.mastersofgames.com/rules/royal-ur-rules.htm">Rules</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </Router>


</div>

  );

export default Bar_navi;
