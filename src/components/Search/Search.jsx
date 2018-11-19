import React, { Component } from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import "./Search.css";

// function debounce(func, wait, immediate) {
//   var timeout;
//   return function() {
//     var context = this, args = arguments;
//     var later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// };

// function debounce(func, wait) {
//   var timeout;
//   return function() {
//     var context = this, args = arguments;
//     var later = function() {
//       timeout = null;
//       func.apply(context, args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

class Search extends Component {
  state = {
    isLoading: false,
    userInput: "",
    booksFound: false,
    books: []
  }

  debounce = (func, wait) => {
    let timeout;
    return function() {
      const args = arguments;
      const later = function() {
        timeout = null;
        func(args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  searchBooks = userInput => {
    this.setState ({
      userInput
    })
    // doesn't make a request if userInput is empty
    if(!userInput) return;

    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/books/search/${userInput}`)
      .then(response => {
        // throws an error if no response received
        console.log(this)
        if (!response.data.books) {
          throw new Error("This sucks!");
          // adds books to state if one or more books found
        } else if (response.data.books.length > 0) {
          console.log(response.data.books)
          this.setState({
            books: response.data.books,
            booksFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      })
      .catch((error)=> {
        console.log(error.message);
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
            // onChange={(e) => this.searchBooks(e.target.value)}
            onChange={e => {
              e.persist();
              return this.debounce(this.searchBooks(e.target.value), 100);
            }}
          />
          <div className="input-group-append">
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={() => this.searchBooks(this.state.userInput)}
              // onClick={e => {
              //   e.persist(); 
              //   return this.searchBooks(this.state.userInput)
              // }}
              >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {// Checks to see if there is a problem loading the page
          this.state.isLoading ? (
          <div className="error">
            <p>There is a problem loading the page. Please try again later.</p> 
          </div> )

          // NESTED CONDITIONAL: Checks to see if userInput is empty, if not it renders a list of books
          : ( this.state.userInput && (
          <div className="search-results">
            <section><p>SEARCH RESULTS</p></section>
            <BookList 
              listType="search-results"
              books={this.state.books}
            />
          </div>
          )
        )}
      </div>
    );
  }
}

export default Search;