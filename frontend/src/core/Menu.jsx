import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"

function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        let active = false;
        location.pathname === path ? active=true :  active=false;
        return active;
    }

    const signout = () => {
        fetch(`${API_URL}/signout`, {
            method: "POST",
            headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json'
            },
          })
          .then(response => response.json())
          .then(response => {
              if(response.done){
                toastr.info("Success logout!", "Logout",{
                    positionClass: 'toast-bottom-left'
                  })
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  navigate('/signin');
              }else{
                toastr.error("Please try again!", "Error",{
                    positionClass: 'toast-bottom-left'
                  })
              }
            
          })
          .catch(err =>  toastr.error("Please try again!", "Error",{
            positionClass: 'toast-bottom-left'
          }));
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            </ul>
            
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                
                {
                    localStorage.getItem('token') ? 
                    <li className="nav-item" onClick={signout}>
                        <span style={{cursor: 'pointer'}} className={`nav-link`} >logout</span>
                     </li>
                    :
                   <>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive("/signin") ? 'active': ''}`} to="/signin">connexion</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive("/signup") ? 'active': ''}`} to="/signup">register</Link>
                    </li>
                   </>
                }
               
            </ul>

            </div>
        </div>
        </nav>
    </div>
  )
}

export default Menu