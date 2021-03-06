import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";



class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidMount() {
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.email) {

            API.resetPass({
                email: this.state.email,
            })
                .then(res => {
                    console.log(res.data)
                    if(res.data === false){
                        alert("Email not found");
                    }
                    if(res.data === true){
                        alert("Email sent! if not found, please check your spam folder");
                        this.props.history.push('/')
                    }
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

export default Forgot;