import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import Search from "./Search/Search";
import BookDetails from "./BookDetails/BookDetails";
import MyBooks from "./MyBooks/MyBooks";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="container">
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route path="/my-books" component={MyBooks} />
            <Route path="/book-details/:id" component={BookDetails} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
