import React, { Component } from "react";
import axios from "axios";
import "./ChangeStatusMenu.css";

class ChangeStatusMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      isError: false
    };
  }

  // Changes the reading status (shelf) for any book in either a Search list or a My Books list
  changeStatus = (shelf, id) => {
    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/bookshelf/update/${id}/${shelf}`)
      .then(response => {
        if (!response.data)
          throw new Error("Invalid response from server.");
        this.setState({ 
          isLoading: false,
        });
        // Updates the page calling the changeStatus function
        if(this.props.listType === "my-books") return this.props.getMyBooks(); 
        if(this.props.listType === "book-details") return this.props.getBookDetails(id);
      })
      .catch(error => {
        this.setState({ 
          isLoading: false,
          isError: true
        });
        console.log(error.message);
      });
  }

  // Renders the Change Status Menu
  render() {
    return (
      <div>
        <label htmlFor="shelf-select"><i>Change Reading Status:</i></label>
        <div className="input-group">
        {this.props.isLoading
        ? <select 
            className="custom-select"
            value="isLoadingTrue">
            <option value="isLoadingTrue">Changing status...</option>
          </select>
        : <select 
            className="custom-select"
            value={this.props.shelf} 
            onChange={e => this.changeStatus(e.target.value, this.props.id)}>
            <option value="none">{this.props.shelf==="none" ? "Not Selected" : "Remove"}</option>
            <option value="wantToRead">Future Reads</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="read">Already Read</option>
          </select>}
        </div>
      </div>
    );
  }
}

export default ChangeStatusMenu;