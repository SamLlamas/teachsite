import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
class Detail extends Component {

    render() {
        return (
            <form method="POST">
                <legend>Login</legend>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" autofocus="autofocus" className="form-control" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button><a href="/forgot" className="btn btn-link">Forgot Password?</a>
            </form>
        );
    }
}

export default Detail;