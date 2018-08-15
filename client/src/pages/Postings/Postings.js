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
    title: "",
    author: "",
    synopsis: "",
    userID: ""
  };

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    this.loadPosts();
  }

  loadPosts = () => {
    API.getPosts()
      .then(res =>
        this.setState({ posts: res.data, title: "", author: "", synopsis: "", userID: ""})
      )
      .catch(err =>this.props.history.push("/login"));
  };

  deletePost = post => {
    API.deletePost(post)
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
                        {post.title} by {post.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deletePost(post)} />
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
