import React, { Component} from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import "./Search.css";

class Search extends Component {
  state = {
    isLoading: false,
    userInput: "",
    books: []
  }

  // handleOnChange = (userInput) => {
  //   this.setState ({
  //     userInput
  //   })
  //   this.searchBooks(userInput);
  // }

  searchBooks = (userInput) => {
    this.setState ({
      userInput
    })
    // doesn't make a request if userInput is empty
    if(!userInput) return;

    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/books/search/${userInput}`)
      .then(response => {
        console.log(response.data.books);
        if (!response.data.books) {
          this.setState({
            books: [],
            isLoading: false
          });
          throw new Error("No data found");
        } else {
          this.setState({
            books: response.data.books,
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
            onChange={e => this.searchBooks(e.target.value)}
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
        {console.log(this.state.books)}
        {// Checks to see if there is a problem loading the page
          this.state.isLoading ? 
          <p>Loading...</p> 

          // NESTED CONDITIONAL: Checks to see if userInput is empty, if not it renders a list of books
          : ( this.state.userInput && (
          <div className="search-results">
            <section><p>SEARCH RESULTS</p></section>
            <BookList 
              listType="search-results"
              books={this.state.books}
              searchBooks={this.searchBooks}
            />
          </div>
          )
        )}
      </div>
    );
  }
}

export default Search;