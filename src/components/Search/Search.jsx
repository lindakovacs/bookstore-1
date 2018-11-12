import React, { Component} from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import "./Search.css";

class Search extends Component {
  state = {
    isLoading: false,
    userInput: "",
    books: {}
  }

  handleOnChange = (userInput) => {
    this.setState ({
      userInput
    })
    // once userInput has been updated we make a request to the server
    this.searchBooks(userInput);
  }

  searchBooks = (userInput) => {
    // doesn't make a request if userInput is empty
    if(!userInput) return;

    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/books/search/${userInput}`)
      .then(response => {
        if (!response.data)
          throw new Error("No response from server.");
        this.setState({
          books: response.data.books,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="search-field">
        <p>Search for a Book</p>
        <div className="input-group mb-3">
          <input 
            type="text" 
            placeholder="Enter title keywords"
            value={this.state.userInput}
            onChange={e => this.handleOnChange(e.target.value)}
          />
          <div className="input-group-append">
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={() => this.searchBooks(this.state.userInput)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {// Checks to see if there is a problem loading the page
          this.state.isLoading ? 
          <p>Server not responding. Please try again later.</p> 

          // NESTED CONDITIONAL: Checks to see if userInput is empty, if not it renders a list of books
          : ( this.state.userInput && (
          <div className="search-results">
            <section><p>SEARCH RESULTS</p></section>
            <BookList 
              books={this.state.books}
              isLoading={this.state.isLoading}
              searchBooks={this.searchBooks}
              listType="search-results"
            />
          </div>
          )
        )}
      </div>
    );
  }
}

export default Search;