import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";



class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: "",
            passconfirm: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("no")
    }



    componentDidMount() {
        console.log(this.props.match)
        console.log("hello")
    }

    handleSubmit = event => {
        event.preventDefault();
        

        // if (this.state.pass === this.state.passconfirm) {
        //     API.changePass({
        //         password: this.state.pass,
                
        //     })
        //         .then(res => {
        //                 this.props.history.push('/')
        //         })
        //         .catch(err => console.log(err));
        // }
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
                                    <label htmlFor="pass">New Password</label>
                                    <input type="password" name="pass" autoFocus="autofocus" className="form-control"value={this.state.pass}
                                    onChange={this.handleChange("pass")} />
                                       <label htmlFor="passconfirm">Confirm Password</label>
                                    <input type="password" name="passconfirm" autoFocus="autofocus" className="form-control"value={this.state.pass}
                                    onChange={this.handleChange("passconfirm")} />
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

export default Reset;