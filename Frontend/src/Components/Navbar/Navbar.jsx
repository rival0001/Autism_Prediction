import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>

      <Link to='/'><a className="logo">AutiPlay</a></Link>
      <ul>
        <Link to='/'><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li></Link>
        <Link to='/games'><li onClick={() => setMenu("games")} className={menu === "games" ? "active" : ""}>Games</li></Link>
        <Link to='/quiz'><li onClick={() => setMenu("quiz")} className={menu === "quiz" ? "active" : ""}>Quiz</li></Link>
        <Link to='/capture'><li onClick={() => setMenu("capture")} className={menu === "capture" ? "active" : ""}>Capture</li></Link>
        <li onClick={() => window.location = 'mailto:somnathmondal3600@gmail.com'} className={menu === "contact-" ? "active" : ""}>Contact us</li>
        
      </ul>

    </div>
  )
}

export default Navbar
