import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn, Checkbox } from "../../components/Form";
import axios from 'axios';


class Upload extends Component {
    constructor() {
        super();
        this.state = {
            address: "",
            city: "",
            type: "Please Select",
            rent: 0,
            duration: "Please Select",
            deposit: 0,
            date: {},
            bedrooms: "Please Select",
            terms: 'Please Select',
            baths: "Please Select",
            sqft: 0,
            description: "",
            ac: false,
            garage: false,
            offstreet: false,
            furnished: false,
            pool: false,
            laundry: "Please Select",
            noPet: false,
            cat: false,
            smallDog: false,
            bigDog: false,
            ammenties: "Please Select",
            userID: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    }
    handleChange = (event) => {
        
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    const name = target.name;

    this.setState({
      [name]: value
    });
    }    

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(1)
        API.savePost({
            address: this.state.address,
            city: this.state.city,
            type: this.state.type,
            rent: this.state.rent,
            duration: this.state.duration,
            deposit: this.state.deposit,
            date: this.state.date,
            bedrooms: this.state.bedrooms,
            terms: this.state.terms,
            baths: this.state.baths,
            sqft: this.state.sqft,
            description: this.state.description,
            ac: this.state.ac,
            garage: this.state.garage,
            offstreet: this.state.offstreet,
            furnished: this.state.furnished,
            pool: this.state.pool,
            laundry: this.state.laundry,
            noPet: this.state.noPet,
            cat: this.state.cat,
            smallDog: this.state.smallDog,
            bigDog: this.state.bigDog,
            ammenties: this.state.ammenties,
            userID: localStorage.getItem('currentUserID')
        })
          .then(res => this.props.history.push("/") )
          .catch(err => console.log(err));
    }

