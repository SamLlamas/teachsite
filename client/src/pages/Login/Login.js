import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: ""
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    
    componentDidMount() {
        API.getLogin();
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.username && this.state.pass) {

          API.checkLogin({
            username: this.state.username,
            password: this.state.pass
          })
            .then(res =>  {
                localStorage.setItem('jwtToken', res.data.token)
                this.props.history.push('/')})
            .catch(err => console.log(err));
        }
      };

      handleChange(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
          }.bind(this);
      }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size = "md-4"></Col>
                    <Col size="md-4">
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <legend>Login</legend>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" autoFocus="autoFocus" className="form-control"  value = {this.state.username}
                                onChange={this.handleChange("username")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" value = {this.state.pass}
                                onChange={this.handleChange("pass")}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button><a href="/forgot" className="btn btn-link">Forgot Password?</a>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;