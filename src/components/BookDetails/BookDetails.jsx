import React, { Component } from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import "./BookDetails.css";

class BookDetails extends Component {
  state = {
    books: [],
    isLoading: false
  };

  getBookDetails = id => {
    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/book/${id}`)
      .then(response => {
        if (!response.data) {
          throw new Error();
        }
        this.setState({
          books: this.state.books.concat(response.data.book),
          isLoading: false
        });
      })
      .catch((error)=> {
          console.log(error.message);
      });
  }

  componentDidMount() {
    this.getBookDetails(this.props.match.params.id);
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="book-details">
          <section><p>BOOK DETAILS</p></section>
          <BookList 
            listType="book-details"
            books={this.state.books}
            getMyBooks={this.getMyBooks}
          />
        </div>
      );
    } else {
      return (
        <p className="error">Loading...</p> 
      );
    }
  }
}

export default BookDetails;