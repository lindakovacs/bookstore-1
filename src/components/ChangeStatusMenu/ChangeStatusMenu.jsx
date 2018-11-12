import React, { Component } from "react";
import axios from "axios";
import "./ChangeStatusMenu.css";

class ChangeStatusMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false
    };
  }

  // Changes the reading status for any book in either a Search list or a My Books list
  changeStatus = (status, id) => {
    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/bookshelf/update/${id}/${status}`)
      .then(response => {
        if (!response.data)
          throw new Error("No response from server.");
        this.setState({ 
          isLoading: false,
        });

        // Updates the page calling the changeStatus function
        if(this.props.listType === "my-books") return this.props.getMyBooks(); 
        return this.props.searchBooks();
      });
  }

  // Renders the Change Status Menu
  render() {
    return (
      <div>
        <label htmlFor="book-select"><i>Change Reading Status:</i></label>
        <div className="input-group">
          <select 
            className="custom-select" 
            id="book-select" 
            value={this.props.status} 
            onChange={e => this.changeStatus(e.target.value, this.props.id)}>
              <option value="none">Unselected</option>
              <option value="wantToRead">Future Reads</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Already Read</option>
          </select>
        </div>
      </div>
    );
  }
}

export default ChangeStatusMenu;