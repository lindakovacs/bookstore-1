import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu";
import noImage from "../../images/no-image.jpg";

class BookDetails extends Component {
  state = {
    book: {},
    isLoading: false
  };

  getBookDetails = id => {
    this.setState({ isLoading: true });
    return axios
      .get(`http://localhost:7000/book/${id}`)
      .then(response => {
        if (!response.data) {
          throw new Error("No response from server.");
        }
        this.setState({
          book: response.data.book,
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getBookDetails(this.props.match.params.id);
  }

  render() {
    console.log(this.state.book);
    console.log(this.state.isLoading);
    console.log(this.state.book.publishedDate);

    if (!this.state.isLoading) {
      const id = this.props.match.params.id;
      const { imageLinks, title, subtitle, authors, description, publishedDate, pageCount, infoLink, shelf } = this.state.book;
      const authorsLength = authors && authors.length;
      const authorList = authors && authors.reduce((authors, author, index) => {
        if (authorsLength === 1) return authors;
        else if (index === authorsLength - 1) return authors + " & " + author;
        else return authors + ", " + author;
      });
      // const thumbnail = imageLinks.thumbnail ? imageLinks.thumbnail : noImage;
      // const date = publishedDate.substr(0, 4);

      return (
        <div className="book-details">
          <section><p>BOOK DETAILS</p></section>
          <div className="panel">
            <div className="media">
              <div className="thumb-group">
                {/* <img src={thumbnail} alt="book thumbnail"/> */}
                <p><i>{shelf}</i></p>
              </div>
              <div className="media-body ml-4">
                <h3 className="mt-0 search-title">{title}</h3>
                <h5>{subtitle}</h5>
                <p><i>{authorList}</i></p>
                <p>{description}</p>
                <div className="details">
                  <p>{publishedDate}</p>
                  <p>{pageCount} pages</p>
                  {/* <Link to={infoLink}><p className="mt-0 mrr-primary">More info</p></Link> */}
                </div>
                <hr/>
                  <ChangeStatusMenu 
                    listType="book-details"
                    status={shelf}
                    id={id}
                  />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("server not responding");
      return <p>Server not responding. Please try again later.</p> 
    }
  }
}

export default BookDetails;