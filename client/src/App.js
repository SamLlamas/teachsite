import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Postings from "./pages/Postings";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Forgot from "./pages/forgot"
import Upload from "./pages/Upload"
import Nav from "./components/Nav";


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Postings} />
        <Route exact path="/posts/:id" component={Detail} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/upload" component={Upload} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
