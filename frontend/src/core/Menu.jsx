import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Menu(props) {
    const location = useLocation();
   
    const isActive = (path) => {
        let active = false;
        location.pathname === path ? active=true :  active=false;
        return active;
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">Brand</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link ${isActive("/") ? 'active': ''}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive("/signin") ? 'active': ''}`} to="/signin">signIn</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive("/signup") ? 'active': ''}`} to="/signup">signUp</Link>
                </li>
            </ul>
            
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Menu