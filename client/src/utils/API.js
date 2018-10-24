import axios from "axios";


export default {
  // Gets all Posts
  getPosts: function() {
    return axios.get("/api/posts");
  },
  getLogin: function() {
    return axios.get("/api/users");
  },
  checkLogin: function({ username, password }) {
    return axios.post("/api/users",{ username, password })
  },
  signUp: function({ username, email, password }){
    return axios.post("api/users/signup", { username, email, password })
  },
  // Gets the Post with the given id
  getPost: function(id) {
    return axios.get("/api/posts/" + id);
  },
  getImgData: function(id) {
    return axios.get("/api/images/data/" + id);
  },
  // Deletes the Post with the given id
  deletePost: function({post, userdata}) {
    return axios.delete("/api/posts/" + post._id, {userdata});
  },
  // Saves a Post to the database
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  },
  resetPass: function(email){
    return axios.post("/api/users/forgot", email);
  },
  changePass: function({token , password}){

    return axios.post("/api/users/forgot/" + token, {password});
  }
};
