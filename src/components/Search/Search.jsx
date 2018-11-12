import React, { Component} from "react";
import axios from "axios";
import "./Search.css";

class Search extends Component {
  render() {
    return (
      <div className="search-field">
        <p>Search for a Book</p>
        <div className="input-group mb-3">
          <input type="text" placeholder="Enter title keywords"/>
          <div className="input-group-append">
            <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;