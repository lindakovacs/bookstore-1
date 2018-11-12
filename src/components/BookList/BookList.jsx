import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu"

function BookList(props) {
  const link = "/book-details";
  const books = props.books;
  const listType = props.listType;

  return (
      <div className={"panel " + (books.length === 0 ? "panel-empty" : "")}>

        {books.length > 0 ? (

        /* loop through the books if they exist */
        books.map((book, index) => {
          const authors = book.authors.reduce((authors, author) => authors + " " + author);
          return (
            <section key={book.id} className={listType}>
              <div className="media">
                <Link to={link}><img src={book.imageLinks.thumbnail} alt="book thumbnail" /></Link>
                <div className="media-body ml-3">
                <Link to={link}><h4 className="mt-0 mrr-primary">{book.title}</h4></Link>
                  <p><i>{authors}</i></p>

                  {/* add the Change Status Menu if the list is for My Books */
                    listType==="my-books" && (
                    <div>
                      <hr/>
                      <ChangeStatusMenu 
                        {...props}
                        status={book.shelf}
                        id={book.id}
                      />
                    </div>
                  )}
                </div>
              </div>
              {(books.length === 1) || (index === books.length - 1)  || <hr/>}
            </section>
          );
        })

        /* If no books are found, render a simple message  */
        ) : ( <p>No Books Found.</p> )
      }
      </div>
  );
}

export default BookList;