import React, { Component } from "react";
import axios from 'axios';
import BookList from "../BookList/BookList";
import "./MyBooks.css";

class MyBooks extends Component {
  state = {
    books: {},
    isLoading: false
  }

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

  componentDidMount = () => {
    this.getMyBooks();
  }

  render() {
    const categoryClasses = ["future-reads", "currently-reading", "already-read"];
    const books = this.state.books;
    const listType = "my-books";

    return (
      <div className={listType}>
        <section><p>MY BOOKS</p></section>

        {this.state.isLoading ? (
            <div>
              <h2>Loading</h2>
            </div> 
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
                  category={category}
                  listType={listType}
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