import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidMount() {
        API.getLogin();
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.email) {

            API.resetPass({
                email: this.state.email,
            })
                .then(res => {
                    console.log("ehllo there")
                })
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
                    <Col size="md-4"></Col>
                    <Col size="md-4">
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <legend>Forgot Password
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" autoFocus="autofocus" className="form-control"value={this.state.pass}
                                    onChange={this.handleChange("email")} />
                                </div>
                                <button type="submit" className="btn btn-primary">Reset Password</button>
                            </legend>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;