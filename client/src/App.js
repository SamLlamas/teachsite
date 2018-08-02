import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
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
        <Route exact path="/" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/upload" component={Upload} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
