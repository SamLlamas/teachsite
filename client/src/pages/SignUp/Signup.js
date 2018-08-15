import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          username: '',
          phone: '',
          email: '',
          password: ''
        };
      }
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    
      onSubmit = (e) => {
        e.preventDefault();
        console.log("shalom")
        const { username,email ,password } = this.state;
    
        API.signUp({ username, email ,password })
          .then((result) => {
            this.props.history.push("/login")
          });
      }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-4"></Col>
                    <Col size="md-4">
                        <form method="POST" onSubmit={this.onSubmit}>
                            <legend> <h1>Signup</h1>
                            <br />
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" autoFocus="autofocus" className="form-control" value={this.state.name} onChange={this.onChange} placeholder="First and Last Name" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" autoFocus="autofocus" className="form-control" value={this.state.username} onChange={this.onChange} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" className="form-control" 
                                    value={this.state.email} onChange={this.onChange} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Phone">Phone</label>
                                    <input type="tel" name="phone" className="form-control" 
                                    value={this.state.phone} onChange={this.onChange} placeholder="1-(555)-555-5555"  required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" className="form-control" 
                                    value={this.state.password} onChange={this.onChange} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm">Confirm Password</label>
                                    <input type="password" name="confirm" className="form-control"
                                    onChange={this.onChange} required />
                                </div>
                            </legend>
                            <button type="submit" className="btn btn-primary">Signup</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Signup;