    render() {
        return (
            <Container fluid>
                <br />
                <form className='listingDetails' method="POST" onSubmit={this.handleSubmit}>
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <Jumbotron>
                            <h2>press here to upload pictures</h2>
                        </Jumbotron>
                        <p>*Please note all fields are required</p>
                        <br />
                    </Col>
                    <div className="col"></div>
                </Row>
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <h2>Property's details</h2>
                        <br />
                            <Row>
                                <Col size="md-6">
                                    <label>Street Address</label>
                                    <br />
                                    <Input
                                        name="address"
                                        type="text"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <br />
                                    <label>City</label>
                                    <br />
                                    <Input
                                        name="city"
                                        type="text"
                                        value={this.state.city}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col size="md-6">
                                    <label>Property Type</label>
                                    <select className="form-control" value={this.state.type} onChange={this.handleChange} required name="type" >
                                        <option disabled>Please Select</option>
                                        <option value="House">House</option>
                                        <option value="Apartment/Condo">Apartment/Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Room for Rent">Room</option>
                                    </select>
                                </Col>
                            </Row>
                    </Col>
                    <div className="col"></div>
                </Row>
                <br />
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <h2>Details and Description </h2>
                        <br />
                            <Row>
                                <Col size="md-6">
                                    <label>Rent</label>
                                    <div className='input-group'>
                                        <Input
                                            type="number"
                                            value={this.state.rent}
                                            onChange={this.handleChange}
                                            name="rent"
                                            placeholder="enter amount (required)"
                                            aria-describedby="basic-addon2"
                                            min="0"
                                            required
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">/mon</span>
                                        </div>
                                    </div>
                                    <br />
                                    <label>Security Deposit</label>
                                    <Input
                                        type="number"
                                        value={this.state.deposit}
                                        onChange={this.handleChange}
                                        name="deposit"
                                        placeholder="enter amount (required)"
                                        aria-describedby="basic-addon2"
                                        min="0"
                                        required
                                    />
                                    <br />
                                    <label>Bedrooms</label>
                                    <select className="form-control " value={this.state.bedrooms} onChange={this.handleChange} required name="bedrooms">
                                        <option disabled>Please Select</option>
                                        <option value="studio">Studio</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                    </select>
                                    <br />
                                    <label>Baths</label>
                                    <select className="form-control " value={this.state.baths} onChange={this.handleChange} required name="baths">
                                        <option disabled>Please Select</option>
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
                                        value={this.state.sqft}
                                        onChange={this.handleChange}
                                        name="sqft"
                                        placeholder="square feet"
                                        aria-describedby="basic-addon2"
                                        min="0"
                                        required
                                    />
                                </Col>
                                <Col size="md-6">
                                    <label>Lease Duration</label>
                                    <select className="form-control " value={this.state.duration} onChange={this.handleChange} required name="duration">
                                        <option disabled>Please Select</option>
                                        <option value="1 month">1 month</option>
                                        <option value="6 months">6 months</option>
                                        <option value="1 year">1 year</option>
                                        <option value="Sublet/Temporary">Sublet/Temporary</option>
                                    </select>
                                    <br />
                                    <label> Date Available</label>
                                    <Input
                                        name="date"
                                        type="Date"
                                        value={this.state.date}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <br />
                                    <label>Lease terms</label>
                                    <select className="form-control" value={this.state.terms} onChange={this.handleChange} required name="terms">
                                        <option disabled>Please Select</option>
                                        <option value="month to month">Month to Month</option>
                                        <option value="year to year">Year to Year</option>
                                    </select>
                                    <br />
                                    <label>Description</label>
                                    <TextArea
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        name="description"
                                        placeholder="small description of your place. Sell it!"
                                        required />
                                </Col>
                            </Row>
                    </Col>
                    <div className="col"></div>
                </Row>
                <br />
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <h2>Amenities and rules </h2>
                        <br />
                            <Row>
                                <Col size="md-6">
                                    <label><h3>Amenities</h3></label>
                                    <Checkbox name="ac" check={this.state.ac} change={this.handleChange} id="A/C" />
                                    <Checkbox name= "garage" check={this.state.garage} change={this.handleChange} id="Garage Parking" />
                                    <Checkbox name="offstreet" check={this.state.offstreet} change={this.handleChange} id="Off-Street Parking" />
                                    <Checkbox name="furnished" check={this.state.furnished} change={this.handleChange} id="Furnished" />
                                    <Checkbox name="pool" check={this.state.pool} change={this.handleChange} id="Pool" />

                                    <br />

                                    <label><h3>Ammenties included:</h3></label>
                                    <select className="form-control" value={this.state.ammenties} onChange={this.handleChange} required name="ammenties">
                                        <option defaultValue disabled>Please Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </Col>
                                <Col size="md-6">
                                    <label><h3>Laundry</h3></label>
                                    <select className="form-control" value={this.state.laundry} onChange={this.handleChange} required name="laundry">
                                        <option disabled>Please Select</option>
                                        <option value="none">None</option>
                                        <option value="in unit">In unit</option>
                                        <option value="shared/In-building">Shared /In-building</option>
                                    </select>
                                    <br />
                                    <br />
                                    <label><h3>Pets</h3></label>
                                    <Checkbox name="noPet" check={this.state.noPet} change={this.handleChange} id="No Pets Allowed" />
                                    <Checkbox name="cat" check={this.state.cat} change={this.handleChange} id="Cats Allowed" />
                                    <Checkbox name="smallDog" check={this.state.smallDog} change={this.handleChange} id="Small Dogs Allowed" />
                                    <Checkbox name="bigDog" check={this.state.bigDog} change={this.handleChange} id="Large Dogs Allowed" />
                                </Col>
                            </Row>
                        
                    </Col>
                    <div className="col"></div>
                </Row>
                <br />
                <Row>
                    <div className="col"></div>
                    <Col size="md-8">
                        <FormBtn type="submit"> Upload Post!</FormBtn>
                    </Col>
                    <div className="col"></div>
                </Row>
                </form>
            </Container >
        );
    }
}

export default Upload;