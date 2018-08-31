import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import axios from 'axios';

class Detail extends Component {
  state = {
    post: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    API.getPost(this.props.match.params.id)
      .then(res => this.setState({ post: res.data }))
      .catch(err => this.props.history.push("/login"));
  }

  yesno = value => {
    if (value === true) {
      return "Yes"
    }
    else {
      return "No"
    }
  }

  pets = (no, cats, small, big) => {
    if (no === true) {
      return <React.Fragment ><ul><li>No pets allowed</li></ul></React.Fragment>
    }
    else {
      let frag1, frag2, frag3
      if (cats === true) {
        frag1 = <li>Cats Allowed</li>
      }
      if (small === true) {
        frag2 = <li>Small dogs Allowed</li>
      }
      if (big === true) {
        frag3 = <li>Big dogs Allowed</li>
      }
      let fragment = <React.Fragment ><ul>{frag1}{frag2}{frag3}</ul></React.Fragment>
      return fragment
    }

  }

  render() {

    return (
      <Container fluid>
        <br />
        <Row>
          <Col size="md-12">
            <Jumbotron>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <div className="col"></div>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>{this.state.post.address}</h1>
              <h3>
                {this.state.post.bedrooms} Bedroom - {this.state.post.bath} bath - {this.state.post.type};
              </h3>
              <p>{this.state.post.sqft} sqft</p>
              <br />
              <p> {this.state.post.description}</p>
            </article>
            <Row>
              <Col size="md-6 md-offset-1">
                <h3>Amenities:</h3>
                <ul>
                  <li>A/C: {this.yesno(this.state.post.ac)}</li>
                  <li>Garage Parking: {this.yesno(this.state.post.garage)}</li>
                  <li>Off-Street Parking: {this.yesno(this.state.post.offstreet)}</li>
                  <li>Furnished: {this.yesno(this.state.post.furnished)}</li>
                  <li>Pool: {this.yesno(this.state.post.pool)}</li>
                </ul>
              </Col>
              <Col size="md-6 md-offset-1">
                <h3>Pets:</h3>
                {this.pets(this.state.post.noPet, this.state.post.cat, this.state.post.smallDog, this.state.post.bigDog)}

              </Col>
            </Row>
            <Row>
              <Col size="md-6 md-offset-1">
                <h3>Ammenties included: {this.state.post.ammenties}</h3>
              </Col>
              <Col size="md-6 md-offset-1">
                <h3>Laundry: {this.state.post.laundry}</h3>
              </Col>
            </Row>
          </Col>
          <div className="col"></div>
        </Row>
        <br /><br />
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Posts</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
