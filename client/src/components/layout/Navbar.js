import React, {Fragment, useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {logout, register} from '../../actions/auth';

const Navbar=({ auth: { isAuthenticated, loading }, logout })=>{
  const authLinks=(
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-5">
        <Link to='/collection'>
          <i className="black fas fa-list"></i>{''}
          <span className="black hide-sm">&nbsp;&nbsp;Collections</span>
        </Link>
      </li>
      <li className="nav-item mr-3">
        <a onClick={logout} href='/'>
          <i className="black fas fa-sign-out-alt"></i>{''}
          <span className="black hide-sm">&nbsp;&nbsp;Logout</span>
        </a>
      </li>
    </ul>
  );
  
  let guestLinks=null;
  const pathname = window.location.pathname;
  
  let skillsLinks=(
    <li className="nav-item mr-3">
      <a className="nav-link js-scroll-trigger" href="#skills">
        <span className="white hide-sm">&nbsp;&nbsp;Skills</span>
      </a>
    </li>
  );

  let educationLinksSm=(
    <li className="nav-item mr-3 sm">
      <a className="nav-link js-scroll-trigger" href="#education-sm">
        <span className="white hide-sm">&nbsp;&nbsp;Education</span>
      </a>
    </li>
  );

  let educationLinks=(
    <li className="nav-item mr-3">
      <a className="nav-link js-scroll-trigger" href="#education">
        <span className="white hide-sm">&nbsp;&nbsp;Education</span>
      </a>
    </li>
  );

  let projectsLinks=(
    <li className="nav-item mr-3">
      <a className="nav-link js-scroll-trigger" href="#projects">
        <span className="white hide-sm">&nbsp;&nbsp;Projects</span>
      </a>
    </li>
  );

  let certificateLinks=(
    <li className="nav-item mr-3">
      <a className="nav-link js-scroll-trigger" href="#certificate">
        <span className="white hide-sm">&nbsp;&nbsp;Certificate</span>
      </a>
    </li>
  );

  if(pathname!='/projects'){
    guestLinks=(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-3">
          <a className="nav-link js-scroll-trigger" href="/">
            <span className="white hide-sm">&nbsp;&nbsp;Home</span>
          </a>
        </li>
        {pathname=='/' ? skillsLinks : null}
        {pathname=='/' ? educationLinksSm : null}
        {pathname=='/' ? educationLinks : null}
        {pathname=='/' ? projectsLinks : null}
        {pathname=='/' ? certificateLinks : null}
      </ul>
    );
  }

  const navbar=(
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">Archipelago's</Link>
        </h1>
        <ul>
          {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
        </ul>
      </nav>
  );

  const [navbarMobile, showNavbarMobile] = useState("none");

  const [scroll, setScroll] = useState("");

  useEffect(() => {
      document.addEventListener("scroll", () => {

          if(window.scrollY > 10){
              setScroll("navbar-black");
          }else{
            setScroll("");
          }
      })
  })

  return(
    <header id="header" className="fixed-top">
                <nav className={scroll+" navbar navbar-expand-lg navbar-dark fixed-top"} id="mainNav">
                    <div className="container">
                        <a className="navbar-brand js-scroll-trigger" href="/">
                            <img src="/img/logo.png" className="logo" alt="" />
                        </a>
                        <button className="btn-hamburger navbar-toggler navbar-toggler-right text-uppercase font-weight-bold text-white rounded" type="button" 
                          onClick={() => {
                            {navbarMobile=='none' ? showNavbarMobile("block") : showNavbarMobile("none")};
                          }}>
                            <i className="black fas fa-bars"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            {isAuthenticated ? authLinks : null}
                        </div>
                    </div>

                    <div className="navbar-mobile" style={{display:navbarMobile}}>
                      {isAuthenticated ? authLinks : null}
                    </div>
                </nav>
            </header>
  );
};

Navbar.propTypes={
    logout:propTypes.func.isRequired,
    auth:propTypes.object.isRequired
};

const mapStateToProps=state=>({
    auth:state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);