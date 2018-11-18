import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookList from "../BookList/BookList";
import "./BookDetails.css";

class BookDetails extends Component {
  state = {
    books: [],
    isError: false,
    errorMessage: "",
    isLoading: false
  };

  getBookDetails = id => {
    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/book/${id}`)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
          this.setState({
            isError: true,
            errorMessage: response.data.error
          });
        } else if (!response.data.book) {
          throw new Error();
        } else {
          const newBooks = [];
          newBooks.push(response.data.book);
          this.setState({
            books: newBooks,
            isLoading: false
          });
        }
      })
      .catch((error)=> {
          console.log(error.message);
      });
  }

  componentDidMount() {
    this.getBookDetails(this.props.match.params.id);
  }

  render() {
    if (this.state.isError) {
      return (
        <div className="error">
          <p>{this.state.errorMessage}</p> 
          <Link to="/my-books">Return to My Books</Link>
        </div>
      );
    } else if (this.state.isLoading) {
      return (
        <div className="error">
          <p>There is a problem loading the page. Please try again later.</p> 
          <Link to="/my-books">Return to My Books</Link>
        </div>
      );
    } else {
      return (
        <div className="book-details">
          <section><p>BOOK DETAILS</p></section>
          <BookList 
            listType="book-details"
            books={this.state.books}
            getBookDetails={this.getBookDetails}
          />
        </div>
      );
    }
  }
}

export default BookDetails;