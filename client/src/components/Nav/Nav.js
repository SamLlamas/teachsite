import React, { Component } from "react";

class Nav extends Component {
  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  navLink;

  islogged() {
    if(!localStorage.getItem('jwtToken')){
      console.log()
      return this.navLink = <React.Fragment> <li><a href="/">Home</a></li><li><a href="/login">Login</a></li><li><a href="/signup">Signup</a></li> </React.Fragment>
    }
    else{
      return this.navLink = <React.Fragment> <li><a href="/">Home</a></li><li><a onClick={this.logout} href="">logout</a></li></React.Fragment>
    }
  }
  
  render() {
  const Nav = (
    <div role="navigation" className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a href="/" className="navbar-brand">Project name</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
              {this.islogged()}
          </ul>
        </div>
      </div>
    </div>
    );
  
    return Nav
  }
}


 






export default Nav;
