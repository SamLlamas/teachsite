import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn, Checkbox, Radio } from "../../components/Form";
import axios from 'axios';


class Upload extends Component {
    constructor() {
        super();
        this.state = {
            addres: "",
            type: "",
            rent: 0,
            duration: "",
            deposit: 0,
            bedrooms: 0,
            baths: 0.0,
            sqft: 0,
            userID: ""
        };
    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password } = this.state;

        API.signUp({ username, email, password })
            .then((result) => {
                this.props.history.push("/login")
            });
    }

    render() {
        return (
            <Container fluid>
                <br />
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <Jumbotron>
                            <h2>press here to upload pictures</h2>
                        </Jumbotron>
                    </Col>
                    <div className="col"></div>
                </Row>
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <h2>Details and Description </h2>
                        <br />
                        <form className='listingDetails'>
                        <Row>
                            <Col size="md-6">
                                <label>Property Address</label>
                                <br />
                                <Input
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                            <Col size = "md-6">
                                <label>Property Type</label>
                                <select className="form-control" value={this.state.value} onChange={this.handleInputChange}>
                                    <option defaultValue disabled>Please Select</option>
                                    <option value="House">House</option>
                                    <option value="Apartment/Condo">Apartment/Condo</option>
                                    <option value="Townhouse">Townhouse</option>
                                    <option value="Room for Rent">Room</option>
                                </select>
                            </Col>
                        </Row>
                        </form>
                    </Col>
                    <div className="col"></div> 
                </Row>
                <br />
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <h2>Details and Description </h2>
                        <br />
                        <form className='listingDetails'>
                            <Row>
                                <Col size="md-6">
                                    <label>Rent</label>
                                    <div className='input-group'>
                                        <Input
                                            type="number"
                                            value={this.state.title}
                                            onChange={this.handleInputChange}
                                            name="title"
                                            placeholder="enter amount (required)"
                                            aria-describedby="basic-addon2"
                                            min="0"
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">/mon</span>
                                        </div>
                                    </div>
                                    <br />
                                    <label>Security Deposit</label>
                                    <Input
                                        type="number"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        name="title"
                                        placeholder="enter amount (required)"
                                        aria-describedby="basic-addon2"
                                        min="0"
                                    />
                                    <br />
                                    <label>Bedrooms</label>
                                    <select className="form-control " value={this.state.value} onChange={this.handleInputChange}>
                                        <option defaultValue disabled>Please Select</option>
                                        <option value="studio">Studio</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                    </select>
                                    <br />
                                    <label>Baths</label>
                                    <select className="form-control " value={this.state.value} onChange={this.handleInputChange}>
                                        <option defaultValue disabled>Please Select</option>
                                        <option value="1">1</option>
                                        <option value="1.5">1.5</option>
                                        <option value="2">2</option>
                                        <option value="2.5">2.5</option>
                                        <option value="3">3</option>
                                        <option value="3.5">3.5</option>
                                        <option value="4">4</option>
                                    </select>
                                    <br />
                                    <label>Square feet</label>
                                    <Input
                                        type="number"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        name="title"
                                        placeholder="square feet"
                                        aria-describedby="basic-addon2"
                                        min="0"
                                    />
                                </Col>
                                <Col size="md-6">
                                    <label>Lease Duration</label>
                                    <select className="form-control " value={this.state.value} onChange={this.handleInputChange}>
                                        <option defaultValue disabled>Please Select</option>
                                        <option value="1 month">1 month</option>
                                        <option value="6 months">6 months</option>
                                        <option value="1 year">1 year</option>
                                        <option value="Sublet/Temporary">Sublet/Temporary</option>
                                    </select>
                                    <br />
                                    <label> Date Available</label>
                                    <Input
                                        type="Date"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                    />
                                    <br />
                                    <label>Lease terms</label>
                                    <Input
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                    />
                                    <br />
                                    <label>Description</label>
                                    <TextArea
                                        value={this.state.synopsis}
                                        onChange={this.handleInputChange}
                                        name="terms"
                                        placeholder="small description of your place. Sell it!"
                                    />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                    <div className="col"></div>
                </Row>
                <br />
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <h2>Amenities and rules </h2>
                        <br />
                        <form className='listingDetails'>
                            <Row>
                                <Col size="md-6">
                                    <label><h3>Amenities</h3></label>
                                    <Checkbox id="A/C" />
                                    <Checkbox id="Garage Parking" />
                                    <Checkbox id="Off-Street Parking" />
                                    <Checkbox id="Furnished" />
                                    <Checkbox id="Pool" />
                                </Col>
                                <Col size="md-6">
                                    <label><h3>Laundry</h3></label>
                                    <Radio id="None" />
                                    <Radio id="In unit" />
                                    <Radio id="Shared / In-building" />

                                    <br />
                                    <label><h3>Pets</h3></label>
                                    <Checkbox id="No Pets Allowed" />
                                    <Checkbox id="Cats Allowed" />
                                    <Checkbox id="Small Dogs Allowed" />
                                    <Checkbox id="Large Dogs Allowed" />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                    <div className="col"></div>
                </Row>
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <FormBtn type="submit"> Upload Post!</FormBtn>
                    </Col>
                    <div className="col"></div>
                </Row>
            </Container >
        );
    }
}

export default Upload;