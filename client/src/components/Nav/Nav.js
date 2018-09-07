import React, { Component } from "react";
import p2 from "../../images/prospectsierrawith logo.png"

class Nav extends Component {
  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  navLink;

  islogged() {
    if (!localStorage.getItem('jwtToken')) {
      return this.navLink =
        <React.Fragment>
          <a className="navbar-text nav-link" href="/"><h3>Home</h3></a>
          <a className="navbar-text nav-link" href="/login"><h3>Login</h3></a>
          <a className="navbar-text nav-link" href="/signup"><h3>Signup</h3></a>
        </React.Fragment>
    }
    else {
      return this.navLink =
        <React.Fragment>
          <li className="nav-item">
            <a className="navbar-text nav-link" href="/"><h3>Home</h3></a>
          </li>
          <li className="nav-item">
            <a className="navbar-text nav-link" href="/upload"><h3>Upload</h3></a>
          </li>
          <li className="nav-item">
            <a className="navbar-text nav-link" onClick={this.logout} href=""><h3>Logout</h3></a>
          </li>
        </React.Fragment>
    }
  }

  render() {
    const Nav = (
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-start">
      <img src={p2} alt="Panther Den Logo" height = '50px'/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {this.islogged()}
          </ul>
        </div>
      </nav>


    );

    return Nav
  }
}









export default Nav;
