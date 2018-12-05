## My Reading Room

Not so much a bookstore as a reading list, I'm calling this web-app "My Reading Room." It consists of a nodejs back end server created by our awesome instructors [Matina Patsos](https://github.com/matinaspatsos) and [Jamal Taylor](https://github.com/Louis345). The UI consists of four main components — Navbar, Search, Book Details and My Books: 
* __Navbar:__ Displays links to Search and My Books. 
* __Search:__ Allows one to search for books and then select from a list of results to find out more about a specific book. 

![Landing page with Search field & Search Results](./screenshots/sg-search-results.jpg?raw=true "Search Field and Search Results")

* __Book Details:__ Provides more detailed information about a specific book and lets the user add it to My Books.

![Book Details page](./screenshots/sg-book-details.jpg?raw=true "Book Details page")

* __My Books:__ Lists a user's books in three categories: Future Reads, Currently Reading and Already Read, and allows users to switch books to different categories or remove them completely.

![My Books page](./screenshots/sg-my-books.jpg?raw=true "My Books page")

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For more information about the React framework please vist [Reactjs.org](https://reactjs.org/docs/getting-started.html).

### Prerequisites

1. Node v10.0.0+  
    Follow installation instructions at https://nodejs.org/en/download/
2. Yarn v1.10.1+ (optional)  
    From the terminal, type `npm install -g yarn`

### Installing

From the terminal, clone the repository by typing: 
```
git clone https://github.com/queensburybill/bookstore.git
``` 
Then cd into the bookstore directory and run `yarn install` followed by `yarn start`

Then from the bookstore enter the command `cd server` and run `yarn install` followed by `yarn start`

Alternatively you can use `npm install` and `npm start` to start the app and the server.

## Unit Tests

Tests are still under construction

## Author

* **William Peirce** - 

## Acknowledgments

* Kudos to AlbanyCanCode's [Matina Patsos](https://github.com/matinaspatsos) and [Jamal Taylor](https://github.com/Louis345) for their expert instruction!
