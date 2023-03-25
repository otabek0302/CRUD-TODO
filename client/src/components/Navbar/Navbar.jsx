import React, { useContext } from "react";
import "./Navbar.scss";
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {logout, isLogin} = useContext(AuthContext)

  return (
    <nav className="blue">
      <div className="container">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            MERN APP
          </a>
          {
            isLogin  ? <ul id="nav-mobile" className="right hide-on-med-and-down"><li><a className="btn waves-effect waves-light red" href="/" onClick={logout} >Exit</a></li></ul> : <ul id="nav-mobile" className="right hide-on-med-and-down"><li><Link className="btn waves-effect waves-light red" to="/login">Login</Link></li></ul> 
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
