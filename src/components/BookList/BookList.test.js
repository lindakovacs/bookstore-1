import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import BookList from "./BookList";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu";
import { spy } from "sinon";

describe("BookList component", () => {
  let wrapper;
  const getSpy = spy();
  beforeEach(() => {
    wrapper = shallow(
      <BookList
        books={[
          {
            id: "qKydDAAAQBAJ",
            title: "Add a Pinch",
            subtitle: "Easier, Faster, Fresher Southern Classics",
            authors: ["Robyn Stone"],
            publisher: "Clarkson Potter",
            publishedDate: "2017-03-28",
            description:
              "With a foreword by Ree Drummond, this beautiful book has 100 easier, faster, lightened-up Southern recipes, from the blogger behind the popular Add a Pinch website.",
            industryIdentifiers: [
              {
                type: "ISBN_13",
                identifier: "9780553496420"
              },
              {
                type: "ISBN_10",
                identifier: "0553496425"
              }
            ],
            readingModes: {
              text: true,
              image: false
            },
            pageCount: 240,
            printType: "BOOK",
            categories: ["Cooking"],
            maturityRating: "NOT_MATURE",
            allowAnonLogging: false,
            contentVersion: "1.2.1.0.preview.2",
            panelizationSummary: {
              containsEpubBubbles: false,
              containsImageBubbles: false
            },
            imageLinks: {
              smallThumbnail:
                "http://books.google.com/books/content?id=qKydDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              thumbnail:
                "http://books.google.com/books/content?id=qKydDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            language: "en",
            previewLink:
              "http://books.google.com/books?id=qKydDAAAQBAJ&printsec=frontcover&dq=cooking+salmon:intitle&hl=&cd=1&source=gbs_api",
            infoLink:
              "https://play.google.com/store/books/details?id=qKydDAAAQBAJ&source=gbs_api",
            canonicalVolumeLink:
              "https://market.android.com/details?id=book-qKydDAAAQBAJ",
            shelf: "wantToRead"
          }
        ]}
        listType="my-books"
        getMyBooks={getSpy}
      />
    );
  });

  // Accurately renders a "my-books" BookList component with one book
  it.only("renders a 'my-books' <section> tag with a linked thumbnail, linked title, author list, horz rule and ChangeStatusMenu component", () => {
    expect(wrapper.find(".panel-empty")).to.have.lengthOf(0);
    // console.log(wrapper.debug());
    expect(wrapper.find("section").is(".my-books")).to.equal(true);
    expect(wrapper.find("section").key()).to.equal('qKydDAAAQBAJ-0');
    expect(wrapper.find("Link")).to.have.lengthOf(2);
    expect(wrapper.find("img").prop("src")).to.equal("http://books.google.com/books/content?id=qKydDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
    expect(wrapper.find(".media-body")).to.have.lengthOf(1);
    expect(wrapper.find(ChangeStatusMenu)).to.have.lengthOf(1);
  });
});
