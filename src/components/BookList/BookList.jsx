import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu";
import noImage from "../../images/no-image.svg";

function BookList(props) {
  const books = props.books;
  const listType = props.listType;

  return (
    <div className={"panel " + (books.length ? "" : "panel-empty")}>
    
      {/* loop through the books if any exist */
      books.length 
      ? (books.map((book, index) => {
          /* prepare variables for use in case they don't exist, contain glitches, etc... */
          const link = "/book-details/" + book.id;
          const thumbnail = book.imageLinks
            ? book.imageLinks.thumbnail || noImage
            : noImage;
          const length = book.authors && book.authors.length;
          const authorList = book.authors
            ? book.authors.reduce((authors, author, index) => {
                if (length === 1) return authors;
                else if (index === length - 1) return authors + " & " + author;
                else return authors + ", " + author;
              })
            : "author unknown";
          const statusMap = {
            none: "Not Selected",
            wantToRead: "Future Reads",
            currentlyReading: "Currently Reading",
            read: "Already Read"
          };

          return (
            <section key={`${book.id}-${index}`} className={listType}>
              <div className="media">
                {/* If BOOK DETAILS: render non-linked thumbnail and reading status */
                listType === "book-details" 
                ? (
                  <div className="thumb-group">
                    <img src={thumbnail} alt="book thumbnail" />
                    <p>
                      <i>{statusMap[book.shelf]}</i>
                    </p>
                  </div> ) 
                : (
                  /* Else for SEARCH & MY BOOKS: render linked thumbnail only */
                  <Link to={link}>
                    <img src={thumbnail} alt="book thumbnail" />
                  </Link>
                )}

                <div className="media-body ml-3">
                  {/* If BOOK DETAILS: render non-linked title and include subtitle if it exists */
                  listType === "book-details" 
                  ? (
                    <div>
                      <h2 className="mt-0">{book.title}</h2>
                      {book.subtitle && <h5>{book.subtitle}</h5>}
                    </div> ) 
                  : (
                    /* Else for SEARCH & MY BOOKS: render linked title only */
                    <Link to={link}>
                      <h4 className="mt-0 mrr-primary">{book.title}</h4>
                    </Link>
                  )}

                  {/* ALL: render author list */}
                  <p>
                    <i>
                      <span className="mrr-subtle">By </span>
                      {authorList}
                    </i>
                  </p>

                  {/* If BOOK DETAILS: render the description, date, page count and infolink */
                  listType === "book-details" && (
                    <div>
                      {book.description && (
                        <p>{book.description.replace(/<[/\w]+>/g, "")}</p>
                      )}
                      <div className="details">
                        {book.publishedDate && (
                          <p>{book.publishedDate.substr(0, 4)}</p>
                        )}
                        {book.pageCount && <p>{book.pageCount} pages</p>}
                        {book.infoLink && (
                          <a
                            href={book.infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p>More info</p>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* If BOOK DETAILS & MY BOOKS: render the Change Status Menu */
                  listType === "search-results" || (
                    <div>
                      <hr />
                      <ChangeStatusMenu
                        {...props}
                        shelf={book.shelf}
                        id={book.id}
                      />
                    </div>
                  )}
                </div>
              </div>
              {books.length === 1 || index === books.length - 1 || <hr />}
            </section>
          );
        })) 
      : (
        /* If no books are found, render a simple message  */
        <div className="error">
          <p>No Books Found.</p>
        </div>
      )}
    </div>
  );
}

export default BookList;
