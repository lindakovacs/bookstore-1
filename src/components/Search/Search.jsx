import React, { Component } from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import "./Search.css";

// Credit to Remy Sharps: https://remysharp.com/2010/07/21/throttling-function-calls
function debounce(func, delay) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userInput: "",
      booksSearched: false,
      books: []
    };
    // delays search function until user typing is idle for 200 ms
    this.debouncedSearch = debounce(this.searchBooks, 200);
  }

  searchBooks = userInput => {
    // doesn't make a request if userInput is empty
    if (!userInput) return;

    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/books/search/${userInput}`)
      .then(response => {
        if (!response.data.books) {
          throw new Error("No response from server");
          // adds books to state if one or more books found
        } else {
          this.setState({
            books: response.data.books,
            booksSearched: true,
            isLoading: false
          });
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div className="search-field">
        <p>Search for a Book</p>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Enter title keywords"
            value={this.state.userInput}
            onChange={e => {
              this.setState({
                userInput: e.target.value
              });
              e.persist();
              this.debouncedSearch(e.target.value);
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.searchBooks(this.state.userInput)}
            >
              <i className="fas fa-search" />
            </button>
          </div>
        </div>

        {// Checks to see if there is a problem loading the page
        this.state.isLoading ? (
          <div className="error">
            <p>Loading...</p>
          </div>
        ) : (
          // NESTED CONDITIONAL: Delays the list rendering until a successful search is executed
          this.state.booksSearched && (
            <div className="search-results">
              <section>
                <p>SEARCH RESULTS</p>
              </section>
              <BookList listType="search-results" books={this.state.books} />
            </div>
          )
        )}
      </div>
    );
  }
}

export default Search;
