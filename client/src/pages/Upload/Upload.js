import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";


class Upload extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
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
        const { username, email, password } = this.state;

        API.signUp({ username, email, password })
            .then((result) => {
                this.props.history.push("/login")
            });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-2"></Col>
                    <Col size="md-9">
                    <br />
                        <Jumbotron>
                            <h2>press here to upload pictures</h2>
                        </Jumbotron>
                        <form className='listingDetails'>
                            <h1>Details and Description </h1>
                            <br />
                            <Col size="md-6">
                                <h3><label>Rent</label></h3>
                                <div className='input-group'>
                                    <Input
                                        type="number"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        name="title"
                                        placeholder="enter amount (required)"
                                        aria-describedby="basic-addon2"
                                        min = "0"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">/mon</span>
                                    </div>
                                </div>
                                <h3><label>Rent</label></h3>
                                <Input
                                    value={this.state.author}
                                    onChange={this.handleInputChange}
                                    name="author"
                                    placeholder="Author (required)"
                                />
                                {/* <TextArea
                                value={this.state.synopsis}
                                onChange={this.handleInputChange}
                                name="synopsis"
                                placeholder="Synopsis (Optional)"
                            />
                            <FormBtn
                                disabled={!(this.state.author && this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Book
                             </FormBtn> */}
                            </Col>
                        </form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default Upload;