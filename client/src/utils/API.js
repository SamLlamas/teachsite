import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
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
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(book) {
    return axios.delete("/api/books/" + book._id, book);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },

  resetPass: function(email){

    return axios.post("/api/users/forgot", email);
  }
};
