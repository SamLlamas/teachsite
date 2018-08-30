import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import axios from 'axios';

class Posts extends Component {
  state = {
    posts: [],
    bedrooms: "",
    type: "",
    rent: 0,
    address: "",
    userID: localStorage.getItem('currentUserID')
  };

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.defaults.headers.common['CurrentUser'] = localStorage.getItem('currentUserID');
    this.loadPosts();
  }

  loadButtons = (IDnumber, post) => {
    if (IDnumber === localStorage.getItem('currentUserID')){
      let userdata = this.state.userID
      return <DeleteBtn onClick={() => this.deletePost(post, userdata)} />
    }
    else {
      return null;
    }
  }

  loadPosts = () => {
    API.getPosts()
      .then(res =>
        this.setState({ posts: res.data, bedrooms: "", type:"",rent: 0, address: ""})
      )
      .catch(err =>this.props.history.push("/login"));
  };

  deletePost = (post, userdata) => {
    API.deletePost({post: post, userdata: userdata})
      .then(res => this.loadPosts())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    return (
      <Container fluid>
        <Row>
          <div className="col"></div>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Available Listings</h1>
            </Jumbotron>
            {this.state.posts.length ? (
              <List>
                {this.state.posts.map(post => (
                  <ListItem key={post._id}>
                    <Link to={"/posts/" + post._id}>
                      <strong>
                        {post.bedrooms} Bedroom; {post.type}; 
                      </strong>
                      <br /> ${post.rent}/mo
                    </Link>
                    {this.loadButtons(post.userID, post)}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <div className="col"></div>
        </Row>
      </Container>
    );
  }
}

export default Posts;
