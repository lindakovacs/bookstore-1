import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu";
import noImage from "../../images/no-image.jpg";

function BookList(props) {
  const books = props.books;
  const listType = props.listType;

  return (
      <div className={"panel " + (books.length ? "" : "panel-empty")}>

        {books.length ? (

        /* loop through the books if they exist */
        books.map((book, index) => {

          /* prepare variables for use in case they don't exist, contain glitches, etc... */
          const link = "/book-details/" + book.id;
          const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : noImage;
          const length = book.authors && book.authors.length;
          const authorList = book.authors ? book.authors.reduce((authors, author, index) => {
            if (length === 1) return authors;
            else if (index === length - 1) return authors + " & " + author;
            else return authors + ", " + author;
          }) : "author unknown";
          const statusMap = {
            none: "Not Selected",
            wantToRead: "Future Reads",
            currentlyReading: "Currently Reading",
            read: "Already Read"
          }
          
          return (
            <section key={`${book.id}-${index}`} className={listType}>
              <div className="media">

                {/* for BookDetails use non-link thumb and reading status */
                listType==="book-details" ? (
                  <div className="thumb-group">
                    <img src={thumbnail} alt="book thumbnail"/>
                    <p><i>{statusMap[book.shelf]}</i></p>
                  </div>
                ) : (
                  <Link to={link}>
                    <img src={thumbnail} alt="book thumbnail" />
                  </Link>
                )}
                <div className="media-body ml-3">

                  {/* for BookDetails use large title and include subtitle if it exists */
                  listType==="book-details" ? (
                    <div>
                      <h2 className="mt-0">{book.title}</h2>
                      {book.subtitle && <h5>{book.subtitle}</h5>}
                    </div>
                  ) : (
                    <Link to={link}><h4 className="mt-0 mrr-primary">{book.title}</h4></Link>
                  )}
                  <p><i><span className="mrr-subtle">By </span>{authorList}</i></p>

                  {/* for BookDetails include the description, date, page count and infolink */
                  listType==="book-details" && (
                    <div>
                      {/* render description if it exists */}
                      {book.description && <p>{book.description.replace(/<[/\w]+>/g, "")}</p>}

                      <div className="details">
                        {/* render date, pageCount and infoLink if they exist */}
                        {book.publishedDate && <p>{book.publishedDate.substr(0, 4)}</p>}
                        {book.pageCount && <p>{book.pageCount} pages</p>}
                        {book.infoLink && 
                          <a href={book.infoLink} target="_blank" rel="noopener noreferrer">
                            <p>More info</p>
                          </a>
                        }
                      </div>
                    </div>
                  )}

                  {/* add the Change Status Menu if the list is for MyBooks or BookDetails */
                  listType==="search-results" || (
                    <div>
                      <hr/>
                      <ChangeStatusMenu 
                        {...props}
                        shelf={book.shelf}
                        id={book.id}
                      />
                    </div>
                  )}
                </div>
              </div>
              {(books.length === 1) || (index === books.length - 1) || <hr/>}
            </section>
          );
        })

        /* If no books are found, render a simple message  */
        ) : ( 
          <div className="error">
            <p>No Books Found.</p> 
          </div>
        )
      }
      </div>
  );
}

export default BookList;