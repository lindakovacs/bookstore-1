import React, { Component } from "react";
import axios from 'axios';
import BookList from "../BookList/BookList";
import "./MyBooks.css";

class MyBooks extends Component {
  state = {
    books: {},
    isLoading: false
  };

  getMyBooks = () => {
    this.setState({ isLoading: true });
    return axios
      .get('http://localhost:7000/bookshelf')
      .then(response => {
        if (!response.data)
          throw new Error("No response from server.");
        this.setState({
          books: response.data.books,
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getMyBooks();
  }

  render() {
    const categoryClasses = ["future-reads", "currently-reading", "already-read"];
    const books = this.state.books;

    return (
      <div className="my-books">
        <section><p>MY BOOKS</p></section>

        {this.state.isLoading ? (
          <p>No response from server. Please try again later</p>
        ) : (
          Object.keys(books).map((category, index) => {
            const categoryClass = categoryClasses[index];
            const categoryName = categoryClass.replace('-', ' ').replace(/(^\w)|(\b\w)/g, char => char.toUpperCase());
            return (
              <div className={categoryClass} key={categoryClass}>
                <h2>{categoryName}</h2>
                <BookList 
                  books={this.state.books[category]}
                  isLoading={this.state.isLoading}
                  getMyBooks={this.getMyBooks}
                  listType="my-books"
                />
              </div>
            );
          })
        )
      }
      </div>
    )
  }
}

export default MyBooks;