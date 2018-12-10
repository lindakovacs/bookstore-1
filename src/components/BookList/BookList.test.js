import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import BookList from "./BookList";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu";

describe("BookList component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BookList
        books={[
          {
            id: "qKydDAAAQBAJ",
            title: "Add a Pinch",
            subtitle: "Easier, Faster, Fresher Southern Classics",
            authors: ["Robyn Stone", "John Smith", "Sally Jones"],
            publisher: "Clarkson Potter",
            publishedDate: "2017-03-28",
            description: "book description",
            pageCount: 240,
            imageLinks: {
              thumbnail: "http://www.google.com"
            },
            infoLink: "https://www.yahoo.com",
            shelf: "wantToRead"
          }
        ]}
      />
    );
  });

  it("renders a 'my-books' BookList component with one book", () => {
    wrapper.setProps({ listType: "my-books" });
    expect(wrapper.find(".panel-empty")).to.have.lengthOf(0);
    expect(wrapper.find("section").is(".my-books")).to.equal(true);
    expect(wrapper.find("section").key()).to.equal('qKydDAAAQBAJ-0');
    expect(wrapper.find("Link")).to.have.lengthOf(2);
    expect(wrapper.find("img").prop("src")).to.equal("http://www.google.com");
    expect(wrapper.find("i").text()).to.equal("By Robyn Stone, John Smith & Sally Jones");
    expect(wrapper.find(ChangeStatusMenu)).to.have.lengthOf(1);
    expect(wrapper.find("hr")).to.have.lengthOf(1);
    expect(wrapper.find(".error")).to.have.lengthOf(0);
  });

  it("renders a 'search-results' BookList component with one book (only testing code specific to search-results)", () => {
    wrapper.setProps({ listType: "search-results" });
    expect(wrapper.find("section").is(".search-results")).to.equal(true);
    expect(wrapper.find(ChangeStatusMenu)).to.have.lengthOf(0);
  });

  it("renders a 'book-details' BookList component with one book", () => {
    wrapper.setProps({ listType: "book-details" });
    expect(wrapper.find(".panel-empty")).to.have.lengthOf(0);
    expect(wrapper.find("section").is(".book-details")).to.equal(true);
    expect(wrapper.find("section").key()).to.equal('qKydDAAAQBAJ-0');
    expect(wrapper.find(".thumb-group")).to.have.lengthOf(1);
    expect(wrapper.find("Link")).to.have.lengthOf(0);
    expect(wrapper.find("i")).to.have.lengthOf(2);
    expect(wrapper.find("img").prop("src")).to.equal("http://www.google.com");
    expect(wrapper.find("i").at(0).text()).to.equal("Future Reads");
    expect(wrapper.find("h2").text()).to.equal("Add a Pinch");
    expect(wrapper.find("h5").text()).to.equal("Easier, Faster, Fresher Southern Classics");
    expect(wrapper.find("i").at(1).text()).to.equal("By Robyn Stone, John Smith & Sally Jones");
    expect(wrapper.find("p").at(2).text()).to.equal("book description");
    expect(wrapper.find("p").at(3).text()).to.equal("2017");
    expect(wrapper.find("p").at(4).text()).to.equal("240 pages");
    expect(wrapper.find("a").prop("href")).to.equal("https://www.yahoo.com");
    expect(wrapper.find("a").text()).to.equal("More info");
    expect(wrapper.find(ChangeStatusMenu)).to.have.lengthOf(1);
    expect(wrapper.find("hr")).to.have.lengthOf(1);
    expect(wrapper.find(".error")).to.have.lengthOf(0);
  });

  it("renders a BookList component with no books", () => {
    wrapper.setProps({ books: [] });
    expect(wrapper.find(".panel-empty")).to.have.lengthOf(1);
    expect(wrapper.find("p")).to.have.lengthOf(1);
    expect(wrapper.find("p").text()).to.equal("No Books Found.");
  });
});