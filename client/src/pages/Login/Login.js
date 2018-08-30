import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import p1 from "../../images/Logo.png"



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
                .then(res => {
                    
                    localStorage.setItem('jwtToken', res.data.token);
                    localStorage.setItem('currentUserID', res.data.id);
                    console.log(localStorage);
                    this.props.history.push('/');
                })
                .catch(err => window.alert("Incorrect Password"));
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
                    <div className="col"></div>
                    <Col size="md-4">
                        <br />
                        <img src={p1} alt="Panther Den Logo"/>
                        <h2 className= "text-center">Welcome to the Panther's Den! <br />  Please log in or sign up</h2>
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <legend>Login</legend>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" autoFocus="autoFocus" className="form-control" value={this.state.username}
                                    onChange={this.handleChange("username")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" value={this.state.pass}
                                    onChange={this.handleChange("pass")} />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <a href="/forgot" className="btn btn-link">Forgot Password?</a>
                        </form>
                    </Col>
                    <div className="col"></div>
                </Row>
            </Container>
        );
    }
}

export default Login;