import React from "react";

const Nav = () => (
<div role="navigation" className="navbar navbar-inverse navbar-static-top">
  <div className="container">
    <div className="navbar-header">
      <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a href="/" className="navbar-brand">Project name</a>
    </div>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li className="active"><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>
    </div>
  </div>
</div>
);

export default Nav;
